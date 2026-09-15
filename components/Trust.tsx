import { Eye, ShieldCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Point = { icon: LucideIcon; title: string; body: string };

const POINTS: Point[] = [
  {
    icon: Eye,
    title: "Public and private groups, all in one place",
    body: "We monitor both public groups and the private groups you're already a member of — nothing extra to install, just connect the groups you want covered. If a group becomes inaccessible, we tell you in the dashboard instead of quietly returning nothing.",
  },
  {
    icon: ShieldCheck,
    title: "You see who's asking",
    body: "Every alert includes the post, the poster, and the group it came from — so you know exactly who to reply to and where. This is a lead tool, built to get you in front of the homeowner fast.",
  },
  {
    icon: Wallet,
    title: "Leave whenever",
    body: "Cancel from the billing page in two clicks. No notice period, no call, no retention script.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Straight answers"
          title="What we do, and what we won't."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.08}
              className="flex h-full min-w-0 flex-col rounded-2xl border border-fg/8 bg-surface/50 p-6 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-signal/20 bg-signal/10 text-signal-bright">
                <point.icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-fg">
                {point.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ash">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
