"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuote } from "./quote-store";
import { authClient } from "@/lib/auth-client";
import { IconWhatsApp } from "./icons";
import { rm, site, waLink } from "@/lib/site";

export function QuoteView() {
  const { items, ready, setQty, remove, clear } = useQuote();
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [contact, setContact] = useState(site.contacts[0].phone);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const prefilled = useRef(false);

  // Logged in: fill the contact form from the saved account details (once, without overwriting what they typed).
  useEffect(() => {
    if (!user || prefilled.current) return;
    prefilled.current = true;
    setForm((f) => ({
      ...f,
      name: f.name || user.name || "",
      email: f.email || user.email || "",
      company: f.company || user.company || "",
      phone: f.phone || user.phone || "",
      location: f.location || user.location || "",
    }));
  }, [user]);

  // Logged in: keep a record of the quote in their history when they send it.
  function record(channel: "whatsapp" | "email") {
    if (!user) return;
    fetch("/api/quotes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items, channel, ...form }),
      keepalive: true,
    }).catch(() => {});
  }

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
      return `${n + 1}. ${i.name}${opts ? ` (${opts})` : ""} × ${i.qty}${i.price != null ? ` @ ${rm(i.price)}` : ""}\n   ${site.url}${i.href ?? `/products/${i.slug}`}`;
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
              <Link href={i.href ?? `/products/${i.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-line/70 md:h-24 md:w-24">
                {i.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={i.image} alt="" className="h-full w-full object-contain p-2" />
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={i.href ?? `/products/${i.slug}`} className="line-clamp-3 font-medium leading-snug hover:text-brand">
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
            {total >= 1500 && !items.some((i) => i.noFreeDelivery)
              ? " Orders above RM1,500 of standard items may qualify for free delivery in Klang Valley (T&C apply)."
              : " Safes, pods and other bulky items carry a transport charge, and delivery outside Klang Valley is charged. We confirm all delivery charges in your quotation."}
            {items.some((i) => i.slug.startsWith("ace-")) && " Ace pods: delivery is RM400 per trip within Klang Valley."}
          </p>

          {!isPending && !user && (
            <p className="mt-5 rounded-xl bg-brand-soft px-3.5 py-3 text-xs leading-relaxed text-ink-2">
              <Link href="/login?mode=signup&next=/quote" className="font-semibold text-brand underline-offset-4 hover:underline">
                Create a free account
              </Link>{" "}
              or{" "}
              <Link href="/login?next=/quote" className="font-semibold text-brand underline-offset-4 hover:underline">
                sign in
              </Link>{" "}
              to save this quote, keep your history and pre-fill your details. Or just send it as a guest below.
            </p>
          )}

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
            onClick={() => record("whatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-wa text-sm font-semibold text-white"
          >
            <IconWhatsApp className="h-4 w-4" /> Send quote on WhatsApp
          </a>
          <a href={mailto} onClick={() => record("email")} className="mt-2.5 flex h-12 items-center justify-center rounded-full border border-line text-sm font-semibold hover:border-ink/30">
            Send by email instead
          </a>
        </div>
      </aside>
    </div>
  );
}
