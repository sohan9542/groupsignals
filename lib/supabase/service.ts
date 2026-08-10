import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS entirely.
 *
 * Only two callers should ever need it: the Apify webhook (writes leads for a
 * user who isn't making the request) and the Paddle webhook (writes billing
 * state that no user session is allowed to write). Both must verify their
 * caller's signature/secret BEFORE reaching for this — nothing here re-checks.
 * Never import this into a Client Component.
 */
export function createServiceClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
