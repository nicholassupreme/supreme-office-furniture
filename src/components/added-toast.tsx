"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuote } from "./quote-store";
import { authClient } from "@/lib/auth-client";
import { IconCheck, IconClose } from "./icons";
import { rm } from "@/lib/site";

const PROMPT_KEY = "supreme-account-prompt-hidden";

export function AddedToast() {
  const { lastAdded, dismissAdded, count } = useQuote();
  const { data: session, isPending } = authClient.useSession();
  const [hidePrompt, setHidePrompt] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the stored choice once on mount
      setHidePrompt(localStorage.getItem(PROMPT_KEY) === "1");
    } catch {}
  }, []);

  const showPrompt = !isPending && !session && !hidePrompt;

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(dismissAdded, showPrompt ? 9000 : 5000);
    return () => clearTimeout(t);
  }, [lastAdded, dismissAdded, showPrompt]);

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
      {showPrompt && (
        <div className="mt-3 rounded-xl bg-brand-soft px-3.5 py-3 text-xs leading-relaxed text-ink-2">
          <p>
            <span className="font-semibold text-ink">Create a free account</span> to save your quote on any device and
            keep a history of what you&apos;ve requested.
          </p>
          <div className="mt-2.5 flex items-center gap-4 text-sm">
            <Link
              href="/login?mode=signup&next=/quote"
              onClick={dismissAdded}
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              Create account
            </Link>
            <button
              onClick={() => {
                try {
                  localStorage.setItem(PROMPT_KEY, "1");
                } catch {}
                setHidePrompt(true);
              }}
              className="text-muted hover:text-ink"
            >
              Not now
            </button>
          </div>
        </div>
      )}
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
