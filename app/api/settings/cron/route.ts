import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { isCronEnabled, setCronEnabled } from "@/lib/settings";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user?.email) ? user : null;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  return NextResponse.json({ ok: true, enabled: await isCronEnabled() });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 403 });
  }

  let body: { enabled?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.enabled !== "boolean") {
    return NextResponse.json({ ok: false, error: "Missing enabled." }, { status: 400 });
  }

  await setCronEnabled(body.enabled);
  return NextResponse.json({ ok: true, enabled: body.enabled });
}
