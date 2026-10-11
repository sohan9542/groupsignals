import { apiError, apiOk } from "@/lib/api/http";
import { requireUser } from "@/lib/api/auth";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import type { WatchSource } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const { id } = await params;

  const { data: source, error } = await supabase
    .from("watch_sources")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single<WatchSource>();

  if (error || !source) {
    return apiError("Source not found.", 404);
  }

  const secret = process.env.APIFY_WEBHOOK_SECRET;
  if (!process.env.APIFY_TOKEN || !secret) {
    return apiError("Scraping isn't configured on this environment yet.", 503);
  }

  const webhook = resolveWebhookUrl(request.url);
  if (!webhook.ok) {
    return apiError(webhook.error, 503);
  }

  const outcome = await startScanForSource(source, webhook.url, secret);

  if (!outcome.ok) {
    return apiError(outcome.error, outcome.status);
  }

  return apiOk({ runId: outcome.runId });
}
