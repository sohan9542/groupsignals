import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    title: "Tell us your groups",
    body: "And what a good customer sounds like when they post.",
  },
  {
    title: "We watch them",
    body: "Every day, so you don't have to open Facebook.",
  },
  {
    title: "You reply first",
    body: "The lead lands in your inbox while it's still open.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-white/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How it works" title="Three things happen." />

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-3">
          {/* Connector rail sits behind the numbered nodes on wide screens. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[3.5rem] hidden h-px bg-gradient-to-r from-transparent via-signal/25 to-transparent lg:block"
          />

          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 0.1}
              className="relative rounded-2xl border border-white/8 bg-surface/60 p-7 text-center lg:text-left"
            >
              <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-xl border border-signal/25 bg-ink text-lg font-semibold text-signal-bright shadow-[0_0_28px_-10px_var(--color-signal)] lg:mx-0">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ash">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
