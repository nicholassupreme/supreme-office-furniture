import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collectionProducts, getCollection, toCard } from "@/lib/catalog";
import { taxonomy } from "@/lib/taxonomy";
import { CollectionBrowser } from "@/components/collection-browser";
import { waLink } from "@/lib/site";
import { IconArrow, IconWhatsApp } from "@/components/icons";


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
        <Link
          href="/workstations/build"
          className="group mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[18px] bg-brand p-5 text-white md:px-7 md:py-6"
        >
          <span aria-hidden className="flex h-[150px] w-[260px] max-w-full shrink-0 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/configurator/banner.svg"
              alt=""
              width={260}
              height={150}
              className="h-[150px] w-[260px] [transform:perspective(760px)_rotateX(26deg)] [transform-origin:50%_60%]"
            />
          </span>
          <span className="flex min-w-0 flex-[999_1_340px] flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#c9c6ef]">New · Workstation builder</span>
            <span className="text-2xl font-semibold leading-tight tracking-[-0.01em]">Customise your workstation now</span>
            <span className="text-sm text-[#e3e2f5]">
              Pick seaters, top size, colours and partitions, see it take shape, then send it to us for a quote.
            </span>
            <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-[#e3e2f5]">
              <span>1 · Seaters</span><span>2 · Top size</span><span>3 · Colours</span><span>4 · Partition</span><span>5 · Legs &amp; add-ons</span>
            </span>
          </span>
          <span className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-ink transition group-hover:bg-brand-soft">
            Start building <IconArrow className="h-[18px] w-[18px]" />
          </span>
        </Link>
      )}

      {isWorkstation && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-brand-soft p-5 text-sm text-brand-ink md:flex-row md:items-center md:justify-between">
          <p>
            <strong className="font-semibold">Prices are negotiable.</strong> Seater count, table size, partition height and
            colours can all be customised to your floor plan.
          </p>
          <a
            href={waLink("Hi Supreme, I'd like to customise a workstation layout.")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 font-semibold text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp className="h-4 w-4" /> Customise on WhatsApp
          </a>
        </div>
      )}

      <div className="mt-8">
        <CollectionBrowser items={items} facets={facets} facetKey={facetKey} aceFirst={c.kind !== "all" && items.some((i) => i.slug.startsWith("ace-"))} />
      </div>
    </div>
  );
}
