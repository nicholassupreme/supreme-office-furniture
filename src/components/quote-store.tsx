"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { track } from "@/lib/analytics";

export type QuoteItem = {
  key: string; // slug + chosen options
  slug: string;
  name: string;
  image: string | null;
  opts: Record<string, string>;
  price: number | null;
  qty: number;
  /** page to link back to, when it isn't a catalogue product (e.g. the workstation builder) */
  href?: string;
  /** heavy / bulky item (safes, pods): excluded from free delivery */
  noFreeDelivery?: boolean;
};

type Ctx = {
  items: QuoteItem[];
  count: number;
  ready: boolean;
  add: (item: Omit<QuoteItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  lastAdded: QuoteItem | null;
  dismissAdded: () => void;
};

/** Union by key, keeping the larger quantity, so merging the same basket twice never doubles it. */
function mergeBaskets(a: QuoteItem[], b: QuoteItem[]): QuoteItem[] {
  const out = new Map<string, QuoteItem>();
  for (const i of [...a, ...b]) {
    const have = out.get(i.key);
    out.set(i.key, have ? { ...have, qty: Math.max(have.qty, i.qty) } : i);
  }
  return [...out.values()];
}

const QuoteContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "supreme-quote-v1";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<QuoteItem | null>(null);
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id ?? null;
  const syncedFor = useRef<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  // Logged in: pull the saved basket from the server and merge it with whatever is on this device.
  useEffect(() => {
    if (!ready) return;
    if (!userId) {
      syncedFor.current = null;
      return;
    }
    if (syncedFor.current === userId) return;
    let cancelled = false;
    fetch("/api/basket")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { items: QuoteItem[] } | null) => {
        if (cancelled || !data) return;
        setItems((local) => mergeBaskets(data.items, local));
        syncedFor.current = userId;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [userId, ready]);

  // Logged in and merged: save every change back to the server (debounced).
  useEffect(() => {
    if (!ready || !userId || syncedFor.current !== userId) return;
    const t = setTimeout(() => {
      fetch("/api/basket", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      }).catch(() => {});
    }, 700);
    return () => clearTimeout(t);
  }, [items, userId, ready]);

  const add: Ctx["add"] = useCallback((item, qty = 1) => {
    track("add_to_quote", { item_name: item.name, qty });
    const key = item.slug + "|" + Object.entries(item.opts).map(([k, v]) => `${k}=${v}`).join("|");
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      const next = found
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { ...item, key, qty }];
      setLastAdded(next.find((i) => i.key === key) ?? null);
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      items,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      add,
      setQty: (key, qty) => setItems((p) => p.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))),
      remove: (key) => setItems((p) => p.filter((i) => i.key !== key)),
      clear: () => setItems([]),
      lastAdded,
      dismissAdded: () => setLastAdded(null),
    }),
    [items, ready, add, lastAdded],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
