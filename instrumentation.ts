export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.QSTASH_TOKEN || !process.env.CRON_SECRET) return;

  const { ensureScanSchedule } = await import("./lib/qstash");
  try {
    await ensureScanSchedule();
  } catch (cause) {
    console.error("[qstash] failed to ensure scan schedule", cause);
  }
}
