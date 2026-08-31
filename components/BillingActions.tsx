"use client";

import { useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Plan } from "@/lib/offer";

export function BillingActions({
  plan,
  email,
  userId,
  isCurrentPlan,
}: {
  plan: Plan;
  email: string;
  userId: string;
  /** True when this is the plan the subscription's price_id already matches
   *  — same button slot, but there's nothing to check out into. */
  isCurrentPlan: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function openCheckout() {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token || !plan.paddlePriceId) {
      setError("This plan isn't set up for checkout yet.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const paddle: Paddle | undefined = await initializePaddle({
        token,
        environment:
          process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production",
      });

      if (!paddle) {
        setError("Couldn't open checkout. Try again.");
        return;
      }

      paddle.Checkout.open({
        items: [{ priceId: plan.paddlePriceId, quantity: 1 }],
        customer: { email },
        // Echoed back on the webhook so we know which account to credit —
        // the browser never gets to assert this on its own.
        customData: { user_id: userId },
      });
    } catch {
      setError("Couldn't open checkout. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (isCurrentPlan) {
    return (
      <span className="inline-flex items-center justify-center rounded-xl border border-signal/30 bg-signal/10 px-4 py-2.5 text-sm font-semibold text-signal-bright">
        Current plan
      </span>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={openCheckout}
        disabled={busy || !plan.paddlePriceId}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-4 py-2.5 text-sm font-semibold text-on-signal transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Opening checkout
          </>
        ) : (
          <>
            Subscribe
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
