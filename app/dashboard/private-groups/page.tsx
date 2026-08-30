import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { PrivateGroupAssignments } from "@/components/PrivateGroupAssignments";
import type {
  CookieStatus,
  FacebookCookiePoolEntry,
  GroupAccountAssignment,
  PrivateGroupWithAssignments,
  WatchStatus,
} from "@/lib/types";

export const metadata: Metadata = { title: "Private groups" };

type SourceRow = {
  id: string;
  user_id: string;
  url: string;
  name: string;
  status: WatchStatus;
  last_run_at: string | null;
  last_error: string | null;
  created_at: string;
};

type AssignmentRow = {
  id: string;
  source_id: string;
  role: "active" | "backup";
  assigned_at: string;
  facebook_cookies: { id: string; name: string; status: CookieStatus } | null;
};

export default async function PrivateGroupsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Same admin-only gate as Settings — assigning accounts across every
  // user's private groups isn't something an end user should even discover.
  if (!isAdmin(user?.email)) redirect("/dashboard");

  const service = createServiceClient();

  const [{ data: sources }, { data: cookies }] = await Promise.all([
    service
      .from("watch_sources")
      .select("id, user_id, url, name, status, last_run_at, last_error, created_at")
      .eq("platform", "facebook")
      .eq("requires_login", true)
      .order("created_at", { ascending: false })
      .returns<SourceRow[]>(),
    service
      .from("facebook_cookies")
      .select("id, name, status, last_used_at, last_error, created_at")
      .order("name", { ascending: true })
      .returns<FacebookCookiePoolEntry[]>(),
  ]);

  const sourceList = sources ?? [];
  const sourceIds = sourceList.map((s) => s.id);
  const userIds = [...new Set(sourceList.map((s) => s.user_id))];

  const [{ data: assignments }, { data: profiles }] = await Promise.all([
    sourceIds.length
      ? service
          .from("group_account_assignments")
          .select("id, source_id, role, assigned_at, facebook_cookies(id, name, status)")
          .in("source_id", sourceIds)
          .returns<AssignmentRow[]>()
      : Promise.resolve({ data: [] as AssignmentRow[] }),
    // watch_sources.user_id references auth.users, not profiles, so there's
    // no FK PostgREST can embed a join through — fetched separately instead.
    userIds.length
      ? service.from("profiles").select("id, email").in("id", userIds).returns<{ id: string; email: string }[]>()
      : Promise.resolve({ data: [] as { id: string; email: string }[] }),
  ]);

  const emailByUser = new Map((profiles ?? []).map((p) => [p.id, p.email]));
  const assignmentsBySource = new Map<string, GroupAccountAssignment[]>();
  for (const a of assignments ?? []) {
    if (!a.facebook_cookies) continue; // cookie was deleted out from under the assignment
    const list = assignmentsBySource.get(a.source_id) ?? [];
    list.push({ id: a.id, source_id: a.source_id, role: a.role, assigned_at: a.assigned_at, cookie: a.facebook_cookies });
    assignmentsBySource.set(a.source_id, list);
  }

  const groups: PrivateGroupWithAssignments[] = sourceList.map((s) => ({
    ...s,
    user_email: emailByUser.get(s.user_id) ?? null,
    assignments: assignmentsBySource.get(s.id) ?? [],
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Private groups</h1>
        <p className="mt-1.5 text-sm text-ash">
          Admin only — assign 1 to 4 pooled Facebook accounts to each private group. Only the
          account marked active is ever used to scan it.
        </p>
      </div>

      <PrivateGroupAssignments groups={groups} pool={cookies ?? []} />
    </div>
  );
}
