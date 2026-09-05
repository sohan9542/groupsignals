import { ArrowRight, Check } from "lucide-react";
import { PLANS } from "@/lib/offer";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const INCLUDED = [
  "15 days free trial",
  "Relevant conversations delivered to your inbox",
  "AI matching, in your own words — no keyword lists to maintain",
  "Cancel whenever you want",
];

export function GetStarted() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Pick a plan by how many groups you need watched."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const featured = i === 1;
            return (
              <Reveal
                key={plan.id}
                delay={i * 0.08}
                className={`relative rounded-3xl border p-1.5 ${
                  featured
                    ? "border-signal/25 bg-surface/70 shadow-[0_0_80px_-40px_var(--color-signal)]"
                    : "border-fg/8 bg-surface/50"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-on-signal">
                    Most popular
                  </span>
                )}
                <div className="rounded-[1.35rem] bg-ink/70 p-6 sm:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-ash-dim">
                    {plan.groupLimit} group{plan.groupLimit === 1 ? "" : "s"} watched
                  </p>

                  <div className="mt-4 flex items-end gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-fg">
                      {plan.price}
                    </span>
                    <span className="pb-1 text-sm text-ash">/ month</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    <li className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" strokeWidth={2.5} />
                      <span className="text-sm leading-relaxed text-fg/90">
                        Up to {plan.groupLimit} group{plan.groupLimit === 1 ? "" : "s"} watched for you
                      </span>
                    </li>
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-signal" strokeWidth={2.5} />
                        <span className="text-sm leading-relaxed text-fg/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/login"
                    className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-on-signal transition hover:bg-signal-bright"
                  >
                    Get started
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ash-dim">
          Sign in with an email link, then add your card on the billing page.
        </p>
      </div>
    </section>
  );
}
