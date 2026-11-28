"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Counts every click on a WhatsApp link site-wide as a `whatsapp_click` event. */
export function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href*='wa.me']");
      if (!a) return;
      track("whatsapp_click", { page_path: window.location.pathname });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
