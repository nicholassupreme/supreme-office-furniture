"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "supreme-cookie-notice-hidden";

export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the stored choice once on mount
      setShow(localStorage.getItem(KEY) !== "1");
    } catch {}
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  }

  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl rounded-2xl border border-line bg-surface p-4 text-sm shadow-lg">
      <p className="text-muted">
        We use cookies to keep your quote basket and to count visits so we can improve the site. See our{" "}
        <Link href="/pages/privacy-policy" className="underline">
          privacy policy
        </Link>
        .
      </p>
      <button onClick={dismiss} className="mt-3 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white">
        Got it
      </button>
    </div>
  );
}
