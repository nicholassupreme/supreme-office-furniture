"use client";

import { useState } from "react";
import type { Industry, Project } from "@/data/portfolio";
import { ProjectHoverCard } from "@/components/project-hover-card";

/**
 * Industry filter chips (every industry, with counts) + one photo section per industry that has projects.
 * Industries without projects yet are listed compactly as "coming soon" instead of as empty sections.
 */
export function PortfolioBrowser({
  groups,
}: {
  groups: (readonly [Industry, Project[]])[];
}) {
  const [only, setOnly] = useState<Industry | null>(null);
  const withProjects = groups.filter(([, l]) => l.length > 0);
  const empty = groups.filter(([, l]) => l.length === 0);
  const shown = only ? groups.filter(([ind]) => ind === only) : withProjects;

  const chip = (on: boolean, hasProjects: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
      on
        ? "bg-brand text-white"
        : hasProjects
          ? "bg-surface text-ink ring-1 ring-line hover:ring-brand/40"
          : "bg-transparent text-muted ring-1 ring-dashed ring-line hover:text-ink hover:ring-brand/40"
    }`;
  const count = (n: number, on: boolean) =>
    n > 0 && (
      <span
        className={`tabular rounded-full px-1.5 text-[11px] font-semibold ${on ? "bg-white/20" : "bg-line"}`}
      >
        {n}
      </span>
    );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => setOnly(null)}
          className={chip(only === null, true)}
        >
          All industries
        </button>
        {groups.map(([ind, list]) => (
          <button
            key={ind}
            onClick={() => setOnly(ind)}
            className={chip(only === ind, list.length > 0)}
          >
            {ind}
            {count(list.length, only === ind)}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-12 pb-10">
        {shown.map(([ind, list], gi) => (
          <section key={ind}>
            <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
              <h2 className="text-2xl font-semibold tracking-tight md:text-[28px]">
                {ind}
              </h2>
              <span className="text-sm text-muted">
                {list.length
                  ? `${list.length} project${list.length > 1 ? "s" : ""}`
                  : "Coming soon"}
              </span>
            </div>
            {list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line px-5 py-6 text-sm text-muted">
                {ind} projects will be added here soon. Planning one? Send us
                your floor plan for a free layout.
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

      {only === null && empty.length > 0 && (
        <section className="pb-24">
          <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Other industries we serve
            </h2>
            <span className="text-sm text-muted">Projects coming soon</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {empty.map(([ind]) => (
              <button
                key={ind}
                onClick={() => setOnly(ind)}
                className="rounded-xl border border-dashed border-line px-4 py-3 text-left text-sm font-medium text-ink-2 transition hover:border-brand/40 hover:text-brand"
              >
                {ind}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
