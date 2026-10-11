import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { requireUser } from "@/lib/api/auth";
import type { LeadStatus } from "@/lib/types";

const ALLOWED: LeadStatus[] = ["new", "saved", "replied", "dismissed"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const { id } = await params;

  const parsed = await parseJsonBody<{ status?: unknown }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  if (!ALLOWED.includes(body.status as LeadStatus)) {
    return apiError("Unknown status.", 400);
  }

  const { error } = await supabase
    .from("leads")
    .update({ status: body.status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk();
}
