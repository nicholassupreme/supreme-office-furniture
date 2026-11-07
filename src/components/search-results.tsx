"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import { taxonomy } from "@/lib/taxonomy";

type Row = { s: string; n: string; d: string; c: string[]; p: number | null; m: number | null; i: string | null };

let cache: Promise<Row[]> | null = null;
const loadIndex = () => (cache ??= fetch("/search-index.json").then((r) => r.json()));

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [rows, setRows] = useState<Row[] | null>(null);
  const [input, setInput] = useState(q);

  useEffect(() => {
    loadIndex().then(setRows);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep the box in sync with the URL
    setInput(q);
  }, [q]);

  const results = useMemo(() => {
    if (!rows || !q.trim()) return [];
    const words = norm(q).split(" ").filter(Boolean);
    const catName = (r: Row) => norm([taxonomy.find((d) => d.slug === r.d)?.name ?? "", ...r.c.map((c) => c.replace(/-/g, " "))].join(" "));
    return rows
      .map((r) => {
        const name = norm(r.n);
        const hay = name + " " + catName(r);
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((s, w) => s + (name.includes(w) ? 2 : 1) + (name.startsWith(w) ? 1 : 0), 0);
        return { r, score };
      })
      .filter((x): x is { r: Row; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .map(({ r }) => r);
  }, [rows, q]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search?q=${encodeURIComponent(input.trim())}`);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search chairs, desks, cabinets…"
          autoFocus={!q}
          className="h-14 w-full rounded-2xl border border-line bg-surface px-5 text-lg outline-none focus:border-brand"
          aria-label="Search products"
        />
      </form>
      {q && (
        <p className="tabular mt-5 text-sm text-muted">
          {rows ? `${results.length} results for “${q}”` : "Searching…"}
        </p>
      )}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {results.slice(0, 96).map((r) => (
          <ProductCard key={r.s} p={{ slug: r.s, name: r.n, price: r.p, priceMax: r.m, image: r.i }} />
        ))}
      </div>
      {rows && q && results.length === 0 && (
        <p className="py-16 text-center text-muted">No products found. Try a simpler word, like “chair” or “cabinet”.</p>
      )}
    </div>
  );
}
