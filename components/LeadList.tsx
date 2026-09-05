"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bookmark, Check, ExternalLink, Loader2, X } from "lucide-react";
import type { Lead, LeadStatus, WatchSource } from "@/lib/types";
import { PlatformIcon } from "./PlatformIcon";

const FILTERS: { label: string; value: LeadStatus | "all" }[] = [
  { label: "New", value: "new" },
  { label: "Saved", value: "saved" },
  { label: "Actioned", value: "replied" },
  { label: "Dismissed", value: "dismissed" },
  { label: "All", value: "all" },
];

export function LeadList({
  leads,
  sources,
  active,
}: {
  leads: Lead[];
  sources: Pick<WatchSource, "id" | "name">[];
  active: LeadStatus | "all";
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const sourceNames = new Map(sources.map((s) => [s.id, s.name]));

  async function setStatus(id: string, status: LeadStatus) {
    setBusyId(id);
    setError("");

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
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
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "new"
                ? "/dashboard/leads"
                : `/dashboard/leads?status=${filter.value}`
            }
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active === filter.value
                ? "bg-signal/15 text-signal-bright"
                : "text-ash hover:bg-fg/5 hover:text-fg"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {leads.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-fg/10 p-10 text-center text-sm text-ash-dim">
          No mentions here yet. Add a group on the Watchlist and hit scan.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="rounded-2xl border border-fg/8 bg-surface/50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <PlatformIcon platform={lead.platform} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">
                      {lead.author_name ?? "Unknown poster"}
                    </p>
                    <p className="truncate text-xs text-ash-dim">
                      {lead.source_id
                        ? (sourceNames.get(lead.source_id) ?? "Removed source")
                        : "Removed source"}{" "}
                      · {formatWhen(lead.posted_at ?? lead.discovered_at)}
                    </p>
                  </div>
                </div>

                {lead.status !== "new" && (
                  <span className="shrink-0 rounded-md bg-fg/8 px-2 py-0.5 text-[11px] font-medium capitalize text-ash">
                    {lead.status}
                  </span>
                )}
              </div>

              <blockquote className="mt-4 whitespace-pre-line rounded-xl border border-fg/8 bg-fg/[0.03] p-4 text-sm leading-relaxed text-fg/90">
                {lead.content}
              </blockquote>

              {lead.match_reason && (
                <p className="mt-3 text-xs italic text-ash">{lead.match_reason}</p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {lead.post_url && (
                  <a
                    href={lead.post_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-signal/30 bg-signal/10 px-3.5 py-2 text-xs font-semibold text-signal-bright transition hover:bg-signal/20"
                  >
                    Open post
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
                <ActionButton
                  busy={busyId === lead.id}
                  onClick={() => setStatus(lead.id, "replied")}
                  icon={<Check className="size-3.5" />}
                  label="Actioned"
                />
                <ActionButton
                  busy={busyId === lead.id}
                  onClick={() => setStatus(lead.id, "saved")}
                  icon={<Bookmark className="size-3.5" />}
                  label="Save"
                />
                <ActionButton
                  busy={busyId === lead.id}
                  onClick={() => setStatus(lead.id, "dismissed")}
                  icon={<X className="size-3.5" />}
                  label="Dismiss"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActionButton({
  busy,
  onClick,
  icon,
  label,
}: {
  busy: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-fg/10 px-3.5 py-2 text-xs font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg disabled:opacity-40"
    >
      {busy ? <Loader2 className="size-3.5 animate-spin" /> : icon}
      {label}
    </button>
  );
}

function formatWhen(iso: string): string {
  const then = new Date(iso).getTime();
  const minutes = Math.round((Date.now() - then) / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / (60 * 24))}d ago`;
}
