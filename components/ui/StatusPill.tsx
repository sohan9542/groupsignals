import type { WatchStatus } from "@/lib/types";

const STYLES: Record<WatchStatus, string> = {
  active: "bg-signal/15 text-signal-bright",
  paused: "bg-fg/8 text-ash",
  error: "bg-red-500/12 text-red-300",
  pending: "bg-amber-500/12 text-amber-600",
};

const LABEL: Partial<Record<WatchStatus, string>> = {
  pending: "awaiting approval",
};

export function StatusPill({ status }: { status: WatchStatus }) {
  return (
    <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${STYLES[status]}`}>
      {LABEL[status] ?? status}
    </span>
  );
}
