"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { offer } from "@/lib/offer";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "What happens after I sign up?",
    a: "You add the groups you want watched and say what a good customer sounds like. Matching posts show up in your dashboard and your inbox.",
  },
  {
    q: "Do I need to be an admin of the groups?",
    a: "No. You just need the group to be public — we don't ask you to grant us anything.",
  },
  {
    q: "Do you need my Facebook login?",
    a: "No, and we won't take it. We only read public groups, so there's nothing to connect.",
  },
  {
    q: "Can you watch private groups?",
    a: "Not today. We read public groups only, and we'll flag it in your dashboard if a group you added turns out to be closed.",
  },
  {
    q: "What about Reddit?",
    a: "You can add subreddits to your watchlist now and they'll start being checked as soon as we switch it on.",
  },
  {
    q: "What does it cost?",
    a: `${offer.foundingPrice} a month while the founding seats last, locked for as long as you stay. It goes to ${offer.listPrice} after that.`,
  },
];

// Collapsed answers are unmounted, so the crawlable copy of every Q&A lives in
// this structured-data block rather than in the accordion markup.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-white/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="The questions people actually ask." />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-surface/40">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="text-[15px] font-medium text-white">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-signal-bright transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-signal/15" : "bg-white/5"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pr-14 text-sm leading-relaxed text-ash">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
