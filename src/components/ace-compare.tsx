"use client";

import Link from "next/link";
import { useState } from "react";
import { rm } from "@/lib/site";
import { ACE_ROWS } from "@/data/ace-compare";

export type CompareCol = { id: string; slug: string; short: string; image: string | null; price: number | null; priceMax: number | null };

const COLLAPSED = 8;

export function AceCompare({ cols, currentId }: { cols: CompareCol[]; currentId: string }) {
  const [all, setAll] = useState(false);
  const rows = all ? ACE_ROWS : ACE_ROWS.slice(0, COLLAPSED);
  const grid = { gridTemplateColumns: `minmax(120px,150px) repeat(${cols.length}, minmax(120px,1fr))` };

  return (
    <section className="mt-20 border-t border-line pt-12" aria-labelledby="compare-h">
      <h2 id="compare-h" className="text-2xl font-semibold tracking-tight md:text-[30px]">Compare Ace pods</h2>
      <p className="mt-2 text-sm text-muted">From a one-person phone pod to a six-person meeting pod. Prices are the lowest across each model&apos;s layouts. A dash means it isn&apos;t stated.</p>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="min-w-[900px]">
          <div className="grid gap-x-3" style={grid}>
            <div />
            {cols.map((c) => {
              const cur = c.id === currentId;
              return (
                <div key={c.id} className="min-w-0">
                  <Link href={`/products/${c.slug}`} className={`block aspect-square overflow-hidden rounded-xl bg-white ring-1 ${cur ? "ring-2 ring-brand" : "ring-line/70"}`}>
                    {c.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt={c.short} loading="lazy" className="h-full w-full object-contain p-3" />
                    )}
                  </Link>
                  <p className="mt-3 text-sm font-semibold">{c.short}</p>
                  {cur && <p className="text-[11px] font-medium uppercase tracking-wider text-brand">You&apos;re viewing</p>}
                  <p className="tabular mt-1 text-lg font-semibold tracking-tight">
                    {c.priceMax != null && c.price != null && c.priceMax > c.price ? "From " : ""}
                    {rm(c.price)}
                  </p>
                  {cur ? (
                    <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-muted">This pod</span>
                  ) : (
                    <Link href={`/products/${c.slug}`} className="mt-2 inline-block border-b border-ink text-xs font-semibold uppercase tracking-wide hover:text-brand">
                      View details
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            {rows.map(([label, vals], i) => (
              <div key={label} className={`grid items-start gap-x-3 rounded-lg px-0 py-3.5 text-[13px] ${i % 2 === 0 ? "bg-surface" : ""}`} style={grid}>
                <div className="pl-3 text-muted">{label}</div>
                {cols.map((c) => (
                  <div key={c.id} className={`min-w-0 pr-2 ${vals[c.id] ? "text-ink" : "text-line"}`}>
                    {vals[c.id] ?? "—"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {ACE_ROWS.length > COLLAPSED && (
        <button onClick={() => setAll((v) => !v)} className="mt-4 border-b border-ink pb-0.5 text-xs font-semibold uppercase tracking-wide hover:text-brand">
          {all ? "See less ⌃" : `See all ${ACE_ROWS.length} specs ⌄`}
        </button>
      )}
    </section>
  );
}
