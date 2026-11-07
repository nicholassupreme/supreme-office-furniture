import taxonomyJson from "@/data/taxonomy.json";

export type Dept = { slug: string; name: string; short: string; blurb: string; subs: [string, string][] };
export const taxonomy = taxonomyJson as Dept[];

export const deptName = (slug: string) => taxonomy.find((d) => d.slug === slug)?.name ?? "";
export const subName = (slug: string) => {
  for (const d of taxonomy) for (const [s, n] of d.subs) if (s === slug) return n;
  return "";
};
