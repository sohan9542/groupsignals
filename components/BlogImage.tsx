import { ImageIcon } from "lucide-react";

/** Image slot for a blog post: the cover image, inline screenshots, and
 * index-page card thumbnails. Pass `src` (a path under /public) once a real
 * image exists; omit it to fall back to a dashed placeholder box.
 * `className` overrides the default rounding, e.g. squaring off corners
 * inside a card that already clips to rounded-2xl. */
export function BlogImage({
  src,
  alt = "",
  caption,
  className = "rounded-2xl",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- a handful
        // of static blog images don't need next/image's optimizer config.
        <img
          src={src}
          alt={alt}
          className={`aspect-video w-full object-cover ${className}`}
        />
      ) : (
        <div
          className={`flex aspect-video w-full flex-col items-center justify-center gap-2 border border-dashed border-fg/15 bg-fg/[0.03] text-ash-dim ${className}`}
        >
          <ImageIcon className="size-8" strokeWidth={1.5} />
          <p className="text-sm">Image placeholder</p>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-ash-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
