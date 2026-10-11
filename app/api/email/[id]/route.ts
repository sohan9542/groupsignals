import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { requireUser } from "@/lib/api/auth";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const { id } = await params;

  const parsed = await parseJsonBody<{ digest?: unknown; makePrimary?: unknown }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  if (body.digest === "instant" || body.digest === "daily") {
    const { error } = await supabase
      .from("email_destinations")
      .update({ digest: body.digest })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return apiError(error.message, 500);
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
      return apiError(clearError.message, 500);
    }

    const { error } = await supabase
      .from("email_destinations")
      .update({ is_primary: true })
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("status", "verified");

    if (error) {
      return apiError(error.message, 500);
    }
  }

  return apiOk();
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

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
    return apiError(error.message, 500);
  }

  return apiOk();
}
