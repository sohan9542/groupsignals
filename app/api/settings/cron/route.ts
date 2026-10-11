import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { requireAdminUser } from "@/lib/api/auth";
import { isCronEnabled, setCronEnabled } from "@/lib/settings";

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  return apiOk({ enabled: await isCronEnabled() });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminUser();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody<{ enabled?: unknown }>(request);
  if (!parsed.ok) return parsed.response;

  if (typeof parsed.data.enabled !== "boolean") {
    return apiError("Missing enabled.", 400);
  }

  await setCronEnabled(parsed.data.enabled);
  return apiOk({ enabled: parsed.data.enabled });
}
