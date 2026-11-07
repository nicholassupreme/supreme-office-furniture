import Link from "next/link";
import { taxonomy } from "@/lib/taxonomy";
import { allProducts, coverImage, deptCount, toCard } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { IconArrow, IconPin, IconWhatsApp } from "@/components/icons";
import { site, waLink } from "@/lib/site";

export default function Home() {
  const products = allProducts();
  const pick = (dept: string, n: number) =>
    products.filter((p) => p.dept === dept && p.images[0] && p.price).slice(0, n).map(toCard);

  const heroImgs = [
    coverImage("4-5-seater-workstation-prices-are-negotiable"),
    coverImage("ergonomic-office-chairs"),
    coverImage("table-length-900mm-to-2900mm"),
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1320px] px-4 pt-8 md:px-6 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-oak" /> Since {site.founded} · Klang, Selangor
            </p>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[56px] xl:text-[68px]">
              Office furniture,
              <br />
              made to fit how
              <br />
              <span className="text-brand">you work.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-2">
              Over 1,700 chairs, desks, workstations, storage and safes for offices, schools and institutions across
              Malaysia. Free layout planning, delivery and installation in Klang Valley.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand"
              >
                Browse the catalogue <IconArrow />
              </Link>
              <a
                href={waLink("Hi Supreme, I'd like a free office layout plan and quotation.")}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold"
              >
                <IconWhatsApp className="h-4 w-4 text-wa" /> Get a free layout plan
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">
            {heroImgs.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-3xl bg-white ring-1 ring-line/70 ${
                  i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                }`}
              >
                {src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="h-full w-full object-contain p-6" fetchPriority={i === 0 ? "high" : "auto"} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Proof strip */}
        <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface md:mt-16 md:grid-cols-4">
          {[
            ["40+ years", "Supplying Malaysian offices since 1985"],
            [`${site.projects} projects`, "Offices, schools and institutions"],
            ["1,700+ products", "Every one with prices shown"],
            ["Free planning", "Layout drawing and quotation at no cost"],
          ].map(([k, v], i) => (
            <div key={k} className={`p-5 md:p-7 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-line`}>
              <dt className="text-xl font-semibold tracking-tight md:text-2xl">{k}</dt>
              <dd className="mt-1 text-sm text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Departments */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead title="Shop by category" sub="Ten departments, from a single chair to a full office fit-out." />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {taxonomy.map((d) => {
            const img = coverImage(d.subs[0]?.[0] ?? d.slug) ?? coverImage(d.slug);
            return (
              <Link
                key={d.slug}
                href={`/collections/${d.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line/70 transition hover:ring-ink/15"
              >
                <div className="aspect-[4/3] bg-white">
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105" />
                  )}
                </div>
                <div className="flex items-end justify-between gap-2 border-t border-line/70 p-4">
                  <div>
                    <p className="text-[15px] font-semibold leading-tight tracking-tight">{d.name}</p>
                    <p className="mt-1 text-xs text-muted">{deptCount(d.slug)} products</p>
                  </div>
                  <IconArrow className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Workstations band */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <div className="grid overflow-hidden rounded-[28px] bg-brand-ink text-white lg:grid-cols-2">
          <div className="p-8 md:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Made to order</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-[42px]">
              Workstations built around your floor plan.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/75">
              Send us your layout and headcount. We&apos;ll plan the clusters, pick the partition height and finish, and
              quote it at no cost. Seater counts, table sizes and fabric colours can all be changed.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-2 text-sm">
              {taxonomy[2].subs.slice(0, 4).map(([s, n]) => (
                <Link key={s} href={`/collections/${s}`} className="rounded-xl border border-white/15 px-4 py-3 transition hover:bg-white/10">
                  {n}
                </Link>
              ))}
            </div>
            <a
              href={waLink("Hi Supreme, I'd like to customise a workstation layout.")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink"
            >
              <IconWhatsApp className="h-4 w-4 text-wa" /> Plan my workstations
            </a>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10">
            {pick("office-workstations", 4).map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white p-4">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full object-contain transition duration-500 group-hover:scale-105" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular chairs */}
      <ProductRow title="Office chairs" href="/collections/office-work-chairs-malaysia" items={pick("office-work-chairs-malaysia", 10)} />
      <ProductRow title="Desks & tables" href="/collections/office-desks-tables" items={pick("office-desks-tables", 10)} />
      <ProductRow title="Storage & safes" href="/collections/office-wooden-storage" items={[...pick("office-wooden-storage", 5), ...pick("security-safe-box", 5)]} />

      {/* Services */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead title="More than furniture" sub="Everything around the furniture, handled by one team." href="/services" cta="All services" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {[
            ["Free layout planning", "Site visit, floor plan and 2D layout before you commit.", "planning"],
            ["Delivery & installation", "Free in Klang Valley above RM1,500. Chairs arrive assembled.", "planning"],
            ["One-stop renovation", "Partitions, ceilings, flooring, electrical and furniture in one package.", "renovation"],
            ["Relocation & disposal", "Dismantle, move and reinstall, or clear out old furniture responsibly.", "relocation"],
            ["Safe box relocation", "Heavy safes moved and installed with the right equipment.", "safes"],
            ["Rental & repair", "Short-term furniture rental, and repairs for chairs and desks.", "rental"],
          ].map(([t, d, a]) => (
            <Link key={t} href={`/services#${a}`} className="group rounded-2xl border border-line bg-surface p-6 transition hover:border-ink/20">
              <p className="font-semibold tracking-tight">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Showroom + partners */}
      <section className="mx-auto mt-20 grid max-w-[1320px] gap-4 px-4 md:mt-28 md:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[28px] border border-line bg-surface p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Showroom</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">See it, sit in it, then decide.</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
            Spotted something you like? Visit our Klang showroom to try chairs, check finishes and talk through your layout
            with our team.
          </p>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink-2">
            <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
            <span>
              {site.address[0]}
              <br />
              {site.address[1]}
            </span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={site.waze} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Open in Waze</a>
            <a href={site.maps} className="rounded-full border border-line px-5 py-3 text-sm font-semibold">Google Maps</a>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[28px] bg-oak/15 p-8 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Partner program</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">For designers, contractors & dealers</h2>
            <p className="mt-4 leading-relaxed text-ink-2">Exclusive partner pricing and project support for trade buyers.</p>
          </div>
          <Link href="/partners" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand">
            Get partner pricing <IconArrow />
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, sub, href, cta }: { title: string; sub?: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.025em] md:text-4xl">{title}</h2>
        {sub && <p className="mt-2 text-muted">{sub}</p>}
      </div>
      {href && (
        <Link href={href} className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand sm:inline-flex">
          {cta ?? "View all"} <IconArrow />
        </Link>
      )}
    </div>
  );
}

function ProductRow({ title, href, items }: { title: string; href: string; items: ReturnType<typeof toCard>[] }) {
  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-24 md:px-6">
      <SectionHead title={title} href={href} />
      <div className="no-scrollbar -mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
        {items.map((p) => (
          <div key={p.slug} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
