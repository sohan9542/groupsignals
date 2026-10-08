import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" updated="October 8, 2026">
      <p>
        Every plan starts with a 15-day free trial — you won&apos;t be charged
        until it ends. Cancel anytime during the trial from the Billing page
        and you pay nothing.
      </p>

      <h2>14-day money-back guarantee</h2>
      <p>
        If you are not satisfied after you are charged, you may request a full
        refund within 14 days of the purchase date, or — if you started on a
        free trial — within 14 days of the first paid charge after the trial
        ends. Email{" "}
        <a href="mailto:hello@groupsignal.net">hello@groupsignal.net</a> with
        the email address on your account and we will process the refund.
      </p>
      <p>
        Subscriptions renew monthly through Paddle, our merchant of record.
        After the 14-day refund window, cancelling stops the next renewal but
        does not refund the current billing period, except where required by
        law or in the cases below.
      </p>

      <h2>Billing errors</h2>
      <p>
        If there is a billing error or duplicate charge on our end, email{" "}
        <a href="mailto:hello@groupsignal.net">hello@groupsignal.net</a>{" "}
        and we will correct it, regardless of the 14-day window.
      </p>
    </LegalLayout>
  );
}
