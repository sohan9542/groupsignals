"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Power } from "lucide-react";

export function ScanScheduleToggle({ enabled }: { enabled: boolean }) {
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

  return (
    <section className="rounded-2xl border border-white/8 bg-surface/50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">Scheduled scanning</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-ash">
            Runs once an hour — 24 times a day — checking every active source for up to 5 new posts
            each and emailing users on a match. Turning this off pauses automatic scanning for
            every user at once; sources can still be scanned manually from the Watchlist.
          </p>
        </div>
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${
            enabled ? "bg-signal/15 text-signal-bright" : "bg-white/8 text-ash"
          }`}
        >
          {enabled ? "On" : "Off"}
        </span>
      </div>

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
