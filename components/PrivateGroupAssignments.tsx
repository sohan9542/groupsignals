"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, CheckCircle2, ExternalLink, Loader2, Pause, Settings2, Star } from "lucide-react";
import type { CookieStatus, FacebookCookiePoolEntry, PrivateGroupWithAssignments } from "@/lib/types";
import { AssignAccountsModal } from "./AssignAccountsModal";
import { PlatformIcon } from "./PlatformIcon";
import { StatusPill } from "./StatusPill";

export function PrivateGroupAssignments({
  groups,
  pool,
}: {
  groups: PrivateGroupWithAssignments[];
  pool: FacebookCookiePoolEntry[];
}) {
  const router = useRouter();
  const [managing, setManaging] = useState<PrivateGroupWithAssignments | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  async function makeActive(sourceId: string, cookieId: string) {
    setBusyId(sourceId);
    setError("");
    try {
      const response = await fetch(`/api/admin/private-groups/${sourceId}/assignments/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookieId }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "That didn't work.");
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  // Assigning an account only makes a group scannable — going live is a
  // separate, explicit call the admin makes here, never a side effect.
  async function setStatus(sourceId: string, status: "active" | "paused") {
    setBusyId(sourceId);
    setError("");
    try {
      const response = await fetch(`/api/admin/private-groups/${sourceId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "That didn't work.");
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  async function saveAssignments(sourceId: string, data: { cookieIds: string[]; activeCookieId: string }) {
    const response = await fetch(`/api/admin/private-groups/${sourceId}/assignments`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = (await response.json()) as { ok?: boolean; error?: string };
    if (result.ok) {
      startTransition(() => router.refresh());
      return { ok: true as const };
    }
    return { ok: false as const, error: result.error ?? "Couldn't save that." };
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-fg/10 p-10 text-center">
        <p className="text-sm text-ash-dim">No private groups submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-xs text-red-400">{error}</p>}

      <ul className="divide-y divide-fg/8 overflow-hidden rounded-2xl border border-fg/8 bg-surface/50">
        {groups.map((group) => {
          const active = group.assignments.find((a) => a.role === "active");
          const backups = group.assignments.filter((a) => a.role === "backup");
          const busy = busyId === group.id;

          return (
            <li key={group.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 gap-3">
                  <PlatformIcon platform="facebook" />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-fg">{group.name}</h3>
                      <StatusPill status={group.status} />
                    </div>
                    <p className="mt-0.5 text-[11px] text-ash-dim">
                      Submitted by {group.user_email ?? group.user_id}
                    </p>
                    <a
                      href={group.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-ash-dim hover:text-fg"
                    >
                      {group.url}
                      <ExternalLink className="size-3" />
                    </a>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-ash-dim">
                        Accounts
                      </span>
                      {active ? (
                        <AccountPill label={active.cookie.name} status={active.cookie.status} active />
                      ) : (
                        <span className="rounded-md bg-red-500/12 px-2 py-0.5 text-[11px] font-medium text-red-300">
                          No active account
                        </span>
                      )}
                      {backups.map((b) => (
                        <div key={b.id} className="flex items-center gap-1">
                          <AccountPill label={b.cookie.name} status={b.cookie.status} />
                          <button
                            type="button"
                            disabled={busy || b.cookie.status !== "active"}
                            onClick={() => makeActive(group.id, b.cookie.id)}
                            title="Make active"
                            className="rounded-md p-1 text-ash-dim transition-colors hover:bg-fg/8 hover:text-fg disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            {busy ? <Loader2 className="size-3 animate-spin" /> : <Star className="size-3" />}
                          </button>
                        </div>
                      ))}
                    </div>

                    {group.last_error && (
                      <p className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-red-500/8 px-3 py-2 text-xs text-red-400">
                        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                        {group.last_error}
                      </p>
                    )}
                    {!group.last_error && group.last_run_at && (
                      <p className="mt-2.5 text-[11px] text-ash-dim">
                        Last scanned {new Date(group.last_run_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {group.status === "active" ? (
                    <button
                      type="button"
                      onClick={() => setStatus(group.id, "paused")}
                      disabled={busy}
                      className="inline-flex items-center gap-2 rounded-xl border border-fg/10 px-3 py-2 text-xs font-medium text-ash transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Pause className="size-3.5" />}
                      Pause
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatus(group.id, "active")}
                      disabled={busy || !active}
                      title={active ? "Approve — this group goes live" : "Assign an active account first"}
                      className="inline-flex items-center gap-2 rounded-xl bg-signal px-3 py-2 text-xs font-semibold text-on-signal transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                      Approve
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setManaging(group)}
                    className="inline-flex items-center gap-2 rounded-xl border border-fg/10 px-3 py-2 text-xs font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
                  >
                    <Settings2 className="size-3.5" />
                    Manage accounts
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {managing && (
        <AssignAccountsModal
          group={managing}
          pool={pool}
          onClose={() => setManaging(null)}
          onSubmit={(data) => saveAssignments(managing.id, data)}
        />
      )}
    </div>
  );
}

function AccountPill({ label, status, active }: { label: string; status: CookieStatus; active?: boolean }) {
  const tone =
    status !== "active"
      ? "bg-red-500/12 text-red-300"
      : active
        ? "bg-signal/15 text-signal-bright"
        : "bg-fg/8 text-ash";

  return (
    <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${tone}`}>
      {active && <CheckCircle2 className="size-3" />}
      {label}
    </span>
  );
}
