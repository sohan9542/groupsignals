import { Filter, Inbox, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Item = { icon: LucideIcon; title: string; body: string };

const ITEMS: Item[] = [
  {
    icon: Target,
    title: "Service matching",
    body: "We match new posts against your trade and service area — no keyword lists to set up, just tell us what you do.",
  },
  {
    icon: Inbox,
    title: "Real-time job alerts",
    body: "Get a text or email the second someone posts. Open it, see the request, and reply — before anyone else does.",
  },
  {
    icon: Filter,
    title: "Monitor every group that matters",
    body: "Tell us which local groups to watch. We check them around the clock so you don't have to.",
  },
];

export function WhatYouGet() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Service Alerts, Real-Time Notifications, Zero Manual Scrolling."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              as="article"
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-fg/8 bg-surface/50 p-6 transition-colors duration-300 hover:border-signal/30 hover:bg-surface sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-signal/20 bg-signal/10 text-signal-bright transition-transform duration-300 group-hover:scale-105">
                <item.icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-base font-semibold leading-snug text-fg">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ash">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
