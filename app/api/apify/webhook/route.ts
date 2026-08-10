import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  fetchDatasetItems,
  groupTitleFrom,
  matchKeywords,
  normalisePost,
} from "@/lib/apify";
import type { WatchSource } from "@/lib/types";

type WebhookBody = {
  runId?: string;
  datasetId?: string;
  status?: string;
  sourceId?: string;
  userId?: string;
  secret?: string;
};

function secretMatches(received: string, expected: string): boolean {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.APIFY_WEBHOOK_SECRET;
  // Both are needed to do anything useful; without them fail closed rather
  // than throwing a stack trace out of the service client.
  if (!expected || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let body: WebhookBody;
  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // This endpoint writes leads with the service role, so an unauthenticated
  // caller must never get past here.
  if (typeof body.secret !== "string" || !secretMatches(body.secret, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { sourceId, userId, datasetId, status } = body;
  if (!sourceId || !userId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createServiceClient();

  if (status && status !== "SUCCEEDED") {
    await supabase
      .from("watch_sources")
      .update({ status: "error", last_error: `Scrape run ${status}` })
      .eq("id", sourceId)
      .eq("user_id", userId);
    return NextResponse.json({ ok: true, imported: 0 });
  }

  if (!datasetId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { data: source } = await supabase
    .from("watch_sources")
    .select("*")
    .eq("id", sourceId)
    .eq("user_id", userId)
    .single<WatchSource>();

  if (!source) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  let items;
  try {
    items = await fetchDatasetItems(datasetId);
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : "Dataset read failed";
    await supabase
      .from("watch_sources")
      .update({ status: "error", last_error: detail.slice(0, 500) })
      .eq("id", sourceId);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  const rows = items
    .map(normalisePost)
    .filter((post) => post !== null)
    .map((post) => {
      const { matches, matched } = matchKeywords(
        post.content,
        source.include_keywords,
        source.exclude_keywords
      );
      return matches
        ? {
            user_id: userId,
            source_id: sourceId,
            platform: source.platform,
            external_id: post.externalId,
            post_url: post.url,
            author_name: post.authorName,
            author_url: post.authorUrl,
            content: post.content,
            matched_keywords: matched,
            posted_at: post.postedAt,
          }
        : null;
    })
    .filter((row) => row !== null);

  let imported = 0;
  if (rows.length > 0) {
    // ignoreDuplicates leans on the (user_id, platform, external_id) unique
    // index so re-scraping a group never re-alerts on posts already seen.
    const { data, error } = await supabase
      .from("leads")
      .upsert(rows, {
        onConflict: "user_id,platform,external_id",
        ignoreDuplicates: true,
      })
      .select("id");

    if (error) {
      await supabase
        .from("watch_sources")
        .update({ status: "error", last_error: error.message.slice(0, 500) })
        .eq("id", sourceId);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    imported = data?.length ?? 0;
  }

  // The scraper knows the group's real name; the row was created with a guess
  // derived from the URL slug ("Group 874728723021553"). Upgrade it once.
  const groupTitle = groupTitleFrom(items);

  await supabase
    .from("watch_sources")
    .update({
      status: "active",
      last_error: null,
      last_run_at: new Date().toISOString(),
      ...(groupTitle ? { name: groupTitle } : {}),
    })
    .eq("id", sourceId);

  return NextResponse.json({ ok: true, imported });
}
