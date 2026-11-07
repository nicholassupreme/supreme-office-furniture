import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { QuoteProvider } from "@/components/quote-store";
import { AddedToast } from "@/components/added-toast";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Supreme Office Furniture | Office Chairs, Desks & Workstations Malaysia",
    template: "%s | Supreme Office Furniture",
  },
  description:
    "Office furniture supplier in Klang Valley since 1985. 1,700+ office chairs, desks, workstations, conference tables, storage and safes. Free layout planning and quotation.",
  openGraph: { siteName: site.name, locale: "en_MY", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f5f3ee" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AddedToast />
          <FloatingWhatsApp />
        </QuoteProvider>
      </body>
    </html>
  );
}
