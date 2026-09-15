import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { createClient } from "@/lib/supabase/server";

/** Shared chrome for the /privacy, /terms, /refund pages — plain prose, no
 *  marketing layout. There's no Tailwind typography plugin in this project,
 *  so headings/paragraphs/lists are styled by hand here rather than pulling
 *  one in for three static pages. Uses the same Navbar as the rest of the
 *  marketing site so Blog and other links stay consistent. */
export async function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar loggedIn={!!user} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pt-28 pb-12 sm:px-8 sm:pt-32">
        <h1 className="text-3xl font-semibold tracking-tight text-fg">{title}</h1>
        <p className="mt-2 text-sm text-ash-dim">Last updated {updated}</p>

        <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-ash [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
