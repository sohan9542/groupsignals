import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogImage } from "@/components/BlogImage";
import { BlogToc } from "@/components/BlogToc";
import { getAllPosts, getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    ...(post.index === false && { robots: { index: false, follow: true } }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Article + FAQPage structured data — helps search engines show the
  // byline/date and the Q&A directly in results instead of guessing at them.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: { "@type": "Organization", name: "GroupSignal" },
        publisher: { "@type": "Organization", name: "GroupSignal" },
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar loggedIn={!!user} />
      <main className="overflow-x-clip pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Header block: no max-w so breadcrumb/title/meta use full content
              width on mobile. Avoid text-balance below lg — it shortens lines
              and leaves a large empty strip beside the H1 on ~375px. */}
          <div className="w-full max-w-none min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-1.5 text-sm text-ash-dim"
            >
              <Link href="/" className="shrink-0 transition-colors hover:text-fg">
                Home
              </Link>
              <ChevronRight className="size-3.5 shrink-0" />
              <Link href="/blog" className="shrink-0 transition-colors hover:text-fg">
                Blog
              </Link>
              <ChevronRight className="size-3.5 shrink-0" />
              <span className="min-w-0 truncate text-ash">{post.title}</span>
            </nav>

            <h1 className="mt-6 w-full max-w-none text-pretty text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-balance">
              {post.title}
            </h1>

            <div className="mt-5 flex w-full max-w-none flex-wrap items-center gap-x-4 gap-y-2 border-b border-fg/8 pb-6 text-sm text-ash-dim">
              <span>
                Written by <span className="text-ash">{post.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" strokeWidth={2} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 shrink-0" strokeWidth={2} />
                {post.readMinutes} min read
              </span>
              {post.updatedAt && (
                <span>Updated {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>

          <BlogImage src={post.coverImage} alt={post.title} />

          {/* Mobile/tablet TOC — sidebar only appears at lg+. */}
          <details className="group mt-8 rounded-2xl border border-fg/8 bg-surface/50 p-4 lg:hidden">
            <summary className="cursor-pointer list-none text-sm font-semibold text-fg marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                On this page
                <ChevronRight className="size-4 shrink-0 text-ash-dim transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <ul className="mt-3 space-y-0.5 border-t border-fg/8 pt-3 text-sm">
              {post.toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="block border-l-2 border-fg/8 py-1.5 pl-4 text-ash transition-colors hover:border-signal hover:text-fg"
                  >
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
            <article className="min-w-0 max-w-2xl">
              <div className="flex flex-col gap-6 break-words text-[17px] leading-[1.8] text-ash sm:text-[18px] [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-4 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-fg sm:[&_h2]:text-3xl [&_h3]:mt-1 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-fg [&_strong]:font-semibold [&_strong]:text-fg">
                {post.body}
              </div>

              <div id="faq" className="mt-4 scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  FAQ
                </h2>
                <div className="mt-5 divide-y divide-fg/8 overflow-hidden rounded-2xl border border-fg/8">
                  {post.faqs.map((faq) => (
                    <details key={faq.q} className="group p-4 sm:p-5">
                      <summary className="cursor-pointer list-none text-[15px] font-medium text-fg marker:content-none">
                        {faq.q}
                      </summary>
                      <p className="mt-2.5 text-sm leading-relaxed text-ash">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col items-stretch gap-4 rounded-2xl border border-signal/25 bg-signal/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <p className="text-base font-semibold leading-relaxed text-fg">
                  Ready to stop scrolling groups yourself?
                </p>
                <Link
                  href="/login"
                  className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-on-signal transition hover:bg-signal-bright sm:w-auto"
                >
                  Start watching your groups
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>

            {/* Table of contents — hidden below lg, where there's no room
                for a second column beside the article. */}
            <aside className="hidden min-w-0 lg:block">
              <BlogToc toc={post.toc} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
