import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import type { WatchSource } from "@/lib/types";

type Params = { params: Promise<{ sourceId: string }> };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user?.email) ? user : null;
}

/**
 * Promotes an already-assigned backup to active (and demotes whatever was
 * active back to backup) — the fast manual-swap action for when the active
 * account stops working, without re-picking the whole assigned set.
 */
export async function PATCH(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const { sourceId } = await params;

  let body: { cookieId?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const cookieId = typeof body.cookieId === "string" ? body.cookieId : "";
  if (!cookieId) {
    return NextResponse.json({ ok: false, error: "Pick an account to make active." }, { status: 400 });
  }

  const service = createServiceClient();

  const { data: target } = await service
    .from("group_account_assignments")
    .select("id")
    .eq("source_id", sourceId)
    .eq("cookie_id", cookieId)
    .maybeSingle<{ id: string }>();

  if (!target) {
    return NextResponse.json({ ok: false, error: "That account isn't assigned to this group." }, { status: 400 });
  }

  // Demote the current active first — the one-active-per-source unique index
  // would otherwise reject promoting a second row to 'active' before the old
  // one steps down.
  const { error: demoteError } = await service
    .from("group_account_assignments")
    .update({ role: "backup" })
    .eq("source_id", sourceId)
    .eq("role", "active");
  if (demoteError) {
    return NextResponse.json({ ok: false, error: demoteError.message }, { status: 500 });
  }

  const { error: promoteError } = await service
    .from("group_account_assignments")
    .update({ role: "active" })
    .eq("id", target.id);
  if (promoteError) {
    return NextResponse.json({ ok: false, error: promoteError.message }, { status: 500 });
  }

  const { data: source } = await service
    .from("watch_sources")
    .select("*")
    .eq("id", sourceId)
    .maybeSingle<WatchSource>();

  const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
  if (source && process.env.APIFY_TOKEN && webhookSecret) {
    const webhook = resolveWebhookUrl(request.url);
    if (webhook.ok) {
      try {
        await startScanForSource(source, webhook.url, webhookSecret);
      } catch (cause) {
        console.error("Instant rescan on active-account swap failed", cause);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
