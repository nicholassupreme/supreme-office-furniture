"use client";

import { useMemo, useState } from "react";
import { ProductCard, type CardData } from "./product-card";

type Item = CardData & { subs: string[]; dept: string };
type Facet = { slug: string; name: string };

const PRICE = [
  { id: "all", label: "Any price", test: () => true },
  { id: "u500", label: "Under RM500", test: (p: number) => p < 500 },
  { id: "500-1500", label: "RM500 – 1,500", test: (p: number) => p >= 500 && p < 1500 },
  { id: "1500-5000", label: "RM1,500 – 5,000", test: (p: number) => p >= 1500 && p < 5000 },
  { id: "5000+", label: "RM5,000 and up", test: (p: number) => p >= 5000 },
];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
];
const PAGE = 24;

export function CollectionBrowser({
  items,
  facets,
  facetKey,
}: {
  items: Item[];
  facets: Facet[]; // sub-categories (or departments on /collections/all)
  facetKey: "subs" | "dept";
}) {
  const [facet, setFacet] = useState<string>("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [shown, setShown] = useState(PAGE);

  const facetCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of items) {
      const keys = facetKey === "subs" ? it.subs : [it.dept];
      for (const k of keys) c[k] = (c[k] ?? 0) + 1;
    }
    return c;
  }, [items, facetKey]);

  const list = useMemo(() => {
    const pt = PRICE.find((p) => p.id === price)!.test;
    const out = items.filter(
      (it) =>
        (facet === "all" || (facetKey === "subs" ? it.subs.includes(facet) : it.dept === facet)) &&
        (price === "all" || (it.price != null && pt(it.price))),
    );
    if (sort === "price-asc") out.sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    if (sort === "price-desc") out.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [items, facet, facetKey, price, sort]);

  const visibleFacets = facets.filter((f) => facetCounts[f.slug]);
  const reset = (fn: () => void) => {
    fn();
    setShown(PAGE);
  };

  return (
    <div>
      {visibleFacets.length > 1 && (
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <Chip active={facet === "all"} onClick={() => reset(() => setFacet("all"))}>
            All <span className="opacity-60">{items.length}</span>
          </Chip>
          {visibleFacets.map((f) => (
            <Chip key={f.slug} active={facet === f.slug} onClick={() => reset(() => setFacet(f.slug))}>
              {f.name} <span className="opacity-60">{facetCounts[f.slug]}</span>
            </Chip>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
        <p className="tabular text-sm text-muted">
          {list.length} {list.length === 1 ? "product" : "products"}
        </p>
        <div className="flex gap-2">
          <Select label="Price" value={price} onChange={(v) => reset(() => setPrice(v))} options={PRICE.map((p) => [p.id, p.label])} />
          <Select label="Sort" value={sort} onChange={(v) => reset(() => setSort(v))} options={SORTS.map((s) => [s.id, s.label])} />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-medium">No products match these filters.</p>
          <button className="mt-3 text-sm font-medium text-brand underline" onClick={() => reset(() => { setFacet("all"); setPrice("all"); })}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.slice(0, shown).map((p, i) => (
            <ProductCard key={p.slug} p={p} priority={i < 4} />
          ))}
        </div>
      )}

      {shown < list.length && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="tabular text-sm text-muted">
            Showing {shown} of {list.length}
          </p>
          <button
            onClick={() => setShown((n) => n + PAGE * 2)}
            className="rounded-full border border-line bg-surface px-7 py-3 text-sm font-semibold hover:border-ink/30"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`tabular shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${
        active ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink-2 hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-full border border-line bg-surface pl-4 pr-9 text-sm font-medium outline-none focus:border-brand"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="m3 4.5 3 3 3-3" />
      </svg>
    </label>
  );
}
