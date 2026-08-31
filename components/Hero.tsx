"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <motion.h1
              {...rise(0)}
              className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            >
              Your next client is{" "}
              <span className="text-gradient font-display italic font-medium">
                posting right now
              </span>{" "}
              in a Facebook group.
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 text-pretty text-base leading-relaxed text-ash sm:text-lg"
            >
              We watch local Facebook groups for homeowners asking for a
              company like yours, and email you the moment they post. Add a
              group, tell us what a good job looks like, and check your inbox.
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-on-signal shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright hover:shadow-[0_0_48px_-4px_var(--color-signal)]"
              >
                Start watching your groups
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#what-you-get"
                className="inline-flex items-center justify-center rounded-xl border border-fg/12 bg-fg/5 px-6 py-3.5 text-sm font-semibold text-fg transition hover:border-fg/25 hover:bg-fg/10"
              >
                What you get
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LeadAlertCard reduceMotion={Boolean(reduceMotion)} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadAlertCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-signal/12 blur-3xl"
      />

      {/* No backdrop-filter here on purpose: blurring a backdrop while the
          element moves forces a re-rasterize every frame, which is what made
          this card stutter. Over an opaque hero it looked identical anyway. */}
      <div className="relative rounded-2xl border border-fg/10 bg-surface/80 p-1.5 shadow-2xl shadow-black/10 animate-float">
        <div className="rounded-[0.85rem] bg-ink-soft p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-md bg-signal/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-signal-bright">
              <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
              New lead
            </span>
            <span className="shrink-0 text-[11px] text-ash-dim">Just now</span>
          </div>

          <p className="mt-4 text-xs text-ash-dim">
            Local Neighbors &amp; Homeowners
          </p>

          <blockquote className="mt-3 rounded-xl border border-fg/8 bg-fg/[0.03] p-4 text-sm leading-relaxed text-fg/90">
            &ldquo;AC stopped blowing cold air, need someone out this week.
            Anyone have a reliable HVAC company they trust?&rdquo;
          </blockquote>

          <button
            type="button"
            className="mt-5 w-full rounded-xl border border-signal/30 bg-signal/10 py-3 text-sm font-semibold text-signal-bright transition hover:bg-signal/20"
          >
            Reply to this post
          </button>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute -bottom-7 -left-7 hidden items-center gap-2.5 rounded-xl border border-fg/10 bg-surface px-3.5 py-2.5 shadow-xl shadow-black/10 sm:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-signal/15">
          <Check className="size-3.5 text-signal-bright" strokeWidth={3} />
        </span>
        <span className="text-xs font-semibold text-fg">
          Sent to your inbox
        </span>
      </motion.div>
    </div>
  );
}
