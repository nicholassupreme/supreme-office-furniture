import taxonomyJson from "@/data/taxonomy.json";

export type Dept = { slug: string; name: string; short: string; blurb: string; subs: [string, string][] };
export const taxonomy = taxonomyJson as Dept[];

export const deptName = (slug: string) => taxonomy.find((d) => d.slug === slug)?.name ?? "";
export const subName = (slug: string) => {
  for (const d of taxonomy) for (const [s, n] of d.subs) if (s === slug) return n;
  return "";
};

/**
 * Tabs in the header category bar. Most tabs are one department; a tab can group several
 * (its dropdown then lists each department's sub-categories side by side).
 */
export type NavTab = { key: string; label: string; depts: Dept[] };
const NAV_GROUPS: { label: string; depts: string[] }[] = [
  { label: "Desks & Workstations", depts: ["office-desks-tables", "office-workstations"] },
];
export const navTabs: NavTab[] = (() => {
  const grouped = new Set(NAV_GROUPS.flatMap((g) => g.depts.slice(1)));
  return taxonomy
    .filter((d) => !grouped.has(d.slug))
    .map((d) => {
      const g = NAV_GROUPS.find((g) => g.depts[0] === d.slug);
      return g
        ? { key: d.slug, label: g.label, depts: g.depts.map((s) => taxonomy.find((t) => t.slug === s)!) }
        : { key: d.slug, label: d.short, depts: [d] };
    });
})();
