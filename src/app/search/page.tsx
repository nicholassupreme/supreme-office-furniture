import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-8 md:px-6 md:pt-12">
      <Suspense fallback={<div className="h-40" />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
