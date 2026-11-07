import type { Metadata } from "next";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Partner Program",
  description: "Exclusive partner pricing and project support for interior designers, contractors and dealers.",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6 md:pt-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Partner program</p>
      <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
        For interior designers, contractors and dealers.
      </h1>
      <p className="mt-6 text-[17px] leading-relaxed text-ink-2">
        Working on office projects for your clients? Get exclusive partner pricing across our full catalogue, plus project
        support from layout to installation.
      </p>
      <ul className="mt-8 space-y-3">
        {["Partner pricing on 1,700+ products", "Layout and quotation support for your projects", "Customised sizes and finishes", "Delivery and installation by our team"].map((p) => (
          <li key={p} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <span className="h-1.5 w-1.5 rounded-full bg-oak" /> {p}
          </li>
        ))}
      </ul>
      <a
        href={waLink("Hi Supreme, I'm a designer/contractor/dealer and I'd like to know about partner pricing.")}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-sm font-semibold text-white"
      >
        <IconWhatsApp className="h-4 w-4" /> Ask for partner pricing
      </a>
    </div>
  );
}
