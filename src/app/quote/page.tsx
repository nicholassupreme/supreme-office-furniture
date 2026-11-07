import type { Metadata } from "next";
import { QuoteView } from "@/components/quote-view";

export const metadata: Metadata = {
  title: "Your quote",
  description: "Review the products you've picked and send them to us for a quotation.",
  robots: { index: false },
};

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-8 md:px-6 md:pt-12">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">Your quote</h1>
      <p className="mt-3 max-w-2xl text-ink-2">
        Add everything you need, then send the list to us on WhatsApp or email. We&apos;ll reply with a formal quotation,
        lead time and delivery details. No payment is taken online.
      </p>
      <div className="mt-10">
        <QuoteView />
      </div>
    </div>
  );
}
