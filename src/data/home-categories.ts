/**
 * The 24 categories shown in the homepage "Shop by category" grid (3 rows of 8 on desktop).
 * `slug` is any department or sub-category slug from taxonomy.json; `label` is the short name on the tile.
 * Reorder, swap or relabel freely — keep it a multiple of 8 so the rows stay full.
 */
export const homeCategories: { slug: string; label: string }[] = [
  // Chairs
  { slug: "ergonomic-office-chairs", label: "Ergonomic Chairs" },
  { slug: "director-high-back-office-chairs-malaysia", label: "Director Chairs" },
  { slug: "medium-low-back-office-chairs-malaysia", label: "Staff Chairs" },
  { slug: "visitor-office-chairs-malaysia", label: "Visitor Chairs" },
  { slug: "training-classroom-chairs-malaysia", label: "Training Chairs" },
  // Desks
  { slug: "standard-office-desk", label: "Office Desks" },
  { slug: "l-shape-office-table", label: "L-Shape Desks" },
  { slug: "director-s-desk", label: "Director Desks" },
  // Desks / workstations
  { slug: "reception-counter-tables", label: "Reception Counters" },
  { slug: "1-3-seater-workstation-prices-are-negotiable", label: "Workstations 1–3" },
  { slug: "4-5-seater-workstation-prices-are-negotiable", label: "Workstations 4–5" },
  { slug: "6-7-seater-workstation-prices-are-negotiable", label: "Workstations 6+" },
  // Meeting + sofas
  { slug: "table-length-900mm-to-2900mm", label: "Meeting Tables" },
  { slug: "table-length-3000mm-to-4500mm", label: "Conference Tables" },
  { slug: "1-seater-office-sofa", label: "Office Sofas" },
  { slug: "link-chairs-waiting-benches-malaysia", label: "Waiting Benches" },
  // Storage
  { slug: "low-height-office-cabinets", label: "Low Cabinets" },
  { slug: "full-high-height-office-cabinets", label: "Tall Cabinets" },
  { slug: "mobile-fixed-pedestals", label: "Pedestals" },
  { slug: "steel-cabinets-cupboards-mobile-compactors", label: "Steel Cabinets" },
  // Lockers, safes, pods, equipment
  { slug: "steel-lockers", label: "Steel Lockers" },
  { slug: "security-safe-box", label: "Safes" },
  { slug: "office-phone-booth-open-pods", label: "Office Pods" },
  { slug: "writing-boards", label: "Whiteboards" },
];
