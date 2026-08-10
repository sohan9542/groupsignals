import { ArrowRight } from "lucide-react";
import { offer } from "@/lib/offer";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-signal/20 bg-surface/60 px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 signal-glow"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Someone in your groups is asking for you right now.
            </h2>
            <p className="mt-4 text-pretty text-base text-ash">
              Add your first group and find out. {offer.foundingPrice}/mo while
              the founding seats last.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright"
              >
                Start watching your groups
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
