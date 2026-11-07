import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/catalog";
import { taxonomy } from "@/lib/taxonomy";
import { site } from "@/lib/site";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collections/all", "/services", "/about", "/contact", "/partners", "/portfolio", ...projects.map((p) => `/portfolio/${p.slug}`)];
  const cols = taxonomy.flatMap((d) => [d.slug, ...d.subs.map(([s]) => s)]).map((s) => `/collections/${s}`);
  return [
    ...pages.map((p) => ({ url: site.url + p })),
    ...cols.map((p) => ({ url: site.url + p })),
    ...allProducts().map((p) => ({ url: `${site.url}/products/${p.slug}` })),
  ];
}
