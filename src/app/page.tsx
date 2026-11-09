import Image from "next/image";
import Link from "next/link";
import { taxonomy } from "@/lib/taxonomy";
import {
  allProducts,
  coverImage,
  deptCount,
  subCount,
} from "@/lib/catalog";
import { homeCategories } from "@/data/home-categories";
import {
  ServiceHoverCard,
  type Service,
} from "@/components/service-hover-card";
import { IconArrow, IconPin } from "@/components/icons";
import { rm, site, waLink } from "@/lib/site";
import { WorkstationPicker } from "@/components/workstation-picker";
import { projects } from "@/data/portfolio";
import { ProjectTile } from "@/components/project-card";
import { ClientLogos } from "@/components/client-logos";

/** Homepage workstation picker: one chip per seater range, hero photo from the same G-leg fabric-partition line so the images match. */
const WORKSTATION_GROUPS = [
  { slug: "1-3-seater-workstation-prices-are-negotiable", label: "1–3 Seaters", seats: 2, hero: "2-seater-workstation-with-fabric-partition-g-" },
  { slug: "4-5-seater-workstation-prices-are-negotiable", label: "4–5 Seaters", seats: 4, hero: "4-seater-workstation-with-fabric-partition-g-" },
  { slug: "6-7-seater-workstation-prices-are-negotiable", label: "6–7 Seaters", seats: 6, hero: "6-seater-workstation-with-fabric-partition-g-" },
  { slug: "8-seater-or-more-workstation-prices-are-negotiable", label: "8+ Seaters", seats: 8, hero: "8-seater-workstation-with-fabric-partition" },
];

