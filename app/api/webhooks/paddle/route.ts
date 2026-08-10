import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

type PaddleEvent = {
  event_type?: string;
  data?: {
    id?: string;
    status?: string;
    customer_id?: string;
    custom_data?: { user_id?: string } | null;
    items?: { price?: { id?: string } }[];
    current_billing_period?: { ends_at?: string } | null;
    scheduled_change?: { action?: string; effective_at?: string } | null;
  };
};

/**
 * Paddle signs the raw body as `ts:h1` — the digest covers `${ts}:${body}`, so
 * the body must be read as text before any JSON parsing.
 */
function verify(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(";").map((pair) => pair.split("=") as [string, string])
  );
  const ts = parts.ts;
  const received = parts.h1;
  if (!ts || !received) return false;

  const expected = createHmac("sha256", secret)
    .update(`${ts}:${rawBody}`)
    .digest("hex");

  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  // Both are needed to do anything useful; without them fail closed rather
  // than throwing a stack trace out of the service client.
  if (!secret || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const rawBody = await request.text();

  if (!verify(rawBody, request.headers.get("paddle-signature"), secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event: PaddleEvent;
  try {
    event = JSON.parse(rawBody) as PaddleEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!event.event_type?.startsWith("subscription.")) {
    return NextResponse.json({ ok: true, ignored: event.event_type });
  }

  const data = event.data;
  const userId = data?.custom_data?.user_id;

  // Without custom_data we can't tell whose subscription this is. 200 so Paddle
  // stops retrying something no retry will fix.
  if (!userId) {
    return NextResponse.json({ ok: true, ignored: "no user_id in custom_data" });
  }

  const supabase = createServiceClient();

  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      paddle_customer_id: data?.customer_id ?? null,
      paddle_subscription_id: data?.id ?? null,
      status: data?.status ?? "none",
      price_id: data?.items?.[0]?.price?.id ?? null,
      current_period_end: data?.current_billing_period?.ends_at ?? null,
      cancel_at:
        data?.scheduled_change?.action === "cancel"
          ? (data.scheduled_change.effective_at ?? null)
          : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    // 23503 = foreign key violation: the user_id doesn't exist (deleted
    // account, or a hand-made test event). Retrying can never fix that, so
    // acknowledge it instead of leaving Paddle redelivering for days.
    if (error.code === "23503") {
      console.error("[paddle] event for unknown user", userId, event.event_type);
      return NextResponse.json({ ok: true, ignored: "unknown user" });
    }

    // Anything else may well be transient — 500 so Paddle retries, because a
    // dropped event here means the account is left on the wrong plan.
    console.error("[paddle] upsert failed", error.code, error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
