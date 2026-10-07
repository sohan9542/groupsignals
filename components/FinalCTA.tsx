import { ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/offer";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-signal/20 bg-surface/60 px-5 py-12 text-center sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 signal-glow"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Someone's Asking for a Plumber, Electrician, or HVAC Tech Right Now.
            </h2>
            <p className="mt-4 text-pretty text-base text-ash">
              Add your first group and start catching those posts today.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/login"
                className="group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-semibold text-on-signal shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright sm:w-auto sm:px-6"
              >
                Start Monitoring Facebook Groups
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
