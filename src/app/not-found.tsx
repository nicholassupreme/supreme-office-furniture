import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-oak">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-muted">The product may have moved. Try searching, or browse the full catalogue.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/collections/all" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Browse products</Link>
        <Link href="/search" className="rounded-full border border-line px-6 py-3 text-sm font-semibold">Search</Link>
      </div>
    </div>
  );
}
