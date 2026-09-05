import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

  // Article structured data — helps search engines show the byline/date in
  // results rather than guessing at them from the page text.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "GroupSignal" },
    publisher: { "@type": "Organization", name: "GroupSignal" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar loggedIn={!!user} />
      <main className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ash transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Blog
          </Link>

          <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-4 text-sm text-ash-dim">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" strokeWidth={2} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={2} />
              {post.readMinutes} min read
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-6 text-[17px] leading-[1.75] text-ash [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-fg [&_strong]:font-semibold [&_strong]:text-fg">
            {post.body}
          </div>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-signal/25 bg-signal/8 p-7 sm:flex-row sm:items-center sm:justify-between">
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
      </main>
      <Footer />
    </>
  );
}
