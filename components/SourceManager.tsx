"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { SOURCE_LIMIT, parseSourceUrl } from "@/lib/sources";
import { PLATFORM_LABEL, type WatchSource } from "@/lib/types";
import { PlatformIcon } from "./PlatformIcon";

export function SourceManager({ sources }: { sources: WatchSource[] }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");
  const [showKeywords, setShowKeywords] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [, startTransition] = useTransition();

  const atLimit = sources.length >= SOURCE_LIMIT;
  const preview = url.trim() ? parseSourceUrl(url) : null;
  const previewError = preview && "error" in preview ? preview.error : null;

  async function addSource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setAdding(true);

    try {
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, include, exclude }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Couldn't add that one.");
        return;
      }

      setUrl("");
      setInclude("");
      setExclude("");
      setShowKeywords(false);
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setAdding(false);
    }
  }

  async function mutate(
    id: string,
    action: "toggle" | "delete" | "scan",
    source?: WatchSource
  ) {
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
        setNotice("Scan started — leads land on the Leads page as they come in.");
      }

      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/8 bg-surface/50 p-6">
        <h2 className="text-base font-semibold text-white">Add a source</h2>
        <p className="mt-1.5 text-sm text-ash">
          Paste a public Facebook group or a subreddit link.
        </p>

        <form onSubmit={addSource} className="mt-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label htmlFor="source-url" className="sr-only">
                Group or subreddit link
              </label>
              <input
                id="source-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="facebook.com/groups/... or reddit.com/r/..."
                disabled={atLimit}
                className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={adding || atLimit || Boolean(previewError)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-50"
            >
              {adding ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              Add
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowKeywords((v) => !v)}
            className="mt-3 text-xs text-ash-dim underline underline-offset-4 hover:text-white"
          >
            {showKeywords ? "Hide keyword filters" : "Add keyword filters (optional)"}
          </button>

          {showKeywords && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="source-include"
                  className="block text-xs font-medium text-ash"
                >
                  Only alert me if the post mentions
                </label>
                <input
                  id="source-include"
                  type="text"
                  value={include}
                  onChange={(e) => setInclude(e.target.value)}
                  placeholder="looking for, need a, hiring, recommend"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="source-exclude"
                  className="block text-xs font-medium text-ash"
                >
                  Never alert me if it mentions
                </label>
                <input
                  id="source-exclude"
                  type="text"
                  value={exclude}
                  onChange={(e) => setExclude(e.target.value)}
                  placeholder="free, dm me, course, giveaway"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-ash-dim focus:border-signal/50 focus:outline-none"
                />
              </div>
              <p className="text-xs text-ash-dim sm:col-span-2">
                Comma separated. Leave the first box empty to get every new post
                from the source.
              </p>
            </div>
          )}

          {previewError && (
            <p className="mt-3 text-sm text-amber-400">{previewError}</p>
          )}
          {error && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
          {atLimit && (
            <p className="mt-3 text-sm text-amber-400">
              You&apos;re watching {SOURCE_LIMIT} sources — remove one to add another.
            </p>
          )}
        </form>

        <p className="mt-4 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-xs leading-relaxed text-ash-dim">
          We only read <span className="text-ash">public</span> Facebook groups.
          A private group can&apos;t be watched, and we&apos;ll flag it here if
          one turns out to be closed.
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-white">
            Watching{" "}
            <span className="text-ash-dim">
              ({sources.length}/{SOURCE_LIMIT})
            </span>
          </h2>
          {notice && <span className="text-xs text-signal-bright">{notice}</span>}
        </div>

        {sources.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-ash-dim">
            Nothing yet. Add your first group above.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {sources.map((source) => (
              <li
                key={source.id}
                className="rounded-2xl border border-white/8 bg-surface/50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <PlatformIcon platform={source.platform} />
                      <h3 className="truncate text-sm font-semibold text-white">
                        {source.name}
                      </h3>
                      <StatusPill source={source} />
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs text-ash-dim hover:text-white"
                    >
                      {PLATFORM_LABEL[source.platform]}
                      <ExternalLink className="size-3" />
                    </a>

                    {(source.include_keywords.length > 0 ||
                      source.exclude_keywords.length > 0) && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {source.include_keywords.map((word) => (
                          <span
                            key={`in-${word}`}
                            className="rounded-md bg-signal/12 px-2 py-0.5 text-[11px] text-signal-bright"
                          >
                            {word}
                          </span>
                        ))}
                        {source.exclude_keywords.map((word) => (
                          <span
                            key={`ex-${word}`}
                            className="rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] text-red-300/90 line-through"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    )}

                    {source.last_error && (
                      <p className="mt-3 flex items-start gap-1.5 text-xs text-red-400">
                        <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                        {source.last_error}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
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
                      {source.status === "active" ? (
                        <Pause className="size-4" />
                      ) : (
                        <Play className="size-4" />
                      )}
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
      </section>
    </div>
  );
}

function StatusPill({ source }: { source: WatchSource }) {
  if (source.platform === "reddit") {
    return (
      <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-300">
        Queued — Reddit coming soon
      </span>
    );
  }

  const styles: Record<string, string> = {
    active: "bg-signal/15 text-signal-bright",
    paused: "bg-white/8 text-ash",
    error: "bg-red-500/12 text-red-300",
  };

  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${styles[source.status]}`}
    >
      {source.status}
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
