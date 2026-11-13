/**
 * Homepage "Shop by category": one card per group (8 on desktop, 2 rows of 4).
 * - `slug`      where the card title and "Shop all" link go (a department slug from taxonomy.json)
 * - `imageSlug` any department or sub-category slug whose first product photo is used as the card photo
 * - `countSlugs` departments added together for the "N items" total
 * - `items`     the important sub-categories listed on the card (any sub-category or department slug)
 * Reorder, swap or relabel freely.
 */
export type HomeCategoryGroup = {
  title: string;
  slug: string;
  imageSlug: string;
  countSlugs: string[];
  items: { slug: string; label: string }[];
};

export const homeCategories: HomeCategoryGroup[] = [
  {
    title: "Chairs",
    slug: "office-work-chairs-malaysia",
    imageSlug: "ergonomic-office-chairs",
    countSlugs: ["office-work-chairs-malaysia"],
    items: [
      { slug: "ergonomic-office-chairs", label: "Ergonomic Chairs" },
      { slug: "director-high-back-office-chairs-malaysia", label: "Director & High Back" },
      { slug: "medium-low-back-office-chairs-malaysia", label: "Medium & Low Back" },
      { slug: "visitor-office-chairs-malaysia", label: "Visitor Chairs" },
      { slug: "training-classroom-chairs-malaysia", label: "Training & Classroom" },
    ],
  },
  {
    title: "Desks",
    slug: "office-desks-tables",
    imageSlug: "standard-office-desk",
    countSlugs: ["office-desks-tables"],
    items: [
      { slug: "standard-office-desk", label: "Standard Desks" },
      { slug: "l-shape-office-table", label: "L-Shape Desks" },
      { slug: "director-s-desk", label: "Director's Desks" },
      { slug: "reception-counter-tables", label: "Reception Counters" },
      { slug: "height-adjustable-desk-standing-desk", label: "Standing Desks" },
    ],
  },
  {
    title: "Workstations",
    slug: "office-workstations",
    imageSlug: "1-3-seater-workstation-prices-are-negotiable",
    countSlugs: ["office-workstations"],
    items: [
      { slug: "1-3-seater-workstation-prices-are-negotiable", label: "1–3 Seaters" },
      { slug: "4-5-seater-workstation-prices-are-negotiable", label: "4–5 Seaters" },
      { slug: "6-7-seater-workstation-prices-are-negotiable", label: "6–7 Seaters" },
      { slug: "8-seater-or-more-workstation-prices-are-negotiable", label: "8+ Seaters" },
      { slug: "office-partitions", label: "Office Partitions" },
    ],
  },
  {
    title: "Meeting Tables",
    slug: "meeting-conference-table",
    imageSlug: "table-length-900mm-to-2900mm",
    countSlugs: ["meeting-conference-table"],
    items: [
      { slug: "table-length-900mm-to-2900mm", label: "2–10 Seaters (900–2900mm)" },
      { slug: "table-length-3000mm-to-4500mm", label: "10–16 Seaters (3000–4500mm)" },
      { slug: "length-20ft-6000mm-above", label: "16+ Seaters (4600mm+)" },
    ],
  },
  {
    title: "Sofas & Lounge",
    slug: "office-sofas-bench-seating-malaysia",
    imageSlug: "1-seater-office-sofa",
    countSlugs: ["office-sofas-bench-seating-malaysia", "lounge-waiting-seating"],
    items: [
      { slug: "1-seater-office-sofa", label: "1-Seater Sofas" },
      { slug: "2-seater-office-sofa", label: "2-Seater Sofas" },
      { slug: "3-seater-or-more-office-sofa", label: "3-Seater & Up" },
      { slug: "link-chairs-waiting-benches-malaysia", label: "Waiting Benches" },
    ],
  },
  {
    title: "Storage",
    slug: "office-wooden-storage",
    imageSlug: "low-height-office-cabinets",
    countSlugs: ["office-wooden-storage", "steel-storage"],
    items: [
      { slug: "low-height-office-cabinets", label: "Low Height Cabinets" },
      { slug: "full-high-height-office-cabinets", label: "Full Height Cabinets" },
      { slug: "mobile-fixed-pedestals", label: "Mobile & Fixed Pedestals" },
      { slug: "steel-cabinets-cupboards-mobile-compactors", label: "Steel Cabinets" },
      { slug: "steel-lockers", label: "Steel Lockers" },
    ],
  },
  {
    title: "Safes",
    slug: "security-safe-box",
    imageSlug: "security-safe-box",
    countSlugs: ["security-safe-box"],
    items: [
      { slug: "richman-safes-series", label: "Richman Safes" },
      { slug: "moem-safe-series", label: "MOEM Safes" },
      { slug: "chubbsafes-series", label: "Chubbsafes" },
    ],
  },
  {
    title: "Pods & Boards",
    slug: "office-phone-booth-open-pods",
    imageSlug: "office-phone-booth-open-pods",
    countSlugs: ["office-phone-booth-open-pods", "whiteboards-presentation"],
    items: [
      { slug: "office-phone-booth-open-pods", label: "Office Pods" },
      { slug: "writing-boards", label: "Whiteboards" },
      { slug: "notice-boards", label: "Notice Boards" },
    ],
  },
];
