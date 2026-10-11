import { requireAdminUser } from "@/lib/api/auth";
import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import { createServiceClient } from "@/lib/supabase/service";
import type { WatchSource } from "@/lib/types";

type Params = { params: Promise<{ sourceId: string }> };

/**
 * Promotes an already-assigned backup to active (and demotes whatever was
 * active back to backup) — the fast manual-swap action for when the active
 * account stops working, without re-picking the whole assigned set.
 */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const { sourceId } = await params;

  const parsed = await parseJsonBody<{ cookieId?: unknown }>(request);
  if (!parsed.ok) return parsed.response;

  const cookieId = typeof parsed.data.cookieId === "string" ? parsed.data.cookieId : "";
  if (!cookieId) {
    return apiError("Pick an account to make active.", 400);
  }

  const service = createServiceClient();

  const { data: target } = await service
    .from("group_account_assignments")
    .select("id")
    .eq("source_id", sourceId)
    .eq("cookie_id", cookieId)
    .maybeSingle<{ id: string }>();

  if (!target) {
    return apiError("That account isn't assigned to this group.", 400);
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
    return apiError(demoteError.message, 500);
  }

  const { error: promoteError } = await service
    .from("group_account_assignments")
    .update({ role: "active" })
    .eq("id", target.id);
  if (promoteError) {
    return apiError(promoteError.message, 500);
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

  return apiOk();
}
