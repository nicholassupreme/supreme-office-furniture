"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow, IconWhatsApp } from "@/components/icons";

export type SeaterGroup = {
  /** collection slug for this seater range */
  slug: string;
  label: string;
  /** lowest listed price in the range, null = quote only */
  from: string | null;
  image: string;
  imageAlt: string;
  /** number of desks drawn in the chip icon */
  seats: number;
};

/** Top-down cluster icon: desks in two facing rows, partition down the middle */
function ClusterIcon({ seats }: { seats: number }) {
  const perRow = Math.ceil(seats / 2);
  const w = 10;
  const total = perRow * w + (perRow - 1) * 2;
  return (
    <svg
      viewBox={`0 0 ${total} 22`}
      className="hidden h-5 w-auto shrink-0 opacity-80 sm:block"
      aria-hidden
    >
      {Array.from({ length: perRow }).map((_, i) => (
        <g key={i}>
          <rect x={i * (w + 2)} y={0} width={w} height={9} rx={1.5} fill="currentColor" opacity={0.9} />
          {i < seats - perRow && (
            <rect x={i * (w + 2)} y={13} width={w} height={9} rx={1.5} fill="currentColor" opacity={0.9} />
          )}
        </g>
      ))}
      <rect x={0} y={10.25} width={total} height={1.5} fill="currentColor" opacity={0.45} />
    </svg>
  );
}

export function WorkstationPicker({
  groups,
  allHref,
  waHref,
}: {
  groups: SeaterGroup[];
  allHref: string;
  waHref: string;
}) {
  const [active, setActive] = useState(1);
  const g = groups[active] ?? groups[0];

  return (
    <div className="grid overflow-hidden rounded-[28px] bg-brand-ink text-white lg:grid-cols-2">
      <div className="p-8 md:p-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
          Made to order
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-[42px]">
          Workstations, your way.
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-white/75">
          Pick your seaters, size, colour and partition. We build it to order.
        </p>

        <div className="mt-8 grid max-w-md grid-cols-2 gap-2">
          {groups.map((s, i) => {
            const on = i === active;
            return (
              <Link
                key={s.slug}
                href={`/collections/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                  on
                    ? "border-white bg-white text-ink"
                    : "border-white/15 hover:bg-white/10"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">{s.label}</span>
                  <span className={`block text-xs ${on ? "text-muted" : "text-white/60"}`}>
                    {s.from ? `From ${s.from}` : "Get a quote"}
                  </span>
                </span>
                <ClusterIcon seats={s.seats} />
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={allHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink"
          >
            Customise yours <IconArrow />
          </Link>
          <a
            href={waHref}
            className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp className="h-4 w-4" /> Prefer to talk? WhatsApp us
          </a>
        </div>
      </div>

      <div className="flex flex-col bg-white text-ink">
        <Link
          href={`/collections/${g.slug}`}
          className="grid flex-1 place-items-center p-6 md:p-10"
          aria-label={`Browse ${g.label} workstations`}
        >
          {groups.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.slug}
              src={s.image}
              alt={i === active ? s.imageAlt : ""}
              loading="lazy"
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 aspect-[4/3] w-full max-w-[560px] object-contain transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </Link>
        <dl className="grid grid-cols-3 border-t border-line/70 text-center text-xs">
          {[
            ["Seaters", "1 to 12+"],
            ["Tops", "White, maple, ash +"],
            ["Partitions", "Fabric, acrylic, glass"],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-line/70 px-2 py-3 last:border-r-0">
              <dt className="text-muted">{k}</dt>
              <dd className="mt-0.5 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
