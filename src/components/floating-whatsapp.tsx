"use client";

import { usePathname } from "next/navigation";
import { site, waLink } from "@/lib/site";
import { IconWhatsApp } from "./icons";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/quote") || pathname.startsWith("/products/")) return null;
  return (
    <a
      href={waLink("Hi Supreme, I'd like to ask about office furniture.")}
      aria-label={`WhatsApp ${site.whatsappDisplay}`}
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg shadow-wa/30 transition hover:scale-105"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
