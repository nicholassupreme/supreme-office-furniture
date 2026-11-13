import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, menuBooths, menuStars, related, toCard } from "@/lib/catalog";
import { deptName, subName } from "@/lib/taxonomy";
import { ProductBuy } from "@/components/product-buy";
import { PodPage } from "@/components/pod-page";
import { getPodContent, layoutsOf, defaultLayout, type ModelId } from "@/data/pods";
import { AceCompare } from "@/components/ace-compare";
import { ACE_COLUMNS } from "@/data/ace-compare";
import { ProductCard, cleanName } from "@/components/product-card";
import { site } from "@/lib/site";


/**
 * Pre-build only the products featured in the menu (one per category, plus the
 * phone booths). Every other product page is built on its first visit and then
 * cached, so each deploy no longer stores ~400 MB of pages for all 1,700+ products.
 */
export function generateStaticParams() {
  const slugs = new Set([...Object.values(menuStars()).map((c) => c.slug), ...menuBooths().map((b) => b.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: cleanName(p.name),
    description: p.summary || `${cleanName(p.name)} from Supreme Office Furniture, Klang.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { images: p.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const pod = getPodContent(slug);
  const sub = p.subs[0];
  const more = pod ? [] : related(p).map(toCard);
  const siblings = pod
    ? layoutsOf(pod.modelId).map((l) => ({ slug: l.slug, code: l.code, label: l.label, price: l.price, image: l.gallery[0] ?? null }))
    : [];
  const compareCols = pod
    ? ACE_COLUMNS.map((c) => {
        const ls = layoutsOf(c.id as ModelId);
        const prices = ls.map((l) => l.price);
        return { ...c, slug: defaultLayout(c.id as ModelId).slug, image: defaultLayout(c.id as ModelId).gallery[0] ?? null, price: Math.min(...prices), priceMax: Math.max(...prices) };
      })
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cleanName(p.name),
    image: p.images,
    description: p.summary,
    brand: { "@type": "Brand", name: "Supreme Office" },
    url: `${site.url}/products/${p.slug}`,
    ...(p.price != null && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "MYR",
        lowPrice: p.price,
        highPrice: p.priceMax ?? p.price,
        availability: "https://schema.org/PreOrder",
        seller: { "@type": "Organization", name: site.legal },
      },
    }),
  };

  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-6 md:px-6 md:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/collections/${p.dept}`} className="hover:text-ink">{deptName(p.dept)}</Link></li>
          {sub && (
            <>
              <li aria-hidden>/</li>
              <li><Link href={`/collections/${sub}`} className="hover:text-ink">{subName(sub)}</Link></li>
            </>
          )}
        </ol>
      </nav>

      <div className="mt-6">
        {pod ? (
          <PodPage slug={p.slug} options={p.options} variants={p.variants} content={pod} siblings={siblings} />
        ) : (
          <ProductBuy
            slug={p.slug}
            name={p.name}
            images={p.images}
            options={p.options}
            variants={p.variants}
            basePrice={p.price}
            madeToOrder={p.made_to_order}
          />
        )}
      </div>

      {pod && <AceCompare cols={compareCols} currentId={pod.modelId} />}

      {!pod && p.html && (
        <section className="mt-16 grid gap-6 border-t border-line pt-12 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <h2 className="text-2xl font-semibold tracking-tight">Details</h2>
          <div className="prose-desc max-w-3xl" dangerouslySetInnerHTML={{ __html: p.html }} />
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">You may also like</h2>
            {sub && (
              <Link href={`/collections/${sub}`} className="text-sm font-semibold hover:text-brand">
                View all →
              </Link>
            )}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {more.map((c) => (
              <ProductCard key={c.slug} p={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
