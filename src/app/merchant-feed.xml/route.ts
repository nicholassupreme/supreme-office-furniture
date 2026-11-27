import { createHash } from "node:crypto";
import { connection } from "next/server";
import { allProducts, availabilityOf, defaultPrice } from "@/lib/catalog";
import { cleanName } from "@/components/product-card";
import { deptName, subName } from "@/lib/taxonomy";
import { site } from "@/lib/site";

// Google Merchant Center product feed (RSS 2.0 + g: namespace). Built per request so the availability date rolls forward.
/** Everything is made to order; Google needs a date for backorder items. */
const LEAD_TIME_DAYS = 14;

const esc = (s: string) =>
  s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const text = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const abs = (u: string) => (u.startsWith("http") ? u : site.url + u);

/** Merchant Center ids are capped at 50 characters and must be plain ASCII (accents count extra). */
const idOf = (slug: string) =>
  slug.length <= 50 && /^[\x20-\x7E]+$/.test(slug)
    ? slug
    : `${slug.replace(/[^\x20-\x7E]/g, "").slice(0, 40)}-${createHash("sha1").update(slug).digest("hex").slice(0, 9)}`;

export async function GET() {
  await connection();
  // Malaysia is UTC+8: shift, add the lead time, and format as an ISO 8601 date at midnight MYT.
  const ready = new Date(Date.now() + 8 * 3600_000 + LEAD_TIME_DAYS * 86_400_000).toISOString().slice(0, 10) + "T00:00+08:00";
  const items = allProducts().flatMap((p) => {
    const price = defaultPrice(p);
    if (price == null || price <= 0 || !p.images[0]) return [];
    const title = cleanName(p.name).slice(0, 150);
    const desc = (text(p.summary || p.html || "") || `${title} from Supreme Office Furniture, Klang.`).slice(0, 4900);
    const type = [deptName(p.dept), p.subs[0] ? subName(p.subs[0]) : ""].filter(Boolean).join(" > ");
    const link = `${site.url}/products/${encodeURIComponent(p.slug)}`;
    return [
      [
        "<item>",
        `<g:id>${esc(idOf(p.slug))}</g:id>`,
        `<g:title>${esc(title)}</g:title>`,
        `<g:description>${esc(desc)}</g:description>`,
        `<g:link>${esc(link)}</g:link>`,
        `<g:image_link>${esc(abs(p.images[0]))}</g:image_link>`,
        ...p.images.slice(1, 11).map((u) => `<g:additional_image_link>${esc(abs(u))}</g:additional_image_link>`),
        `<g:availability>${availabilityOf(p)}</g:availability>`,
        `<g:availability_date>${ready}</g:availability_date>`,
        `<g:price>${price.toFixed(2)} MYR</g:price>`,
        `<g:condition>new</g:condition>`,
        `<g:brand>Supreme Office</g:brand>`,
        `<g:identifier_exists>no</g:identifier_exists>`,
        type ? `<g:product_type>${esc(type)}</g:product_type>` : "",
        "</item>",
      ].join(""),
    ];
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>${esc(site.name)}</title><link>${site.url}</link><description>${esc(site.name)} product feed</description>${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
