import type { Metadata } from "next";
import { site, waLink } from "@/lib/site";
import { IconPin, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Showroom & Contact",
  description: "Visit our office furniture showroom in Klang, Selangor, or WhatsApp our sales team for a quotation.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">Showroom & contact</h1>
      <p className="mt-3 max-w-2xl text-ink-2">
        Talk to our sales team on WhatsApp, or visit the Klang showroom to see and try products in person.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0 rounded-3xl border border-line bg-surface p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Showroom</p>
          <p className="mt-4 flex items-start gap-2.5 text-lg">
            <IconPin className="mt-1 h-5 w-5 shrink-0 text-oak" />
            <span>
              {site.address[0]}
              <br />
              {site.address[1]}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.waze} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Open in Waze</a>
            <a href={site.maps} className="rounded-full border border-line px-5 py-3 text-sm font-semibold">Google Maps</a>
          </div>
          <div className="mt-10 border-t border-line pt-6 text-sm text-muted">
            <p className="font-semibold text-ink">Warehouse</p>
            <p className="mt-1">{site.warehouse}</p>
          </div>
        </div>

        <div className="min-w-0 rounded-3xl border border-line bg-surface p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oak">Sales enquiries</p>
          <ul className="mt-4 divide-y divide-line">
            {site.contacts.map((c) => (
              <li key={c.phone} className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="font-semibold">{c.name}</p>
                  <p className="tabular text-sm text-muted">{c.display}</p>
                  <a href={`mailto:${c.email}`} className="block break-all text-sm text-muted hover:text-brand">{c.email}</a>
                </div>
                <a
                  href={waLink("Hi, I'd like to ask about office furniture.", c.phone)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-wa px-5 py-3 text-sm font-semibold text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWhatsApp className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            General enquiries: <a href={`mailto:${site.email}`} className="font-medium text-ink hover:text-brand">{site.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
