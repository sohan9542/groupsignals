import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { SCAN_RESULTS_LIMIT, fetchDatasetItems, groupTitleFrom, normalisePost } from "@/lib/apify";
import { matchPostsToIntent } from "@/lib/match-intent";
import { sendAdminCookieAlert, sendLeadAlert } from "@/lib/email";
import type { ScrapedPost } from "@/lib/apify";
import type { WatchSource } from "@/lib/types";

type WebhookBody = {
  runId?: string;
  datasetId?: string;
  status?: string;
  /** e.g. "ACTOR.RUN.SUCCEEDED" / "ACTOR.RUN.FAILED" — the primary success
   *  signal; unlike `status` it can't be confused with an unrelated resource
   *  status value, so it's checked first. */
  eventType?: string;
  sourceId?: string;
  userId?: string;
  secret?: string;
  /** Present only for a private-source run — see lib/apify.ts WebhookOptions. */
  cookieId?: string;
};

/** True if a template field never got substituted by Apify — the payload
 *  would literally contain the string "{{resource.status}}" etc. Distinct
 *  from a real failure so it never gets silently misread as one again. */
function looksUnsubstituted(value: string | undefined): boolean {
  return typeof value === "string" && value.includes("{{");
}

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

  const { sourceId, userId, datasetId, status, eventType, cookieId } = body;
  if (!sourceId || !userId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createServiceClient();

  if (looksUnsubstituted(status) || looksUnsubstituted(eventType) || looksUnsubstituted(datasetId)) {
    // Apify's payloadTemplate didn't get filled in -- every run would look
    // like a failure forever without ever actually failing. This needs a
    // human, not a retry.
    const diagnostic = `Apify webhook payload wasn't substituted (status=${status}, eventType=${eventType}) — check payloadTemplate syntax in lib/apify.ts.`;
    console.error(diagnostic);
    await supabase
      .from("watch_sources")
      .update({ status: "error", last_error: diagnostic.slice(0, 500) })
      .eq("id", sourceId)
      .eq("user_id", userId);
    return NextResponse.json({ ok: false, error: diagnostic }, { status: 500 });
  }

  const succeeded = eventType ? eventType === "ACTOR.RUN.SUCCEEDED" : status === "SUCCEEDED";

  if (!succeeded) {
    await supabase
      .from("watch_sources")
      .update({ status: "error", last_error: `Scrape run ${status ?? eventType ?? "unknown"}` })
      .eq("id", sourceId)
      .eq("user_id", userId);

    // A FAILED run that was using a pooled cookie is the signal we have for
    // "this cookie stopped working" — there's no separate health-check, so a
    // failure is treated as a ban until an admin says otherwise in Settings.
    if (cookieId && (status === "FAILED" || eventType === "ACTOR.RUN.FAILED")) {
      const detail = `Run ${body.runId ?? "unknown"} failed while using this cookie.`;
      const { data: cookie } = await supabase
        .from("facebook_cookies")
        .update({ status: "banned", last_error: detail })
        .eq("id", cookieId)
        .select("name")
        .maybeSingle<{ name: string }>();

      try {
        await sendAdminCookieAlert({ cookieName: cookie?.name ?? cookieId, error: detail });
      } catch (cause) {
        console.error("Admin cookie alert email failed", cause);
      }
    }

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

  // normalisePost already drops anything with no text (image/video-only
  // posts) -- the cap applies AFTER that filter, not to the raw scrape, so
  // "up to 5 posts" means 5 posts that actually have text to match against,
  // not 5 raw items where most turn out unusable.
  const posts = items
    .map(normalisePost)
    .filter((post): post is ScrapedPost => post !== null)
    .slice(0, SCAN_RESULTS_LIMIT);

  // reasonById stays empty (→ no matches) if there's nothing to classify or
  // no intent to classify against, rather than guessing.
  const reasonById = new Map<string, string>();
  if (posts.length > 0 && source.intent.trim()) {
    try {
      const results = await matchPostsToIntent(
        source.intent,
        posts.map((p) => ({ id: p.externalId, content: p.content }))
      );
      for (const result of results) {
        if (result.matches) reasonById.set(result.id, result.reason);
      }
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : "AI matching failed";
      await supabase
        .from("watch_sources")
        .update({ status: "error", last_error: detail.slice(0, 500) })
        .eq("id", sourceId);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  const rows = posts
    .filter((post) => reasonById.has(post.externalId))
    .map((post) => ({
      user_id: userId,
      source_id: sourceId,
      platform: source.platform,
      external_id: post.externalId,
      post_url: post.url,
      author_name: post.authorName,
      author_url: post.authorUrl,
      content: post.content,
      match_reason: reasonById.get(post.externalId) ?? null,
      posted_at: post.postedAt,
    }));

  let imported = 0;
  if (rows.length > 0) {
    // ignoreDuplicates leans on the (user_id, platform, external_id) unique
    // index so re-scraping a group never re-alerts on posts already seen —
    // and, since it also skips the row entirely, .select() below only ever
    // returns posts that are genuinely new.
    const { data: inserted, error: upsertError } = await supabase
      .from("leads")
      .upsert(rows, {
        onConflict: "user_id,platform,external_id",
        ignoreDuplicates: true,
      })
      .select("id, content, post_url, author_name, match_reason");

    if (upsertError) {
      await supabase
        .from("watch_sources")
        .update({ status: "error", last_error: upsertError.message.slice(0, 500) })
        .eq("id", sourceId);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    imported = inserted?.length ?? 0;

    if (imported > 0) {
      const { data: destinations } = await supabase
        .from("email_destinations")
        .select("address")
        .eq("user_id", userId)
        .eq("status", "verified")
        .eq("digest", "instant");

      for (const lead of inserted ?? []) {
        for (const destination of destinations ?? []) {
          try {
            await sendLeadAlert({
              to: destination.address,
              sourceName: source.name,
              content: lead.content,
              postUrl: lead.post_url,
              authorName: lead.author_name,
              reason: lead.match_reason ?? "Matches what you're watching for.",
            });
          } catch (cause) {
            // One bad send shouldn't lose the lead or block the rest of the batch.
            console.error("Lead alert email failed", cause);
          }
        }

        await supabase
          .from("leads")
          .update({ notified_at: new Date().toISOString() })
          .eq("id", lead.id);
      }
    }
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
