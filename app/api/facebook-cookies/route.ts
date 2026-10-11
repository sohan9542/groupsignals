import { requireAdminUser } from "@/lib/api/auth";
import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { encryptCookies, parseCookiePaste } from "@/lib/facebook-cookies";
import { createServiceClient } from "@/lib/supabase/service";

const MAX_POOL_SIZE = 100;

/** Never returns cookies_ciphertext — the pool listing is a status board, not a place to read secrets back out. */
export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const service = createServiceClient();
  const { data, error } = await service
    .from("facebook_cookies")
    .select("id, name, status, last_used_at, last_error, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk({ cookies: data });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const parsedBody = await parseJsonBody<{ name?: unknown; cookies?: unknown }>(request);
  if (!parsedBody.ok) return parsedBody.response;
  const body = parsedBody.data;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return apiError("Give this cookie a name.", 400);
  }

  if (typeof body.cookies !== "string") {
    return apiError("Paste the cookies first.", 400);
  }

  const parsed = parseCookiePaste(body.cookies);
  if ("error" in parsed) {
    return apiError(parsed.error, 400);
  }

  const service = createServiceClient();

  const { count } = await service
    .from("facebook_cookies")
    .select("id", { count: "exact", head: true });

  if ((count ?? 0) >= MAX_POOL_SIZE) {
    return apiError(`That's the ${MAX_POOL_SIZE}-cookie pool limit.`, 400);
  }

  let ciphertext: string;
  try {
    ciphertext = encryptCookies(parsed.cookies);
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : "Encryption failed.";
    return apiError(detail, 503);
  }

  const { data, error } = await service
    .from("facebook_cookies")
    .insert({ name, cookies_ciphertext: ciphertext })
    .select("id, name, status, last_used_at, last_error, created_at")
    .single();

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk({ cookie: data });
}
