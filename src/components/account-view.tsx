"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useQuote, type QuoteItem } from "./quote-store";
import { rm } from "@/lib/site";

type SavedQuote = { id: string; items: QuoteItem[]; total: number; channel: "whatsapp" | "email"; createdAt: string };

const input =
  "mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand";

export function AccountView() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { add, clear } = useQuote();
  const [quotes, setQuotes] = useState<SavedQuote[] | null>(null);
  const [profile, setProfile] = useState({ name: "", company: "", phone: "", location: "" });
  const [status, setStatus] = useState<"" | "saving" | "saved" | "error">("");
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) router.replace("/login?next=/account");
  }, [isPending, session, router]);

  useEffect(() => {
    if (!user || loadedFor === user.id) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fill the form once when the user loads
    setProfile({ name: user.name ?? "", company: user.company ?? "", phone: user.phone ?? "", location: user.location ?? "" });
    setLoadedFor(user.id);
    fetch("/api/quotes")
      .then((r) => (r.ok ? r.json() : { quotes: [] }))
      .then((d: { quotes: SavedQuote[] }) => setQuotes(d.quotes))
      .catch(() => setQuotes([]));
  }, [user, loadedFor]);

  if (isPending || !user) return <div className="h-64" />;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await authClient.updateUser({
      name: profile.name.trim() || user!.name,
      company: profile.company.trim(),
      phone: profile.phone.trim(),
      location: profile.location.trim(),
    });
    setStatus(res.error ? "error" : "saved");
  }

  async function signOut() {
    clear(); // don't leave this customer's basket on a shared computer
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  function reorder(q: SavedQuote) {
    for (const { key: _key, qty, ...rest } of q.items) {
      void _key;
      add(rest, qty);
    }
    router.push("/quote");
  }

  const field = (k: keyof typeof profile, label: string, type = "text") => (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={profile[k]}
        onChange={(e) => {
          setProfile({ ...profile, [k]: e.target.value });
          setStatus("");
        }}
        className={input}
      />
    </label>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <section>
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="text-lg font-semibold">Your details</h2>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          <p className="mt-2 text-xs text-muted">These pre-fill your quote requests so you don&apos;t retype them.</p>
          <form onSubmit={save} className="mt-5 space-y-4">
            {field("name", "Name")}
            {field("company", "Company")}
            {field("phone", "Phone", "tel")}
            {field("location", "Usual delivery location")}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "saving"}
                className="h-11 rounded-full bg-ink px-6 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "saving" ? "Saving…" : "Save details"}
              </button>
              {status === "saved" && <span className="text-sm text-wa-ink">Saved</span>}
              {status === "error" && <span className="text-sm text-red-700">Couldn&apos;t save. Try again.</span>}
            </div>
          </form>
        </div>
        <button onClick={signOut} className="mt-4 px-1 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
          Sign out
        </button>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Quote history</h2>
        {quotes === null ? (
          <div className="mt-4 h-32" />
        ) : quotes.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center">
            <p className="font-semibold">No quotes sent yet</p>
            <p className="mt-2 text-sm text-muted">Quotes you send by WhatsApp or email will be kept here.</p>
            <Link href="/collections/all" className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {quotes.map((q) => {
              const units = q.items.reduce((n, i) => n + i.qty, 0);
              return (
                <li key={q.id} className="rounded-2xl border border-line bg-surface p-4 md:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold">
                      {new Date(q.createdAt).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" })}
                      <span className="ml-2 font-normal text-muted">
                        {units} item{units === 1 ? "" : "s"} · via {q.channel === "whatsapp" ? "WhatsApp" : "email"}
                      </span>
                    </p>
                    <p className="tabular text-sm font-semibold">{rm(q.total)}</p>
                  </div>
                  <ul className="mt-2 space-y-0.5 text-sm text-ink-2">
                    {q.items.slice(0, 4).map((i) => (
                      <li key={i.key} className="truncate">
                        {i.qty} × {i.name}
                      </li>
                    ))}
                    {q.items.length > 4 && <li className="text-muted">+ {q.items.length - 4} more</li>}
                  </ul>
                  <button onClick={() => reorder(q)} className="mt-3 text-sm font-semibold text-brand underline-offset-4 hover:underline">
                    Add these to my quote again
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-3 text-xs text-muted">Totals are estimates. The formal quotation from our team is the final price.</p>
      </section>
    </div>
  );
}
