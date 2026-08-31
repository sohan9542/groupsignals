import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/DashboardNav";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // proxy.ts already redirects unauthenticated requests, but that runs on an
  // optimistic cookie check. This is the one that actually gates the data.
  if (!user) redirect("/login?next=/dashboard");

  return (
    <DashboardNav email={user.email ?? ""} isAdmin={isAdmin(user.email)}>
      {children}
    </DashboardNav>
  );
}
