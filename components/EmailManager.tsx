"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Clock, Loader2, Plus, Star, Trash2, Zap } from "lucide-react";
import type { DigestMode, EmailDestination } from "@/lib/types";

export function EmailManager({
  destinations,
}: {
  destinations: EmailDestination[];
}) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  async function addAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setAdding(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Couldn't add that address.");
        return;
      }

      setAddress("");
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setAdding(false);
    }
  }

  async function patch(id: string, payload: Record<string, unknown>) {
    setBusyId(id);
    setError("");

    try {
      const response = await fetch(`/api/email/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  async function remove(id: string) {
    setBusyId(id);
    setError("");

    try {
      const response = await fetch(`/api/email/${id}`, { method: "DELETE" });
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
    <div className="space-y-8">
      <section className="rounded-2xl border border-fg/8 bg-surface/50 p-6">
        <h2 className="text-base font-semibold text-fg">Add an address</h2>
        <p className="mt-1.5 text-sm text-ash">
          Send leads to a shared inbox, a teammate, or a Zapier/n8n catch-all.
        </p>

        <form onSubmit={addAddress} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="destination-address" className="sr-only">
            Email address
          </label>
          <input
            id="destination-address"
            type="email"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="leads@youragency.com"
            className="min-w-0 flex-1 rounded-xl border border-fg/12 bg-fg/5 px-4 py-3 text-sm text-fg placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
          />
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-on-signal transition hover:bg-signal-bright disabled:opacity-50"
          >
            {adding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-base font-semibold text-fg">Delivering to</h2>

        <ul className="mt-4 space-y-3">
          {destinations.map((destination) => (
            <li
              key={destination.id}
              className="rounded-2xl border border-fg/8 bg-surface/50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium text-fg">
                      {destination.address}
                    </span>
                    {destination.is_primary && (
                      <span className="rounded-md bg-signal/15 px-2 py-0.5 text-[11px] font-medium text-signal-bright">
                        Primary
                      </span>
                    )}
                    {destination.status === "pending" ? (
                      <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                        Unverified — not receiving leads
                      </span>
                    ) : (
                      <span className="rounded-md bg-fg/8 px-2 py-0.5 text-[11px] font-medium text-ash">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-3 inline-flex rounded-lg border border-fg/10 p-0.5">
                    {(["instant", "daily"] as DigestMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        disabled={busyId === destination.id}
                        onClick={() => patch(destination.id, { digest: mode })}
                        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-40 ${
                          destination.digest === mode
                            ? "bg-signal/15 text-signal-bright"
                            : "text-ash hover:text-fg"
                        }`}
                      >
                        {mode === "instant" ? (
                          <Zap className="size-3" />
                        ) : (
                          <Clock className="size-3" />
                        )}
                        {mode === "instant" ? "Every lead" : "Daily digest"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {!destination.is_primary && destination.status === "verified" && (
                    <button
                      type="button"
                      title="Make primary"
                      aria-label="Make primary"
                      disabled={busyId === destination.id}
                      onClick={() => patch(destination.id, { makePrimary: true })}
                      className="rounded-lg border border-fg/10 p-2 text-ash transition-colors hover:bg-fg/5 hover:text-fg disabled:opacity-40"
                    >
                      <Star className="size-4" />
                    </button>
                  )}
                  {!destination.is_primary && (
                    <button
                      type="button"
                      title="Remove"
                      aria-label="Remove"
                      disabled={busyId === destination.id}
                      onClick={() => remove(destination.id)}
                      className="rounded-lg border border-fg/10 p-2 text-ash transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-40"
                    >
                      {busyId === destination.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-lg border border-fg/8 bg-fg/[0.03] px-3.5 py-2.5 text-xs leading-relaxed text-ash-dim">
          Your primary address can&apos;t be removed — demote it first by making
          another one primary.
        </p>
      </section>
    </div>
  );
}
