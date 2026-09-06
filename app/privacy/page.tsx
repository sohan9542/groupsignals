import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 5, 2026">
      <p>
        GroupSignal (&quot;we&quot;, &quot;us&quot;) monitors Facebook groups you
        choose to watch and sends you posts that match what you&apos;re looking
        for. This page explains what we collect and why.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your email address, for account access and mention alerts.</li>
        <li>
          The group URLs and keywords/intent you submit, so we know what to
          watch and what to match on.
        </li>
        <li>
          Posts and comments from the groups you&apos;re watching, and the
          public profile info attached to them (name, profile link) — only
          from groups you&apos;ve asked us to monitor.
        </li>
        <li>
          Billing details, handled entirely by Paddle (our payment processor
          and merchant of record) — we never see or store your card number.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        Solely to run the service: matching posts against your intent, emailing
        you mentions, and managing your subscription and account. We don&apos;t
        sell your data or use it for advertising.
      </p>

      <h2>Third parties</h2>
      <p>
        We use Paddle for billing, Resend for transactional email, Supabase for
        our database and authentication. Each only receives what it needs to do its job.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your data while your account is active. Delete your account and
        we delete your watched groups, matched posts, and personal info within
        30 days, except where we&apos;re required to keep billing records
        longer for tax or legal reasons.
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
