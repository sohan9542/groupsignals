import { ArrowRight, Check } from "lucide-react";
import { offer } from "@/lib/offer";
import { SOURCE_LIMIT } from "@/lib/sources";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const INCLUDED = [
  `Up to ${SOURCE_LIMIT} groups watched for you`,
  "Leads delivered to your inbox",
  "AI matching, in your own words — no keyword lists to maintain",
  `${offer.foundingPrice}/mo locked for as long as you stay`,
  "Cancel whenever you want",
];

export function GetStarted() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-white/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={`${offer.foundingSeats} founding seats. Then this price is gone.`}
          description={`Founding members pay ${offer.foundingPrice}/mo for life. Everyone after that pays ${offer.listPrice}.`}
        />

        <Reveal delay={0.08} className="mx-auto mt-14 max-w-xl">
          <div className="relative rounded-3xl border border-signal/25 bg-surface/70 p-1.5 shadow-[0_0_80px_-40px_var(--color-signal)]">
            <div className="rounded-[1.35rem] bg-ink/70 p-7 sm:p-9">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Founding plan
              </h3>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  {offer.foundingPrice}
                </span>
                <span className="pb-1.5 text-sm text-ash">/ month</span>
              </div>
              <p className="mt-2 text-sm text-ash-dim">
                <span className="line-through">{offer.listPrice}</span> once the
                founding seats are gone.
              </p>

              <ul className="mt-8 space-y-3.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4.5 shrink-0 text-signal"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm leading-relaxed text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/login"
                className="group mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-6 py-4 text-sm font-semibold text-ink shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright"
              >
                Create your account
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="mt-4 text-center text-xs text-ash-dim">
                Sign in with an email link — no password to set up.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-signal/20 bg-signal/[0.06] p-5 text-center">
            <p className="text-sm font-medium text-white sm:text-base">
              One client covers your first{" "}
              <span className="text-signal-bright">year</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
