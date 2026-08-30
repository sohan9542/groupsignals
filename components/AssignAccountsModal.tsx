"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Modal } from "./Modal";
import type { FacebookCookiePoolEntry, PrivateGroupWithAssignments } from "@/lib/types";

const MAX_ASSIGNED = 4;

export function AssignAccountsModal({
  group,
  pool,
  onClose,
  onSubmit,
}: {
  group: PrivateGroupWithAssignments;
  pool: FacebookCookiePoolEntry[];
  onClose: () => void;
  onSubmit: (data: { cookieIds: string[]; activeCookieId: string }) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [selected, setSelected] = useState<string[]>(group.assignments.map((a) => a.cookie.id));
  const [activeId, setActiveId] = useState<string>(group.assignments.find((a) => a.role === "active")?.cookie.id ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canSave = selected.length > 0 && selected.includes(activeId) && !saving;

  function toggle(cookieId: string) {
    setSelected((prev) => {
      if (prev.includes(cookieId)) {
        const next = prev.filter((id) => id !== cookieId);
        if (activeId === cookieId) setActiveId(next[0] ?? "");
        return next;
      }
      if (prev.length >= MAX_ASSIGNED) return prev;
      const next = [...prev, cookieId];
      if (!activeId) setActiveId(cookieId);
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;

    setSaving(true);
    setError("");

    const result = await onSubmit({ cookieIds: selected, activeCookieId: activeId });
    if (!result.ok) {
      setError(result.error ?? "Couldn't save that.");
      setSaving(false);
      return;
    }

    onClose();
  }

  return (
    <Modal
      title={`Assign accounts — ${group.name}`}
      description={`Pick up to ${MAX_ASSIGNED} accounts from the pool. One is active (the only one used to scan); the rest sit as backups.`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {pool.length === 0 ? (
          <p className="text-sm text-ash-dim">The cookie pool is empty — add accounts in Settings first.</p>
        ) : (
          <ul className="max-h-72 space-y-1.5 overflow-y-auto">
            {pool.map((cookie) => {
              const checked = selected.includes(cookie.id);
              const disabled = !checked && selected.length >= MAX_ASSIGNED;
              return (
                <li
                  key={cookie.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                    checked ? "border-signal/40 bg-signal/5" : "border-white/10"
                  }`}
                >
                  <label className="flex min-w-0 flex-1 items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggle(cookie.id)}
                      className="size-4 rounded border-white/20 bg-white/5 accent-signal disabled:opacity-40"
                    />
                    <span className="min-w-0 truncate text-sm text-white">{cookie.name}</span>
                    {cookie.status !== "active" && (
                      <span className="shrink-0 rounded-md bg-red-500/12 px-1.5 py-0.5 text-[10px] font-medium text-red-300">
                        {cookie.status}
                      </span>
                    )}
                  </label>
                  {checked && (
                    <label className="flex shrink-0 items-center gap-1.5 text-xs text-ash">
                      <input
                        type="radio"
                        name="active-cookie"
                        checked={activeId === cookie.id}
                        onChange={() => setActiveId(cookie.id)}
                        className="size-3.5 accent-signal"
                      />
                      Active
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        )}

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
