import Link from "next/link";
import { coverOf, type Project } from "@/data/portfolio";

export function ProjectCard({ p, priority = false, tall = false }: { p: Project; priority?: boolean; tall?: boolean }) {
  return (
    <Link href={`/portfolio/${p.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-3xl bg-line ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverOf(p)}
          alt={`${p.client} – ${p.type}`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/70">{p.type}</p>
            <p className="mt-1 text-lg font-semibold leading-tight tracking-tight">{p.client}</p>
          </div>
          {p.size && <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{p.size}</span>}
        </div>
      </div>
      <p className="mt-3 line-clamp-2 px-0.5 text-sm leading-relaxed text-muted">{p.summary}</p>
    </Link>
  );
}

/** Photo tile that fills its grid cell, with all text inside the image (for bento grids). */
export function ProjectTile({ p, big = false }: { p: Project; big?: boolean }) {
  return (
    <Link href={`/portfolio/${p.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverOf(p)}
        alt={`${p.client} – ${p.type}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/0" />
      <div className={`absolute inset-x-0 bottom-0 text-white ${big ? "p-6 md:p-8" : "p-4 md:p-5"}`}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">{p.type}</p>
            <p className={`mt-1 font-semibold leading-tight tracking-tight ${big ? "text-2xl md:text-[28px]" : "text-base md:text-lg"}`}>{p.client}</p>
          </div>
          {p.size && <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{p.size}</span>}
        </div>
        {big && <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{p.summary}</p>}
      </div>
    </Link>
  );
}
