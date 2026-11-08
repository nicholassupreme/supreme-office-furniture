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
    <div className="mx-auto max-w-[1320px] px-4 pt-10 md:px-6 md:pt-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">
        Portfolio
      </p>
      <h1 className="mt-3 max-w-3xl text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
        Offices, colleges and hostels we&apos;ve furnished.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-2">
        A selection from {site.projects} projects across Malaysia. Use them as
        inspiration for your new or renovated space.
      </p>

      <div className="mt-10 space-y-12 pb-24">
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
