import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogImage } from "@/components/BlogImage";
import { BLOG_POSTS } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Facebook group monitoring for plumbers, HVAC techs, and electricians — how to find local service leads before your competitors do.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar loggedIn={!!user} />
      <main className="pb-20 sm:pb-28">
        {/* Full-bleed hero, same treatment as the homepage Hero, so the
            title reads as a real section instead of a small page header. */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-ash-dim"
            >
              <Link href="/" className="transition-colors hover:text-fg">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-ash">Blog</span>
            </nav>

            {/* Static, not scroll-revealed — this sits at the very top of
                the page with nothing above it, so there's no scroll for a
                whileInView entrance to trigger on. */}
            <div className="mt-8 flex w-full flex-col items-center">
              <span className="inline-block rounded-full border border-fg/10 bg-fg/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal-bright">
                Blog
              </span>
              <h1 className="mt-5 w-full text-balance text-center text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Facebook group monitoring for local service businesses,
                explained.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-center text-base leading-relaxed text-ash sm:text-lg">
                Practical notes on monitoring Facebook groups for the
                conversations that matter to your business.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/8 bg-surface/50 transition-colors duration-300 hover:border-signal/30 hover:bg-surface"
              >
                <BlogImage
                  src={post.coverImage}
                  alt={post.title}
                  className="rounded-none"
                />

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs text-ash-dim">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" strokeWidth={2} />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" strokeWidth={2} />
                      {post.readMinutes} min read
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-fg">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ash">
                    {post.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-bright">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
