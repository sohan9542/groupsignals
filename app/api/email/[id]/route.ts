import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  let body: { digest?: unknown; makePrimary?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.digest === "instant" || body.digest === "daily") {
    const { error } = await supabase
      .from("email_destinations")
      .update({ digest: body.digest })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  }

  if (body.makePrimary === true) {
    // Two statements, not a transaction: worst case both rows briefly read as
    // non-primary, which the UI shows as "no primary" rather than as two.
    const { error: clearError } = await supabase
      .from("email_destinations")
      .update({ is_primary: false })
      .eq("user_id", user.id);

    if (clearError) {
      return NextResponse.json({ ok: false, error: clearError.message }, { status: 500 });
    }

    const { error } = await supabase
      .from("email_destinations")
      .update({ is_primary: true })
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("status", "verified");

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabase
    .from("email_destinations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    // Deleting the primary would silently stop every alert, so it has to be
    // demoted first.
    .eq("is_primary", false);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
