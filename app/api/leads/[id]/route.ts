import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/types";

const ALLOWED: LeadStatus[] = ["new", "saved", "replied", "dismissed"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;

  let body: { status?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!ALLOWED.includes(body.status as LeadStatus)) {
    return NextResponse.json({ ok: false, error: "Unknown status." }, { status: 400 });
  }

  const { error } = await supabase
    .from("leads")
    .update({ status: body.status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
