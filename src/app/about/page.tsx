import type { Metadata } from "next";
import Link from "next/link";
import { awards } from "@/data/policies";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Supreme Office Furniture System has supplied Malaysian offices since 1985. ISO 9001 certified, with 5,000+ projects completed.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-10 md:px-6 md:pt-14">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Since {site.founded}</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Four decades of furnishing Malaysian offices.
          </h1>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p>
              Supreme Office Furniture System, formerly Supreme Business Technology, started in 1985 as an office automation
              repair service. Today it&apos;s one of Malaysia&apos;s largest office furniture suppliers.
            </p>
            <p>
              We offer complete office systems, from partitions and workstations to chairs and storage, in contemporary
              designs that can be mixed, matched or customised. Whether you need one chair or a full office fit-out, we
              work out what you actually need and supply it direct from the factory to your door.
            </p>
            <p>
              Our range covers Malaysian-made and imported commercial furniture. Visit our Klang showroom to see it in
              person, or talk to our team for advice. That&apos;s what we&apos;re here for.
            </p>
          </div>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white">
            Visit the showroom
          </Link>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Awards & recognition</p>
          <ul className="mt-5 divide-y divide-line">
            {awards.map((a) => (
              <li key={a} className="py-3 text-[15px]">{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
