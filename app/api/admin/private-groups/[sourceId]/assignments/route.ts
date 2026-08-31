import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import type { WatchSource } from "@/lib/types";

const MAX_ASSIGNED = 4;

type Params = { params: Promise<{ sourceId: string }> };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user?.email) ? user : null;
}

/**
 * Replaces the full set of accounts assigned to a private group — 1 to 4
 * pooled cookies, exactly one marked active. This is the "set up (or
 * reconfigure) which accounts back this group" action; swapping which
 * already-assigned account is active is the lighter .../assignments/active
 * PATCH instead, so a routine failover doesn't require re-picking the set.
 */
export async function PUT(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const { sourceId } = await params;

  let body: { cookieIds?: unknown; activeCookieId?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const cookieIds = Array.isArray(body.cookieIds) ? body.cookieIds.filter((id): id is string => typeof id === "string") : [];
  const uniqueCookieIds = [...new Set(cookieIds)];
  const activeCookieId = typeof body.activeCookieId === "string" ? body.activeCookieId : "";

  if (uniqueCookieIds.length === 0) {
    return NextResponse.json({ ok: false, error: "Assign at least one account." }, { status: 400 });
  }
  if (uniqueCookieIds.length > MAX_ASSIGNED) {
    return NextResponse.json({ ok: false, error: `At most ${MAX_ASSIGNED} accounts per group.` }, { status: 400 });
  }
  if (!activeCookieId || !uniqueCookieIds.includes(activeCookieId)) {
    return NextResponse.json({ ok: false, error: "Pick which assigned account is active." }, { status: 400 });
  }

  const service = createServiceClient();

  const { data: source, error: sourceError } = await service
    .from("watch_sources")
    .select("*")
    .eq("id", sourceId)
    .eq("requires_login", true)
    .maybeSingle<WatchSource>();

  if (sourceError) {
    return NextResponse.json({ ok: false, error: sourceError.message }, { status: 500 });
  }
  if (!source) {
    return NextResponse.json({ ok: false, error: "No such private group." }, { status: 404 });
  }

  const { count: cookieCount } = await service
    .from("facebook_cookies")
    .select("id", { count: "exact", head: true })
    .in("id", uniqueCookieIds);

  if ((cookieCount ?? 0) !== uniqueCookieIds.length) {
    return NextResponse.json({ ok: false, error: "One of those accounts no longer exists in the pool." }, { status: 400 });
  }

  // Replace the whole set: this is an infrequent, admin-only, single-row
  // action, so a delete-then-insert (not wrapped in one transaction — the
  // Supabase JS client doesn't expose multi-statement transactions) is
  // simpler than a Postgres function for a gap of a few milliseconds nobody
  // else writes into.
  const { error: deleteError } = await service.from("group_account_assignments").delete().eq("source_id", sourceId);
  if (deleteError) {
    return NextResponse.json({ ok: false, error: deleteError.message }, { status: 500 });
  }

  const { error: insertError } = await service.from("group_account_assignments").insert(
    uniqueCookieIds.map((cookieId) => ({
      source_id: sourceId,
      cookie_id: cookieId,
      role: cookieId === activeCookieId ? "active" : "backup",
    }))
  );
  if (insertError) {
    return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 });
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

  return NextResponse.json({ ok: true });
}
