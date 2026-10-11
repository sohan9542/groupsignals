import { requireAdminUser } from "@/lib/api/auth";
import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { encryptCookies, parseCookiePaste } from "@/lib/facebook-cookies";
import { createServiceClient } from "@/lib/supabase/service";

type Params = { params: Promise<{ id: string }> };

/** Admin manually flips status — e.g. back to "active" after swapping in a fresh cookie export for the same slot, or to "disabled" to pull one out of rotation without deleting it. */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  const parsedBody = await parseJsonBody<{ status?: unknown; cookies?: unknown }>(request);
  if (!parsedBody.ok) return parsedBody.response;
  const body = parsedBody.data;

  const update: Record<string, unknown> = {};

  if (body.status === "active" || body.status === "banned" || body.status === "disabled") {
    update.status = body.status;
    if (body.status === "active") update.last_error = null;
  }

  if (typeof body.cookies === "string" && body.cookies.trim()) {
    const parsed = parseCookiePaste(body.cookies);
    if ("error" in parsed) {
      return apiError(parsed.error, 400);
    }
    try {
      update.cookies_ciphertext = encryptCookies(parsed.cookies);
      update.status = "active";
      update.last_error = null;
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : "Encryption failed.";
      return apiError(detail, 503);
    }
  }

  if (Object.keys(update).length === 0) {
    return apiError("Nothing to update.", 400);
  }

  const service = createServiceClient();
  const { data, error } = await service
    .from("facebook_cookies")
    .update(update)
    .eq("id", id)
    .select("id, name, status, last_used_at, last_error, created_at")
    .single();

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk({ cookie: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const service = createServiceClient();
  const { error } = await service.from("facebook_cookies").delete().eq("id", id);

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk();
}
