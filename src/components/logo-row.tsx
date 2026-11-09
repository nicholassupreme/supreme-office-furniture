"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * One row of the client logo wall. Slides right to left on its own, pauses while the mouse is over it,
 * and can be dragged left or right with the mouse or a finger (with a little momentum on release).
 * The track holds the logos twice so the loop is seamless; when the second copy is hidden
 * (the row fits without moving), the row stays still and dragging is off.
 */
export function LogoRow({
  children,
  className = "",
  trackClassName = "",
  speed = 32,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  speed?: number; // px per second
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let loop = 0; // width of one copy of the logos; 0 = row is static
    let hovered = false;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0; // px per ms, from the drag
    let prev = performance.now();
    let raf = 0;

    const measure = () => {
      const copy = track.querySelector<HTMLElement>("[aria-hidden]");
      loop = copy && copy.offsetParent !== null ? track.scrollWidth / 2 : 0;
      row.style.cursor = loop ? "grab" : "";
    };
    const wrap = () => {
      if (!loop) return (x = 0);
      x = (((x % loop) - loop) % loop) as number;
    };
    const paint = () => {
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      if (loop && !dragging) {
        if (Math.abs(velocity) > 0.01) {
          x += velocity * dt; // momentum after a fling
          velocity *= 0.94;
        } else if (!hovered && !reduced) {
          x -= (speed * dt) / 1000;
        }
        wrap();
        paint();
      }
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      if (!loop || (e.pointerType === "mouse" && e.button !== 0)) return;
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      startOffset = x;
      velocity = 0;
      row.setPointerCapture(e.pointerId);
      row.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      if (Math.abs(e.clientX - startX) > 3) moved = true;
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      x = startOffset + (e.clientX - startX);
      wrap();
      paint();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (row.hasPointerCapture(e.pointerId)) row.releasePointerCapture(e.pointerId);
      row.style.cursor = loop ? "grab" : "";
      if (performance.now() - lastT > 80) velocity = 0; // held still before letting go: no fling
    };
    // A drag shouldn't count as a click on whatever is under the pointer
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && (hovered = true);
    const leave = () => (hovered = false);

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      wrap();
      paint();
    });
    ro.observe(row);
    ro.observe(track);

    row.addEventListener("pointerdown", down);
    row.addEventListener("pointermove", move);
    row.addEventListener("pointerup", up);
    row.addEventListener("pointercancel", up);
    row.addEventListener("pointerenter", enter);
    row.addEventListener("pointerleave", leave);
    row.addEventListener("click", click, true);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      row.removeEventListener("pointerdown", down);
      row.removeEventListener("pointermove", move);
      row.removeEventListener("pointerup", up);
      row.removeEventListener("pointercancel", up);
      row.removeEventListener("pointerenter", enter);
      row.removeEventListener("pointerleave", leave);
      row.removeEventListener("click", click, true);
    };
  }, [speed]);

  return (
    <div
      ref={rowRef}
      // pan-y: a vertical swipe on a phone still scrolls the page; a sideways one drags the row
      className={`select-none touch-pan-y ${className}`}
    >
      <ul ref={trackRef} className={`flex w-max will-change-transform ${trackClassName}`}>
        {children}
      </ul>
    </div>
  );
}
