"use client";

import { useMemo, useState } from "react";
import { useQuote } from "./quote-store";
import { IconCheck, IconWhatsApp } from "./icons";
import { waLink } from "@/lib/site";
import {
  CABLES, DEFAULT_CONFIG, DEPTHS, FABRICS, HEIGHT_NOTE, IMG, LEGS, METAL, PARTITION_FRAMES, RACEWAYS, SEATS, STORAGE,
  STYLES, TOP_COLOURS, WIDTHS, resolve, swatch,
  type Config, type FabKey, type Resolved,
} from "@/lib/workstation-config";

type Opt = {
  key: string;
  label: string;
  sub?: string;
  selected: boolean;
  onPick: () => void;
  swatch?: string;
  img?: string;
  block?: string;
};

function Step({ n, title, hint, note, children }: { n: number; title: string; hint?: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">{n}</span>
        <div>
          <h2 className="text-[17px] font-semibold leading-snug">{title}</h2>
          {hint && <p className="text-[13px] text-muted">{hint}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
      {note && <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-[13px] text-ink-2">{note}</p>}
    </section>
  );
}

function Options({ opts }: { opts: Opt[] }) {
  const cards = opts.some((o) => o.img || o.block);
  return (
    <div className="flex flex-wrap gap-2.5">
      {opts.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={o.selected}
          onClick={o.onPick}
          className={`flex min-h-11 rounded-[10px] border-2 text-left text-sm transition ${
            cards ? "w-[calc(50%-5px)] flex-col items-stretch gap-2 p-2 pb-2.5 sm:w-[172px]" : "items-center gap-2.5 px-3.5 py-2"
          } ${o.selected ? "border-brand bg-brand-soft text-ink" : "border-line bg-surface text-ink-2 hover:border-ink/25"}`}
        >
          {o.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={o.img} alt="" className="h-[92px] w-full rounded-md bg-paper object-contain p-1.5" />
          )}
          {o.block && <span aria-hidden className="block h-[92px] rounded-md" style={{ background: o.block }} />}
          {o.swatch && (
            <span aria-hidden className="h-[22px] w-[22px] shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]" style={{ background: o.swatch }} />
          )}
          <span className={`flex flex-col ${cards ? "px-1.5" : ""}`}>
            <span className="font-semibold">{o.label}</span>
            {o.sub && <span className="text-xs font-normal text-muted">{o.sub}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}

function FabricGrid({ value, onPick }: { value: string; onPick: (n: string) => void }) {
  return (
    <>
      <div className="grid max-w-[600px] grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-2.5">
        {FABRICS.map(([n, hex]) => (
          <button
            key={n}
            type="button"
            title={n}
            aria-label={n}
            aria-pressed={value === n}
            onClick={() => onPick(n)}
            className={`aspect-square min-h-10 rounded-[10px] border border-black/15 ${value === n ? "ring-2 ring-brand ring-offset-2" : ""}`}
            style={{ background: hex }}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Colours on screen are a guide. Ask us for a physical fabric sample.</p>
    </>
  );
}

/** Top view of the whole set, drawn in millimetres */
function TopView({ r }: { r: Resolved }) {
  const { c, bb, endSeat, noPart, cols, rows } = r;
  const pad = 150, chair = 620;
  const W = cols * c.w + pad * 2 + (endSeat ? c.d + chair : 0);
  const H = bb ? pad * 2 + chair * 2 + c.d * 2 : pad * 2 + c.d + chair;
  const y0 = bb ? pad + chair : pad;
  const top = swatch(TOP_COLOURS, c.top);
  const els: React.ReactNode[] = [];
  let k = 0;
  const desk = (x: number, y: number, w: number, h: number) =>
    els.push(<rect key={k++} x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={10} fill={top} stroke="#6b6f78" strokeWidth={10} />);
  const ped = (x: number, y: number, w: number, h: number) =>
    els.push(<rect key={k++} x={x} y={y} width={w} height={h} rx={12} fill="none" stroke="#6b6f78" strokeWidth={10} strokeDasharray="34 22" />);
  const seat = (cx: number, cy: number) => els.push(<circle key={k++} cx={cx} cy={cy} r={230} fill="#3a3e47" />);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = pad + col * c.w, y = y0 + row * c.d;
      desk(x, y, c.w, c.d);
      if (c.storage !== "none") ped(x + c.w - 470, row === 0 && bb ? y + 40 : y + c.d - 540, 420, 500);
      seat(x + c.w / 2, bb && row === 0 ? y - 310 : y + c.d + 310);
    }
  }
  if (endSeat) {
    const ex = pad + cols * c.w, spine = y0 + c.d;
    desk(ex, spine - c.w / 2, c.d, c.w);
    if (c.storage !== "none") ped(ex + c.d - 540, spine + c.w / 2 - 470, 500, 420);
    seat(ex + c.d + 310, spine);
  }
  if (!noPart) {
    const fill =
      c.pstyle === "glass" ? "rgba(190,215,205,0.95)"
        : c.pstyle === "acrylic" ? "#f4f4f2"
          : r.fabSlots.length ? swatch(FABRICS, c.fab) : "#cfe3e8";
    const t = Math.max(30, c.thick * 2.4);
    const spineY = bb ? y0 + c.d : y0;
    els.push(<rect key={k++} x={pad} y={spineY - t / 2} width={cols * c.w} height={t} fill={fill} stroke="#6b6f78" strokeWidth={4} />);
    for (let col = 0; col <= cols; col++) {
      els.push(<rect key={k++} x={pad + col * c.w - t / 2} y={y0} width={t} height={rows * c.d} fill={fill} stroke="#6b6f78" strokeWidth={4} />);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="max-h-full w-full" role="img" aria-label={`Top view of a ${c.seats}-seater ${r.summary[0][1]} workstation`}>
      {els}
    </svg>
  );
}

/** Front view of one partition panel, top to bottom */
function FrontView({ r }: { r: Resolved }) {
  const { c, stand, race, sys } = r;
  const F = (k: FabKey) => swatch(FABRICS, c[k]);
  const GLAZE = c.glaze === "Polycarbonate" ? "repeating-linear-gradient(0deg,#eef0ee 0 3px,#e1e4e1 3px 4px)" : "linear-gradient(135deg,#e6f2f4,#bcd6dd)";
  const K: Record<string, string> = {
    glaze: GLAZE,
    fglass: "linear-gradient(135deg,#e6f2f4,#bcd6dd)",
    fpoly: "repeating-linear-gradient(0deg,#eef0ee 0 3px,#e1e4e1 3px 4px)",
    wb: "#ffffff",
    race: "#45484e",
  };
  const H = c.ph;
  let segs: [number, string][] = [];
  if (c.thick === 16) segs = [[H, F("fab")]];
  else if (!stand && c.thick === 18) {
    const [a, b] = ({ 300: [200, 100], 450: [250, 200], 600: [300, 300] } as Record<number, number[]>)[H] ?? [H / 2, H / 2];
    segs = ({
      solid: [[H, F("fab")]], two: [[a, F("fab2")], [b, F("fab")]], half: [[a, "glaze"], [b, F("fab")]],
      wb: [[a, "wb"], [b, F("fab")]], fullglass: [[H, "fglass"]], fullpoly: [[H, "fpoly"]],
    } as Record<string, [number, string][]>)[c.pstyle] ?? [];
  } else if (!stand && c.thick === 30) {
    const a = H === 350 ? 150 : 200, b = H - a;
    const topK = c.pstyle === "half" ? "glaze" : c.pstyle === "two" ? F("fab2") : F("fab");
    segs = race === "MR" ? [[a, topK], [100, "race"], [b - 100, F("fab")]] : [[a, topK], [b, F("fab")]];
  } else if (stand) {
    const win = Math.min(450, Math.round(H * 0.35));
    const g = Math.round(H * 0.45);
    const top = ({
      solid: [], two: [[300, F("fab2")]], three: [[300, F("fab2")], [200, F("fab3")]], half: [[win, "glaze"]],
      half2: [[200, F("fab2")], [win, "glaze"]], wb2: [[200, F("fab2")], [300, "wb"]], full: [[H, "glaze"]], two2g: [[g, "glaze"], [H - g, "glaze"]],
    } as Record<string, [number, string][]>)[c.pstyle] ?? [];
    const at = (y: number) => { let acc = 0; for (const [mm, kk] of top) { if (y < acc + mm) return kk; acc += mm; } return F("fab"); };
    const kindAt = (y: number) => {
      const up = H - y;
      if ((race === "MR" || race === "DR") && up > 800 && up <= 900) return "race";
      if ((race === "BR" || race === "DR") && up <= 100) return "race";
      return at(y);
    };
    let cur = "", len = 0;
    for (let y = 0; y < H; y += 10) {
      const kk = kindAt(y);
      if (kk === cur) len += 10;
      else { if (cur) segs.push([len, cur]); cur = kk; len = 10; }
    }
    if (cur) segs.push([len, cur]);
  }
  const h = Math.max(28, Math.min(150, Math.round((120 * H) / c.w)));
  const frame = swatch(PARTITION_FRAMES, c.pframe);
  return (
    <div
      aria-hidden
      className="flex w-[120px] shrink-0 flex-col overflow-hidden"
      style={{
        height: h,
        ...(sys.frame
          ? { border: `3px solid ${frame}`, borderBottomWidth: sys.sides && c.sides === "3" ? 0 : 3, borderRadius: 2 }
          : { borderRadius: 8, boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }),
      }}
    >
      {segs.map(([mm, kk], i) => (
        <div key={i} style={{ flex: `${mm} 0 0`, background: K[kk] ?? kk, borderTop: i ? "1px solid rgba(0,0,0,0.12)" : undefined }} />
      ))}
    </div>
  );
}

export function WorkstationBuilder() {
  const [cfg, setCfg] = useState<Config>(DEFAULT_CONFIG);
  const [added, setAdded] = useState(false);
  const { add } = useQuote();
  const r = useMemo(() => resolve(cfg), [cfg]);
  const c = r.c;
  const set = (patch: Partial<Config>) => () => {
    setAdded(false);
    setCfg((p) => ({ ...resolve({ ...p, ...patch }).c }));
  };
  const opt = (key: string, label: string, selected: boolean, patch: Partial<Config>, extra: Partial<Opt> = {}): Opt =>
    ({ key, label, selected, onPick: set(patch), ...extra });

  const steps: { title: string; hint?: string; note?: string; body: React.ReactNode }[] = [];
  const push = (title: string, body: React.ReactNode, hint?: string, note?: string) => steps.push({ title, hint, note, body });

  push("Number of seaters", <Options opts={SEATS.map((n) => opt(String(n), String(n), c.seats === n, { seats: n }, { sub: n === 1 ? "seater" : "seaters" }))} />,
    "How many people share one set.", "Need more than 12? Order several sets, or send us your floor plan.");
  push("Layout", c.seats === 1 ? <p className="text-sm text-ink-2">A 1-seater is always linear.</p> : (
    <Options opts={[
      opt("lin", "Linear", !r.bb, { layout: "lin" }, { sub: "Side by side, facing the same way" }),
      opt("bb", r.odd ? "Back-to-back + end seat" : "Back-to-back", r.bb, { layout: "bb" }, { sub: r.odd ? "Two rows facing each other, one desk across the end" : "Two rows facing each other" }),
    ]} />
  ), "How the desks face each other.", c.seats > 6 && !r.bb ? `Tip: ${c.seats} desks in one line runs long. Back-to-back saves floor space.` : undefined);
  push("Top width per seat", <Options opts={WIDTHS.map((v) => opt(String(v), `${v} mm`, c.w === v, { w: v }, { sub: v === 1500 ? "Most popular" : undefined }))} />, "Each person’s desk width.");
  push("Top depth", <Options opts={DEPTHS.map((v) => opt(String(v), `${v} mm`, c.d === v, { d: v }))} />, "Front to back of each desk.");
  push("Top colour", <Options opts={TOP_COLOURS.map(([n, hex]) => opt(n, n, c.top === n, { top: n }, { swatch: hex }))} />, "Laminate finish for all tops.");
  push("Partition type", <Options opts={[
    opt("none", "None", r.noPart, { sys: "none" }, { sub: "Open desks, no screens", img: IMG.none }),
    opt("hang", "Desk-mounted", c.sys === "hang", { sys: "hang", thick: 18, pstyle: "two", ph: 450 }, { sub: "Screens fixed onto the desks", img: IMG.hang }),
    opt("stand", "Floor-standing", r.stand, { sys: "stand", thick: 30, pstyle: "two", ph: 1200 }, { sub: "Full panels, desks fixed to them", img: IMG.stand }),
  ]} />, "How the screens are fixed.", r.stand ? "The desks are carried by the panels, so there are no table legs to choose." : undefined);

  if (!r.noPart) {
    push("Partition thickness", <Options opts={r.systems.map((s) => opt(String(s.t), `${s.t} mm`, c.thick === s.t, { thick: s.t }, { sub: s.sub }))} />,
      "Each thickness is a different partition system.");
    push("Panel style", <Options opts={r.sys.styles.map((id) => opt(id, STYLES[id].label, c.pstyle === id, { pstyle: id }, { sub: STYLES[id].sub, img: STYLES[id].img }))} />,
      r.sys.styles.length > 1 ? "What the panel is made of." : "This thickness comes in one style.",
      c.thick === 6 ? "Glass and acrylic screens come in 1050, 1350 or 1650 mm widths. We match the closest size to your desk." : undefined);
    push(r.stand ? "Panel height" : "Partition height", <Options opts={r.heights.map((v) => opt(String(v), `${v} mm`, c.ph === v, { ph: v }, { sub: HEIGHT_NOTE[v] }))} />,
      r.heights.length === 1 ? "This partition comes in one height." : r.stand ? "Measured from the floor." : "Measured above the desktop.");
    if (r.style.glaze) {
      push("Window material", <Options opts={[
        opt("Glass", "Clear glass", c.glaze === "Glass", { glaze: "Glass" }),
        opt("Polycarbonate", "Polycarbonate", c.glaze === "Polycarbonate", { glaze: "Polycarbonate" }, { sub: "Lighter, shatter-resistant" }),
      ]} />, "For the see-through section.");
    }
    if (r.races) {
      push("Cable raceway", <Options opts={r.races.map((id) => opt(id, RACEWAYS[id][0], c.race === id, { race: id }, { sub: RACEWAYS[id][1] }))} />,
        r.races.length > 1 ? "A channel in the panel that hides cables and holds sockets." : "This style comes with a base raceway.");
    }
    if (r.sys.sides) {
      push("Frame", <Options opts={[
        opt("4", "4-sided frame", c.sides === "4", { sides: "4" }, { sub: "Framed on all edges" }),
        opt("3", "3-sided frame", c.sides === "3", { sides: "3" }, { sub: "Bottom edge unframed" }),
      ]} />, "How much of the screen edge is framed.");
    }
    if (r.sys.frame) {
      push("Partition frame colour", <Options opts={PARTITION_FRAMES.map(([n, hex]) => opt(n, n, c.pframe === n, { pframe: n }, { swatch: hex }))} />,
        "Colour of the aluminium frame around each panel.");
    }
    r.fabSlots.forEach(([title, key]) =>
      push(title, <FabricGrid value={c[key]} onPick={(n) => set({ [key]: n } as Partial<Config>)()} />, `${FABRICS.length} fabric colours. Selected: ${c[key]}`));
    if (r.tunnelOk) {
      push("Wire tunnel", <Options opts={[
        opt("no", "No", !c.tunnel, { tunnel: false }),
        opt("yes", "Yes, add wire tunnel", c.tunnel, { tunnel: true }, { sub: "100 mm channel" }),
      ]} />, "Runs cables inside the panel, from the floor up to the raceway.");
    }
  }
  if (!r.stand) {
    push("Table leg", <Options opts={LEGS.map((l) => opt(l.id, l.label, c.leg === l.id, { leg: l.id }, { sub: l.sub, img: l.img }))} />, "What holds the desk up.");
    if (r.legColours.length) {
      push("Leg colour", <Options opts={METAL.filter(([n]) => r.legColours.includes(n)).map(([n, css]) => opt(n, n, c.legColour === n, { legColour: n }, { swatch: css }))} />,
        r.legColours.length > 1 ? "Metal finish." : "This leg comes in one finish.");
    }
  }
  push("Cable management", <Options opts={CABLES.map(([k, l, s]) => ({
    key: k, label: l, sub: s, selected: c.cables.includes(k),
    onPick: set({ cables: c.cables.includes(k) ? c.cables.filter((x) => x !== k) : [...c.cables, k] }),
  }))} />, "Pick any that apply.");
  push("Storage", <Options opts={STORAGE.map(([k, l, s]) => opt(k, l, c.storage === k, { storage: k }, { sub: s || undefined }))} />, "One unit per seat.");

  const fmt = (n: number) => n.toLocaleString("en-MY");
  const name = `Custom ${c.seats}-seater workstation`;
  const message = [
    "Hi Supreme, I'd like a quotation for this workstation setup:",
    "",
    ...r.summary.map(([k, v]) => `${k}: ${v}`),
    `Overall footprint: ${fmt(r.footW)} × ${fmt(r.footD)} mm`,
    `Sets: ${c.qty}`,
    `Config code: ${r.code}`,
  ].join("\n");

  const addToQuote = () => {
    add(
      {
        slug: "workstation-builder",
        href: "/workstations/build",
        name,
        image: r.noPart ? IMG.none : r.stand ? IMG.stand : IMG.hang,
        opts: Object.fromEntries([...r.summary, ["Config code", r.code]]),
        price: null,
      },
      c.qty,
    );
    setAdded(true);
  };

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3.5">
        <a href="#your-workstation" className="self-start rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-brand lg:hidden">
          See your preview and summary ↓
        </a>
        {steps.map((s, i) => (
          <Step key={s.title} n={i + 1} title={s.title} hint={s.hint} note={s.note}>{s.body}</Step>
        ))}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">{steps.length + 1}</span>
            <div>
              <h2 className="text-[17px] font-semibold leading-snug">How many sets?</h2>
              <p className="text-[13px] text-muted">One set = the full layout shown in the preview.</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-[10px] border border-line p-1">
            <button type="button" aria-label="Fewer sets" onClick={set({ qty: Math.max(1, c.qty - 1) })} className="h-11 w-11 rounded-lg bg-paper text-xl">−</button>
            <span className="min-w-12 text-center text-[17px] font-semibold" aria-live="polite">{c.qty}</span>
            <button type="button" aria-label="More sets" onClick={set({ qty: Math.min(99, c.qty + 1) })} className="h-11 w-11 rounded-lg bg-paper text-xl">+</button>
          </div>
        </section>
      </div>

      <aside id="your-workstation" aria-label="Your workstation" className="flex min-w-0 flex-[1_1_380px] scroll-mt-28 flex-col gap-4 rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[17px] font-semibold">Your workstation</h2>
          <span className="text-xs text-muted">Top view</span>
        </div>
        <div className="flex h-[240px] items-center justify-center rounded-[10px] bg-paper p-3.5">
          <TopView r={r} />
        </div>
        <p className="-mt-1.5 text-center text-[13px] text-ink-2">
          Overall footprint <strong>{fmt(r.footW)} × {fmt(r.footD)} mm</strong>
        </p>
        {!r.noPart && (
          <div className="flex items-center gap-3.5 rounded-[10px] bg-paper px-3.5 py-3">
            {c.thick === 6 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.pstyle === "acrylic" ? IMG.acrylic : IMG.glass} alt="" className="h-16 w-[120px] shrink-0 object-contain" />
            ) : (
              <FrontView r={r} />
            )}
            <div className="flex flex-col gap-0.5 text-[13px]">
              <span className="text-muted">Partition, front view</span>
              <span className="font-semibold">{r.partition}</span>
            </div>
          </div>
        )}
        <div className="rounded-[10px] bg-paper px-4 py-3.5 text-[13px] text-ink-2">
          <strong className="font-semibold text-ink">Price on request.</strong> Send us this setup and we&apos;ll reply with a quotation, lead time and delivery details.
        </div>
        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={addToQuote} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white">
            {added ? (<><IconCheck /> Added to quote</>) : "Add to quote"}
          </button>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa font-semibold text-white hover:bg-wa-ink"
          >
            <IconWhatsApp className="h-[18px] w-[18px]" /> Send this setup on WhatsApp
          </a>
        </div>
        <dl className="flex flex-col border-t border-line">
          {[...r.summary, ["Sets", String(c.qty)] as [string, string]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line py-2 text-sm">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="text-muted">Config code</span>
          <code className="break-all rounded-md bg-brand-soft px-2 py-1 font-mono text-[12.5px] text-brand-ink">{r.code}</code>
        </div>
      </aside>
    </div>
  );
}
