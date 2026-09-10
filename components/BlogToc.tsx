"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog";

/** Sidebar table of contents that highlights whichever section is currently
 * under the sticky header as the reader scrolls. */
export function BlogToc({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState(toc[0]?.id);

  useEffect(() => {
    const headings = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    // ponytail: "first heading whose top has crossed the sticky header" is a
    // heuristic, not exact scroll math — good enough for a TOC, revisit the
    // margins if a very short last section stops lighting up.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="sticky top-28">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ash-dim">
        On this page
      </p>
      <ul className="mt-3 space-y-0.5 text-sm">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`block border-l-2 py-1 pl-4 transition-colors ${
                activeId === entry.id
                  ? "border-signal font-medium text-fg"
                  : "border-fg/8 text-ash hover:text-fg"
              }`}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
