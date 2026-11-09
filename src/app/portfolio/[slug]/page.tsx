import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { coverOf, getProject, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.type} – ${p.industry} (${p.year})`,
    description: p.summary,
    openGraph: { images: [coverOf(p)] },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-6 md:px-6 md:pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/portfolio" className="hover:text-ink">
          ← All projects
        </Link>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {p.industry} · {p.year}
          </p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            {p.type}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
            {p.summary}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm">
          <div className="bg-surface p-4">
            <dt className="text-muted">Industry</dt>
            <dd className="mt-1 font-semibold">{p.industry}</dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="text-muted">Team size</dt>
            <dd className="mt-1 font-semibold">{p.size ?? "—"}</dd>
          </div>
          {p.supplied && (
            <div className="col-span-2 bg-surface p-4">
              <dt className="text-muted">Furniture supplied</dt>
              <dd className="mt-1 font-medium leading-relaxed">
                {p.supplied.join(" · ")}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-10">
        <ProjectGallery photos={p.photos} alt={p.type} />
      </div>

      <div className="mt-14 flex flex-col items-start gap-4 rounded-[28px] border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-semibold tracking-tight">
          Want a space like this? Get a quotation.
        </p>
        <a
          href={waLink(
            `Hi Supreme, I saw your ${p.type.toLowerCase()} project (${p.year}) and I'd like something similar for my office.`,
          )}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-sm font-semibold text-white"
        >
          <IconWhatsApp className="h-4 w-4" /> Talk to us
        </a>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">More projects</h2>
        <div className="mt-7 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <ProjectCard key={o.slug} p={o} />
          ))}
        </div>
      </section>
    </div>
  );
}
