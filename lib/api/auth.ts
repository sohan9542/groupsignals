import type { User } from "@supabase/supabase-js";
import type { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { apiError } from "./http";

type SupabaseServer = Awaited<ReturnType<typeof createClient>>;

type Authed = {
  ok: true;
  supabase: SupabaseServer;
  user: User;
};

type AuthFail = { ok: false; response: NextResponse };

/** Require a signed-in Supabase user. Returns 401 `{ error: "Not signed in." }`. */
export async function requireUser(): Promise<Authed | AuthFail> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, response: apiError("Not signed in.", 401) };
  }

  return { ok: true, supabase, user };
}

/**
 * Admin gate for cookie-pool and private-group routes.
 * Preserves prior behavior: unsigned-in and non-admin both get 403
 * `{ error: "Not authorized." }` — callers must not distinguish them.
 */
export async function requireAdminUser(): Promise<Authed | AuthFail> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdmin(user.email)) {
    return { ok: false, response: apiError("Not authorized.", 403) };
  }

  return { ok: true, supabase, user };
}
