import { createServiceClient } from "./supabase/service";

/**
 * app_settings is a single-row table (id is always `true`) -- there's
 * exactly one global toggle right now, so a full settings schema would be
 * ceremony. Add columns here if a second one shows up.
 */
export async function isCronEnabled(): Promise<boolean> {
  const service = createServiceClient();
  const { data } = await service
    .from("app_settings")
    .select("cron_enabled")
    .eq("id", true)
    .maybeSingle<{ cron_enabled: boolean }>();

  // Fail open only because the row is missing (a migration hiccup, a fresh
  // DB) -- defaulting to "scanning is off" would silently break every user
  // the first time this ran, which is a worse failure than the reverse.
  return data?.cron_enabled ?? true;
}

export async function setCronEnabled(enabled: boolean): Promise<void> {
  const service = createServiceClient();
  await service
    .from("app_settings")
    .update({ cron_enabled: enabled, updated_at: new Date().toISOString() })
    .eq("id", true);
}
