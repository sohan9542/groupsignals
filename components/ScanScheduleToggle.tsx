"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Power } from "lucide-react";
import type { ScheduleStatus } from "@/lib/qstash";

/**
 * "enabled" is the admin-controlled permission switch (app_settings.cron_enabled).
 * "schedule" is the live, actual state of the QStash schedule. Both are shown
 * together because a switch that says "On" while nothing is actually
 * scheduled to run is worse than useless — it's actively misleading.
 */
export function ScanScheduleToggle({
  enabled,
  schedule,
}: {
  enabled: boolean;
  schedule: ScheduleStatus;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function toggle() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/settings/cron", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !enabled }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!data.ok) {
        setError(data.error ?? "Couldn't update that.");
        return;
      }

      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setSaving(false);
    }
  }

  // The real, ground-truth state — not just whether the admin switch is
  // flipped. This is what actually decides whether posts get scanned.
  const scheduleLive = schedule.configured && schedule.exists && !schedule.isPaused;
  const isRunning = enabled && scheduleLive;

  let statusLabel: string;
  let statusTone: "on" | "off" | "warn";
  let helperText: string;

  if (!enabled) {
    statusLabel = "Paused";
    statusTone = "off";
    helperText = "Turned off from here. The QStash schedule (if any) keeps firing, but every tick is a no-op while this is off.";
  } else if (!schedule.configured) {
    statusLabel = "Not connected";
    statusTone = "warn";
    helperText = "This switch is on, but no QStash schedule exists — QSTASH_TOKEN isn't set on the server. Nothing will scan automatically until it is.";
  } else if (!schedule.exists) {
    statusLabel = "Not connected";
    statusTone = "warn";
    helperText = "QSTASH_TOKEN is set, but the schedule hasn't been created yet — it's created on the next request to /api/cron/scan. Nothing is scanning yet.";
  } else if (schedule.isPaused) {
    statusLabel = "Schedule paused on QStash";
    statusTone = "warn";
    helperText = "The QStash schedule itself is paused on Upstash's side (not from this switch). Resume it in the QStash dashboard.";
  } else {
    statusLabel = "Running — hourly";
    statusTone = "on";
    helperText = "Actually firing: a QStash schedule exists and is unpaused, and this switch is on.";
  }

  const badgeStyles: Record<typeof statusTone, string> = {
    on: "bg-signal/15 text-signal-bright",
    off: "bg-white/8 text-ash",
    warn: "bg-amber-500/15 text-amber-300",
  };

  return (
    <section className="rounded-2xl border border-white/8 bg-surface/50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">Scheduled scanning</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-ash">
            When actually running: once an hour — 24 times a day — checking every active source
            for up to 5 new posts each and emailing users on a match.
          </p>
        </div>
        <span className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyles[statusTone]}`}>
          {statusTone === "warn" && <AlertTriangle className="size-3.5" />}
          {statusLabel}
        </span>
      </div>

      <p
        className={`mt-4 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
          isRunning ? "bg-white/[0.03] text-ash-dim" : "border border-amber-500/20 bg-amber-500/[0.06] text-amber-200/90"
        }`}
      >
        {helperText}
      </p>

      <button
        type="button"
        onClick={toggle}
        disabled={saving}
        className={`mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
          enabled
            ? "border border-white/10 text-ash hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
            : "bg-signal text-ink hover:bg-signal-bright"
        }`}
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Power className="size-4" />}
        {enabled ? "Turn off" : "Turn on"}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </section>
  );
}
