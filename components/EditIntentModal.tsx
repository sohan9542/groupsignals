"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import type { WatchSource } from "@/lib/types";
import { Modal } from "./Modal";

export function EditIntentModal({
  source,
  onClose,
  onSubmit,
}: {
  source: WatchSource;
  onClose: () => void;
  onSubmit: (intent: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [intent, setIntent] = useState(source.intent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canSave = intent.trim().length >= 10 && intent.trim() !== source.intent.trim() && !saving;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;

    setSaving(true);
    setError("");

    const result = await onSubmit(intent);
    if (!result.ok) {
      setError(result.error ?? "Couldn't save that.");
      setSaving(false);
      return;
    }

    onClose();
  }

  return (
    <Modal title={`Edit intent — ${source.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="edit-intent" className="block text-sm font-medium text-white">
            What should trigger a notification?
          </label>
          <textarea
            id="edit-intent"
            autoFocus
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            rows={3}
            maxLength={500}
            className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-ash transition-colors hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSave}
            className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
