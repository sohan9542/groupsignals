import { requireAdminUser } from "@/lib/api/auth";
import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import { createServiceClient } from "@/lib/supabase/service";
import type { WatchSource } from "@/lib/types";

type Params = { params: Promise<{ sourceId: string }> };

/**
 * The explicit approval action — separate from assigning accounts on
 * purpose. Assigning an account only makes a group *scannable*; whether it's
 * actually live is a decision an admin makes on its own, not a side effect.
 */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const { sourceId } = await params;

  const parsed = await parseJsonBody<{ status?: unknown }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  if (body.status !== "active" && body.status !== "paused") {
    return apiError("Status must be 'active' or 'paused'.", 400);
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

  if (body.status === "active") {
    const { count } = await service
      .from("group_account_assignments")
      .select("id", { count: "exact", head: true })
      .eq("source_id", sourceId)
      .eq("role", "active");

    if (!count) {
      return apiError("Assign an active account before approving this group.", 400);
    }
  }

  const { error: updateError } = await service
    .from("watch_sources")
    .update({ status: body.status })
    .eq("id", sourceId);

  if (updateError) {
    return apiError(updateError.message, 500);
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

  return apiOk();
}
