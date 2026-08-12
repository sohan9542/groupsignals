import { createServiceClient } from "./supabase/service";
import { startFacebookGroupScrape, startPrivateFacebookGroupScrape } from "./apify";
import { decryptCookies, type FacebookCookie } from "./facebook-cookies";
import type { WatchSource } from "./types";

export type ScanOutcome = { ok: true; runId: string } | { ok: false; error: string; status: number };

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
    // Least-recently-used active cookie — spreads load across the pool
    // instead of hammering the same account on every scan.
    const { data: cookie } = await service
      .from("facebook_cookies")
      .select("id, cookies_ciphertext")
      .eq("status", "active")
      .order("last_used_at", { ascending: true, nullsFirst: true })
      .limit(1)
      .maybeSingle<{ id: string; cookies_ciphertext: string }>();

    if (!cookie) {
      return {
        ok: false,
        error: "No connected Facebook accounts available right now.",
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

  try {
    const { runId } = privateAuth
      ? await startPrivateFacebookGroupScrape({
          groupUrl: source.url,
          sourceId: source.id,
          userId: source.user_id,
          since: source.last_run_at,
          cookies: privateAuth.cookies,
          cookieId: privateAuth.cookieId,
          webhookUrl,
          webhookSecret,
        })
      : await startFacebookGroupScrape({
          groupUrl: source.url,
          sourceId: source.id,
          userId: source.user_id,
          since: source.last_run_at,
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
 */
export function resolveWebhookUrl(requestUrl: string): { ok: true; url: string } | { ok: false; error: string } {
  const base = process.env.PUBLIC_WEBHOOK_BASE_URL?.trim() || requestUrl;
  const url = new URL("/api/apify/webhook", base).toString();

  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return {
      ok: false,
      error: "Set PUBLIC_WEBHOOK_BASE_URL to a public URL (tunnel or deployed domain) — Apify can't call localhost back.",
    };
  }

  return { ok: true, url };
}
