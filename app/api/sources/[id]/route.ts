import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { requireUser } from "@/lib/api/auth";
import { parseIntent } from "@/lib/sources";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const { id } = await params;

  const parsed = await parseJsonBody<{ status?: unknown; intent?: unknown }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const update: Record<string, unknown> = {};

  if (body.status === "active" || body.status === "paused") {
    update.status = body.status;
  }
  if (typeof body.intent === "string") {
    const intentParsed = parseIntent(body.intent);
    if ("error" in intentParsed) {
      return apiError(intentParsed.error, 400);
    }
    update.intent = intentParsed.intent;
  }

  if (Object.keys(update).length === 0) {
    return apiError("Nothing to update.", 400);
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
      return apiError(
        "Still waiting on admin approval — an account needs to be assigned first.",
        403
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
    return apiError(error.message, 500);
  }

  return apiOk({ source: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const { id } = await params;

  const { error } = await supabase
    .from("watch_sources")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return apiError(error.message, 500);
  }

  return apiOk();
}
