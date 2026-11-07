"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuote } from "./quote-store";
import { IconWhatsApp } from "./icons";
import { rm, site, waLink } from "@/lib/site";

export function QuoteView() {
  const { items, ready, setQty, remove, clear } = useQuote();
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [contact, setContact] = useState(site.contacts[0].phone);

  if (!ready) return <div className="h-40" />;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-surface px-6 py-20 text-center">
        <p className="text-lg font-semibold">Your quote is empty</p>
        <p className="mt-2 text-muted">Browse the catalogue and tap “Add to quote” on anything you need.</p>
        <Link href="/collections/all" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
          Browse products
        </Link>
      </div>
    );
  }

  const total = items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);
  const hasUnpriced = items.some((i) => i.price == null);

  const message = [
    "Hi Supreme, I'd like a quotation for:",
    "",
    ...items.map((i, n) => {
      const opts = Object.entries(i.opts).map(([k, v]) => `${k}: ${v}`).join(", ");
      return `${n + 1}. ${i.name}${opts ? ` (${opts})` : ""} × ${i.qty}${i.price != null ? ` @ ${rm(i.price)}` : ""}\n   ${site.url}/products/${i.slug}`;
    }),
    "",
    `Estimated total: ${rm(total)}${hasUnpriced ? " + items priced on request" : ""}`,
    "",
    form.name ? `Name: ${form.name}` : null,
    form.company ? `Company: ${form.company}` : null,
    form.phone ? `Phone: ${form.phone}` : null,
    form.email ? `Email: ${form.email}` : null,
    form.location ? `Delivery location: ${form.location}` : null,
    form.notes ? `Notes: ${form.notes}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n")
    .trim();

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Quotation request${form.company ? ` – ${form.company}` : ""}`,
  )}&body=${encodeURIComponent(message)}`;

  const field = (k: keyof typeof form, label: string, type = "text", wide = false) => (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium">{label}</span>
      {k === "notes" ? (
        <textarea
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand"
          placeholder="Floor plan, deadline, custom sizes…"
        />
      ) : (
        <input
          type={type}
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          className="mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand"
        />
      )}
    </label>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <ul className="divide-y divide-line rounded-3xl border border-line bg-surface">
          {items.map((i) => (
            <li key={i.key} className="flex gap-4 p-4 md:p-5">
              <Link href={`/products/${i.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-line/70 md:h-24 md:w-24">
                {i.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={i.image} alt="" className="h-full w-full object-contain p-2" />
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/products/${i.slug}`} className="line-clamp-2 font-medium leading-snug hover:text-brand">
                  {i.name}
                </Link>
                {Object.keys(i.opts).length > 0 && (
                  <p className="mt-1 text-sm text-muted">{Object.entries(i.opts).map(([k, v]) => `${k}: ${v}`).join(" · ")}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex h-9 items-center rounded-full border border-line">
                    <button className="w-9 text-muted" onClick={() => setQty(i.key, i.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span className="tabular w-7 text-center text-sm font-semibold">{i.qty}</span>
                    <button className="w-9 text-muted" onClick={() => setQty(i.key, i.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button onClick={() => remove(i.key)} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                    Remove
                  </button>
                </div>
              </div>
              <p className="tabular shrink-0 text-right text-sm font-semibold">
                {i.price != null ? rm(i.price * i.qty) : "On request"}
                {i.qty > 1 && i.price != null && <span className="block text-xs font-normal text-muted">{rm(i.price)} each</span>}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between px-1">
          <Link href="/collections/all" className="text-sm font-semibold hover:text-brand">← Keep browsing</Link>
          <button onClick={clear} className="text-sm text-muted hover:text-ink">Clear quote</button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-line bg-surface p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted">Estimated total</span>
            <span className="tabular text-2xl font-semibold tracking-tight">{rm(total)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Final pricing, delivery and installation are confirmed in your formal quotation.
            {total >= 1500 && " This order qualifies for free delivery in Klang Valley."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {field("name", "Your name")}
            {field("company", "Company")}
            {field("phone", "Phone", "tel")}
            {field("email", "Email", "email")}
            {field("location", "Delivery location", "text", true)}
            {field("notes", "Notes", "text", true)}
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-medium">Send to</span>
            <select
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-brand"
            >
              {site.contacts.map((c) => (
                <option key={c.phone} value={c.phone}>
                  {c.name} · {c.display}
                </option>
              ))}
            </select>
          </label>

          <a
            href={waLink(message, contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-wa text-sm font-semibold text-white"
          >
            <IconWhatsApp className="h-4 w-4" /> Send quote on WhatsApp
          </a>
          <a href={mailto} className="mt-2.5 flex h-12 items-center justify-center rounded-full border border-line text-sm font-semibold hover:border-ink/30">
            Send by email instead
          </a>
        </div>
      </aside>
    </div>
  );
}
