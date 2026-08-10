import type { Metadata } from "next";
import { SourceManager } from "@/components/SourceManager";
import { createClient } from "@/lib/supabase/server";
import type { WatchSource } from "@/lib/types";

export const metadata: Metadata = { title: "Watchlist" };

export default async function WatchlistPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("watch_sources")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<WatchSource[]>();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Watchlist</h1>
        <p className="mt-1.5 text-sm text-ash">
          The groups we check for you. Leads show up under Leads.
        </p>
      </div>

      <SourceManager sources={data ?? []} />
    </>
  );
}
