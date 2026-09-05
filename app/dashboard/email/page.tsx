import type { Metadata } from "next";
import { EmailManager } from "@/components/EmailManager";
import { createClient } from "@/lib/supabase/server";
import type { EmailDestination } from "@/lib/types";

export const metadata: Metadata = { title: "Email" };

export default async function EmailPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("email_destinations")
    .select("*")
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: true })
    .returns<EmailDestination[]>();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Email</h1>
        <p className="mt-1.5 text-sm text-ash">Where your mentions get delivered.</p>
      </div>

      <EmailManager destinations={data ?? []} />
    </>
  );
}
