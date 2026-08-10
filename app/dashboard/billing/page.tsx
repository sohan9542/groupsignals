import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { BillingActions } from "@/components/BillingActions";
import { offer } from "@/lib/offer";
import { createClient } from "@/lib/supabase/server";
import { SOURCE_LIMIT } from "@/lib/sources";
import type { Subscription } from "@/lib/types";

export const metadata: Metadata = { title: "Billing" };

const INCLUDED = [
  `Up to ${SOURCE_LIMIT} sources watched for you`,
  "Leads delivered to email",
  "Keyword include and exclude rules",
  "Cancel whenever you want",
];

const ACTIVE_STATES = ["active", "trialing", "past_due"];

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard/billing");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle<Subscription>();

  const status = subscription?.status ?? "none";
  const isActive = ACTIVE_STATES.includes(status);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="mt-1.5 text-sm text-ash">Your plan and payment details.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-white/8 bg-surface/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white">
              {isActive ? "Founding plan" : "No active plan"}
            </h2>
            <StatusPill status={status} />
          </div>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight text-white">
              {offer.foundingPrice}
            </span>
            <span className="pb-1.5 text-sm text-ash">/ month</span>
          </div>
          <p className="mt-2 text-sm text-ash-dim">
            Founding rate, locked for as long as you stay. It goes to{" "}
            {offer.listPrice} for anyone joining later.
          </p>

          <ul className="mt-6 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-signal" strokeWidth={2.5} />
                <span className="text-sm text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <BillingActions
              email={user.email ?? ""}
              userId={user.id}
              hasSubscription={isActive}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-surface/50 p-6">
          <h2 className="text-base font-semibold text-white">Details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <Row label="Status" value={humanStatus(status)} />
            <Row
              label="Renews"
              value={
                subscription?.current_period_end
                  ? formatDate(subscription.current_period_end)
                  : "—"
              }
            />
            <Row
              label="Cancels"
              value={subscription?.cancel_at ? formatDate(subscription.cancel_at) : "—"}
            />
            <Row
              label="Subscription ID"
              value={subscription?.paddle_subscription_id ?? "—"}
              mono
            />
          </dl>

          <p className="mt-6 border-t border-white/8 pt-5 text-xs leading-relaxed text-ash-dim">
            Payments are handled by Paddle, who act as the merchant of record.
            Receipts and invoices come from them and include a link to manage
            your card.
          </p>
        </section>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ash-dim">{label}</dt>
      <dd className={`truncate text-right text-white ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-signal/15 text-signal-bright",
    trialing: "bg-signal/15 text-signal-bright",
    past_due: "bg-amber-500/12 text-amber-300",
    paused: "bg-white/8 text-ash",
    canceled: "bg-red-500/12 text-red-300",
    none: "bg-white/8 text-ash",
  };

  return (
    <span
      className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${styles[status] ?? styles.none}`}
    >
      {humanStatus(status)}
    </span>
  );
}

function humanStatus(status: string): string {
  const labels: Record<string, string> = {
    none: "Not subscribed",
    active: "Active",
    trialing: "Trial",
    past_due: "Payment failed",
    paused: "Paused",
    canceled: "Canceled",
  };
  return labels[status] ?? status;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
