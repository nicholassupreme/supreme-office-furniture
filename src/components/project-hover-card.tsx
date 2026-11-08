"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { coverOf, type Project } from "@/data/portfolio";

type Anchor = "left" | "center" | "right";

/**
 * Compact portfolio tile: shows only industry + client name.
 * On hover (mouse only) it grows into a larger panel with the full details.
 * Clicking anywhere opens the project page.
 * The grow direction is picked from the tile's position so it never spills off-screen.
 */
export function ProjectHoverCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<Anchor>("center");
  const [open, setOpen] = useState(false);

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // touch: just tap through to the page
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const grow = r.width * 0.4; // extra width on each side when centred
      const vw = document.documentElement.clientWidth;
      setAnchor(r.left - grow < 16 ? "left" : r.right + grow > vw - 16 ? "right" : "center");
    }
    setOpen(true);
  };

  // Expanded panel: ~1.8x wider, ~2.3x taller, anchored so it stays on screen.
  const sides = { left: ["0%", "-80%"], center: ["-40%", "-40%"], right: ["-80%", "0%"] }[anchor];
  const style = open
    ? { left: sides[0], right: sides[1], top: "-45%", bottom: "-85%" }
    : { left: "0%", right: "0%", top: "0%", bottom: "0%" };

  return (
    <div ref={ref} className={`relative aspect-[4/3] ${open ? "z-30" : "z-0"}`}>
      <Link
        href={`/portfolio/${p.slug}`}
        onPointerEnter={onEnter}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={style}
        className={`absolute flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out ${
          open ? "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]" : "shadow-none"
        }`}
      >
        {/* Photo */}
        <div className={`relative w-full shrink-0 overflow-hidden transition-all duration-300 ${open ? "h-[52%]" : "h-full"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverOf(p)}
            alt={`${p.client} – ${p.type}`}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/0" />
          <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-4">
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/75">{p.type}</p>
            <p className={`mt-0.5 font-semibold leading-tight tracking-tight transition-all duration-300 ${open ? "text-lg md:text-xl" : "text-sm md:text-[15px]"}`}>
              {p.client}
            </p>
          </div>
        </div>

        {/* Details – only visible when expanded */}
        <div
          className={`flex min-h-0 flex-1 flex-col p-4 transition-opacity duration-200 ${
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!open}
        >
          <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-ink-2">
            <span className="rounded-full bg-line px-2.5 py-1">{p.year}</span>
            {p.size && <span className="rounded-full bg-line px-2.5 py-1">{p.size}</span>}
            <span className="rounded-full bg-line px-2.5 py-1">{p.photos.length} photos</span>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">{p.summary}</p>
          {p.supplied && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
              <span className="font-semibold text-ink-2">Supplied: </span>
              {p.supplied.join(", ")}
            </p>
          )}
          <p className="mt-auto pt-3 text-sm font-semibold text-oak">View project →</p>
        </div>
      </Link>
    </div>
  );
}
