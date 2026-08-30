import { createServiceClient } from "./supabase/service";
import { startFacebookGroupScrape, startPrivateFacebookGroupScrape } from "./apify";
import { decryptCookies, type FacebookCookie } from "./facebook-cookies";
import { resolvePublicOrigin } from "./public-url";
import type { WatchSource } from "./types";

export type ScanOutcome = { ok: true; runId: string } | { ok: false; error: string; status: number };

/** Start of today in UTC, as an ISO string. Not per-user timezone (nothing
 *  stores one) — a single consistent day boundary across every source. */
function startOfTodayUTC(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

/**
 * Every scan — first or repeat — is scoped to today's posts only, per cost
 * requirements: whichever is more recent, the source's last scan or the
 * start of today, so a source never re-fetches this morning's posts again
 * this afternoon, but also never reaches back past today even on its very
 * first scan.
 */
function scanCutoff(lastRunAt: string | null): string {
  const todayFloor = startOfTodayUTC();
  return lastRunAt && lastRunAt > todayFloor ? lastRunAt : todayFloor;
}

/**
 * Starts a scrape for one source. Shared by the user-triggered "Scan now"
 * button and the QStash cron sweep — always through the service-role client,
 * since the cron path has no user session to inherit RLS from. Every write
 * still scopes to (source.id, source.user_id) explicitly, same as the rest
 * of this codebase's defense-in-depth pattern even when the client itself
 * already bypasses RLS.
 */
export async function startScanForSource(
  source: WatchSource,
  webhookUrl: string,
  webhookSecret: string
): Promise<ScanOutcome> {
  const service = createServiceClient();

  if (source.platform === "reddit") {
    return { ok: false, error: "Reddit watching isn't switched on yet — it's queued.", status: 409 };
  }

  let privateAuth: { cookieId: string; cookies: FacebookCookie[] } | null = null;

  if (source.requires_login) {
    // Strictly the account an admin assigned to THIS group — no fallback to
    // any other pooled cookie, even if one is sitting idle. Keeps each
    // group's exposure to a deliberate, admin-chosen set of accounts.
    const { data: assignment } = await service
      .from("group_account_assignments")
      .select("cookie_id, facebook_cookies!inner(id, cookies_ciphertext, status)")
      .eq("source_id", source.id)
      .eq("role", "active")
      .eq("facebook_cookies.status", "active")
      .maybeSingle<{ cookie_id: string; facebook_cookies: { id: string; cookies_ciphertext: string; status: string } }>();

    const cookie = assignment
      ? { id: assignment.cookie_id, cookies_ciphertext: assignment.facebook_cookies.cookies_ciphertext }
      : null;

    if (!cookie) {
      return {
        ok: false,
        error: "No active Facebook account assigned to this group — assign one in the admin panel.",
        status: 503,
      };
    }

    let cookies: FacebookCookie[];
    try {
      cookies = decryptCookies(cookie.cookies_ciphertext);
    } catch {
      return {
        ok: false,
        error: "A pooled cookie is unreadable — an admin needs to check Settings.",
        status: 503,
      };
    }

    await service
      .from("facebook_cookies")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", cookie.id);

    privateAuth = { cookieId: cookie.id, cookies };
  }

  const since = scanCutoff(source.last_run_at);

  try {
    const { runId } = privateAuth
      ? await startPrivateFacebookGroupScrape({
          groupUrl: source.url,
          sourceId: source.id,
          userId: source.user_id,
          since,
          cookies: privateAuth.cookies,
          cookieId: privateAuth.cookieId,
          webhookUrl,
          webhookSecret,
        })
      : await startFacebookGroupScrape({
          groupUrl: source.url,
          sourceId: source.id,
          userId: source.user_id,
          since,
          webhookUrl,
          webhookSecret,
        });

    await service
      .from("watch_sources")
      .update({ last_run_at: new Date().toISOString(), last_error: null, status: "active" })
      .eq("id", source.id)
      .eq("user_id", source.user_id);

    return { ok: true, runId };
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : "Scrape failed to start.";

    await service
      .from("watch_sources")
      .update({ status: "error", last_error: detail.slice(0, 500) })
      .eq("id", source.id)
      .eq("user_id", source.user_id);

    return { ok: false, error: detail, status: 502 };
  }
}

/**
 * Apify calls the webhook back from its own servers, so it must be publicly
 * reachable — a localhost URL would leave every run finishing into the void.
 * Prefers PUBLIC_WEBHOOK_BASE_URL / NEXT_PUBLIC_SITE_URL over request.url
 * because Vercel/QStash invocations often look like localhost internally.
 */
export function resolveWebhookUrl(requestUrl: string): { ok: true; url: string } | { ok: false; error: string } {
  const base = resolvePublicOrigin(requestUrl);
  if (!base) {
    return {
      ok: false,
      error: "Set PUBLIC_WEBHOOK_BASE_URL to a public URL (tunnel or deployed domain) — Apify can't call localhost back.",
    };
  }

  return { ok: true, url: new URL("/api/apify/webhook", base).toString() };
}
