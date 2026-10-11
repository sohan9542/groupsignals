import { apiError, apiOk, parseJsonBody } from "@/lib/api/http";
import { requireUser } from "@/lib/api/auth";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_DESTINATIONS = 5;

export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, user } = auth;

  const parsed = await parseJsonBody<{ address?: unknown }>(request);
  if (!parsed.ok) return parsed.response;

  const address =
    typeof parsed.data.address === "string" ? parsed.data.address.trim().toLowerCase() : "";

  if (!EMAIL.test(address)) {
    return apiError("Enter a valid email address.", 400);
  }

  const { count } = await supabase
    .from("email_destinations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) >= MAX_DESTINATIONS) {
    return apiError(`That's the ${MAX_DESTINATIONS}-address limit.`, 400);
  }

  const { data, error } = await supabase
    .from("email_destinations")
    .insert({ user_id: user.id, address })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return apiError("That address is already on the list.", 409);
    }
    return apiError(error.message, 500);
  }

  // TODO: send the verification email carrying data.verification_token. Until
  // that exists the address sits in 'pending' and never receives leads, which
  // is the correct failure direction — we don't mail unverified addresses.
  return apiOk({ destination: data });
}
