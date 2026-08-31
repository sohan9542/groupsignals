import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseIntent } from "@/lib/sources";

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

  let body: { status?: unknown; intent?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (body.status === "active" || body.status === "paused") {
    update.status = body.status;
  }
  if (typeof body.intent === "string") {
    const parsed = parseIntent(body.intent);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }
    update.intent = parsed.intent;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  }

  // A pending private group can only be activated by an admin assigning it
  // an account (see the private-groups admin route) — otherwise the owner's
  // own "Resume" toggle would let them skip approval entirely.
  if (update.status === "active") {
    const { data: current } = await supabase
      .from("watch_sources")
      .select("status")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle<{ status: string }>();

    if (current?.status === "pending") {
      return NextResponse.json(
        { ok: false, error: "Still waiting on admin approval — an account needs to be assigned first." },
        { status: 403 }
      );
    }
  }

  // The user_id filter is belt-and-braces — RLS already scopes this — but it
  // makes the intent explicit and keeps a policy mistake from becoming an IDOR.
  const { data, error } = await supabase
    .from("watch_sources")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: data });
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
    .from("watch_sources")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
