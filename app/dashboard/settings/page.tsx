import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { CookiePool } from "@/components/CookiePool";
import type { FacebookCookiePoolEntry } from "@/lib/types";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not just hidden from nav — the page itself refuses non-admins even if
  // they have the URL, since this is the only place the shared cookie pool
  // lives.
  if (!isAdmin(user?.email)) redirect("/dashboard");

  // facebook_cookies has no RLS policy for the authenticated role at all, so
  // even the admin's own session can't read it without the service client.
  const service = createServiceClient();
  const { data } = await service
    .from("facebook_cookies")
    .select("id, name, status, last_used_at, last_error, created_at")
    .order("created_at", { ascending: false })
    .returns<FacebookCookiePoolEntry[]>();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-ash">
          Admin only. Manage the Facebook cookie pool used for every private-group scan, across
          every user — nobody else sees this page.
        </p>
      </div>

      <CookiePool cookies={data ?? []} />
    </>
  );
}
