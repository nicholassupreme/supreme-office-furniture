import "server-only";
import catalogJson from "@/data/catalog.json";
import countsJson from "@/data/counts.json";
import { taxonomy, type Dept } from "@/lib/taxonomy";

export type Variant = { opts: Record<string, string>; price: number | null; image?: string | null };
export type Product = {
  slug: string;
  name: string;
  dept: string;
  subs: string[];
  price: number | null;
  priceMax: number | null;
  images: string[];
  options: string[];
  variants: Variant[];
  html: string;
  summary: string;
  made_to_order: boolean;
};
/** What listing pages send to the browser */
export type Card = Pick<Product, "slug" | "name" | "dept" | "subs" | "price" | "priceMax"> & { image: string | null };

const catalog = catalogJson as Product[];
const bySlug = new Map(catalog.map((p) => [p.slug, p]));
const counts = countsJson as { dept: Record<string, number>; sub: Record<string, number> };

export const allProducts = () => catalog;
export const getProduct = (slug: string) => bySlug.get(slug);
export const toCard = (p: Product): Card => ({
  slug: p.slug, name: p.name, dept: p.dept, subs: p.subs, price: p.price, priceMax: p.priceMax, image: p.images[0] ?? null,
});
export const deptCount = (slug: string) => counts.dept[slug] ?? 0;
export const subCount = (slug: string) => counts.sub[slug] ?? 0;

export type Collection =
  | { kind: "all"; slug: "all"; name: string; blurb: string }
  | { kind: "dept"; slug: string; name: string; blurb: string; dept: Dept }
  | { kind: "sub"; slug: string; name: string; blurb: string; dept: Dept };

export function getCollection(slug: string): Collection | undefined {
  if (slug === "all") return { kind: "all", slug: "all", name: "All Products", blurb: "Every product in our catalogue." };
  for (const d of taxonomy) {
    if (d.slug === slug) return { kind: "dept", slug, name: d.name, blurb: d.blurb, dept: d };
    const s = d.subs.find(([s]) => s === slug);
    if (s) return { kind: "sub", slug, name: s[1], blurb: d.blurb, dept: d };
  }
}

export function collectionProducts(c: Collection): Product[] {
  if (c.kind === "all") return catalog;
  if (c.kind === "dept") return catalog.filter((p) => p.dept === c.slug);
  return catalog.filter((p) => p.subs.includes(c.slug));
}

export function related(p: Product, n = 8): Product[] {
  const key = p.subs[0];
  const pool = catalog.filter((q) => q.slug !== p.slug && (key ? q.subs.includes(key) : q.dept === p.dept));
  const i = Math.max(0, pool.findIndex((q) => q.name > p.name));
  return [...pool.slice(i), ...pool.slice(0, i)].slice(0, n);
}

/** A representative product image for a collection (first product that has one). */
export function coverImage(slug: string): string | null {
  const c = getCollection(slug);
  if (!c) return null;
  return collectionProducts(c).find((p) => p.images[0])?.images[0] ?? null;
}
