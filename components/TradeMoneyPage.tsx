"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Facebook,
  Plus,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { GetStarted } from "@/components/GetStarted";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type {
  SeoArticleSection,
  SeoFaq,
  SeoPageData,
} from "@/lib/seo-page-types";

export function TradeMoneyPage({ data }: { data: SeoPageData }) {
  return (
    <main>
      <TradeHero data={data} />
      <ProofStrip proof={data.proof} />
      <ProblemSection problem={data.problem} />
      <HowItWorks how={data.howItWorks} />
      <MatchesSection matches={data.matches} />
      <WhyTable why={data.why} />
      <ArticleBody sections={data.article} />
      <section id="pricing-note" className="relative pt-4">
        <p className="mx-auto max-w-2xl px-5 text-center text-sm leading-relaxed text-ash sm:px-8">
          {data.pricingNote}
        </p>
      </section>
      <GetStarted />
      <TradeFaq faqs={data.faqs} />
      <GuidesAndRelated data={data} />
      <CloseCta close={data.close} />
    </main>
  );
}

function TradeHero({ data }: { data: SeoPageData }) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <motion.p
              {...rise(0)}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-signal-bright"
            >
              GroupSignal · {data.pageLabel}
            </motion.p>
            <motion.h1
              {...rise(0.08)}
              className="mt-4 text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              {data.hero.h1}
            </motion.h1>
            <motion.p
              {...rise(0.16)}
              className="mt-6 text-pretty text-base leading-relaxed text-ash sm:text-lg"
            >
              {data.hero.body}
            </motion.p>
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-on-signal shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright hover:shadow-[0_0_48px_-4px_var(--color-signal)]"
              >
                {data.hero.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl border border-fg/12 bg-fg/5 px-6 py-3.5 text-sm font-semibold text-fg transition hover:border-fg/25 hover:bg-fg/10"
              >
                See pricing
              </a>
            </motion.div>
            <motion.p
              {...rise(0.3)}
              className="mt-4 text-sm text-ash-dim"
            >
              {data.hero.ctaNote}
            </motion.p>
          </div>

          <motion.div
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 32, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <LeadProofCard proof={data.proof} reduceMotion={Boolean(reduceMotion)} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadProofCard({
  proof,
  reduceMotion,
}: {
  proof: SeoPageData["proof"];
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-signal/12 blur-3xl"
      />
      <div className="relative rounded-2xl border border-fg/10 bg-surface/80 p-1.5 shadow-2xl shadow-black/10 animate-float">
        <div className="rounded-[0.85rem] bg-ink-soft p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-md bg-signal/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-signal-bright">
              <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
              New mention
            </span>
            <span className="shrink-0 text-[11px] text-ash-dim">Just now</span>
          </div>
          <p className="mt-4 text-xs text-ash-dim">{proof.group}</p>
          <blockquote className="mt-3 rounded-xl border border-fg/8 bg-fg/[0.03] p-4 text-sm leading-relaxed text-fg/90">
            &ldquo;{proof.quote}&rdquo;
          </blockquote>
          <a
            href="/login"
            className="mt-5 flex w-full items-center justify-center rounded-xl border border-signal/30 bg-signal/10 py-3 text-sm font-semibold text-signal-bright transition hover:bg-signal/20"
          >
            Reply Now
          </a>
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
        <span className="text-xs font-semibold text-fg">Sent to your email</span>
      </motion.div>
    </div>
  );
}

function ProofStrip({ proof }: { proof: SeoPageData["proof"] }) {
  return (
    <section className="relative border-y border-fg/8 bg-ink-soft/50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="overflow-hidden rounded-2xl border border-fg/8 bg-surface p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-fg/8 text-ash-dim">
                <Users className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-fg">
                  {proof.group}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ash-dim">
                  <span className="font-semibold text-signal-bright">
                    {proof.tag}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{proof.category}</span>
                </div>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-[#1877F2]/10 px-2.5 py-1 text-[11px] font-semibold text-[#1877F2]">
              <Facebook className="size-3" />
              Facebook
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-fg/90 sm:text-[15px]">
            &ldquo;{proof.quote}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProblemSection({
  problem,
}: {
  problem: SeoPageData["problem"];
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          description={problem.intro}
        />
        <ul className="mx-auto mt-12 max-w-3xl space-y-3">
          {problem.bullets.map((bullet, i) => (
            <Reveal
              key={bullet}
              delay={i * 0.05}
              as="li"
              className="flex gap-3 rounded-2xl border border-fg/8 bg-surface/50 px-5 py-4"
            >
              <X
                className="mt-0.5 size-4 shrink-0 text-red-400/80"
                strokeWidth={2.5}
              />
              <span className="text-sm leading-relaxed text-ash">{bullet}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks({ how }: { how: SeoPageData["howItWorks"] }) {
  return (
    <section
      id="features"
      className="relative border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={how.title}
          description={how.description}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {how.steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.07}
              as="article"
              className="rounded-2xl border border-fg/8 bg-surface p-6"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-signal/15 text-xs font-bold text-signal-bright">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-8 max-w-3xl rounded-2xl border border-signal/20 bg-signal/[0.05] px-5 py-4 text-center text-sm leading-relaxed text-fg/90">
          {how.note}
        </Reveal>
      </div>
    </section>
  );
}

function MatchesSection({
  matches,
}: {
  matches: SeoPageData["matches"];
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Matching" title={matches.title} />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-signal/25 bg-signal/[0.04] p-7 sm:p-8">
            <h3 className="text-lg font-semibold text-fg">{matches.strongTitle}</h3>
            <ul className="mt-6 space-y-3">
              {matches.strong.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-signal"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm leading-relaxed text-fg/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.08}
            className="rounded-2xl border border-fg/8 bg-surface/50 p-7 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-fg">{matches.noiseTitle}</h3>
            <ul className="mt-6 space-y-3">
              {matches.noise.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-ash-dim"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm leading-relaxed text-ash">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyTable({ why }: { why: SeoPageData["why"] }) {
  return (
    <section className="relative border-y border-fg/8 bg-ink-soft/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={why.eyebrow}
          title={why.title}
          description={why.description}
        />
        <Reveal className="mx-auto mt-14 max-w-4xl overflow-x-auto rounded-2xl border border-fg/8 bg-surface">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-fg/8 bg-fg/[0.03]">
                <th className="px-5 py-4 font-semibold text-fg sm:px-6">
                  {why.columns[0]}
                </th>
                <th className="px-5 py-4 font-semibold text-fg sm:px-6">
                  {why.columns[1]}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fg/8">
              {why.rows.map(([left, right]) => (
                <tr key={left}>
                  <td className="px-5 py-4 align-top font-medium text-fg sm:px-6">
                    {left}
                  </td>
                  <td className="px-5 py-4 align-top text-ash sm:px-6">
                    {right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleBody({ sections }: { sections: SeoArticleSection[] }) {
  if (!sections.length) return null;

  return (
    <section
      id="guide"
      className="relative border-y border-fg/8 bg-ink-soft/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Deep dive"
          title="The practical guide behind this page"
          description="Same playbook shops use once the alerts start landing — written for this query, not recycled filler."
        />
        <div className="mx-auto mt-14 max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <Reveal key={section.id} delay={i * 0.04} as="article">
              <h2
                id={section.id}
                className="scroll-mt-28 text-2xl font-bold tracking-tight text-fg sm:text-[1.65rem]"
              >
                {section.h2}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-[15px] leading-relaxed text-ash"
                  >
                    {p}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-signal"
                        strokeWidth={2.5}
                      />
                      <span className="text-[15px] leading-relaxed text-fg/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeFaq({ faqs }: { faqs: SeoFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section
      id="faq"
      className="relative border-t border-fg/8 bg-ink-soft/50 py-20 sm:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions shops ask before they start."
        />
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-fg/8 overflow-hidden rounded-2xl border border-fg/8 bg-surface/40">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`trade-faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-fg/[0.03]"
                  >
                    <span className="text-[15px] font-medium text-fg">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg border border-fg/10 text-signal-bright transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-signal/15" : "bg-fg/5"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`trade-faq-panel-${i}`}
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

function GuidesAndRelated({ data }: { data: SeoPageData }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
              Guides
            </h2>
            <ul className="mt-5 space-y-3">
              {data.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-signal-bright transition hover:text-signal"
                  >
                    {link.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
              {data.relatedTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {data.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-fg transition hover:text-signal-bright"
                  >
                    {link.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CloseCta({ close }: { close: SeoPageData["close"] }) {
  return (
    <section id="cta" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-signal/20 bg-surface/60 px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 signal-glow"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {close.title}
            </h2>
            <p className="mt-4 text-pretty text-base text-ash">{close.body}</p>
            <div className="mt-8 flex justify-center">
              <a
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-on-signal shadow-[0_0_36px_-6px_var(--color-signal)] transition hover:bg-signal-bright"
              >
                {close.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
