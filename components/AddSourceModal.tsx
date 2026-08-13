"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { parseSourceUrl } from "@/lib/sources";
import { Modal } from "./Modal";

const INTENT_PLACEHOLDER =
  "e.g. I want to get notified when someone posts about needing a plumbing service";

export function AddSourceModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: {
    url: string;
    requiresLogin: boolean;
    intent: string;
  }) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [url, setUrl] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [intent, setIntent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const preview = url.trim() ? parseSourceUrl(url) : null;
  const urlError = preview && "error" in preview ? preview.error : null;
  const intentError = intent.trim().length > 0 && intent.trim().length < 10;
  const canSubmit = Boolean(preview && !urlError && intent.trim().length >= 10 && !submitting);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    const result = await onSubmit({
      url,
      requiresLogin: visibility === "private",
      intent,
    });

    if (!result.ok) {
      setError(result.error ?? "Couldn't add that one.");
      setSubmitting(false);
      return;
    }

    onClose();
  }

  return (
    <Modal title="Watch a Facebook group" description="Reddit is paused for now." onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="source-url" className="block text-sm font-medium text-white">
            Group link
          </label>
          <input
            id="source-url"
            type="text"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="facebook.com/groups/your-group"
            className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
          />
          {urlError && <p className="mt-1.5 text-xs text-amber-400">{urlError}</p>}
        </div>

        <div>
          <label htmlFor="source-visibility" className="block text-sm font-medium text-white">
            Group type
          </label>
          <select
            id="source-visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as "public" | "private")}
            className="mt-2 w-full appearance-none rounded-xl border border-white/12 bg-white/5 bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23a1a1aa%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat px-4 py-3 text-sm text-white focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
          >
            <option value="public">Public — anyone can read it</option>
            <option value="private">Private — closed / membership required</option>
          </select>
          <p className="mt-1.5 text-xs text-ash-dim">
            {visibility === "private"
              ? "We handle getting access — nothing else to set up on your end."
              : "Read anonymously, no login involved."}
          </p>
        </div>

        <div>
          <label htmlFor="source-intent" className="block text-sm font-medium text-white">
            What should trigger a notification?
          </label>
          <textarea
            id="source-intent"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder={INTENT_PLACEHOLDER}
            rows={3}
            maxLength={500}
            className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
          />
          <p className="mt-1.5 text-xs text-ash-dim">
            Plain English — our AI reads every new post and matches it against this, so be as
            specific as you like.
          </p>
          {intentError && (
            <p className="mt-1.5 text-xs text-amber-400">A bit more detail helps it match well.</p>
          )}
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
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Start watching
          </button>
        </div>
      </form>
    </Modal>
  );
}
