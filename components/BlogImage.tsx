import { ImageIcon } from "lucide-react";

/** Image slot for a blog post: the cover image and any inline screenshots.
 * No real images yet, so swap the placeholder div for an <img> (or
 * next/image) once one exists; aspect-video is what a real image should
 * match. `caption` renders underneath, same spot a real image's caption or
 * source credit would go. */
export function BlogImage({ caption }: { caption?: string }) {
  return (
    <figure className="my-2">
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-fg/15 bg-fg/[0.03] text-ash-dim">
        <ImageIcon className="size-8" strokeWidth={1.5} />
        <p className="text-sm">Image placeholder</p>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-ash-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
