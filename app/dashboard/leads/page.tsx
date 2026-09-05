import type { Metadata } from "next";
import { LeadList } from "@/components/LeadList";
import { createClient } from "@/lib/supabase/server";
import type { Lead, LeadStatus, WatchSource } from "@/lib/types";

export const metadata: Metadata = { title: "Mentions" };

const STATUSES: LeadStatus[] = ["new", "saved", "replied", "dismissed"];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active: LeadStatus | "all" =
    status === "all"
      ? "all"
      : STATUSES.includes(status as LeadStatus)
        ? (status as LeadStatus)
        : "new";

  const supabase = await createClient();

  let query = supabase
    .from("leads")
    .select("*")
    .order("discovered_at", { ascending: false })
    .limit(100);

  if (active !== "all") query = query.eq("status", active);

  const [{ data: leads }, { data: sources }] = await Promise.all([
    query.returns<Lead[]>(),
    supabase
      .from("watch_sources")
      .select("id, name")
      .returns<Pick<WatchSource, "id" | "name">[]>(),
  ]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Mentions</h1>
        <p className="mt-1.5 text-sm text-ash">
          Conversations from your groups worth your attention.
        </p>
      </div>

      <LeadList leads={leads ?? []} sources={sources ?? []} active={active} />
    </>
  );
}
