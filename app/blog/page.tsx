import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
      <main className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
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

          {/* Static, not scroll-revealed — this sits at the very top of the
              page with nothing above it, so there's no scroll for a
              whileInView entrance to trigger on. */}
         <div className="mt-8 flex w-full items-center justify-center flex-col">
           <span className="inline-block rounded-full border border-fg/10 bg-fg/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal-bright">
            Blog
          </span>
          <h1 className="mt-5 max-w-2xl text-balance text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Facebook group monitoring for local service businesses, explained.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-ash">
            Practical notes on monitoring Facebook groups for the
            conversations that matter to your business.
          </p>
         </div>

          <div
            className={
              BLOG_POSTS.length < 3
                ? "mx-auto mt-14 grid max-w-xl gap-5"
                : "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-fg/8 bg-surface/50 p-7 transition-colors duration-300 hover:border-signal/30 hover:bg-surface"
              >
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
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
