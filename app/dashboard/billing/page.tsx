import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { BillingActions } from "@/components/BillingActions";
import { ACTIVE_SUBSCRIPTION_STATUSES, PLANS, planForPriceId } from "@/lib/offer";
import { createClient } from "@/lib/supabase/server";
import type { Subscription } from "@/lib/types";

export const metadata: Metadata = { title: "Billing" };

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
  const isActive = ACTIVE_SUBSCRIPTION_STATUSES.includes(status);
  const currentPlan = isActive ? planForPriceId(subscription?.price_id) : null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="mt-1.5 text-sm text-ash">
          Pick a plan by how many groups you need watched.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrentPlan = currentPlan?.id === plan.id;
          return (
            <section
              key={plan.id}
              className={`rounded-2xl border p-6 ${
                isCurrentPlan ? "border-signal/40 bg-signal/5" : "border-fg/8 bg-surface/50"
              }`}
            >
              <h2 className="text-base font-semibold text-fg">{plan.name}</h2>
              <div className="mt-4 flex items-end gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-fg">{plan.price}</span>
                <span className="pb-1 text-sm text-ash">/ month</span>
              </div>
              <p className="mt-1.5 text-sm text-ash-dim">
                {plan.groupLimit} group{plan.groupLimit === 1 ? "" : "s"} watched
              </p>

              <ul className="mt-5 space-y-2.5">
                {[
                  `Up to ${plan.groupLimit} group${plan.groupLimit === 1 ? "" : "s"} watched for you`,
                  "Relevant conversations delivered to your inbox",
                  "AI matching, in your own words",
                  "Cancel whenever you want",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-signal" strokeWidth={2.5} />
                    <span className="text-sm text-fg/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <BillingActions
                  plan={plan}
                  email={user.email ?? ""}
                  userId={user.id}
                  isCurrentPlan={isCurrentPlan}
                />
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-fg/8 bg-surface/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-fg">Your subscription</h2>
            <StatusPill status={status} />
          </div>
          <p className="mt-3 text-sm text-ash">
            {currentPlan
              ? `On the ${currentPlan.name} plan — ${currentPlan.price}/mo, ${currentPlan.groupLimit} group${currentPlan.groupLimit === 1 ? "" : "s"}.`
              : "No active plan — pick one above to start watching groups."}
          </p>

          {isActive && (
            <p className="mt-4 text-sm text-ash">
              Need to change your card, download an invoice, or cancel? Use the
              link in any Paddle receipt email, or{" "}
              <a
                href="mailto:billing@groupsignals.com"
                className="text-signal-bright underline underline-offset-4"
              >
                email us
              </a>{" "}
              and we&apos;ll sort it.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-fg/8 bg-surface/50 p-6">
          <h2 className="text-base font-semibold text-fg">Details</h2>
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

          <p className="mt-6 border-t border-fg/8 pt-5 text-xs leading-relaxed text-ash-dim">
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
      <dd className={`truncate text-right text-fg ${mono ? "font-mono text-xs" : ""}`}>
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
    paused: "bg-fg/8 text-ash",
    canceled: "bg-red-500/12 text-red-300",
    none: "bg-fg/8 text-ash",
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
