/**
 * The three plans the product actually sells. Landing page, billing page, and
 * checkout buttons all read from here so a price or limit change can't leave
 * two pages disagreeing with each other in front of a customer.
 *
 * Each plan's Paddle price id comes from its own env var — set it once you've
 * created the corresponding price in the Paddle dashboard. A plan with no id
 * configured yet still displays, its checkout button just stays disabled.
 */
export type PlanId = "starter" | "growth" | "scale";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  priceValue: number;
  groupLimit: number;
  paddlePriceId: string | undefined;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$79",
    priceValue: 79,
    groupLimit: 1,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_STARTER,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$139",
    priceValue: 139,
    groupLimit: 5,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_GROWTH,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$199",
    priceValue: 199,
    groupLimit: 10,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_SCALE,
  },
];

/** Statuses that mean "this subscription is actually paying" — a canceled or
 *  never-started one gives no group allowance. past_due still counts: Paddle
 *  is mid-retry on the card, not yet treating it as failed. */
export const ACTIVE_SUBSCRIPTION_STATUSES = ["active", "trialing", "past_due"];

export function planForPriceId(priceId: string | null | undefined): Plan | null {
  if (!priceId) return null;
  return PLANS.find((p) => p.paddlePriceId === priceId) ?? null;
}

/**
 * How many groups this subscription is allowed to watch. No subscription (or
 * an inactive one) is zero, not a free tier — a card is required before any
 * group can be added at all.
 */
export function groupLimitForSubscription(
  sub: { status: string; price_id: string | null } | null | undefined
): number {
  if (!sub || !ACTIVE_SUBSCRIPTION_STATUSES.includes(sub.status)) return 0;
  return planForPriceId(sub.price_id)?.groupLimit ?? 0;
}
