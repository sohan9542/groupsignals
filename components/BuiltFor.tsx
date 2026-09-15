import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function BuiltFor() {
  return (
    <section className="relative border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28">
      <Reveal className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Built for Plumbers, HVAC Techs, and Electricians.
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-ash">
         Works best for home service businesses who want more local jobs — without spending on ads or chasing directory leads.
        </p>

        <a
          href="/login"
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-semibold text-on-signal shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright sm:w-auto sm:px-6"
        >
         Start Monitoring Facebook Groups
          <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
