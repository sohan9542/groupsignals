import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseIntent, parseSourceUrl } from "@/lib/sources";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import { groupLimitForSubscription } from "@/lib/offer";
import type { Subscription, WatchSource } from "@/lib/types";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { url?: unknown; intent?: unknown; requiresLogin?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.url !== "string") {
    return NextResponse.json({ ok: false, error: "Paste a link first." }, { status: 400 });
  }

  const parsedUrl = parseSourceUrl(body.url);
  if ("error" in parsedUrl) {
    return NextResponse.json({ ok: false, error: parsedUrl.error }, { status: 400 });
  }

  const parsedIntent = parseIntent(typeof body.intent === "string" ? body.intent : "");
  if ("error" in parsedIntent) {
    return NextResponse.json({ ok: false, error: parsedIntent.error }, { status: 400 });
  }

  // Reddit has no login-gated mode, and a not-yet-implemented platform
  // sending requiresLogin would silently create a source we can never scan.
  const requiresLogin = body.requiresLogin === true && parsedUrl.platform === "facebook";

  // No pool-existence check here anymore — a private group is always
  // submittable. It just won't scan (clear last_error via startScanForSource
  // below) until an admin assigns it a specific account on the private-groups
  // admin page; pool size doesn't say anything about *this* group's assignment.

  // A card is required before any group can be watched at all — no
  // subscription means a group limit of zero, not a free tier.
  const { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .select("status, price_id")
    .eq("user_id", user.id)
    .maybeSingle<Pick<Subscription, "status" | "price_id">>();

  if (subError) {
    return NextResponse.json({ ok: false, error: subError.message }, { status: 500 });
  }

  const groupLimit = groupLimitForSubscription(subscription);

  if (groupLimit === 0) {
    return NextResponse.json(
      { ok: false, error: "Subscribe to a plan first — see the Billing page." },
      { status: 402 }
    );
  }

  // Checked here rather than in the DB so the message can name the limit.
  const { count, error: countError } = await supabase
    .from("watch_sources")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (countError) {
    return NextResponse.json({ ok: false, error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) >= groupLimit) {
    return NextResponse.json(
      {
        ok: false,
        error: `Your plan covers ${groupLimit} group${groupLimit === 1 ? "" : "s"}. Upgrade on the Billing page to add more.`,
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("watch_sources")
    .insert({
      user_id: user.id,
      platform: parsedUrl.platform,
      url: parsedUrl.url,
      name: parsedUrl.name,
      requires_login: requiresLogin,
      intent: parsedIntent.intent,
    })
    .select()
    .single<WatchSource>();

  if (error) {
    // 23505 = unique_violation on (user_id, url).
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "You're already watching that one." },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Best-effort instant first scan — a brand-new source has no last_run_at,
  // so this naturally pulls the latest few posts with no onlyPostsNewerThan
  // filter, same as the very first scan always has. Creating the source must
  // still succeed even if this fails or scanning isn't configured (e.g.
  // local dev without APIFY_TOKEN); the failure just lands on the source's
  // own status/last_error, exactly like any other scan attempt.
  const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
  if (process.env.APIFY_TOKEN && webhookSecret) {
    const webhook = resolveWebhookUrl(request.url);
    if (webhook.ok) {
      try {
        await startScanForSource(data, webhook.url, webhookSecret);
      } catch (cause) {
        console.error("Instant scan on source creation failed", cause);
      }
    }
  }

  return NextResponse.json({ ok: true, source: data });
}
