import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import type { WatchSource } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;

  const { data: source, error } = await supabase
    .from("watch_sources")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single<WatchSource>();

  if (error || !source) {
    return NextResponse.json({ ok: false, error: "Source not found." }, { status: 404 });
  }

  const secret = process.env.APIFY_WEBHOOK_SECRET;
  if (!process.env.APIFY_TOKEN || !secret) {
    return NextResponse.json(
      { ok: false, error: "Scraping isn't configured on this environment yet." },
      { status: 503 }
    );
  }

  const webhook = resolveWebhookUrl(request.url);
  if (!webhook.ok) {
    return NextResponse.json({ ok: false, error: webhook.error }, { status: 503 });
  }

  const outcome = await startScanForSource(source, webhook.url, secret);

  if (!outcome.ok) {
    return NextResponse.json({ ok: false, error: outcome.error }, { status: outcome.status });
  }

  return NextResponse.json({ ok: true, runId: outcome.runId });
}
