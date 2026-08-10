import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { startFacebookGroupScrape } from "@/lib/apify";
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

  if (source.platform === "reddit") {
    return NextResponse.json(
      { ok: false, error: "Reddit watching isn't switched on yet — it's queued." },
      { status: 409 }
    );
  }

  const secret = process.env.APIFY_WEBHOOK_SECRET;
  if (!process.env.APIFY_TOKEN || !secret) {
    return NextResponse.json(
      { ok: false, error: "Scraping isn't configured on this environment yet." },
      { status: 503 }
    );
  }

  // Apify calls this back from its own servers, so it must be publicly
  // reachable. request.url is localhost in dev, which would leave the run
  // finishing into the void — hence the explicit override.
  const base = process.env.PUBLIC_WEBHOOK_BASE_URL?.trim() || request.url;
  const webhookUrl = new URL("/api/apify/webhook", base).toString();

  if (webhookUrl.includes("localhost") || webhookUrl.includes("127.0.0.1")) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Set PUBLIC_WEBHOOK_BASE_URL to a public URL (tunnel or deployed domain) — Apify can't call localhost back.",
      },
      { status: 503 }
    );
  }

  try {
    const { runId } = await startFacebookGroupScrape({
      groupUrl: source.url,
      sourceId: source.id,
      userId: user.id,
      since: source.last_run_at,
      webhookUrl,
      webhookSecret: secret,
    });

    await supabase
      .from("watch_sources")
      .update({ last_run_at: new Date().toISOString(), last_error: null, status: "active" })
      .eq("id", source.id)
      .eq("user_id", user.id);

    return NextResponse.json({ ok: true, runId });
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : "Scrape failed to start.";

    await supabase
      .from("watch_sources")
      .update({ status: "error", last_error: detail.slice(0, 500) })
      .eq("id", source.id)
      .eq("user_id", user.id);

    return NextResponse.json({ ok: false, error: detail }, { status: 502 });
  }
}
