import { sendGAEvent } from "@next/third-parties/google";

/** Send a GA4 event. Safe to call anywhere on the client; never throws. */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  try {
    sendGAEvent("event", event, params);
  } catch {}
}
