import { ArrowRight, Facebook, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/* Illustrative example posts — not real people or real groups, just the kind
 * of conversation GroupSignal catches. We don't surface poster identity, so
 * there's no name bar to blur here, only the group and the content. */
const EXAMPLES = [
  {
    tag: "SERVICE REQUEST",
    category: "Plumbing · Urgent",
    group: "Springfield Homeowners Group",
    text: "Does anyone know a reliable plumber? Our water heater died this morning and we need someone today.",
  },
  {
    tag: "SERVICE REQUEST",
    category: "HVAC · Repair",
    group: "Oakwood Neighbors",
    text: "AC hasn't been cooling right for two days. Any HVAC recommendations that won't take a week to show up?",
  },
  {
    tag: "SERVICE REQUEST",
    category: "Electrical · Recommendation",
    group: "Maple Ridge Community",
    text: "Need an electrician to look at a breaker that keeps tripping. Anyone trustworthy they've used before?",
  },
];

const STEPS = [
  { title: "Someone posts", body: "A homeowner asks for help in a group you're monitoring." },
  { title: "We catch it fast", body: "GroupSignal matches it against your trade and service area, and alerts you the moment it's posted." },
  { title: "You reply first", body: "You respond before anyone else — and win the job." },
];
export function RecentRequests() {
  return (
    <section className="relative border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What lands in your inbox"
          title="Real Requests, Straight from Facebook Groups."
          description="This is the kind of post GroupSignal catches for you — a homeowner needs help right now, and the post is gone from the feed within hours."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((example, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="flex h-full min-w-0 flex-col rounded-2xl border border-fg/8 bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fg/8 text-ash-dim">
                    <Users className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="block h-2.5 w-24 max-w-full rounded-full bg-fg/10" aria-hidden />
                    <p className="mt-1.5 truncate text-xs text-ash-dim">{example.group}</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#1877F2]/10 px-2 py-1 text-[11px] font-semibold text-[#1877F2]">
                  <Facebook className="size-3" />
                  Facebook
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-fg/90">
                &ldquo;{example.text}&rdquo;
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-fg/8 pt-4 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-signal-bright">
                  <span className="size-1.5 shrink-0 rounded-full bg-signal" />
                  {example.tag}
                </span>
                <span className="text-ash-dim" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 text-ash-dim">{example.category}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.15}
          className="mt-8 rounded-2xl border border-fg/8 bg-surface/60 p-4 sm:p-5"
        >
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-stretch gap-2 lg:min-w-0 lg:flex-1 lg:flex-row lg:items-center lg:gap-3"
              >
                {i > 0 && (
                  <ArrowRight className="mx-auto size-4 shrink-0 rotate-90 text-ash-dim lg:rotate-0" />
                )}
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-ink-soft px-4 py-3.5 sm:px-5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-signal/15 text-xs font-bold text-signal-bright">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-fg">{step.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-ash-dim">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
