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
export function ProjectHoverCard({
  p,
  priority = false,
}: {
  p: Project;
  priority?: boolean;
}) {
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
      setAnchor(
        r.left - grow < 16
          ? "left"
          : r.right + grow > vw - 16
            ? "right"
            : "center",
      );
    }
    setOpen(true);
  };

  // Expanded panel: ~1.8x wider, ~2.3x taller, anchored so it stays on screen.
  const sides = {
    left: ["0%", "-80%"],
    center: ["-40%", "-40%"],
    right: ["-80%", "0%"],
  }[anchor];
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
        <div
          className={`relative w-full shrink-0 overflow-hidden transition-all duration-300 ${open ? "h-[52%]" : "h-full"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverOf(p)}
            alt={`${p.type} – ${p.industry}`}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/0" />
          {!open && (
            <span className="tabular absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ink">
              {p.year}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-4">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b93ff]">
              {p.industry}
            </p>
            <p
              className={`mt-0.5 font-semibold leading-tight tracking-tight transition-all duration-300 ${open ? "text-lg md:text-xl" : "text-sm md:text-[15px]"}`}
            >
              {p.type}
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
            {p.size && (
              <span className="rounded-full bg-line px-2.5 py-1">{p.size}</span>
            )}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
            Furniture supplied
          </p>
          <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-ink-2">
            {p.supplied ? p.supplied.join(", ") : p.summary}
          </p>
          <p className="mt-auto pt-3 text-sm font-semibold text-brand">
            View project →
          </p>
        </div>
      </Link>
    </div>
  );
}
