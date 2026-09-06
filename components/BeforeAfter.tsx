import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const TODAY = [
  "You find the post two days late",
  "The conversation has already moved on",
  "You scroll groups instead of running your business",
];

const WITH_US = [
  "The signal reaches you while it's still relevant",
  "You see it first",
  "You note what matters, and get on with your day",
];

export function BeforeAfter() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why now"
          title="Miss the conversation, miss the moment."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal
            delay={0.05}
            className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-7 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-fg">Today</h3>
            <ul className="mt-6 space-y-4">
              {TODAY.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    className="mt-0.5 size-4.5 shrink-0 text-red-400/80"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm leading-relaxed text-ash">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative overflow-hidden rounded-2xl border border-signal/25 bg-signal/[0.04] p-7 shadow-[0_0_60px_-30px_var(--color-signal)] sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-signal/10 blur-3xl"
            />
            <h3 className="relative text-lg font-semibold text-fg">
              With GroupSignal
            </h3>
            <ul className="relative mt-6 space-y-4">
              {WITH_US.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 size-4.5 shrink-0 text-signal"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm leading-relaxed text-fg/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
