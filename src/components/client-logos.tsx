import Image from "next/image";
import { clients, type Client } from "@/data/clients";
import { LogoRow } from "./logo-row";

const MAX_ROWS = 5; // rows stacked down the page
const VISIBLE = 10; // logos visible across one row on desktop (6 on tablets, 4 on phones)

/* Every logo gets the same visual weight: equal area, capped in width and height,
   so wide wordmarks and square crests read as the same size. Pixels at desktop. */
const AREA = 1500;
const MAX_W = 104;
const MAX_H = 38;
function logoWidth({ w, h }: Client["logo"]) {
  const r = w / h;
  return Math.round(Math.min(MAX_W, Math.sqrt(AREA * r), MAX_H * r));
}

/**
 * Client logo wall: up to 5 rows, 10 logos across. Each row that holds more than fits
 * slides right to left on its own and can be dragged. Logos sit in grey and take their colour on hover.
 */
export function ClientLogos() {
  const rowCount = Math.min(MAX_ROWS, Math.ceil(clients.length / VISIBLE));
  const perRow = Math.ceil(clients.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, r) => clients.slice(r * perRow, (r + 1) * perRow)).filter(
    (r) => r.length,
  );

  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line/70">
      {rows.map((row, r) => {
        const staticOnDesktop = row.length <= VISIBLE;
        return (
          <LogoRow
            key={r}
            speed={r % 2 ? 28 : 34}
            className={`@container overflow-hidden border-line/70 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] ${
              r > 0 ? "border-t" : ""
            }`}
            trackClassName={staticOnDesktop ? "lg:w-full" : ""}
          >
            {row.map((c) => (
              <Tile key={c.name} c={c} />
            ))}
            {/* Second copy makes the loop seamless */}
            {row.map((c) => (
              <Tile key={`${c.name}-copy`} c={c} copy hideDesktop={staticOnDesktop} />
            ))}
          </LogoRow>
        );
      })}
    </div>
  );
}

function Tile({ c, copy, hideDesktop }: { c: Client; copy?: boolean; hideDesktop?: boolean }) {
  const remote = c.logo.src.startsWith("http");
  return (
    <li
      aria-hidden={copy || undefined}
      title={c.name}
      className={`group flex h-[72px] w-[25cqw] shrink-0 items-center justify-center md:h-20 md:w-[calc(100cqw/6)] lg:w-[10cqw] ${
        hideDesktop ? "lg:hidden" : ""
      }`}
    >
      <Image
        src={c.logo.src}
        alt={copy ? "" : c.name}
        width={c.logo.w}
        height={c.logo.h}
        unoptimized={remote || c.logo.src.endsWith(".svg")}
        sizes="120px"
        draggable={false}
        style={{ width: `calc(${logoWidth(c.logo)}px * var(--logo-scale))` }}
        className={`h-auto max-w-[86%] object-contain transition duration-300 [--logo-scale:0.78] md:[--logo-scale:0.9] lg:[--logo-scale:1] ${
          c.logo.onDark
            ? "opacity-45 brightness-0 group-hover:opacity-90"
            : "opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0"
        }`}
      />
    </li>
  );
}
