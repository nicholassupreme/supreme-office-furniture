import * as z from "zod";

// Mirrors QuoteItem in components/quote-store.tsx. Everything is bounded because it comes from the browser.
export const quoteItemSchema = z.object({
  key: z.string().max(300),
  slug: z.string().max(200),
  name: z.string().max(300),
  image: z.string().max(500).nullable(),
  opts: z.record(z.string().max(60), z.string().max(200)),
  price: z.number().min(0).max(10_000_000).nullable(),
  qty: z.number().int().min(1).max(9999),
  href: z.string().max(300).optional(),
  noFreeDelivery: z.boolean().optional(),
});

export const quoteItemsSchema = z.array(quoteItemSchema).max(150);

export const quoteRequestSchema = z.object({
  items: quoteItemsSchema.min(1),
  channel: z.enum(["whatsapp", "email"]),
  name: z.string().trim().max(120).default(""),
  company: z.string().trim().max(160).default(""),
  phone: z.string().trim().max(40).default(""),
  email: z.string().trim().max(160).default(""),
  location: z.string().trim().max(300).default(""),
  notes: z.string().trim().max(2000).default(""),
});
