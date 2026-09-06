import { ArrowRight, Facebook, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/* Illustrative example posts — not real people or real groups, just the kind
 * of conversation GroupSignal catches. We don't surface poster identity, so
 * there's no name bar to blur here, only the group and the content. */
const EXAMPLES = [
  {
    tag: "PRODUCT MENTION",
    category: "SaaS · Analytics",
    group: "SaaS Growth Founders",
    text: "Switched to a new analytics tool last week — way better onboarding than what we were using. Anyone else made the jump recently?",
  },
  {
    tag: "COMPETITOR MENTION",
    category: "E-commerce · Tooling",
    group: "E-commerce Operators Hub",
    text: "Comparing a few inventory platforms right now. Heard mixed things about the market leader lately — anyone had support issues?",
  },
  {
    tag: "SENTIMENT SIGNAL",
    category: "Productivity · Remote work",
    group: "Remote Work Community",
    text: "Really happy with the latest update from that project management app — finally fixed the notification bugs everyone complained about.",
  },
];

const STEPS = [
  { title: "Someone posts", body: "A conversation like this shows up in a channel you're monitoring." },
  { title: "We catch it fast", body: "GroupSignal matches it against what you're tracking and alerts you the moment it's found." },
  { title: "You see it first", body: "Review the trend and log what's worth tracking, before it scrolls past everyone else." },
];

export function RecentRequests() {
  return (
    <section className="relative border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What lands in your inbox"
          title="Real conversations, straight from Facebook groups."
          description="This is the kind of post GroupSignal catches for you — relevant, easy to miss, gone in a day."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {EXAMPLES.map((example, i) => (
            <Reveal
              key={example.tag}
              delay={i * 0.08}
              className="flex h-full flex-col rounded-2xl border border-fg/8 bg-surface p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fg/8 text-ash-dim">
                    <Users className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="block h-2.5 w-24 rounded-full bg-fg/10" aria-hidden />
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

              <div className="mt-5 flex items-center gap-2 border-t border-fg/8 pt-4 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-signal-bright">
                  <span className="size-1.5 rounded-full bg-signal" />
                  {example.tag}
                </span>
                <span className="text-ash-dim">·</span>
                <span className="text-ash-dim">{example.category}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.15}
          className="mt-8 rounded-2xl border border-fg/8 bg-surface/60 p-4 sm:p-5"
        >
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col items-stretch gap-2 sm:flex-1 sm:flex-row sm:items-center sm:gap-3">
                {i > 0 && (
                  <ArrowRight className="mx-auto size-4 shrink-0 rotate-90 text-ash-dim sm:rotate-0" />
                )}
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-ink-soft px-4 py-3.5 sm:px-5">
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
