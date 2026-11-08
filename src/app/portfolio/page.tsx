import type { Metadata } from "next";
import { projectsByYear } from "@/data/portfolio";
import { ProjectHoverCard } from "@/components/project-hover-card";
import { site, waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Office, college and hostel furniture projects completed by Supreme Office Furniture. ${site.projects} projects since ${site.founded}.`,
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-6 md:px-6 md:pt-10">
      <section className="relative overflow-hidden rounded-[28px] bg-brand-ink px-6 py-12 text-white md:px-12 md:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand opacity-70 blur-3xl" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b93ff]" /> Our
            portfolio
          </p>
          <h1 className="mt-6 max-w-4xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[56px]">
            <span className="text-[#8b93ff]">Offices</span>,{" "}
            <span className="text-[#8b93ff]">colleges</span> and{" "}
            <span className="text-[#8b93ff]">hostels</span> furnished across
            Malaysia.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Since {site.founded}, we&apos;ve planned, supplied and installed
            furniture for more than {site.projects}{" "}
            workplaces and institutions. Browse selected projects by year.
          </p>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-white/50">
                Projects
              </dt>
              <dd className="mt-1 text-2xl font-semibold md:text-3xl">
                {site.projects}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-white/50">
                Since
              </dt>
              <dd className="mt-1 text-2xl font-semibold md:text-3xl">
                {site.founded}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-white/50">
                Layout
              </dt>
              <dd className="mt-1 text-2xl font-semibold md:text-3xl">Free</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mt-14 space-y-12 pb-24">
        {projectsByYear().map(([year, list], gi) => (
          <section key={year}>
            <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {year}
              </h2>
              <span className="text-sm text-muted">
                {list.length
                  ? `${list.length} project${list.length > 1 ? "s" : ""}`
                  : "Coming soon"}
              </span>
            </div>
            {list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line px-5 py-6 text-sm text-muted">
                Projects from {year} will be added here soon.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((p, i) => (
                  <ProjectHoverCard
                    key={p.slug}
                    p={p}
                    priority={gi === 0 && i < 5}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-5 rounded-[28px] bg-brand-ink p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Planning a new office?
          </h2>
          <p className="mt-2 text-white/70">
            Send us your floor plan and headcount. Layout and quotation are
            free.
          </p>
        </div>
        <a
          href={waLink(
            "Hi Supreme, I saw your portfolio and I'd like a free layout plan for my office.",
          )}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink"
        >
          <IconWhatsApp className="h-4 w-4 text-wa" /> Start my project
        </a>
      </div>
    </div>
  );
}
