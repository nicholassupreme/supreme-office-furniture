"use client";

import { useMemo, useState } from "react";
import { useQuote } from "./quote-store";
import { IconWhatsApp } from "./icons";
import { rm, waLink } from "@/lib/site";
import { cleanName } from "./product-card";

type Variant = { opts: Record<string, string>; price: number | null; image?: string | null };

export function ProductBuy({
  slug,
  name,
  images,
  options,
  variants,
  basePrice,
  madeToOrder,
}: {
  slug: string;
  name: string;
  images: string[];
  options: string[];
  variants: Variant[];
  basePrice: number | null;
  madeToOrder: boolean;
}) {
  const { add } = useQuote();

  // Option values in the order they first appear
  const values = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const o of options) m[o] = [];
    for (const v of variants) for (const o of options) if (v.opts[o] && !m[o].includes(v.opts[o])) m[o].push(v.opts[o]);
    return m;
  }, [options, variants]);

  const [sel, setSel] = useState<Record<string, string>>(() => (variants[0] ? { ...variants[0].opts } : {}));
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  const match = variants.find((v) => options.every((o) => v.opts[o] === sel[o]));
  const price = variants.length ? (match?.price ?? null) : basePrice;
  const available = (o: string, val: string) =>
    variants.some((v) => v.opts[o] === val && options.every((k) => k === o || !sel[k] || v.opts[k] === sel[k]));

  const pick = (o: string, val: string) => {
    let next = { ...sel, [o]: val };
    if (!variants.some((v) => options.every((k) => v.opts[k] === next[k]))) {
      const v = variants.find((v) => v.opts[o] === val);
      if (v) next = { ...v.opts };
    }
    setSel(next);
    const v = variants.find((v) => options.every((k) => v.opts[k] === next[k]));
    if (v?.image) {
      const i = images.indexOf(v.image);
      if (i >= 0) setActive(i);
    }
  };

  const gallery = images.length ? images : [];
  const optText = options.map((o) => `${o}: ${sel[o]}`).join(", ");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
      {/* Gallery */}
      <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
        <div className="group/g relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-3xl bg-white ring-1 ring-line/70">
          {gallery[active] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[active]} alt={name} className="absolute inset-0 m-auto h-[82%] w-[82%] object-contain" fetchPriority="high" />
          )}
          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setActive((a) => (a - 1 + gallery.length) % gallery.length)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow ring-1 ring-line transition hover:bg-brand hover:text-white"
              >
                ‹
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % gallery.length)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow ring-1 ring-line transition hover:bg-brand hover:text-white"
              >
                ›
              </button>
              <span className="tabular absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white">
                {active + 1} / {gallery.length}
              </span>
            </>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="mx-auto mt-3 grid max-w-[640px] grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-7">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`aspect-square overflow-hidden rounded-xl bg-white ring-2 transition ${
                  i === active ? "ring-brand" : "ring-line/60 hover:ring-brand/40"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buy box */}
      <div>
        <h1 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[36px]">{cleanName(name)}</h1>
        <p className="tabular mt-4 text-2xl font-semibold tracking-tight md:text-[28px]">
          {rm(price)}
          {variants.length > 0 && !match && <span className="ml-2 text-sm font-normal text-muted">Combination unavailable</span>}
        </p>
        {madeToOrder && (
          <p className="mt-2 text-sm font-medium text-brand">Prices are negotiable. Ask us about custom sizes.</p>
        )}

        {options.map((o) => (
          <fieldset key={o} className="mt-7">
            <legend className="text-sm">
              <span className="font-semibold">{o}</span>
              {sel[o] && <span className="text-muted"> · {sel[o]}</span>}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {values[o].map((val) => {
                const on = sel[o] === val;
                const ok = available(o, val);
                return (
                  <button
                    key={val}
                    onClick={() => pick(o, val)}
                    className={`rounded-xl border px-3.5 py-2 text-[13.5px] transition ${
                      on
                        ? "border-brand bg-brand text-white"
                        : ok
                          ? "border-line bg-surface hover:border-brand/50"
                          : "border-dashed border-line bg-transparent text-muted"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="mt-8 flex gap-3">
          <div className="flex h-12 items-center rounded-full border border-line bg-surface">
            <button className="h-full w-11 text-lg text-muted" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <input
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              inputMode="numeric"
              className="tabular w-10 bg-transparent text-center text-sm font-semibold outline-none"
              aria-label="Quantity"
            />
            <button className="h-full w-11 text-lg text-muted" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button
            disabled={variants.length > 0 && !match}
            onClick={() =>
              add(
                { slug, name: cleanName(name), image: (match?.image ?? gallery[0]) || null, opts: options.length ? sel : {}, price },
                qty,
              )
            }
            className="h-12 flex-1 rounded-full bg-accent text-sm font-semibold text-white transition hover:bg-accent-ink disabled:opacity-40"
          >
            Add to quote
          </button>
        </div>
        <a
          href={waLink(
            `Hi Supreme, I'm interested in: ${cleanName(name)}${optText ? ` (${optText})` : ""}, qty ${qty}. https://www.supreme.com.my/products/${slug}`,
          )}
          className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-wa text-sm font-semibold text-white transition hover:bg-wa-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsApp className="h-4 w-4 text-white" /> Ask on WhatsApp
        </a>

        <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface text-sm">
          {[
            ["Made to order", "Not ready stock. We confirm the lead time with your quote."],
            ["Free delivery", "Within Klang Valley on orders above RM1,500."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3 p-4">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oak" />
              <span>
                <span className="font-semibold">{t}.</span> <span className="text-muted">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
