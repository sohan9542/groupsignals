"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Lock,
  Pause,
  Pencil,
  Play,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { PLATFORM_LABEL, type WatchSource } from "@/lib/types";
import { AddSourceModal } from "./AddSourceModal";
import { EditIntentModal } from "./EditIntentModal";
import { PlatformIcon } from "./PlatformIcon";
import { StatusPill } from "./StatusPill";

export function SourceManager({
  sources,
  groupLimit,
}: {
  sources: WatchSource[];
  /** From the caller's active subscription — zero means no plan at all, not
   *  a free tier, so the add flow needs a different message than "at limit".
   *  null means no limit at all (the admin account isn't a paying customer). */
  groupLimit: number | null;
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<WatchSource | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const noPlan = groupLimit === 0;
  const atLimit = noPlan || (groupLimit !== null && sources.length >= groupLimit);
  const active = sources.filter((s) => s.status === "active").length;
  const errored = sources.filter((s) => s.status === "error").length;

  async function addSource(data: { url: string; requiresLogin: boolean; intent: string }) {
    const response = await fetch("/api/sources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = (await response.json()) as { ok?: boolean; error?: string };

    if (result.ok) {
      startTransition(() => router.refresh());
      return { ok: true };
    }
    return { ok: false, error: result.error ?? "Couldn't add that one." };
  }

  async function saveIntent(id: string, intent: string) {
    const response = await fetch(`/api/sources/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent }),
    });
    const result = (await response.json()) as { ok?: boolean; error?: string };

    if (result.ok) {
      startTransition(() => router.refresh());
      return { ok: true };
    }
    return { ok: false, error: result.error ?? "Couldn't save that." };
  }

  async function mutate(id: string, action: "toggle" | "delete", source?: WatchSource) {
    setBusyId(id);
    setError("");

    try {
      const response =
        action === "delete"
          ? await fetch(`/api/sources/${id}`, { method: "DELETE" })
          : await fetch(`/api/sources/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                status: source?.status === "active" ? "paused" : "active",
              }),
            });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
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
        <StatCard
          label="Watching"
          value={groupLimit == null || noPlan ? `${sources.length}` : `${sources.length}/${groupLimit}`}
          icon={Sparkles}
        />
        <StatCard label="Active" value={active} icon={CheckCircle2} tone="signal" />
        <StatCard label="Needs attention" value={errored} icon={AlertCircle} tone={errored > 0 ? "warn" : undefined} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-fg">Sources</h2>
          {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
        </div>

        {noPlan ? (
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2.5 text-sm font-semibold text-on-signal transition hover:bg-signal-bright"
          >
            <Plus className="size-4" />
            Subscribe to add a group
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            disabled={atLimit}
            title={atLimit ? `Your plan covers ${groupLimit} group${groupLimit === 1 ? "" : "s"} already` : "Watch a group"}
            className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2.5 text-sm font-semibold text-on-signal transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="size-4" />
            Add
          </button>
        )}
      </div>

      {sources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-fg/10 p-10 text-center">
          {noPlan ? (
            <>
              <p className="text-sm text-ash-dim">Subscribe to a plan to start watching groups.</p>
              <Link
                href="/dashboard/billing"
                className="mt-3 inline-block text-sm font-medium text-signal-bright underline underline-offset-4 hover:text-signal"
              >
                See plans
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-ash-dim">Nothing yet.</p>
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="mt-3 text-sm font-medium text-signal-bright underline underline-offset-4 hover:text-signal"
              >
                Watch your first group
              </button>
            </>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-fg/8 overflow-hidden rounded-2xl border border-fg/8 bg-surface/50">
          {sources.map((source) => (
            <li key={source.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <PlatformIcon platform={source.platform} />
                    <h3 className="truncate text-sm font-semibold text-fg">{source.name}</h3>
                    {source.requires_login && (
                      <Badge icon={Lock} label="Private" />
                    )}
                    <StatusPill status={source.status} />
                  </div>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-ash-dim hover:text-fg"
                  >
                    {PLATFORM_LABEL[source.platform]}
                    <ExternalLink className="size-3" />
                  </a>

                  <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-fg/[0.03] px-3 py-2 text-xs text-ash">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-signal-bright" />
                    <p className="leading-relaxed">{source.intent || "No intent set."}</p>
                  </div>

                  {source.last_error && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-red-400">
                      <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                      {source.last_error}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <IconButton label="Edit intent" busy={false} onClick={() => setEditing(source)}>
                    <Pencil className="size-4" />
                  </IconButton>
                  {source.status !== "pending" && (
                    <IconButton
                      label={source.status === "active" ? "Pause" : "Resume"}
                      busy={busyId === source.id}
                      onClick={() => mutate(source.id, "toggle", source)}
                    >
                      {source.status === "active" ? <Pause className="size-4" /> : <Play className="size-4" />}
                    </IconButton>
                  )}
                  <IconButton
                    label="Remove"
                    destructive
                    busy={busyId === source.id}
                    onClick={() => mutate(source.id, "delete", source)}
                  >
                    <Trash2 className="size-4" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAdd && <AddSourceModal onClose={() => setShowAdd(false)} onSubmit={addSource} />}
      {editing && (
        <EditIntentModal
          source={editing}
          onClose={() => setEditing(null)}
          onSubmit={(intent) => saveIntent(editing.id, intent)}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "signal" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-fg/8 bg-surface/50 p-4">
      <div className="flex items-center gap-2 text-ash-dim">
        <Icon
          className={`size-4 ${
            tone === "signal" ? "text-signal-bright" : tone === "warn" ? "text-amber-400" : ""
          }`}
        />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 text-2xl font-semibold text-fg">{value}</p>
    </div>
  );
}

function Badge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-md bg-fg/8 px-2 py-0.5 text-[11px] font-medium text-ash">
      <Icon className="size-3" />
      {label}
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
      className={`rounded-lg border border-fg/10 p-2 transition-colors disabled:opacity-40 ${
        destructive
          ? "text-ash hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          : "text-ash hover:bg-fg/5 hover:text-fg"
      }`}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}
