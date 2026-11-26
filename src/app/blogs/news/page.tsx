import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, fmtDate } from "@/data/blog";

export const metadata: Metadata = {
  title: "News & articles",
  description: "Articles on office furniture, office pods and workplace design from Supreme Office Furniture.",
  alternates: { canonical: "/blogs/news" },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">News &amp; articles</h1>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blogs/news/${p.slug}`} className="group block overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs text-muted">{fmtDate(p.date)}</p>
                <h2 className="mt-1 text-lg font-semibold leading-snug">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink-2">{p.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
