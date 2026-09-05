import { Filter, Inbox, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Item = { icon: LucideIcon; title: string; body: string };

const ITEMS: Item[] = [
  {
    icon: Target,
    title: "Only the posts worth your time",
    body: "Real conversations relevant to your business. Not the spam, not the noise.",
  },
  {
    icon: Inbox,
    title: "Sent where you already look",
    body: "Email or Slack. You open it, you read the post, you decide what to do.",
  },
  {
    icon: Filter,
    title: "Your groups, your definition of a signal",
    body: "You tell us which groups matter and what a relevant conversation sounds like. We handle the watching.",
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What you get"
          title="Relevant conversations in your inbox. That's the whole product."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              as="article"
              className="group flex h-full flex-col rounded-2xl border border-fg/8 bg-surface/50 p-7 transition-colors duration-300 hover:border-signal/30 hover:bg-surface"
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
