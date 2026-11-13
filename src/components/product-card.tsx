import Link from "next/link";
import { rm } from "@/lib/site";
import { MadeInMalaysia, isMadeInMalaysia } from "./made-in-malaysia";

export type CardData = {
  slug: string;
  name: string;
  price: number | null;
  priceMax: number | null;
  image: string | null;
};

/** Strip store-specific noise like "(kindly contact us before ordering)" from card titles. */
export function cleanName(name: string) {
  return name
    .replace(/\s*[\(\-–|]\s*(kindly|please)?\s*contact us before order(ing)?\)?/i, "")
    .replace(/\s*\((pre order unit[^)]*|minimum order[^)]*)\)/i, "")
    .trim();
}

export function ProductCard({ p, priority = false }: { p: CardData; priority?: boolean }) {
  const from = p.priceMax != null && p.price != null && p.priceMax > p.price;
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-line/70 transition group-hover:ring-ink/15">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.name}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={`h-full w-full object-contain transition duration-500 ${p.slug.startsWith("ace-") ? "scale-[1.08] group-hover:scale-[1.12]" : "p-5 group-hover:scale-[1.04]"}`}
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">No image</div>
        )}
        {isMadeInMalaysia(p.slug) && <MadeInMalaysia className="absolute bottom-2.5 right-2.5 h-11 w-11" />}
      </div>
      <div className="mt-3 px-0.5">
        <p className="line-clamp-3 text-[14.5px] font-medium leading-snug text-ink group-hover:text-brand">
          {cleanName(p.name)}
        </p>
        <p className="tabular mt-1.5 text-[14px] text-ink-2">
          {from && <span className="text-muted">From </span>}
          {rm(p.price)}
        </p>
      </div>
    </Link>
  );
}