export default function Home() {
  const products = allProducts();

  const HERO_IMG = "https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/f/17534165.png";
  const TEAM_IMG = "https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/f/17545491.png";

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
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Since {site.founded} · Klang, Selangor
            </p>
            <h1 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] xl:text-[64px]">
              Office furniture,
              <br />
              made to fit how
              <br />
              <span className="text-brand">you work.</span>
            </h1>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink-2">
              Chairs, desks, workstations, storage and safes for public listed
              companies, SMEs, government, schools, healthcare and
              institutions across Malaysia.
            </p>
          </div>
        </div>

        {/* Promises strip (illustrations from the old site) */}
        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-14 lg:grid-cols-4 lg:gap-4">
          {(
            [
              [
                "17641907",
                "Free delivery",
                "On orders above RM1,500 within Klang Valley.",
              ],
              [
                "17641908",
                "Layout planning",
                "Office layout drawing to go with your quotation.",
              ],
              [
                "17641910",
                "Relocation & disposal",
                "We move office furniture and safes, or clear out the old.",
              ],
              [
                "17641911",
                "40+ years, 5,000+ projects",
                "Trusted by Malaysian offices since 1985.",
              ],
            ] as const
          ).map(([img, title, text]) => (
            <li
              key={img}
              className="group relative isolate flex cursor-default flex-col items-center overflow-hidden rounded-3xl border border-line bg-white px-4 pb-6 pt-6 text-center transition-[box-shadow,border-color,transform] duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_50px_-20px_rgba(184,138,70,0.7)] md:px-6 md:pb-7 md:pt-7"
            >
              {/* Gold layer fades in on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f6e6bd_0%,#e2c07f_40%,#c99a55_75%,#efd79e_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />
              {/* Light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-[transform,opacity] duration-[900ms] ease-out group-hover:translate-x-[320%] group-hover:opacity-100"
              />
              {/* White in the picture blends into the card, so it reads as cut out */}
              <div className="flex h-24 w-full items-end justify-center md:h-32">
                <Image
                  src={`https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/f/${img}.png`}
                  alt=""
                  width={360}
                  height={360}
                  sizes="(min-width: 1024px) 240px, 45vw"
                  className="max-h-full w-auto max-w-[85%] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <p className="mt-5 text-[15px] font-semibold leading-tight tracking-tight text-brand-ink md:text-[17px]">
                {title}
              </p>
              <p className="mt-1.5 max-w-[22ch] text-[13px] leading-snug text-ink-2 md:text-sm">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Departments */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead
          title="Shop by category"
          sub="From a single chair to a full office fit-out."
        />
        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 md:gap-3">
          {homeCategories.map((c) => {
            const img = coverImage(c.slug);
            const n = deptCount(c.slug) || subCount(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-line/70 transition duration-200 ease-out hover:z-10 hover:scale-[1.08] hover:ring-brand/40 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]"
              >
                <div className="aspect-square bg-white">
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="border-t border-line/70 px-2.5 py-2 text-center">
                  <p className="truncate text-[13px] font-semibold leading-tight tracking-tight group-hover:text-brand">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">{n} items</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Workstations band */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <WorkstationPicker
          groups={WORKSTATION_GROUPS.map((w) => {
            const inRange = products.filter((p) => p.subs.includes(w.slug));
            const prices = inRange
              .map((p) => p.price)
              .filter((n): n is number => n != null && n > 0);
            const hero =
              inRange.find((p) => p.slug === w.hero && p.images[0]) ??
              inRange.find((p) => p.images[0])!;
            return {
              slug: w.slug,
              label: w.label,
              seats: w.seats,
              from: prices.length ? rm(Math.min(...prices)) : null,
              image: hero.images[0],
              imageAlt: hero.name,
            };
          })}
          allHref={`/collections/${taxonomy[2].slug}`}
          waHref={waLink("Hi Supreme, I'd like to customise a workstation.")}
        />
      </section>

      {/* Portfolio preview */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead
          title="Recent projects"
          sub={`A few of the ${site.projects} offices, colleges and hostels we've furnished.`}
          href="/portfolio"
          cta="View portfolio"
        />
        <div className="mt-8 grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[240px] md:gap-4 lg:grid-cols-4 lg:auto-rows-[260px]">
          {projects.slice(0, 5).map((p, i) => (
            <div
              key={p.slug}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <ProjectTile p={p} big={i === 0} />
            </div>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold sm:hidden"
        >
          View portfolio <IconArrow />
        </Link>
      </section>

      {/* Clients */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead
          title="Trusted by Malaysia's leading organisations"
          sub="Over 5,000 public listed companies, SMEs, government agencies, schools and healthcare providers furnished since 1985."
          href="/portfolio"
          cta="View portfolio"
        />
        <div className="mt-8">
          <ClientLogos />
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <SectionHead
          title="More than furniture"
          sub="Everything around the furniture, handled by one team."
          href="/services"
          cta="All services"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((sv) => (
            <ServiceHoverCard key={sv.title} sv={sv} />
          ))}
        </div>
      </section>

      {/* Showroom */}
      <section className="mx-auto mt-20 max-w-[1320px] px-4 md:mt-28 md:px-6">
        <div className="grid overflow-hidden rounded-[28px] border border-line bg-surface lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">
              Showroom
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              See it, sit in it, then decide.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
              Spotted something you like? Visit our Klang showroom to try
              chairs, check finishes and talk through your layout with our team.
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
              <a
                href={site.waze}
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Open in Waze
              </a>
              <a
                href={site.maps}
                className="rounded-full border border-line px-5 py-3 text-sm font-semibold"
              >
                Google Maps
              </a>
            </div>
          </div>
          <div className="relative min-h-[240px] lg:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showroom.jpg"
              alt="Supreme Office Furniture System showroom on Jalan Gopeng, Klang"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
            />
          </div>
        </div>

        {/* Partner program */}
        <div className="relative mt-4 flex flex-col gap-6 overflow-hidden rounded-[28px] bg-brand-ink p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TEAM_IMG}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-left opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/40" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Partner program
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              For designers, contractors and dealers
            </h2>
            <p className="mt-2 text-white/75">
              Exclusive partner pricing and project support for trade buyers.
            </p>
          </div>
          <Link
            href="/partners"
            className="relative inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink"
          >
            Get partner pricing <IconArrow />
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  title,
  sub,
  href,
  cta,
}: {
  title: string;
  sub?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.025em] md:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-2 text-muted">{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand sm:inline-flex"
        >
          {cta ?? "View all"} <IconArrow />
        </Link>
      )}
    </div>
  );
}

/** Homepage service cards. Add a photo path/URL to `img` and it appears at the top of the card. */
const services: Service[] = [
  {
    title: "Layout planning",
    desc: "Site visit, floor plan and 2D layout for your project.",
    anchor: "planning",
    img: "/services/planning.webp",
    points: [
      "Site visit and measurement",
      "2D floor plan with furniture placement",
      "Itemised quotation",
    ],
  },
  {
    title: "Delivery & installation",
    desc: "Free in Klang Valley above RM1,500. Chairs arrive assembled.",
    anchor: "planning",
    img: "/services/installation.webp",
    points: [
      "Free delivery in Klang Valley above RM1,500",
      "Chairs arrive fully assembled",
      "Installed and positioned on site",
    ],
  },
  {
    title: "One-stop renovation",
    desc: "Partitions, ceilings, flooring, electrical and furniture in one package.",
    anchor: "renovation",
    img: "/services/renovation.webp",
    points: [
      "Design and space planning",
      "Partitions, ceilings and flooring",
      "Furniture supply and installation",
    ],
  },
  {
    title: "Relocation & disposal",
    desc: "Dismantle, move and reinstall, or clear out old furniture responsibly.",
    anchor: "relocation",
    img: "/services/relocation.webp",
    points: [
      "Dismantling and reinstallation",
      "Transport by our own team",
      "Old furniture disposal",
    ],
  },
  {
    title: "Safe box relocation",
    desc: "Heavy safes moved and installed with the right equipment.",
    anchor: "safes",
    img: "/services/safe-relocation.webp",
    points: [
      "Floor and access assessment",
      "Specialised moving equipment",
      "Installation at the new site",
    ],
  },
  {
    title: "Rental & repair",
    desc: "Short-term furniture rental, and repairs for chairs and desks.",
    anchor: "rental",
    img: "/services/repair.webp",
    points: [
      "Daily or monthly furniture rental",
      "Chair mechanisms and gas lifts",
      "Reupholstery and desk repairs",
    ],
  },
];
