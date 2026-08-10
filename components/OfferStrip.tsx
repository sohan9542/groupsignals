import { offer } from "@/lib/offer";
import { SOURCE_LIMIT } from "@/lib/sources";
import { Reveal } from "./Reveal";

const FACTS = [
  { value: `${offer.foundingPrice}/mo`, label: "Founding price, locked" },
  { value: `${offer.foundingSeats}`, label: "Founding seats left" },
  { value: `${SOURCE_LIMIT} groups`, label: "Watched per account" },
  { value: "No card", label: "To get started" },
];

export function OfferStrip() {
  return (
    <section className="relative border-y border-white/8 bg-ink-soft/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 divide-white/8 lg:grid-cols-4 lg:divide-x">
          {FACTS.map((fact, i) => (
            // flex-col-reverse keeps the term before its definition in the
            // markup while showing the big number above the label.
            <Reveal
              key={fact.label}
              delay={i * 0.08}
              className="flex flex-col-reverse items-center gap-1.5 px-2 py-8 text-center sm:py-10"
            >
              <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ash-dim">
                {fact.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-signal-bright sm:text-3xl">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
