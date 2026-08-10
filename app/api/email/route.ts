import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_DESTINATIONS = 5;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { address?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const address =
    typeof body.address === "string" ? body.address.trim().toLowerCase() : "";

  if (!EMAIL.test(address)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const { count } = await supabase
    .from("email_destinations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) >= MAX_DESTINATIONS) {
    return NextResponse.json(
      { ok: false, error: `That's the ${MAX_DESTINATIONS}-address limit.` },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("email_destinations")
    .insert({ user_id: user.id, address })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "That address is already on the list." },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // TODO: send the verification email carrying data.verification_token. Until
  // that exists the address sits in 'pending' and never receives leads, which
  // is the correct failure direction — we don't mail unverified addresses.
  return NextResponse.json({ ok: true, destination: data });
}
