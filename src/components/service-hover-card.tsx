"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { IconArrow } from "@/components/icons";

export type Service = {
  title: string;
  desc: string;
  anchor: string;
  img?: string;
  points: string[];
};

/**
 * Slim service bar. On mouse hover it grows into a square panel (bigger photo, details, checklist)
 * floating over its neighbours. Grow direction is picked so the panel stays on screen.
 * Click (or tap on mobile) opens the service on /services.
 */
export function ServiceHoverCard({ sv }: { sv: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<CSSProperties | null>(null);

  const open = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const extraW = r.width * 0.06; // grow 6% on each side
    const size = r.width + extraW * 2; // square: height = width
    const extraH = size - r.height;

    // horizontal: keep inside the viewport
    let left = -extraW;
    if (r.left + left < 12) left = 12 - r.left;
    if (r.left + left + size > vw - 12) left = vw - 12 - size - r.left;

    // vertical: centre on the bar, then nudge to stay below the sticky header and above the fold
    let top = -extraH / 2;
    const headerH = 130;
    if (r.top + top < headerH) top = Math.min(0, headerH - r.top);
    if (r.top + top + size > vh - 12)
      top = Math.max(-extraH, vh - 12 - size - r.top);

    setBox({ left, top, width: size, height: size });
  };

  const isOpen = box !== null;
  const style: CSSProperties = isOpen
    ? box
    : { left: 0, top: 0, width: "100%", height: "100%" };

  return (
    <div ref={ref} className={`relative h-[100px] ${isOpen ? "z-30" : "z-0"}`}>
      <Link
        href={`/services#${sv.anchor}`}
        onPointerEnter={open}
        onPointerLeave={() => setBox(null)}
        style={style}
        className={`absolute flex overflow-hidden rounded-2xl border transition-all duration-300 ease-out ${
          isOpen
            ? "flex-col border-transparent bg-gradient-to-br from-brand to-brand-ink text-white shadow-[0_28px_60px_-16px_rgba(49,39,131,0.6)]"
            : "flex-row items-center gap-4 border-line bg-surface p-2.5 pr-5"
        }`}
      >
        {/* Photo: small thumbnail in the bar, large banner when open */}
        {sv.img && (
          <div
            className={`relative shrink-0 overflow-hidden bg-white transition-all duration-300 ${
              isOpen ? "h-[52%] w-full rounded-none" : "h-20 w-20 rounded-xl"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sv.img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div
          className={`relative flex min-w-0 flex-1 flex-col ${isOpen ? "p-5" : ""}`}
        >
          <p
            className={`font-semibold tracking-tight ${isOpen ? "text-lg" : "text-[15px]"}`}
          >
            {sv.title}
          </p>
          <p
            className={`leading-snug ${
              isOpen
                ? "mt-1.5 text-[14px] text-white/85"
                : "mt-0.5 line-clamp-2 text-[13px] text-muted"
            }`}
          >
            {sv.desc}
          </p>

          {isOpen && (
            <>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white/90">
                {sv.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b93ff]" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[#c3c8ff]">
                Learn more <IconArrow className="h-4 w-4" />
              </p>
            </>
          )}
        </div>

        {!isOpen && (
          <IconArrow className="relative h-4 w-4 shrink-0 text-brand" />
        )}
      </Link>
    </div>
  );
}
