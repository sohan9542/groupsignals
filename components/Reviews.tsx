import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Review = {
  quote: string;
  name: string;
  detail: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "I got an alert about a water heater post while I was still on a job across town. Replied from the truck, booked the install that afternoon. Used to miss half of those because I only checked groups at night.",
    name: "Mike R.",
    detail: "Ace Plumbing — Springfield",
  },
  {
    quote:
      "Summer AC calls used to go to whoever happened to be scrolling. Now the alert hits my phone and I'm usually one of the first three replies. Not every post turns into a job, but enough do that the subscription feels like a no-brainer.",
    name: "Derek H.",
    detail: "CoolAir HVAC — Columbus",
  },
  {
    quote:
      "Panel upgrades and \"who do you use for electrical\" posts show up a lot in our neighborhood groups. GroupSignal catches the ones that actually need work done, so I'm not wasting time on people just venting about their bill.",
    name: "Luis M.",
    detail: "Brightline Electric — Austin",
  },
  {
    quote:
      "We run plumbing and a little HVAC out of the same shop. Having one place watching our Facebook groups means the guys in the field aren't hunting for leads between stops. First week we booked two jobs off posts we would've scrolled past.",
    name: "Sandra K.",
    detail: "Owner, Kline Home Services — Tulsa",
  },
  {
    quote:
      "Honestly I was skeptical. But last month a homeowner asked for a plumber for a slab leak at 9am and I was on it by 9:12. That job alone covered a few months of the plan.",
    name: "Tony P.",
    detail: "Phelps Plumbing Co. — Raleigh",
  },
  {
    quote:
      "Between service calls I don't have time to refresh ten groups. The emails are short — post, who asked, which group — and I reply when I can. Won a furnace swap that way last winter that I never would've seen otherwise.",
    name: "Chris W.",
    detail: "Northwest Comfort — Boise",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-signal-bright" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="From the field"
          title="What contractors say once the alerts start landing."
          description="A few notes from plumbers, HVAC techs, and electricians using GroupSignal to catch local Facebook group requests."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal
              key={review.name}
              delay={i * 0.06}
              as="article"
              className="flex h-full flex-col rounded-2xl border border-fg/8 bg-surface/50 p-7"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ash">
                “{review.quote}”
              </blockquote>
              <footer className="mt-6 border-t border-fg/8 pt-5">
                <p className="text-sm font-semibold text-fg">{review.name}</p>
                <p className="mt-0.5 text-xs text-ash-dim">{review.detail}</p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
