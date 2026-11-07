"use client";

import { useCallback, useEffect, useState } from "react";
import { IconClose } from "./icons";

export function ProjectGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const go = useCallback((d: number) => setOpen((i) => (i == null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open == null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open, go]);

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            className="mb-3 block w-full overflow-hidden rounded-2xl bg-line md:mb-4"
            aria-label={`Open photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} photo ${i + 1}`} loading={i < 6 ? "eager" : "lazy"} className="w-full transition duration-500 hover:scale-[1.03]" />
          </button>
        ))}
      </div>

      {open != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95" onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[open]}
            alt={`${alt} photo ${open + 1}`}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white" aria-label="Close">
            <IconClose />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-xl text-white md:left-6"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-xl text-white md:right-6"
            aria-label="Next photo"
          >
            ›
          </button>
          <p className="tabular absolute bottom-5 text-sm text-white/70">
            {open + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
