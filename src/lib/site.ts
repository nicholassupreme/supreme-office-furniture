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

export function waLink(text: string, phone = site.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function rm(n: number | null | undefined) {
  if (n == null) return "Price on request";
  return "RM " + n.toLocaleString("en-MY", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
