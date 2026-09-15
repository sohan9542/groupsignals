import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Inline CTA box dropped into a blog post body — same visual language as
 * the end-of-post CTA, just usable mid-article too. */
export function BlogCallout({
  text,
  cta = "Start watching your groups",
}: {
  text: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col items-stretch gap-4 rounded-2xl border border-signal/25 bg-signal/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="min-w-0 text-[15px] font-semibold leading-relaxed text-fg">
        {text}
      </p>
      <Link
        href="/login"
        className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-2.5 text-sm font-semibold !text-on-signal !no-underline transition hover:bg-signal-bright sm:w-auto"
      >
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
