import type { NextConfig } from "next";

// Old EasyStore URLs that changed. Product and collection URLs are unchanged.
const moved: [string, string][] = [
  ["/pages/contact-us", "/contact"],
  ["/store-locator", "/contact"],
  ["/pages/what-do-we-do", "/about"],
  ["/pages/our-awards", "/about"],
  ["/pages/our-portfolio", "/about"],
  ["/pages/design-plan", "/services#planning"],
  ["/pages/office-furniture-supply", "/services#planning"],
  ["/pages/one-stop-office-renovation-services", "/services#renovation"],
  ["/pages/office-furniture-rental-services", "/services#rental"],
  ["/pages/office-furniture-repair", "/services#repair"],
  ["/pages/safe-box-relocation-service", "/services#safes"],
  ["/products/office-furniture-disposal-relocation-service", "/services#relocation"],
  ["/legal/refund-policy", "/pages/refund-return-policy"],
  ["/pages/terms-of-service", "/pages/refund-return-policy"],
  ["/cart", "/quote"],
  ["/account/:path*", "/quote"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
