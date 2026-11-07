import Link from "next/link";
import { taxonomy } from "@/lib/taxonomy";
import { allProducts, coverImage, deptCount, toCard } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { IconArrow, IconPin, IconWhatsApp } from "@/components/icons";
import { site, waLink } from "@/lib/site";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const products = allProducts();
  const pick = (dept: string, n: number) =>
    products.filter((p) => p.dept === dept && p.images[0] && p.price).slice(0, n).map(toCard);

  const HERO_IMG = "https://cdn.store-assets.com/s/1022051/f/17534165.png";
  const TEAM_IMG = "https://cdn.store-assets.com/s/1022051/f/17545491.png";

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1320px] px-4 pt-5 md:px-6 md:pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-line/70 md:rounded-[36px]">
          {/* Photo: fills the right side on desktop, sits on top on mobile */}
          <div className="relative aspect-[4/3] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[62%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMG}
              alt="Office with Supreme workstations and ergonomic chairs"
              fetchPriority="high"
              className="h-full w-full object-cover object-[70%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-white/0 md:bg-gradient-to-r md:from-white md:via-white/10 md:to-transparent" />
          </div>

          <div className="relative px-6 pb-9 pt-2 md:max-w-[52%] md:px-12 md:py-20 lg:px-16 lg:py-24">
            <p className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-oak" /> Since {site.founded} · Klang, Selangor
            </p>
            <h1 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] xl:text-[64px]">
              Office furniture,
              <br />
              made to fit how
              <br />
              <span className="text-brand">you work.</span>
            </h1>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink-2">
              Chairs, desks, workstations, storage and safes for offices, schools and institutions across Malaysia, with
              free layout planning.
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
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold"
              >
                <IconWhatsApp className="h-4 w-4 text-wa" /> Free layout plan
              </a>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:mt-14 md:grid-cols-4">
          {(
            [
              ["40+ years", "Supplying Malaysian offices since 1985", "award"],
              [`${site.projects} projects`, "Offices, schools and institutions", "building"],
              ["1,700+ products", "Every one with prices shown", "chair"],
              ["Free planning", "Layout drawing and quotation at no cost", "plan"],
            ] as const
          ).map(([k, v, icon]) => (
            <div
              key={k}
              className="group relative isolate flex cursor-default flex-col gap-4 overflow-hidden bg-brand-ink p-5 text-white md:flex-row md:items-center md:gap-5 md:p-7"
            >
              {/* Gold layer fades in on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f3dfae_0%,#d9b26e_38%,#b88a46_72%,#e8cd8f_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />
              {/* Light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-[transform,opacity] duration-[900ms] ease-out group-hover:translate-x-[320%] group-hover:opacity-100"
              />
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-oak ring-1 ring-white/20 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-ink group-hover:text-[#e8cd8f] group-hover:shadow-[0_12px_24px_-10px_rgba(22,24,29,0.6)] group-hover:ring-ink md:h-16 md:w-16">
                <StatIcon name={icon} />
              </span>
              <div>
                <dt className="text-xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-ink md:text-2xl">{k}</dt>
                <dd className="mt-1 text-sm leading-snug text-white/65 transition-colors duration-500 group-hover:text-ink/75">{v}</dd>
              </div>
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
            {[
              "1-3-seater-workstation-prices-are-negotiable",
              "4-5-seater-workstation-prices-are-negotiable",
              "6-7-seater-workstation-prices-are-negotiable",
              "8-seater-or-more-workstation-prices-are-negotiable",
            ].map((s) => products.find((p) => p.subs.includes(s) && p.images[0])!).filter(Boolean).map(toCard).map((p) => (
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

      {/* Portfolio preview */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead
          title="Recent projects"
          sub={`A few of the ${site.projects} offices, colleges and hostels we've furnished.`}
          href="/portfolio"
          cta="View portfolio"
        />
        <div className="mt-8 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr]">
          {projects.slice(0, 3).map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <ProjectCard p={p} tall={i === 0} />
            </div>
          ))}
        </div>
        <Link href="/portfolio" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold sm:hidden">
          View portfolio <IconArrow />
        </Link>
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
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-brand-ink p-8 text-white md:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TEAM_IMG} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/20" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Partner program</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">For designers, contractors & dealers</h2>
            <p className="mt-4 leading-relaxed text-white/75">Exclusive partner pricing and project support for trade buyers.</p>
          </div>
          <Link href="/partners" className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink">
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

function StatIcon({ name }: { name: "award" | "building" | "chair" | "plan" }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-7 w-7 md:h-8 md:w-8", "aria-hidden": true };
  if (name === "award")
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="5.5" />
        <path d="m9.2 13.8-1.4 7.2L12 19l4.2 2-1.4-7.2" />
        <path d="m12 6.6.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2Z" />
      </svg>
    );
  if (name === "building")
    return (
      <svg {...common}>
        <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21" />
        <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21" />
        <path d="M3 21h18M7.5 8h3M7.5 11.5h3M7.5 15h3M17 14v.01M17 17.5v.01" />
      </svg>
    );
  if (name === "chair")
    return (
      <svg {...common}>
        <path d="M8 3.5h8a1 1 0 0 1 1 1V11H7V4.5a1 1 0 0 1 1-1Z" />
        <path d="M5.5 11h13l-.8 3H6.3Z" />
        <path d="M12 14v4M8 21l4-3 4 3M5 9.5v3M19 9.5v3" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M3.5 10h7v10.5M10.5 14H15M15 3.5V14M15 8h5.5" />
    </svg>
  );
}
