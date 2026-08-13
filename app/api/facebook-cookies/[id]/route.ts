import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { encryptCookies, parseCookiePaste } from "@/lib/facebook-cookies";

type Params = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user?.email) ? user : null;
}

/** Admin manually flips status — e.g. back to "active" after swapping in a fresh cookie export for the same slot, or to "disabled" to pull one out of rotation without deleting it. */
export async function PATCH(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const { id } = await params;

  let body: { status?: unknown; cookies?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (body.status === "active" || body.status === "banned" || body.status === "disabled") {
    update.status = body.status;
    if (body.status === "active") update.last_error = null;
  }

  if (typeof body.cookies === "string" && body.cookies.trim()) {
    const parsed = parseCookiePaste(body.cookies);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }
    try {
      update.cookies_ciphertext = encryptCookies(parsed.cookies);
      update.status = "active";
      update.last_error = null;
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : "Encryption failed.";
      return NextResponse.json({ ok: false, error: detail }, { status: 503 });
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  }

  const service = createServiceClient();
  const { data, error } = await service
    .from("facebook_cookies")
    .update(update)
    .eq("id", id)
    .select("id, name, status, last_used_at, last_error, created_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, cookie: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const { id } = await params;
  const service = createServiceClient();
  const { error } = await service.from("facebook_cookies").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
