import { requireAdminUser } from "@/lib/api/auth";
import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import { createServiceClient } from "@/lib/supabase/service";
import type { WatchSource } from "@/lib/types";

const MAX_ASSIGNED = 4;

type Params = { params: Promise<{ sourceId: string }> };

/**
 * Replaces the full set of accounts assigned to a private group — 1 to 4
 * pooled cookies, exactly one marked active. This is the "set up (or
 * reconfigure) which accounts back this group" action; swapping which
 * already-assigned account is active is the lighter .../assignments/active
 * PATCH instead, so a routine failover doesn't require re-picking the set.
 */
export async function PUT(request: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const { sourceId } = await params;

  const parsed = await parseJsonBody<{ cookieIds?: unknown; activeCookieId?: unknown }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const cookieIds = Array.isArray(body.cookieIds)
    ? body.cookieIds.filter((id): id is string => typeof id === "string")
    : [];
  const uniqueCookieIds = [...new Set(cookieIds)];
  const activeCookieId = typeof body.activeCookieId === "string" ? body.activeCookieId : "";

  if (uniqueCookieIds.length === 0) {
    return apiError("Assign at least one account.", 400);
  }
  if (uniqueCookieIds.length > MAX_ASSIGNED) {
    return apiError(`At most ${MAX_ASSIGNED} accounts per group.`, 400);
  }
  if (!activeCookieId || !uniqueCookieIds.includes(activeCookieId)) {
    return apiError("Pick which assigned account is active.", 400);
  }

  const service = createServiceClient();

  const { data: source, error: sourceError } = await service
    .from("watch_sources")
    .select("*")
    .eq("id", sourceId)
    .eq("requires_login", true)
    .maybeSingle<WatchSource>();

  if (sourceError) {
    return apiError(sourceError.message, 500);
  }
  if (!source) {
    return apiError("No such private group.", 404);
  }

  const { count: cookieCount } = await service
    .from("facebook_cookies")
    .select("id", { count: "exact", head: true })
    .in("id", uniqueCookieIds);

  if ((cookieCount ?? 0) !== uniqueCookieIds.length) {
    return apiError("One of those accounts no longer exists in the pool.", 400);
  }

  // Replace the whole set: this is an infrequent, admin-only, single-row
  // action, so a delete-then-insert (not wrapped in one transaction — the
  // Supabase JS client doesn't expose multi-statement transactions) is
  // simpler than a Postgres function for a gap of a few milliseconds nobody
  // else writes into.
  const { error: deleteError } = await service
    .from("group_account_assignments")
    .delete()
    .eq("source_id", sourceId);
  if (deleteError) {
    return apiError(deleteError.message, 500);
  }

  const { error: insertError } = await service.from("group_account_assignments").insert(
    uniqueCookieIds.map((cookieId) => ({
      source_id: sourceId,
      cookie_id: cookieId,
      role: cookieId === activeCookieId ? "active" : "backup",
    }))
  );
  if (insertError) {
    return apiError(insertError.message, 500);
  }

  // Assigning an account makes the group scannable — it does not approve it.
  // A pending group stays pending until the admin explicitly approves it via
  // PATCH .../status, even after accounts are assigned.

  // Best-effort instant rescan with the newly-assigned active account —
  // same "must still succeed even if scanning fails" contract as source
  // creation; a failure here just lands on the source's own last_error.
  const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
  if (process.env.APIFY_TOKEN && webhookSecret) {
    const webhook = resolveWebhookUrl(request.url);
    if (webhook.ok) {
      try {
        await startScanForSource(source, webhook.url, webhookSecret);
      } catch (cause) {
        console.error("Instant rescan on assignment change failed", cause);
      }
    }
  }

  return apiOk();
}
