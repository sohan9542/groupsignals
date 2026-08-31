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
 * The explicit approval action — separate from assigning accounts on
 * purpose. Assigning an account only makes a group *scannable*; whether it's
 * actually live is a decision an admin makes on its own, not a side effect.
 */
export async function PATCH(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const { sourceId } = await params;

  let body: { status?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.status !== "active" && body.status !== "paused") {
    return NextResponse.json({ ok: false, error: "Status must be 'active' or 'paused'." }, { status: 400 });
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

  if (body.status === "active") {
    const { count } = await service
      .from("group_account_assignments")
      .select("id", { count: "exact", head: true })
      .eq("source_id", sourceId)
      .eq("role", "active");

    if (!count) {
      return NextResponse.json(
        { ok: false, error: "Assign an active account before approving this group." },
        { status: 400 }
      );
    }
  }

  const { error: updateError } = await service
    .from("watch_sources")
    .update({ status: body.status })
    .eq("id", sourceId);

  if (updateError) {
    return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
  }

  // Approval is the moment a group is meant to start actually scanning.
  if (body.status === "active") {
    const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
    if (process.env.APIFY_TOKEN && webhookSecret) {
      const webhook = resolveWebhookUrl(request.url);
      if (webhook.ok) {
        try {
          await startScanForSource({ ...source, status: "active" }, webhook.url, webhookSecret);
        } catch (cause) {
          console.error("Instant scan on approval failed", cause);
        }
      }
    }
  }

  return NextResponse.json({ ok: true });
}
