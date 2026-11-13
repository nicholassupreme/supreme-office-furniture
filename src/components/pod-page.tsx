"use client";

import { useMemo, useState } from "react";
import { MadeInMalaysia } from "./made-in-malaysia";
import { useQuote } from "./quote-store";
import { IconWhatsApp } from "./icons";
import { rm, waLink } from "@/lib/site";
import Link from "next/link";
import type { PodContent } from "@/data/pods";

type Variant = { opts: Record<string, string>; price: number | null; image?: string | null };

const TABS = [
  ["description", "Description"],
  ["specs", "Specifications"],
  ["dimensions", "Dimensions"],
  ["delivery", "Delivery & installation"],
] as const;
type Tab = (typeof TABS)[number][0];

export type Sibling = { slug: string; code: string; label: string; price: number | null; image: string | null };

export function PodPage({
  slug,
  options,
  variants,
  content: c,
  siblings,
}: {
  slug: string;
  options: string[];
  variants: Variant[];
  content: PodContent;
  siblings: Sibling[];
}) {
  const { add } = useQuote();
  const gallery = c.gallery;
  const [active, setActive] = useState(0); // index into `gallery`
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  // Start on the colour whose photo is the first gallery image, so photo and selection agree
  const [sel, setSel] = useState<Record<string, string>>(() => {
    const co = options.find((o) => /exterior/i.test(o) && variants.some((v) => c.swatches[v.opts[o]]));
    const first = (co && variants.find((v) => c.swatches[v.opts[co]]?.image === c.gallery[0])) || variants[0];
    return first ? { ...first.opts } : {};
  });

  const values = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const o of options) m[o] = [];
    for (const v of variants) for (const o of options) if (v.opts[o] && !m[o].includes(v.opts[o])) m[o].push(v.opts[o]);
    return m;
  }, [options, variants]);

  const match = variants.find((v) => options.every((o) => v.opts[o] === sel[o]));
  const price = match?.price ?? null;
  const optText = options.map((o) => `${o}: ${sel[o]}`).join(", ");
  const colourOpt = options.find((o) => /exterior/i.test(o) && values[o].some((v) => c.swatches[v]));

  const pick = (o: string, val: string) => {
    let next = { ...sel, [o]: val };
    if (!variants.some((v) => options.every((k) => v.opts[k] === next[k]))) {
      const v = variants.find((v) => v.opts[o] === val);
      if (v) next = { ...v.opts };
    }
    setSel(next);
    const sw = c.swatches[next[o]];
    if (o === colourOpt && sw) {
      const i = sw.image ? gallery.indexOf(sw.image) : -1;
      if (i >= 0) setActive(i);
    }
  };

  const go = (d: number) => setActive((a) => (a + d + gallery.length) % gallery.length);
  const name = c.layoutLabel ? `${c.title.replace(/ Acoustic.*$/, "")} ${c.layoutCode ? c.layoutCode + " – " : "– "}${c.layoutLabel}` : c.title;

  return (
    <div>
      {/* ── Top: gallery + buy box ─────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <div className="min-w-0">
          <div className="relative mx-auto aspect-square w-full max-w-[680px] overflow-hidden rounded-3xl bg-white ring-1 ring-line/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[active]} alt={name} className="absolute inset-0 m-auto h-[96%] w-[96%] object-contain" fetchPriority="high" />
            <MadeInMalaysia className="absolute bottom-4 right-4 h-14 w-14" />
            <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink text-lg text-white shadow transition hover:bg-brand">‹</button>
            <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink text-lg text-white shadow transition hover:bg-brand">›</button>
          </div>
          <div className="mx-auto mt-3 flex max-w-[680px] gap-2 overflow-x-auto pb-1">
            {gallery.map((n, i) => (
              <button
                key={n}
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
                className={`aspect-square w-[72px] shrink-0 overflow-hidden rounded-lg bg-white ring-2 transition sm:w-[84px] ${i === active ? "ring-brand" : "ring-line/60 hover:ring-brand/40"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n} alt="" loading="lazy" className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-[680px] rounded-2xl bg-white px-4 py-3 ring-1 ring-line/60 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badges/pod-credentials.webp"
              alt="Made in Malaysia, eco friendly, FSC, CARB P2, scratch, stain and cigarette burn resistant"
              className="mx-auto h-auto w-full"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Ace Office Pods · {c.seats}</p>
          <h1 className="mt-2 text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[40px]">{c.title}</h1>
          {c.layoutLabel && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[13px] font-semibold text-brand">
              {c.layoutCode && <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] text-white">{c.layoutCode}</span>}
              {c.layoutLabel}
            </p>
          )}
          <p className="mt-2 text-[15px] text-muted">{c.tagline}</p>
          <p className="tabular mt-5 text-3xl font-semibold tracking-tight">
            {rm(price)}
            {!match && <span className="ml-2 text-sm font-normal text-muted">Combination unavailable</span>}
          </p>
          <p className="mt-1 text-[13px] text-muted">Excludes delivery, handling and installation. See charges below.</p>

          {siblings.length > 1 && (
            <div className="mt-6">
              <p className="text-sm font-semibold">Layout <span className="font-normal text-muted">· each layout has its own price</span></p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {siblings.map((l) => {
                  const on = l.slug === slug;
                  return (
                    <Link
                      key={l.slug}
                      href={`/products/${l.slug}`}
                      aria-current={on ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl border p-2.5 transition ${on ? "border-brand bg-brand-soft/50" : "border-line bg-surface hover:border-brand/50"}`}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-line/60">
                        {l.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={l.image} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                        )}
                      </span>
                      <span className="min-w-0 text-[13px] leading-snug">
                        <span className="block font-semibold">{l.code ? `${l.code} · ` : ""}{l.label}</span>
                        <span className="tabular text-muted">{rm(l.price)}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 border-y border-line py-5">
            {options.map((o) => {
              const swatched = o === colourOpt;
              return (
                <fieldset key={o} className="[&:not(:first-child)]:mt-5">
                  <legend className="text-sm">
                    <span className="font-semibold">{o}</span>
                    {sel[o] && <span className="text-muted"> · {sel[o]}</span>}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {values[o].map((val) => {
                      const on = sel[o] === val;
                      if (swatched && c.swatches[val]) {
                        return (
                          <button
                            key={val}
                            onClick={() => pick(o, val)}
                            title={val}
                            aria-label={val}
                            aria-pressed={on}
                            className={`h-11 w-11 rounded-full p-[3px] ring-2 transition ${on ? "ring-ink" : "ring-transparent hover:ring-line"}`}
                          >
                            <span className="block h-full w-full rounded-full ring-1 ring-black/10" style={c.swatches[val].tile ? { backgroundImage: `url(${c.swatches[val].tile})`, backgroundSize: "cover" } : { background: c.swatches[val].hex }} />
                          </button>
                        );
                      }
                      return (
                        <button
                          key={val}
                          onClick={() => pick(o, val)}
                          aria-pressed={on}
                          className={`rounded-xl border px-3.5 py-2 text-[13.5px] transition ${on ? "border-brand bg-brand text-white" : "border-line bg-surface hover:border-brand/50"}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                  {swatched && c.swatchNote && <p className="mt-2 text-xs text-muted">{c.swatchNote}</p>}
                </fieldset>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex h-12 items-center rounded-full border border-line bg-surface">
              <button className="h-full w-11 text-lg text-muted" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} inputMode="numeric" className="tabular w-10 bg-transparent text-center text-sm font-semibold outline-none" aria-label="Quantity" />
              <button className="h-full w-11 text-lg text-muted" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button
              disabled={!match}
              onClick={() => add({ slug, name, image: c.swatches[sel[colourOpt ?? ""]]?.image ?? gallery[0] ?? null, opts: sel, price }, qty)}
              className="h-12 flex-1 rounded-full bg-accent text-sm font-semibold text-white transition hover:bg-accent-ink disabled:opacity-40"
            >
              Add to quote
            </button>
          </div>
          <a
            href={waLink(`Hi Supreme, I'm interested in: ${name} (${optText}), qty ${qty}. https://www.supreme.com.my/products/${slug}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-wa text-sm font-semibold text-white transition hover:bg-wa-ink"
          >
            <IconWhatsApp className="h-4 w-4 text-white" /> Ask on WhatsApp
          </a>

          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface text-sm">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 p-4">
              <span className="font-semibold">Lead time</span>
              <span className="text-ink-2">{c.leadTime}</span>
              <span className="font-semibold">Delivery</span>
              <span className="text-ink-2">Free within Klang Valley. Other areas quoted separately.</span>
              <span className="font-semibold">Installation</span>
              <span className="text-ink-2">{c.install}</span>
            </div>
            <p className="border-t border-line bg-paper/60 px-4 py-3 text-[13px] text-ink-2">
              Please contact us before ordering to confirm colour, power needs, delivery location and installation access.
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <section className="mt-16 border-t border-line">
        <div role="tablist" className="-mb-px flex gap-1 overflow-x-auto">
          {TABS.map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`whitespace-nowrap border-t-2 px-4 py-4 text-sm font-semibold transition ${tab === k ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="prose-desc max-w-2xl">
                {c.intro.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <div className="rounded-2xl bg-surface p-6 ring-1 ring-line/70">
                <h3 className="text-sm font-semibold">Suitable for</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-2">
                  {c.suitableFor.map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oak" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-3xl space-y-8">
              {c.specs.map((g) => (
                <div key={g.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{g.title}</h3>
                  <dl className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface text-sm">
                    {g.rows.map(([k, v]) => (
                      <div key={k} className="grid gap-1 p-4 sm:grid-cols-[13rem_1fr] sm:gap-4">
                        <dt className="font-semibold">{k}</dt>
                        <dd className="text-ink-2 sm:text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}

          {tab === "dimensions" && (
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
              {c.drawing ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.drawing} alt={`${c.title} dimensions`} className="mx-auto w-full max-w-[420px] rounded-2xl bg-white" />
              ) : (
                <PodDiagram dims={c.dims} />
              )}
              <div>
                <ul className="space-y-3 text-sm">
                  {(
                    [
                      ["A", "Width", c.dims.w],
                      ["B", "Depth", c.dims.d],
                      ["C", "Height", c.dims.h],
                    ] as const
                  ).map(([l, n, v]) => (
                    <li key={l} className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-semibold text-white">{l}</span>
                      <span className="text-muted">{n}</span>
                      <span className="tabular font-semibold">{v} mm</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted">{c.drawing ? "External dimensions." : "External dimensions. Illustration only, not to scale."}</p>
              </div>
            </div>
          )}

          {tab === "delivery" && (
            <div className="max-w-2xl space-y-4 text-sm text-ink-2">
              <p>Listed prices do not include delivery, handling or installation. These depend on the location and the manpower needed to move the pod.</p>
              <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
                {[
                  ["Delivery", "Free within Klang Valley. Other areas have different charges."],
                  ["Installation", `${c.install.replace(/\.$/, "")}. Other areas have different charges.`],
                  ["Handling by lift", "Free."],
                  ["Handling by staircase", "+RM400 per staircase level."],
                  ["Lead time", c.leadTime],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 p-4">
                    <dt className="font-semibold text-ink">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* ── Fabric colour chart + detail photos ────────────────── */}
      {c.chart && (
        <section className="mt-6 rounded-3xl bg-surface p-6 ring-1 ring-line/70 md:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-[30px]">Exterior fabric colour chart</h2>
          <p className="mt-2 text-[15px] text-ink-2">Six acoustic fabrics. Tap a colour to see the pod in it.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {c.chart.map((t) => {
              const can = colourOpt && c.swatches[t.name];
              const on = colourOpt && sel[colourOpt] === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  disabled={!can}
                  onClick={() => colourOpt && pick(colourOpt, t.name)}
                  className={`group text-left ${can ? "" : "cursor-default"}`}
                >
                  <span className={`block aspect-[4/3] overflow-hidden rounded-2xl ring-1 transition ${on ? "ring-2 ring-brand" : "ring-line group-hover:ring-ink/30"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <span className="mt-2 block text-sm font-medium">{t.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {c.details && c.details.length > 1 && (
        <section className="mt-6 rounded-3xl bg-surface p-6 ring-1 ring-line/70 md:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-[30px]">Details</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {c.details.map((d) => (
              <figure key={d.title}>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-line/70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-2 text-sm text-ink-2">{d.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Feature blocks ─────────────────────────────────────── */}
      <section className="mt-6 space-y-5">
        {c.features.map((f, i) => (
          <div key={f.title} className="grid gap-5 md:grid-cols-2">
            <div className={`flex flex-col justify-center rounded-3xl bg-surface p-8 ring-1 ring-line/70 md:p-12 ${i % 2 ? "md:order-2" : ""}`}>
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-[30px]">{f.title}</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">{f.body}</p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white ring-1 ring-line/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={f.title} loading="lazy" className={`h-full w-full ${f.fit === "contain" ? "object-contain p-4" : "object-cover"}`} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

/** Simple front-view line drawing with A / B / C callouts, scaled from the real dimensions. */
function PodDiagram({ dims }: { dims: { w: number; d: number; h: number } }) {
  const H = 300;
  const s = H / dims.h;
  const w = dims.w * s;
  const d = dims.d * s * 0.4; // oblique depth
  const x0 = 70, y0 = 50;
  const dot = (cx: number, cy: number, l: string) => (
    <g>
      <circle cx={cx} cy={cy} r="11" fill="#16181d" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">{l}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 300 400" className="mx-auto w-full max-w-[320px]" role="img" aria-label="Pod dimensions diagram">
      {/* side + top faces */}
      <path d={`M${x0 + w} ${y0} l${d} ${-d * 0.6} v${H} l${-d} ${d * 0.6} z`} fill="#f3f1ec" stroke="#6b6f78" strokeWidth="1.2" />
      <path d={`M${x0} ${y0} l${d} ${-d * 0.6} h${w} l${-d} ${d * 0.6} z`} fill="#fff" stroke="#6b6f78" strokeWidth="1.2" />
      {/* front */}
      <rect x={x0} y={y0} width={w} height={H} rx="4" fill="#fff" stroke="#16181d" strokeWidth="1.6" />
      <rect x={x0 + 8} y={y0 + 8} width={w - 16} height={H - 16} rx="2" fill="none" stroke="#b9b6ad" strokeWidth="1" />
      <line x1={x0 + 8} y1={y0 + H * 0.52} x2={x0 + w - 8} y2={y0 + H * 0.52} stroke="#b9b6ad" strokeWidth="1" />
      <rect x={x0 + w - 22} y={y0 + H * 0.46} width="5" height="26" rx="2" fill="#16181d" />
      {/* C height */}
      <line x1={x0 - 22} y1={y0} x2={x0 - 22} y2={y0 + H} stroke="#6b6f78" strokeWidth="1" />
      {dot(x0 - 22, y0 + H / 2, "C")}
      {/* A width */}
      <line x1={x0} y1={y0 + H + 22} x2={x0 + w} y2={y0 + H + 22} stroke="#6b6f78" strokeWidth="1" />
      {dot(x0 + w / 2, y0 + H + 22, "A")}
      {/* B depth */}
      {dot(x0 + w + d + 14, y0 + H - 10, "B")}
    </svg>
  );
}
