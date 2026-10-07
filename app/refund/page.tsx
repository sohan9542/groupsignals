import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" updated="September 6, 2026">
      <p>
        Every plan starts with a 15-day free trial — you won&apos;t be charged
        until it ends. Cancel anytime during the trial from the Billing page
        and you pay nothing.
      </p>

      <h2>All sales are final</h2>
      <p>
        Because you get 15 days to try GroupSignal before any charge, payments
        are non-refundable once the trial ends and your card is billed.
        Subscriptions renew monthly through Paddle, our merchant of record;
        cancelling stops the next renewal but doesn&apos;t refund the current
        billing period.
      </p>

      <h2>Exceptions</h2>
      <p>
        The one case we&apos;ll still make right: a billing error or duplicate
        charge on our end. Email{" "}
        <a href="mailto:hello@groupsignal.net">hello@groupsignal.net</a>{" "}
        and we&apos;ll fix it.
      </p>
    </LegalLayout>
  );
}
