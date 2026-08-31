import { Radar } from "lucide-react";

export function Logo({
  className = "",
  href = "#top",
}: {
  className?: string;
  /** Pages without the landing page's #top anchor pass "/" instead. */
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="GroupSignals home"
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 shadow-[0_0_20px_-4px_var(--color-signal)]">
        {/* Expanding ring reads as an active radar sweep behind the icon. */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-xl border border-signal/40 animate-radar"
        />
        <Radar className="relative size-5 text-signal-bright" strokeWidth={2} />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-fg">
        Group<span className="text-signal-bright">Signals</span>
      </span>
    </a>
  );
}
