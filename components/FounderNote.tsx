import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";

/* This sits in the spot a testimonials section would normally occupy. We
 * don't have paying customers yet, so there's nothing to quote them saying —
 * inventing a name and a five-star quote here would be exactly the kind of
 * fake social proof this page is implicitly promising a homeowner's lead
 * isn't. Honest placeholder instead: what the product actually commits to. */
export function FounderNote() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Quote className="mx-auto size-8 text-signal/40" strokeWidth={1.5} />
          <p className="mt-6 text-balance font-display text-2xl italic font-medium leading-snug text-fg sm:text-3xl">
            We built this to watch the groups our friends in the trades didn't have time to check themselves. That's still all it does.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-ash-dim">
            Why we built GroupSignal
          </p>
        </Reveal>
      </div>
    </section>
  );
}
