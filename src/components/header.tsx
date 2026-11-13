"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navTabs, taxonomy } from "@/lib/taxonomy";
import { rm, site, waLink } from "@/lib/site";
import { cleanName } from "./product-card";
import { useQuote } from "./quote-store";
import { IconBag, IconClose, IconMenu, IconSearch, IconWhatsApp } from "./icons";

type StarCard = { slug: string; name: string; price: number | null; priceMax: number | null; image: string | null };

type Booth = { slug: string; name: string; tag: string; price: number | null; image: string | null };
const BOOTHS = "office-phone-booth-open-pods";

export function Header({ stars, booths, boothCount }: { stars: Record<string, StarCard>; booths: Booth[]; boothCount: number }) {
  const [open, setOpen] = useState<string | null>(null); // desktop mega-menu dept
  const [hoverSub, setHoverSub] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useQuote();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close menus on navigation
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (slug: string) => {
    clearTimeout(closeTimer.current);
    if (slug !== open) setHoverSub(null);
    setOpen(slug);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const tab = navTabs.find((t) => t.key === open);
  const dept = tab?.depts.length === 1 ? tab.depts[0] : undefined;

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(22,24,29,0.18)]" : ""
      }`}
    >
      <div
        className={`hidden overflow-hidden bg-brand text-[12.5px] font-medium text-white/90 transition-[height] duration-300 md:block ${
          scrolled ? "h-0" : "h-9"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-6">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-oak" />
            Free delivery in Klang Valley above RM1,500
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:+${site.whatsapp}`} className="tabular hover:text-white">{site.whatsappDisplay}</a>
            <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
            <Link href="/contact" className="hover:text-white">Showroom in Klang →</Link>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-paper/85 backdrop-blur-xl">
        {/* Row 1: search · logo (centre) · quote */}
        <div
          className={`mx-auto grid max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 transition-[height] duration-300 md:px-6 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-[84px]"
          }`}
        >
          <div className="flex items-center">
            <button className="-ml-2.5 rounded-full p-3 xl:hidden" onClick={() => setMobile(true)} aria-label="Open menu">
              <IconMenu />
            </button>
            <SearchBox />
          </div>

          <Link href="/" className="justify-self-center" aria-label="Supreme Office Furniture home">
            <Wordmark className={`h-5 transition-[height] duration-300 ${scrolled ? "md:h-6" : "md:h-[30px]"}`} />
          </Link>

          <div className="flex items-center justify-end">
            <Link
              href="/quote"
              className="relative -mr-1 flex items-center gap-2 rounded-full p-3 text-sm font-semibold transition md:bg-accent md:py-2.5 md:pl-4 md:pr-3 md:text-white md:hover:bg-accent-ink"
              aria-label={`Quote basket, ${count} items`}
            >
              <IconBag className="h-[18px] w-[18px]" />
              <span className="hidden md:inline">Quote</span>
              {ready && count > 0 ? (
                <span className="tabular absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white md:static md:bg-white md:text-accent">
                  {count}
                </span>
              ) : (
                <span className="hidden md:block md:w-0.5" />
              )}
            </Link>
          </div>
        </div>

        {/* Row 2: categories, centred */}
        <nav className="hidden h-12 items-stretch justify-center border-t border-line/70 xl:flex" onMouseLeave={leave}>
          {navTabs.map((t) => {
            const on =
              open === t.key ||
              t.depts.some((d) => pathname === `/collections/${d.slug}` || d.subs.some(([s]) => pathname === `/collections/${s}`));
            return (
              <div key={t.key} className="flex items-stretch" onMouseEnter={() => enter(t.key)}>
                <Link
                  href={`/collections/${t.key}`}
                  className={`group relative flex items-center whitespace-nowrap px-3.5 text-[14px] font-medium transition-colors 2xl:px-5 ${
                    on ? "text-ink" : "text-ink-2/80 hover:text-ink"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute inset-x-3.5 bottom-0 h-[2px] origin-center rounded-full bg-brand transition-transform duration-300 2xl:inset-x-5 ${
                      on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Desktop mega-menu: grouped tab (e.g. Desks & Workstations) */}
      {tab && !dept && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-[0_24px_48px_-24px_rgba(22,24,29,0.18)] xl:block"
          onMouseEnter={() => enter(tab.key)}
          onMouseLeave={leave}
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)_260px] gap-10 px-6 py-8">
            <div className="grid gap-8 border-r border-line pr-8" style={{ gridTemplateColumns: `repeat(${tab.depts.length}, minmax(0, 1fr))` }}>
              {tab.depts.map((d) => (
                <div key={d.slug} onMouseLeave={() => setHoverSub(null)}>
                  <Link href={`/collections/${d.slug}`} className="text-xl font-semibold tracking-tight hover:text-brand">
                    {d.name}
                  </Link>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.blurb}</p>
                  <ul className="mt-4 grid content-start gap-y-0.5">
                    {d.subs.map(([s, n]) => (
                      <li key={s}>
                        <Link
                          href={`/collections/${s}`}
                          onMouseEnter={() => setHoverSub(s)}
                          onFocus={() => setHoverSub(s)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-[15px] transition-colors ${
                            hoverSub === s ? "bg-paper text-brand" : "text-ink-2 hover:text-brand"
                          }`}
                        >
                          {n}
                          <span className={`text-xs transition-opacity ${hoverSub === s ? "opacity-100" : "opacity-0"}`}>→</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={`/collections/${d.slug}`} className="mt-1 inline-flex px-3 py-2 text-sm font-medium text-brand hover:underline">
                        Shop all {d.name.toLowerCase()} →
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <StarProduct p={stars[hoverSub ?? tab.key] ?? stars[tab.key]} />
          </div>
        </div>
      )}

      {/* Desktop mega-menu */}
      {dept && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-[0_24px_48px_-24px_rgba(22,24,29,0.18)] xl:block"
          onMouseEnter={() => enter(dept.slug)}
          onMouseLeave={leave}
        >
          {dept.slug === BOOTHS ? (
            <div className="mx-auto grid max-w-[1320px] grid-cols-[250px_minmax(0,1fr)] gap-10 px-6 py-8">
              <div>
                <p className="text-xl font-semibold tracking-tight">{dept.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{dept.blurb}</p>
                <Link
                  href={`/collections/${dept.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                  See all {boothCount} pod products →
                </Link>
              </div>
              <ul className="grid grid-cols-4 gap-4">
                {booths.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/products/${b.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_14px_30px_-18px_rgba(22,24,29,0.35)]"
                    >
                      <div className="aspect-square bg-white">
                        {b.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={b.image} alt={b.name} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105" />
                        )}
                      </div>
                      <div className="border-t border-line/70 px-4 py-3">
                        <p className="flex items-baseline justify-between gap-2">
                          <span className="text-[15px] font-semibold group-hover:text-brand">{b.name}</span>
                          <span className="text-xs text-muted">{b.tag}</span>
                        </p>
                        <p className="tabular mt-0.5 text-[13px] text-ink-2">{rm(b.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
          <div className="mx-auto grid max-w-[1320px] grid-cols-[250px_minmax(0,1fr)_260px] gap-10 px-6 py-8">
            <div>
              <p className="text-xl font-semibold tracking-tight">{dept.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{dept.blurb}</p>
              <Link
                href={`/collections/${dept.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                Shop all {dept.name.toLowerCase()} →
              </Link>
            </div>
            {dept.subs.length > 0 ? (
              <ul className="grid content-start gap-x-8 gap-y-0.5 border-r border-line pr-8 sm:grid-cols-2" onMouseLeave={() => setHoverSub(null)}>
                {dept.subs.map(([s, n]) => (
                  <li key={s}>
                    <Link
                      href={`/collections/${s}`}
                      onMouseEnter={() => setHoverSub(s)}
                      onFocus={() => setHoverSub(s)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-[15px] transition-colors ${
                        hoverSub === s ? "bg-paper text-brand" : "text-ink-2 hover:text-brand"
                      }`}
                    >
                      {n}
                      <span className={`text-xs transition-opacity ${hoverSub === s ? "opacity-100" : "opacity-0"}`}>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="self-center border-r border-line pr-8 text-sm text-muted">Browse the full range of {dept.name.toLowerCase()}.</p>
            )}
            <StarProduct p={stars[hoverSub ?? dept.slug] ?? stars[dept.slug]} />
          </div>
          )}
        </div>
      )}

      {/* Mobile drawer */}
      {mobile && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobile(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-surface">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Wordmark />
              <button className="rounded-full p-3" onClick={() => setMobile(false)} aria-label="Close menu">
                <IconClose />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {taxonomy.map((d) => (
                <details key={d.slug} className="group border-b border-line/70 last:border-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3.5 text-[15px] font-medium">
                    {d.name}
                    <span className="text-muted transition group-open:rotate-45">+</span>
                  </summary>
                  <ul className="pb-3">
                    <li>
                      <Link href={`/collections/${d.slug}`} className="block px-5 py-2 text-sm font-medium text-brand">
                        Shop all
                      </Link>
                    </li>
                    {d.subs.map(([s, n]) => (
                      <li key={s}>
                        <Link href={`/collections/${s}`} className="block px-5 py-2 text-sm text-ink-2">
                          {n}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-4 space-y-1 px-3 text-[15px]">
                <Link href="/portfolio" className="block py-2">Portfolio</Link>
                <Link href="/services" className="block py-2">Services</Link>
                <Link href="/about" className="block py-2">About us</Link>
                <Link href="/contact" className="block py-2">Showroom & contact</Link>
              </div>
            </nav>
            <div className="border-t border-line p-4">
              <a
                href={waLink("Hi Supreme, I'd like to ask about office furniture.")}
                className="flex items-center justify-center gap-2 rounded-full bg-wa py-3 text-sm font-semibold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Wordmark({ className = "h-5 md:h-[26px]", invert = false }: { className?: string; invert?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Supreme Office"
      width={548}
      height={57}
      className={`w-auto ${invert ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [expanded]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setExpanded(false);
  };

  return (
    <>
      {/* Wide screens: inline field */}
      <form role="search" onSubmit={submit} className="relative hidden xl:block">
        <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          className="h-10 w-56 rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none transition-[width,border-color] placeholder:text-muted focus:w-72 focus:border-brand"
          aria-label="Search products"
        />
      </form>

      {/* Everything else: icon that opens a search bar */}
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5 xl:hidden"
        aria-label="Search"
        onClick={() => {
          setExpanded(true);
          setTimeout(() => ref.current?.focus(), 0);
        }}
      >
        <IconSearch />
      </button>

      {expanded && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setExpanded(false)} />
          <form role="search" onSubmit={submit} className="relative mx-auto mt-3 flex max-w-2xl items-center gap-2 px-3 md:mt-20">
            <div className="relative flex-1">
              <IconSearch className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search chairs, desks, cabinets, safes…"
                className="h-14 w-full rounded-2xl bg-surface pl-14 pr-4 text-base shadow-2xl outline-none ring-1 ring-line focus:ring-brand"
                aria-label="Search products"
              />
            </div>
            <button type="button" className="rounded-full bg-surface px-4 py-3 text-sm font-medium shadow md:hidden" onClick={() => setExpanded(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function StarProduct({ p }: { p?: StarCard }) {
  if (!p) return <div />;
  const from = p.priceMax != null && p.price != null && p.priceMax > p.price;
  return (
    <Link
      key={p.slug}
      href={`/products/${p.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white transition hover:border-ink/20"
    >
      <div className="relative aspect-[4/3] bg-white">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105" />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#faeeda] px-2.5 py-1 text-[11px] font-semibold text-[#633806]">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z" />
          </svg>
          Star pick
        </span>
      </div>
      <div className="border-t border-line/70 px-4 py-3">
        <p className="line-clamp-1 text-sm font-semibold">{cleanName(p.name)}</p>
        <p className="tabular mt-0.5 text-[13px] text-muted">
          {from && "From "}
          {rm(p.price)}
        </p>
        <p className="mt-2 text-[13px] font-semibold text-brand">View product →</p>
      </div>
    </Link>
  );
}
