import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdmin } from "@/lib/admin";
import { encryptCookies, parseCookiePaste } from "@/lib/facebook-cookies";

const MAX_POOL_SIZE = 100;

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user?.email) ? user : null;
}

/** Never returns cookies_ciphertext — the pool listing is a status board, not a place to read secrets back out. */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  const service = createServiceClient();
  const { data, error } = await service
    .from("facebook_cookies")
    .select("id, name, status, last_used_at, last_error, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, cookies: data });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  let body: { name?: unknown; cookies?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ ok: false, error: "Give this cookie a name." }, { status: 400 });
  }

  if (typeof body.cookies !== "string") {
    return NextResponse.json({ ok: false, error: "Paste the cookies first." }, { status: 400 });
  }

  const parsed = parseCookiePaste(body.cookies);
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const service = createServiceClient();

  const { count } = await service
    .from("facebook_cookies")
    .select("id", { count: "exact", head: true });

  if ((count ?? 0) >= MAX_POOL_SIZE) {
    return NextResponse.json(
      { ok: false, error: `That's the ${MAX_POOL_SIZE}-cookie pool limit.` },
      { status: 400 }
    );
  }

  let ciphertext: string;
  try {
    ciphertext = encryptCookies(parsed.cookies);
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : "Encryption failed.";
    return NextResponse.json({ ok: false, error: detail }, { status: 503 });
  }

  const { data, error } = await service
    .from("facebook_cookies")
    .insert({ name, cookies_ciphertext: ciphertext })
    .select("id, name, status, last_used_at, last_error, created_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, cookie: data });
}
