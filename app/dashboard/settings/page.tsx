import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { isCronEnabled } from "@/lib/settings";
import { getScheduleStatus } from "@/lib/qstash";
import { CookiePool } from "@/components/CookiePool";
import { ScanScheduleToggle } from "@/components/ScanScheduleToggle";
import type { FacebookCookiePoolEntry } from "@/lib/types";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not just hidden from nav — the page itself refuses non-admins even if
  // they have the URL, since this is the only place the shared cookie pool
  // and the global scan switch live.
  if (!isAdmin(user?.email)) redirect("/dashboard");

  // facebook_cookies and app_settings both have RLS with no policies for the
  // authenticated role at all, so even the admin's own session can't read
  // them without the service client.
  const service = createServiceClient();
  const [{ data: cookies }, cronEnabled, schedule] = await Promise.all([
    service
      .from("facebook_cookies")
      .select("id, name, status, last_used_at, last_error, created_at")
      .order("created_at", { ascending: false })
      .returns<FacebookCookiePoolEntry[]>(),
    isCronEnabled(),
    getScheduleStatus(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-ash">
          Admin only — nobody else sees this page.
        </p>
      </div>

      <ScanScheduleToggle enabled={cronEnabled} schedule={schedule} />
      <CookiePool cookies={cookies ?? []} />
    </div>
  );
}
