import Image from "next/image";
import { clients, type Client } from "@/data/clients";

const MAX_ROWS = 10;
const VISIBLE = 5; // logos visible per row on desktop (3 on phones)

/**
 * Client logo wall. Logos sit in grey and take their colour on hover, each in the same-size slot.
 * Up to 10 rows, 5 logos visible per row; a row holding more than fits slides right to left on its own.
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
        const moves = row.length > 3; // phones show 3; desktop shows 5 (see md: rules below)
        const movesDesktop = row.length > VISIBLE;
        return (
          <div
            key={r}
            className={`logo-row @container overflow-hidden border-line/70 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] motion-reduce:overflow-x-auto ${
              r > 0 ? "border-t" : ""
            }`}
          >
            <ul
              className={`logo-track flex w-max motion-reduce:animate-none ${moves ? "" : "animate-none"} ${
                movesDesktop ? "" : "md:animate-none"
              } ${r % 2 ? "[animation-delay:-7s]" : ""}`}
              style={{ animationDuration: `${row.length * 4.5}s` }}
            >
              {row.map((c) => (
                <Tile key={c.name} c={c} />
              ))}
              {/* Second copy makes the loop seamless */}
              {moves &&
                row.map((c) => (
                  <Tile key={`${c.name}-copy`} c={c} copy hideDesktop={!movesDesktop} />
                ))}
            </ul>
          </div>
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
      className={`group flex h-24 w-[calc(100cqw/3)] shrink-0 items-center justify-center px-4 md:h-28 md:w-[20cqw] md:px-8 ${
        hideDesktop ? "md:hidden" : ""
      } motion-reduce:[&[aria-hidden]]:hidden`}
    >
      <Image
        src={c.logo.src}
        alt={copy ? "" : c.name}
        width={c.logo.w}
        height={c.logo.h}
        unoptimized={remote || c.logo.src.endsWith(".svg")}
        sizes="200px"
        className={`max-h-12 w-auto max-w-full object-contain transition duration-300 md:max-h-14 ${
          c.logo.onDark
            ? "opacity-45 brightness-0 group-hover:opacity-90"
            : "opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0"
        }`}
      />
    </li>
  );
}
