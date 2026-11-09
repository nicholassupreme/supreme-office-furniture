import type { NextConfig } from "next";

// Old EasyStore URLs that changed. Product and collection URLs are unchanged.
const moved: [string, string][] = [
  ["/pages/contact-us", "/contact"],
  ["/store-locator", "/contact"],
  ["/pages/what-do-we-do", "/about"],
  ["/pages/our-awards", "/about"],
  ["/pages/our-portfolio", "/portfolio"],
  ...[
    "vettons-an-ecommerce-company",
    "sme-client-1",
    "anonymous-client-2",
    "goodrich",
    "ramsay-sime-darby-healthcare-nurse-college",
    "sin-tohoku-metal-scrap",
    "subang-jaya-medical-centre-sjmc-trainee-nurse-house-1",
  ].map((s): [string, string] => [`/pages/${s}`, `/portfolio/${s}`]),
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
  images: {
    remotePatterns: [{ protocol: "https", hostname: "pub-0394e669f99a47be83c5487b3c89e601.r2.dev", pathname: "/s/1022051/**" }],
  },
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
