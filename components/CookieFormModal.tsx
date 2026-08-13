"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Modal } from "./Modal";

/** Shared by "add a new pooled cookie" and "replace a dead one" — same shape, different endpoint. */
export function CookieFormModal({
  mode,
  existingName,
  onClose,
  onSubmit,
}: {
  mode: "add" | "replace";
  existingName?: string;
  onClose: () => void;
  onSubmit: (data: { name?: string; cookies: string }) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [name, setName] = useState("");
  const [cookies, setCookies] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canSave = (mode === "replace" || name.trim().length > 0) && cookies.trim().length > 0 && !saving;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;

    setSaving(true);
    setError("");

    const result = await onSubmit(mode === "add" ? { name, cookies } : { cookies });
    if (!result.ok) {
      setError(result.error ?? "Couldn't save that.");
      setSaving(false);
      return;
    }

    onClose();
  }

  return (
    <Modal
      title={mode === "add" ? "Add a Facebook cookie" : `Replace cookie — ${existingName}`}
      description="Export facebook.com cookies as JSON from a logged-in browser (e.g. the Cookie-Editor extension)."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "add" && (
          <div>
            <label htmlFor="cookie-name" className="block text-sm font-medium text-white">
              Label
            </label>
            <input
              id="cookie-name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alt account 3"
              className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
            />
          </div>
        )}

        <div>
          <label htmlFor="cookie-json" className="block text-sm font-medium text-white">
            Cookies (JSON array)
          </label>
          <p className="mt-1 text-xs text-ash-dim">
            Needs at least <code className="rounded bg-white/8 px-1 py-0.5">c_user</code> and{" "}
            <code className="rounded bg-white/8 px-1 py-0.5">xs</code>.
          </p>
          <textarea
            id="cookie-json"
            autoFocus={mode === "replace"}
            value={cookies}
            onChange={(e) => setCookies(e.target.value)}
            placeholder='[{"name":"c_user","value":"...","domain":".facebook.com"}, ...]'
            rows={6}
            className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 font-mono text-xs text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
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
            {mode === "add" ? "Add to pool" : "Replace"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
