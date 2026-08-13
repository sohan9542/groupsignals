"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Lock,
  Pause,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { SOURCE_LIMIT } from "@/lib/sources";
import { PLATFORM_LABEL, type WatchSource } from "@/lib/types";
import { AddSourceModal } from "./AddSourceModal";
import { EditIntentModal } from "./EditIntentModal";
import { PlatformIcon } from "./PlatformIcon";

export function SourceManager({ sources }: { sources: WatchSource[] }) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<WatchSource | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [, startTransition] = useTransition();

  const atLimit = sources.length >= SOURCE_LIMIT;
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

  async function mutate(id: string, action: "toggle" | "delete" | "scan", source?: WatchSource) {
    setBusyId(id);
    setError("");
    setNotice("");

    try {
      let response: Response;

      if (action === "delete") {
        response = await fetch(`/api/sources/${id}`, { method: "DELETE" });
      } else if (action === "toggle") {
        response = await fetch(`/api/sources/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: source?.status === "active" ? "paused" : "active",
          }),
        });
      } else {
        response = await fetch(`/api/sources/${id}/scan`, { method: "POST" });
      }

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "That didn't work.");
        return;
      }

      if (action === "scan") {
        setNotice("Scan started — matching leads land in your inbox as they come in.");
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
        <StatCard label="Watching" value={`${sources.length}/${SOURCE_LIMIT}`} icon={Sparkles} />
        <StatCard label="Active" value={active} icon={CheckCircle2} tone="signal" />
        <StatCard label="Needs attention" value={errored} icon={AlertCircle} tone={errored > 0 ? "warn" : undefined} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Sources</h2>
          {notice && <p className="mt-0.5 text-xs text-signal-bright">{notice}</p>}
          {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
        </div>

        <button
          type="button"
          onClick={() => setShowAdd(true)}
          disabled={atLimit}
          title={atLimit ? `You're watching ${SOURCE_LIMIT} sources already` : "Watch a group"}
          className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {sources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <p className="text-sm text-ash-dim">Nothing yet.</p>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="mt-3 text-sm font-medium text-signal-bright underline underline-offset-4 hover:text-signal"
          >
            Watch your first group
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-surface/50">
          {sources.map((source) => (
            <li key={source.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <PlatformIcon platform={source.platform} />
                    <h3 className="truncate text-sm font-semibold text-white">{source.name}</h3>
                    {source.requires_login && (
                      <Badge icon={Lock} label="Private" />
                    )}
                    <StatusPill status={source.status} />
                  </div>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-ash-dim hover:text-white"
                  >
                    {PLATFORM_LABEL[source.platform]}
                    <ExternalLink className="size-3" />
                  </a>

                  <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-ash">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-signal-bright" />
                    <p className="leading-relaxed">{source.intent || "No intent set."}</p>
                  </div>

                  {source.last_run_at && (
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-ash-dim">
                      <Clock className="size-3" />
                      Last scanned {new Date(source.last_run_at).toLocaleString()}
                    </p>
                  )}

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
                  <IconButton
                    label="Scan now"
                    busy={busyId === source.id}
                    onClick={() => mutate(source.id, "scan", source)}
                  >
                    <RefreshCw className="size-4" />
                  </IconButton>
                  <IconButton
                    label={source.status === "active" ? "Pause" : "Resume"}
                    busy={busyId === source.id}
                    onClick={() => mutate(source.id, "toggle", source)}
                  >
                    {source.status === "active" ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </IconButton>
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
    <div className="rounded-2xl border border-white/8 bg-surface/50 p-4">
      <div className="flex items-center gap-2 text-ash-dim">
        <Icon
          className={`size-4 ${
            tone === "signal" ? "text-signal-bright" : tone === "warn" ? "text-amber-400" : ""
          }`}
        />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Badge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-ash">
      <Icon className="size-3" />
      {label}
    </span>
  );
}

function StatusPill({ status }: { status: WatchSource["status"] }) {
  const styles: Record<string, string> = {
    active: "bg-signal/15 text-signal-bright",
    paused: "bg-white/8 text-ash",
    error: "bg-red-500/12 text-red-300",
  };

  return <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}>{status}</span>;
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
