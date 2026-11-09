import Image from "next/image";
import { clients, type Client } from "@/data/clients";

const PER_ROW = 10;
const MAX_ROWS = 10;

/**
 * Client logo wall. Logos sit in grey and take their colour on hover.
 * Desktop: 10 equal slots per row, static. Below that, each row shows 4 (6 on tablets)
 * and drifts right to left so every logo in the row comes past.
 */
export function ClientLogos() {
  const rowCount = Math.min(MAX_ROWS, Math.ceil(clients.length / PER_ROW));
  const rows: Client[][] = Array.from({ length: rowCount }, () => []);
  const crowded = clients.length > PER_ROW * MAX_ROWS;
  // Up to 100 logos: rows of 10. Past that, share them across the 10 rows, which then scroll on desktop too.
  clients.forEach((c, i) => rows[crowded ? i % rowCount : Math.floor(i / PER_ROW)].push(c));

  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line/70">
      {rows.map((row, r) => {
        const overflow = row.length > PER_ROW;
        return (
          <div
            key={r}
            className={`logo-row overflow-hidden border-line/70 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto ${
              r > 0 ? "border-t" : ""
            } ${overflow ? "" : "lg:[mask-image:none]"}`}
          >
            <ul
              className={`logo-track flex w-max motion-reduce:animate-none ${
                overflow ? "" : "lg:w-full lg:animate-none"
              }`}
              style={{ animationDuration: `${row.length * 4 + r * 3}s` }}
            >
              {row.map((c) => (
                <Tile key={c.name} c={c} fixed={!overflow} />
              ))}
              {/* Second copy makes the loop seamless; hidden where the row is static */}
              {row.map((c) => (
                <Tile key={`${c.name}-copy`} c={c} fixed={!overflow} copy />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Tile({ c, fixed, copy }: { c: Client; fixed: boolean; copy?: boolean }) {
  return (
    <li
      aria-hidden={copy || undefined}
      className={`group flex h-20 w-[calc((100vw-2rem)/4)] shrink-0 items-center justify-center px-3 md:h-24 md:w-[calc((100vw-3rem)/6)] md:px-4 ${
        fixed ? "lg:w-[10%]" : "lg:w-[132px]"
      } ${copy && fixed ? "lg:hidden" : ""} motion-reduce:[&[aria-hidden]]:hidden`}
      title={c.name}
    >
      {c.logo ? (
        <Image
          src={c.logo.src}
          alt={copy ? "" : c.name}
          width={c.logo.w}
          height={c.logo.h}
          unoptimized={c.logo.src.endsWith(".svg")}
          sizes="140px"
          className="max-h-10 w-auto max-w-full object-contain opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-12"
        />
      ) : (
        <span className="text-balance text-center text-[10.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink/45 transition-colors duration-300 group-hover:text-brand md:text-xs">
          {c.name}
        </span>
      )}
    </li>
  );
}
