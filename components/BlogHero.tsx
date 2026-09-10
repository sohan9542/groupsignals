import { ArrowDown, ArrowRight, Bell } from "lucide-react";

/** Blog post cover "image" — the rest of the site never uses stock photos
 * (see FounderNote), so this mirrors Hero's post-to-alert mock UI instead
 * of dropping in a generic laptop/phone photo. */
export function BlogHero() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-fg/10 bg-ink-soft/60 p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 signal-glow opacity-70"
      />
      <div className="relative flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
        <div className="w-full max-w-xs shrink-0 rounded-xl border border-fg/10 bg-surface/80 p-4 shadow-lg shadow-black/10">
          <p className="text-[11px] text-ash-dim">Springfield Homeowners Group</p>
          <p className="mt-2 text-sm leading-relaxed text-fg/90">
            &ldquo;Anyone know a good plumber? Water heater just died.&rdquo;
          </p>
        </div>

        <ArrowRight className="hidden size-5 shrink-0 text-ash-dim sm:block" />
        <ArrowDown className="size-5 shrink-0 self-center text-ash-dim sm:hidden" />

        <div className="flex w-full max-w-xs shrink-0 items-center gap-3 rounded-xl border border-signal/30 bg-signal/10 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-signal/15">
            <Bell className="size-4.5 text-signal-bright" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-fg">New match alert</p>
            <p className="text-xs text-ash-dim">Sent to your email</p>
          </div>
        </div>
      </div>
    </div>
  );
}
