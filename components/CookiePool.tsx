"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Clock,
  Loader2,
  Pause,
  Play,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import type { CookieStatus, FacebookCookiePoolEntry } from "@/lib/types";
import { CookieFormModal } from "./CookieFormModal";

export function CookiePool({ cookies }: { cookies: FacebookCookiePoolEntry[] }) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [replacing, setReplacing] = useState<FacebookCookiePoolEntry | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const active = cookies.filter((c) => c.status === "active").length;
  const banned = cookies.filter((c) => c.status === "banned").length;

  async function addCookie(data: { name?: string; cookies: string }) {
    const response = await fetch("/api/facebook-cookies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, cookies: data.cookies }),
    });
    const result = (await response.json()) as { ok?: boolean; error?: string };
    if (result.ok) {
      startTransition(() => router.refresh());
      return { ok: true };
    }
    return { ok: false, error: result.error ?? "Couldn't add that." };
  }

  async function replaceCookie(id: string, data: { cookies: string }) {
    const response = await fetch(`/api/facebook-cookies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookies: data.cookies }),
    });
    const result = (await response.json()) as { ok?: boolean; error?: string };
    if (result.ok) {
      startTransition(() => router.refresh());
      return { ok: true };
    }
    return { ok: false, error: result.error ?? "Couldn't save that." };
  }

  async function setStatus(id: string, status: CookieStatus) {
    setBusyId(id);
    setError("");
    try {
      const response = await fetch(`/api/facebook-cookies/${id}`, {
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

  async function remove(id: string) {
    setBusyId(id);
    setError("");
    try {
      const response = await fetch(`/api/facebook-cookies/${id}`, { method: "DELETE" });
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Pool size" value={`${cookies.length}/100`} />
        <StatCard label="Active" value={active} tone="signal" />
        <StatCard label="Banned" value={banned} tone={banned > 0 ? "warn" : undefined} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Cookie pool</h2>
          {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-bright"
        >
          <Plus className="size-4" />
          Add cookie
        </button>
      </div>

      {cookies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <p className="text-sm text-ash-dim">No cookies in the pool yet.</p>
          <p className="mt-1 text-xs text-ash-dim">
            Private-group sources will fail to scan until at least one is added.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-surface/50">
          {cookies.map((cookie) => (
            <li key={cookie.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{cookie.name}</h3>
                    <StatusPill status={cookie.status} />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-ash-dim">{cookie.id}</p>

                  {cookie.last_used_at && (
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-ash-dim">
                      <Clock className="size-3" />
                      Last used {new Date(cookie.last_used_at).toLocaleString()}
                    </p>
                  )}

                  {cookie.last_error && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-red-400">
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                      {cookie.last_error}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <IconButton label="Replace cookies" busy={busyId === cookie.id} onClick={() => setReplacing(cookie)}>
                    <RefreshCcw className="size-4" />
                  </IconButton>
                  {cookie.status === "disabled" ? (
                    <IconButton
                      label="Reactivate"
                      busy={busyId === cookie.id}
                      onClick={() => setStatus(cookie.id, "active")}
                    >
                      <Play className="size-4" />
                    </IconButton>
                  ) : (
                    cookie.status === "active" && (
                      <IconButton
                        label="Take out of rotation"
                        busy={busyId === cookie.id}
                        onClick={() => setStatus(cookie.id, "disabled")}
                      >
                        <Pause className="size-4" />
                      </IconButton>
                    )
                  )}
                  <IconButton
                    label="Remove"
                    destructive
                    busy={busyId === cookie.id}
                    onClick={() => remove(cookie.id)}
                  >
                    <Trash2 className="size-4" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAdd && <CookieFormModal mode="add" onClose={() => setShowAdd(false)} onSubmit={addCookie} />}
      {replacing && (
        <CookieFormModal
          mode="replace"
          existingName={replacing.name}
          onClose={() => setReplacing(null)}
          onSubmit={(data) => replaceCookie(replacing.id, { cookies: data.cookies })}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "signal" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface/50 p-4">
      <span className="text-xs font-medium uppercase tracking-wide text-ash-dim">{label}</span>
      <p
        className={`mt-1.5 text-2xl font-semibold ${
          tone === "signal" ? "text-signal-bright" : tone === "warn" ? "text-amber-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: CookieStatus }) {
  const styles: Record<CookieStatus, string> = {
    active: "bg-signal/15 text-signal-bright",
    disabled: "bg-white/8 text-ash",
    banned: "bg-red-500/12 text-red-300",
  };
  const icons: Record<CookieStatus, React.ComponentType<{ className?: string }>> = {
    active: CheckCircle2,
    disabled: Pause,
    banned: Ban,
  };
  const Icon = icons[status];

  return (
    <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      <Icon className="size-3" />
      {status}
    </span>
  );
}

function IconButton({
  label,
  children,
  onClick,
  busy,
  destructive,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  busy: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      title={label}
      aria-label={label}
      className={`rounded-lg border border-white/10 p-2 transition-colors disabled:opacity-40 ${
        destructive
          ? "text-ash hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          : "text-ash hover:bg-white/5 hover:text-white"
      }`}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}
