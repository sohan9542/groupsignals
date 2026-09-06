import { Eye, ShieldCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Point = { icon: LucideIcon; title: string; body: string };

const POINTS: Point[] = [
  {
    icon: Eye,
    title: "Public groups only, no login needed",
    body: "We only read public Facebook groups — nothing to connect, nothing to install, no login required. If a group turns out to be closed, we tell you in the dashboard instead of quietly returning nothing.",
  },
  {
    icon: ShieldCheck,
    title: "No personal data collected",
    body: "We track keywords and conversation trends, not who's posting. No names, no profile links, no contact lists — this is a research tool, not a lead database.",
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

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.08}
              className="flex h-full flex-col rounded-2xl border border-fg/8 bg-surface/50 p-7"
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
