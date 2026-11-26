import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, fmtDate } from "@/data/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blogs/news/${p.slug}` },
    openGraph: { title: p.title, description: p.description, images: [p.image], type: "article", publishedTime: p.date },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/news/[slug]">) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    datePublished: p.date,
    image: site.url + p.image,
    publisher: { "@type": "Organization", name: site.name },
  };
  return (
    <article className="mx-auto max-w-3xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link href="/blogs/news" className="text-sm text-muted hover:text-ink">← News &amp; articles</Link>
      <h1 className="mt-4 text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">{p.title}</h1>
      <p className="mt-3 text-sm text-muted">{fmtDate(p.date)}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt={p.title} className="mt-8 w-full rounded-3xl" />
      <div className="prose-desc mt-8 [&_img]:rounded-2xl [&_img]:h-auto [&_img]:max-w-full [&_a]:text-brand [&_a]:underline" dangerouslySetInnerHTML={{ __html: p.html }} />
    </article>
  );
}
