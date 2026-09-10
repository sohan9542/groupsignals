import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogImage } from "@/components/BlogImage";
import { BlogToc } from "@/components/BlogToc";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
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
      <main className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-ash-dim"
          >
            <Link href="/" className="transition-colors hover:text-fg">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/blog" className="transition-colors hover:text-fg">
              Blog
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="truncate text-ash">{post.title}</span>
          </nav>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-fg/8 pb-6 text-sm text-ash-dim">
            <span>
              Written by <span className="text-ash">{post.author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" strokeWidth={2} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={2} />
              {post.readMinutes} min read
            </span>
            {post.updatedAt && (
              <span>Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>

          <BlogImage />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_240px]">
            <article className="max-w-2xl">
              <div className="flex flex-col gap-6 text-[18px] leading-[1.8] text-ash [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-4 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-fg sm:[&_h2]:text-3xl [&_h3]:mt-1 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-fg [&_strong]:font-semibold [&_strong]:text-fg">
                {post.body}
              </div>

              <div id="faq" className="mt-4 scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  FAQ
                </h2>
                <div className="mt-5 divide-y divide-fg/8 overflow-hidden rounded-2xl border border-fg/8">
                  {post.faqs.map((faq) => (
                    <details key={faq.q} className="group p-5">
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

              <div className="mt-4 flex flex-col items-start gap-4 rounded-2xl border border-signal/25 bg-signal/8 p-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base font-semibold leading-relaxed text-fg">
                  Ready to stop scrolling groups yourself?
                </p>
                <Link
                  href="/login"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-on-signal transition hover:bg-signal-bright"
                >
                  Start watching your groups
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>

            {/* Table of contents — hidden below lg, where there's no room
                for a second column beside the article. */}
            <aside className="hidden lg:block">
              <BlogToc toc={post.toc} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
