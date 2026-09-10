import { ImageIcon } from "lucide-react";

/** Blog post cover image slot. No real image yet, just swap the contents
 * of this div for an <img> (or next/image) once one exists; the
 * aspect-video sizing is what a real cover image should match. */
export function BlogHero() {
  return (
    <div className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-fg/15 bg-fg/[0.03] text-ash-dim">
      <ImageIcon className="size-8" strokeWidth={1.5} />
      <p className="text-sm">Cover image placeholder</p>
    </div>
  );
}
