import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { policies } from "@/data/policies";


export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: policies[slug]?.title };
}

export default async function PolicyPage({ params }: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const page = policies[slug];
  if (!page) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">{page.title}</h1>
      <div className="prose-desc mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
