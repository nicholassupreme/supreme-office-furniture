"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuote } from "./quote-store";
import { IconCheck, IconClose } from "./icons";
import { rm } from "@/lib/site";

export function AddedToast() {
  const { lastAdded, dismissAdded, count } = useQuote();

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(dismissAdded, 5000);
    return () => clearTimeout(t);
  }, [lastAdded, dismissAdded]);

  if (!lastAdded) return null;
  const opts = Object.values(lastAdded.opts).join(" · ");
  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-[0_20px_50px_-20px_rgba(22,24,29,0.35)] md:bottom-6 md:left-auto md:right-6 md:mx-0"
    >
      <div className="flex items-start gap-3">
        {lastAdded.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={lastAdded.image} alt="" className="h-14 w-14 shrink-0 rounded-lg bg-white object-contain" />
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-wa">
            <IconCheck className="h-3.5 w-3.5" /> Added to quote
          </p>
          <p className="mt-1 truncate text-sm font-medium">{lastAdded.name}</p>
          <p className="truncate text-xs text-muted">
            {opts && `${opts} · `}
            {rm(lastAdded.price)}
          </p>
        </div>
        <button onClick={dismissAdded} className="-m-1 p-1 text-muted" aria-label="Dismiss">
          <IconClose className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Link
          href="/quote"
          onClick={dismissAdded}
          className="flex-1 rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-white"
        >
          View quote ({count})
        </Link>
        <button onClick={dismissAdded} className="flex-1 rounded-full border border-line py-2.5 text-sm font-medium">
          Keep browsing
        </button>
      </div>
    </div>
  );
}
