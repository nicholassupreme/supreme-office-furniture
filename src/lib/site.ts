export const site = {
  name: "Supreme Office Furniture",
  legal: "Supreme Office Furniture System Sdn Bhd",
  regNo: "332840-V",
  url: "https://www.supreme.com.my",
  founded: 1985,
  projects: "5,000+",
  whatsapp: "601154209676",
  whatsappDisplay: "+60 11-5420 9676",
  email: "sales@supreme.com.my",
  address: ["No. 5–9, Jalan Gopeng, Off Jalan Pasar", "41400 Klang, Selangor, Malaysia"],
  warehouse: "Lot 26495, Mukim Kapar, 42100 Klang, Selangor",
  waze: "https://waze.com/ul?q=Supreme%20Office%20Furniture%20System%20Sdn%20Bhd",
  maps: "https://www.google.com/maps/search/?api=1&query=Supreme+Office+Furniture+System+Jalan+Gopeng+Klang",
  contacts: [
    { name: "Nicholas", phone: "601154209676", display: "+60 11-5420 9676", email: "nicholas@supremebusiness.com.my" },
    { name: "Sarimah", phone: "60102805635", display: "+60 10-280 5635", email: "sarimah@supremebusiness.com.my" },
    { name: "Wati", phone: "60102845635", display: "+60 10-284 5635", email: "wati@supremebusiness.com.my" },
  ],
};

/** Image URL for search engines and feeds: product photos are served from our own domain, others made absolute. */
export function publicImage(u: string) {
  const r2 = "https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/i/";
  if (u.startsWith(r2)) return `${site.url}/product-images/${u.slice(r2.length)}`;
  return u.startsWith("http") ? u : site.url + u;
}

/** Heavy / bulky departments: never part of the free-delivery offer (transport charge applies). */
export const noFreeDeliveryDepts = ["security-safe-box", "office-phone-booth-open-pods"];

export function waLink(text: string, phone = site.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function rm(n: number | null | undefined) {
  if (n == null) return "Price on request";
  return "RM " + n.toLocaleString("en-MY", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
