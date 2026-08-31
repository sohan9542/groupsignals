import { Eye, MessagesSquare, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

type Reason = { icon: LucideIcon; title: string; body: string };

const REASONS: Reason[] = [
  {
    icon: Eye,
    title: "High intent",
    body: "They already have a problem and are actively looking for someone to hire.",
  },
  {
    icon: Timer,
    title: "Time sensitive",
    body: "Recommendations start arriving quickly, and the first credible reply gets the attention.",
  },
  {
    icon: MessagesSquare,
    title: "Easy to miss",
    body: "You're running jobs and answering the phone — not scrolling ten Facebook groups a day.",
  },
];

export function WhyThisWorks() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <span className="inline-block rounded-full border border-fg/10 bg-fg/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal-bright">
            Why this works
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Why{" "}
            <span className="font-display italic font-medium text-signal-bright">
              this
            </span>{" "}
            works
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ash">
            Homeowners use Facebook groups when they need someone they can
            trust. They ask who can fix the AC, stop a leak, replace a roof,
            or quote a project. These posts carry real buying intent, and
            they move fast — by the time someone checks the thread, the
            homeowner may already have a list of companies to call.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-fg/8 bg-surface p-2">
          <ul className="divide-y divide-fg/8">
            {REASONS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex gap-4 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-signal/10 text-xs font-bold text-signal-bright">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <Icon className="size-4 text-signal" strokeWidth={2} />
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="m-3 rounded-xl bg-signal/8 p-4">
            <p className="text-sm font-semibold leading-relaxed text-fg">
              We watch these groups for you and email you the moment a post
              matches what you&apos;re looking for — so you can be the first
              reply, not the fifth.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
