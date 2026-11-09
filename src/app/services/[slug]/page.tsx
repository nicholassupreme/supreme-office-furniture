import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, services } from "@/data/services";
import { site, waLink } from "@/lib/site";
import { IconArrow, IconCheck, IconWhatsApp } from "@/components/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} | Office Furniture Services`,
    description: s.body,
    openGraph: { images: [s.img] },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== slug);
  const enquire = waLink(`Hi Supreme, I'd like to ask about: ${s.title}.`);

  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-6 md:px-6 md:pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/services" className="hover:text-ink">
          ← All services
        </Link>
      </nav>

      {/* Hero */}
      <section className="mt-6 grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-center p-7 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Service
          </p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            {s.title}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-2">
            {s.intro}
          </p>
          <ul className="mt-6 space-y-2 text-[15px]">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <IconCheck className="h-4 w-4 shrink-0 text-brand" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={enquire}
              className="inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3 text-sm font-semibold text-white transition hover:bg-wa-ink"
            >
              <IconWhatsApp className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(s.title)}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:border-ink"
            >
              Email us
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] bg-white lg:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-contain p-6"
          />
        </div>
      </section>

      {/* What's included */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          What&apos;s included
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.included.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <span className="block h-1.5 w-8 rounded-full bg-oak" />
              <h3 className="mt-4 font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand to-brand-ink p-7 text-white md:p-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <li key={st.title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{st.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/80">
                {st.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Suits + FAQ */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Good for
          </h2>
          <ul className="mt-6 space-y-3">
            {s.suits.map((x) => (
              <li
                key={x}
                className="flex items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-[15px]"
              >
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Serving offices since {site.founded}, with {site.projects} projects
            furnished for corporates, SMEs, government, schools and healthcare.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {s.faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="text-xl leading-none text-muted transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-7 md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Talk to us about {s.title.toLowerCase()}
          </h2>
          <p className="mt-2 text-ink-2">
            Send a message with what you need and we&apos;ll get back to you
            with next steps.
          </p>
        </div>
        <a
          href={enquire}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wa px-6 py-3 text-sm font-semibold text-white transition hover:bg-wa-ink"
        >
          <IconWhatsApp className="h-4 w-4" /> {site.whatsappDisplay}
        </a>
      </section>

      {/* Other services */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Other services
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(49,39,131,0.5)]"
            >
              <div className="relative aspect-[4/3] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain p-3"
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-3 p-4">
                <span className="text-[15px] font-semibold leading-snug">
                  {o.title}
                </span>
                <IconArrow className="h-4 w-4 shrink-0 text-brand transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
