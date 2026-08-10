"use client";

import { useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { ArrowRight, Loader2 } from "lucide-react";
import { offer } from "@/lib/offer";

export function BillingActions({
  email,
  userId,
  hasSubscription,
}: {
  email: string;
  userId: string;
  hasSubscription: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function openCheckout() {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

    if (!token || !priceId) {
      setError("Billing isn't configured on this environment yet.");
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
        items: [{ priceId, quantity: 1 }],
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

  if (hasSubscription) {
    return (
      <p className="text-sm text-ash">
        Need to change your card, download an invoice, or cancel? Use the link in
        any Paddle receipt email, or{" "}
        <a
          href="mailto:billing@groupsignals.com"
          className="text-signal-bright underline underline-offset-4"
        >
          email us
        </a>{" "}
        and we&apos;ll sort it.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={openCheckout}
        disabled={busy}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-signal-bright disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Opening checkout
          </>
        ) : (
          <>
            Start the {offer.foundingPrice}/mo founding plan
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
