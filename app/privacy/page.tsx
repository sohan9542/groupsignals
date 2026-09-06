import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 6, 2026">
      <p>
        GroupSignal (&quot;we&quot;, &quot;us&quot;) is a brand monitoring and
        market research platform. We track public Facebook group conversations
        against the keywords and topics you define, and alert you when
        something matches. This page explains what we collect and why.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your email address, for account access and mention alerts.</li>
        <li>
          The group URLs and keywords/topics you submit, so we know what to
          monitor and what to match on.
        </li>
        <li>
          Public post content and a link to the post, from the public groups
          you&apos;ve asked us to monitor — aggregated discussion data, not
          the identity of who posted it.
        </li>
        <li>
          Billing details, handled entirely by Paddle (our payment processor
          and merchant of record) — we never see or store your card number.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        Solely to run the service: matching posts against the keywords and
        topics you&apos;re tracking, emailing you mentions, and managing your
        subscription and account. We don&apos;t sell your data or use it for
        advertising.
      </p>

      <h2>We are not a marketing data provider</h2>
      <p>
        GroupSignal does not sell, rent, license, enrich, or otherwise make
        available any data — post content, keywords, account information, or
        anything else collected through the service — to any party as a
        marketing list, contact list, or similar dataset. We surface
        aggregated public discussion data back to the account that requested
        it, and nowhere else.
      </p>

      <h2>Third parties</h2>
      <p>
        We use Paddle for billing, Resend for transactional email, Supabase for
        our database and authentication. Each only receives what it needs to do its job.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your data while your account is active. Delete your account
        and we delete your monitored groups and matched posts within 30 days,
        except where we&apos;re required to keep billing records longer for
        tax or legal reasons.
      </p>

      <h2>Your rights</h2>
      <p>
        Email <a href="mailto:hello@groupsignal.net">hello@groupsignal.net</a>{" "}
        to access, export, or delete your data.
      </p>

      <h2>Changes</h2>
      <p>
        We&apos;ll update the date at the top of this page if this policy
        changes materially.
      </p>
    </LegalLayout>
  );
}
