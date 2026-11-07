"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type QuoteItem = {
  key: string; // slug + chosen options
  slug: string;
  name: string;
  image: string | null;
  opts: Record<string, string>;
  price: number | null;
  qty: number;
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

const QuoteContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "supreme-quote-v1";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<QuoteItem | null>(null);

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

  const add: Ctx["add"] = useCallback((item, qty = 1) => {
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
