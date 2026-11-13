/**
 * Comparison table for the Ace pod range. Every value comes from the product listings;
 * a missing value means the listing doesn't state it (shown as a dash).
 * Column order is fixed so the table reads small -> large.
 */
export const ACE_COLUMNS: { id: string; short: string; slug: string }[] = [
  { id: "uno", short: "Ace Uno", slug: "ace-uno-modern-spacious-1-seater-acoustic-phone-pod-booth" },
  { id: "plus", short: "Ace Plus", slug: "ace-plus-office-pod-phone-booth-silent-acoustic-pod-for-1-seater-kindly-contact-us-before-ordering-" },
  { id: "flex", short: "Ace Flex", slug: "ace-flex-spacious-single-seater-kindly-contact-us-before-ordering" },
  { id: "duo", short: "Ace Flex Duo", slug: "ace-flex-duo-up-to-2-seaters-discussion-booth-" },
  { id: "meet", short: "Ace Meet", slug: "ace-meet-office-pod-office-phone-booth-for-2-4-seater-kindly-contact-us-before-order-" },
  { id: "hub", short: "Ace Hub", slug: "ace-hub-office-phone-booth-pods-silent-acoustic-phone-booth-for-up-to-6-seater-kindly-contact-us-before-order-" },
];

const SIX = "Orange Squash, Mustard Yellow, Green Moss, Ocean Blue, Grey Ash, Charcoal Grey";

type Row = [label: string, values: Partial<Record<string, string>>];

export const ACE_ROWS: Row[] = [
  ["Seats", { uno: "1 person", plus: "1 person", flex: "1 person", duo: "2 people", meet: "2 to 4 people", hub: "Up to 6 people" }],
  ["External size (W × D × H, mm)", {
    uno: "1418 × 1018 × 2185", plus: "1000 × 1000 × 2350", flex: "1600 × 1200 × 2350",
    duo: "1600 × 1200 × 2350", meet: "2200 × 1200 × 2350", hub: "2200 × 1500 × 2350",
  }],
  ["Internal size (W × D × H, mm)", {
    plus: "853 × 918 × 2070", flex: "1452 × 1100 × 2070", duo: "1452 × 1100 × 2070", meet: "2030 × 1140 × 2070", hub: "2030 × 1440 × 2070",
  }],
  ["Room height needed (mm)", { uno: "Min. 2500", plus: "Min. 2500", flex: "Min. 2500", duo: "Min. 2500", meet: "Min. 2500", hub: "Min. 2500" }],
  ["Acoustic performance", { uno: "Approx. 25 dB(A)", plus: "27 dB(A), TÜV SÜD verified", flex: "27 dB(A), TÜV SÜD verified", meet: "27 dB(A), TÜV SÜD verified", hub: "27 dB(A), TÜV SÜD verified" }],
  ["Weight (kg)", { plus: "335 (455 with crate)", flex: "523 (663 with crate)", meet: "636 (826 with crate)", hub: "700" }],
  ["Layout options", {
    flex: "Empty pod, fixed table, 2-seater sofa + fixed table, or height-adjustable table",
    meet: "Empty (BS1), sofa + fixed centre table (DK1), height-adjustable table (DK2), fixed table (DK3), sofa + whiteboard (DK4)",
    hub: "Empty pod, DK1+ (fixed centre table, 2 sofas), DK4+ (adds whiteboard), BS1+ (L-shape sofa, multimedia; TV not included)",
  }],
  ["Exterior colours", { uno: "Pine Green, Shadow Grey, Dusty Turquoise, Warm Sand", plus: SIX, flex: SIX, duo: SIX, meet: SIX, hub: SIX }],
  ["Interior finish", {
    uno: "Soft Sand", plus: "MFC, Shimo Ash", flex: "Melamine, Shimo Ash",
    duo: "Melamine (MFC / MDF), Shimo Ash", meet: "Melamine, Shimo Ash", hub: "Melamine, Shimo Ash",
  }],
  ["Seating and work surface", {
    uno: "Natural Oak MFC worktop", plus: "Standing table, 25 mm MFC", flex: "Fixed or height-adjustable table",
    meet: "Empty, sofa or chair optional", hub: "Empty, sofa or chair optional",
  }],
  ["Lighting", {
    uno: "Round LED ceiling light, 4000K, 6W", plus: "LED strip lights, cool white 4000K", flex: "LED strip lights, cool white 4000K",
    duo: "Built-in lighting", meet: "LED strip lights + downlight, 4000K", hub: "LED strip lights + downlight, 4000K",
  }],
  ["Ventilation", {
    uno: "Dual quiet fans, 108 CFM each", plus: "Super silent fans, 155 CFM", flex: "Super silent fans, 155 CFM",
    duo: "Built-in ventilation", meet: "2 super silent fans + exhaust fan, 310 CFM", hub: "2 super silent fans + exhaust fan, 310 CFM",
  }],
  ["Power", {
    uno: "Universal socket, USB-A and USB-C, AC 100–240V", plus: "1 universal socket, Type A, 110–240V",
    flex: "Netbox M 2-gang: universal socket, USB, USB-C (Type B)", duo: "Power access",
    meet: "Netbox M 2-gang: universal socket, USB, USB-C (Type B)", hub: "Netbox Smart 2-gang on table: universal socket, USB, USB-C (Type D)",
  }],
  ["Door and glass", {
    uno: "10 mm clear tempered glass door, laminated safety glass rear panel",
    plus: "10 mm tempered swing glass door, Italian hinges", flex: "10 mm tempered swing glass door, Italian hinges",
    meet: "10 mm tempered swing glass door, Italian hinges", hub: "10 mm tempered swing glass door, Italian hinges",
  }],
  ["Frame", {
    uno: "Steel frame with MFC structure", plus: "Metal structure, epoxy powder coating", flex: "Metal structure, epoxy powder coating",
    meet: "Metal structure, epoxy powder coating", hub: "Metal structure, epoxy powder coating",
  }],
  ["Mobility", {
    uno: "Freestanding, adjustable floor levellers", plus: "4 heavy-duty castors", flex: "4 heavy-duty castors",
    meet: "4 heavy-duty castors", hub: "6 heavy-duty castors",
  }],
  ["Acoustic panels", { uno: "9 mm polyester fibre" }],
  ["Installation (Klang Valley)", { uno: "RM450 per unit", plus: "RM450 per unit", flex: "RM550 per unit", duo: "RM800 per unit", meet: "RM650 per unit", hub: "RM800 per unit" }],
  ["Lead time", {
    uno: "3–4 working weeks", plus: "3–4 working weeks", flex: "3–4 working weeks",
    duo: "3–4 working weeks (also listed as approx. 3–6)", meet: "3–4 working weeks", hub: "3–4 working weeks",
  }],
];
