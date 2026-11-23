import Link from "next/link";
import type { Metadata } from "next";
import { WorkstationBuilder } from "@/components/workstation-builder";

export const metadata: Metadata = {
  title: "Build your workstation",
  description:
    "Customise an office workstation step by step: seaters, desk size, top colour, partition type, height and fabric colours, table legs and cable management. Send the setup to Supreme for a quotation.",
  alternates: { canonical: "/workstations/build" },
};

export default function BuildWorkstationPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-16 pt-8 md:px-6 md:pt-12">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/collections/office-workstations" className="hover:text-ink">Workstations</Link></li>
          <li aria-hidden>/</li>
          <li className="text-ink">Build your workstation</li>
        </ol>
      </nav>
      <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-5xl">Build your workstation</h1>
      <p className="mt-3 max-w-2xl text-ink-2">
        Choose the layout, sizes and finishes step by step. The preview updates as you go, and our team confirms the final
        price and lead time on WhatsApp.
      </p>
      <div className="mt-8">
        <WorkstationBuilder />
      </div>
    </div>
  );
}
