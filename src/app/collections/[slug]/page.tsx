import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collectionProducts, getCollection, toCard } from "@/lib/catalog";
import { taxonomy } from "@/lib/taxonomy";
import { CollectionBrowser } from "@/components/collection-browser";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";


export function generateStaticParams() {
  const slugs = ["all", ...taxonomy.flatMap((d) => [d.slug, ...d.subs.map(([s]) => s)])];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.kind === "all" ? "All Office Furniture" : `${c.name} Malaysia`,
    description: `${c.name} from Supreme Office Furniture, Klang. ${c.blurb} Prices shown, delivery in Klang Valley.`,
    alternates: { canonical: `/collections/${slug}` },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const products = collectionProducts(c);
  const items = products.map(toCard);

  const facetKey = c.kind === "all" ? "dept" : "subs";
  const facets =
    c.kind === "all"
      ? taxonomy.map((d) => ({ slug: d.slug, name: d.short }))
      : c.kind === "dept"
        ? c.dept.subs.map(([s, n]) => ({ slug: s, name: n }))
        : [];

  const isWorkstation = c.kind !== "all" && c.dept.slug === "office-workstations";

  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-6 md:px-6 md:pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          {c.kind === "sub" && (
            <>
              <li aria-hidden>/</li>
              <li><Link href={`/collections/${c.dept.slug}`} className="hover:text-ink">{c.dept.name}</Link></li>
            </>
          )}
          <li aria-hidden>/</li>
          <li className="text-ink">{c.name}</li>
        </ol>
      </nav>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">{c.name}</h1>
          <p className="mt-3 max-w-2xl text-ink-2">{c.blurb}</p>
        </div>
      </div>

      {c.kind === "sub" && c.dept.subs.length > 1 && (
        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          {c.dept.subs.map(([s, n]) => (
            <Link
              key={s}
              href={`/collections/${s}`}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${
                s === slug ? "border-brand bg-brand text-white" : "border-line bg-surface text-ink-2 hover:border-ink/30"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      )}

      {isWorkstation && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-brand-soft p-5 text-sm text-brand-ink md:flex-row md:items-center md:justify-between">
          <p>
            <strong className="font-semibold">Prices are negotiable.</strong> Seater count, table size, partition height and
            colours can all be customised to your floor plan.
          </p>
          <a
            href={waLink("Hi Supreme, I'd like to customise a workstation layout.")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 font-semibold text-white"
          >
            <IconWhatsApp className="h-4 w-4" /> Customise on WhatsApp
          </a>
        </div>
      )}

      <div className="mt-8">
        <CollectionBrowser items={items} facets={facets} facetKey={facetKey} />
      </div>
    </div>
  );
}
