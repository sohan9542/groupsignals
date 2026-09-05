import type { Metadata } from "next";
import { SourceManager } from "@/components/SourceManager";
import { createClient } from "@/lib/supabase/server";
import { groupLimitForSubscription } from "@/lib/offer";
import { isAdmin } from "@/lib/admin";
import type { Subscription, WatchSource } from "@/lib/types";

export const metadata: Metadata = { title: "Watchlist" };

export default async function WatchlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: sources }, { data: subscription }] = await Promise.all([
    supabase
      .from("watch_sources")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<WatchSource[]>(),
    user
      ? supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle<Subscription>()
      : Promise.resolve({ data: null }),
  ]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Watchlist</h1>
        <p className="mt-1.5 text-sm text-ash">
          The groups we check for you. Matches show up under Mentions.
        </p>
      </div>

      <SourceManager
        sources={sources ?? []}
        groupLimit={isAdmin(user?.email) ? null : groupLimitForSubscription(subscription)}
      />
    </>
  );
}
