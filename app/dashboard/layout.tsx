import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/DashboardNav";
import { Logo } from "@/components/Logo";
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
    <div className="min-h-dvh">
      <header className="border-b border-white/8 bg-ink-soft/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <Logo href="/dashboard" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <DashboardNav email={user.email ?? ""} isAdmin={isAdmin(user.email)} />
      </div>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
