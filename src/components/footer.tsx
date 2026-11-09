import Image from "next/image";
import Link from "next/link";
import { taxonomy } from "@/lib/taxonomy";
import { site, waLink } from "@/lib/site";
import { Wordmark } from "./header";

async function year() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const y = await year();
  return (
    <footer className="mt-24 bg-[#1a1450] text-white/75">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-16 md:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Wordmark invert className="h-6 md:h-7" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            One of Malaysia&apos;s longest-running office furniture suppliers. Serving offices, schools and institutions from
            our showroom in Klang since {site.founded}.
          </p>
          <div className="mt-6 space-y-1 text-sm">
            {site.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink("Hi Supreme, I'd like to ask about office furniture.")}
              className="rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-white"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white">
              {site.email}
            </a>
          </div>
          <div className="mt-8 inline-flex items-center gap-5 rounded-xl bg-white px-4 py-3">
            <Image src="/badges/mof.png" alt="Malaysia Ministry of Finance (MOF) registered company" width={256} height={98} className="h-11 w-auto" />
            <Image src="/badges/eperolehan.png" alt="ePerolehan" width={400} height={275} className="h-11 w-auto" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterCol title="Shop">
            {taxonomy.map((d) => (
              <FooterLink key={d.slug} href={`/collections/${d.slug}`}>
                {d.name}
              </FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Services">
            <FooterLink href="/services#planning">Layout planning</FooterLink>
            <FooterLink href="/services#renovation">Office renovation</FooterLink>
            <FooterLink href="/services#relocation">Relocation & disposal</FooterLink>
            <FooterLink href="/services#rental">Furniture rental</FooterLink>
            <FooterLink href="/services#repair">Furniture repair</FooterLink>
            <FooterLink href="/services#safes">Safe relocation</FooterLink>
          </FooterCol>
          <FooterCol title="Company">
            <FooterLink href="/about">About us</FooterLink>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/contact">Showroom & contact</FooterLink>
            <FooterLink href="/partners">Partner program</FooterLink>
            <FooterLink href="/quote">Quote basket</FooterLink>
            <FooterLink href="/pages/delivery-terms">Delivery terms</FooterLink>
            <FooterLink href="/pages/refund-return-policy">Returns & refunds</FooterLink>
            <FooterLink href="/pages/privacy-policy">Privacy policy</FooterLink>
          </FooterCol>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-6 text-xs text-white/50 md:flex-row md:justify-between md:px-6">
          <p>
            © {y} {site.legal} ({site.regNo})
          </p>
          <p>All items are made to order. Prices in Malaysian Ringgit.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white">
        {children}
      </Link>
    </li>
  );
}
