import type { Metadata } from "next";
import { PLANS } from "@/lib/offer";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="September 5, 2026">
      <p>
        These terms govern your use of GroupSignal. By creating an account or
        subscribing, you agree to them.
      </p>

      <h2>The service</h2>
      <p>
        GroupSignal watches Facebook groups you point it at and emails you
        posts that match the intent you describe. Plans start at{" "}
        {PLANS[0].price}/mo, billed monthly through Paddle, our merchant of
        record, after a 15-day free trial. Cancel anytime during the trial
        and you&apos;re not charged; cancel after and you keep access through
        the current billing period. See our{" "}
        <a href="/refund">Refund Policy</a> for details — payments are
        non-refundable once the trial ends.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>
          You&apos;re responsible for how you use the leads we surface —
          outreach must comply with the platform&apos;s rules and applicable
          law (e.g. anti-spam regulations).
        </li>
        <li>
          Private-group monitoring uses a login-gated account you don&apos;t
          control; we assign it, but you&apos;re still bound by Facebook&apos;s
          terms for any group you ask us to watch.
        </li>
        <li>Don&apos;t share your account, and keep your login link private.</li>
      </ul>

      <h2>No guarantee of results</h2>
      <p>
        We surface posts that match your stated intent as best our scanning
        and matching can — we don&apos;t guarantee a minimum number of leads,
        that every matching post will be caught, or that scanning a group
        won&apos;t occasionally fail (a stale login, a rate limit, a group
        going private). We flag scan errors in the dashboard when they happen.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate accounts that abuse the service, violate
        these terms, or use it for anything unlawful. You can close your
        account at any time.
      </p>

      <h2>Liability</h2>
      <p>
        The service is provided &quot;as is.&quot; To the extent permitted by
        law, we&apos;re not liable for indirect or consequential damages
        arising from your use of it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:hello@groupsignal.net">hello@groupsignal.net</a>.
      </p>
    </LegalLayout>
  );
}
