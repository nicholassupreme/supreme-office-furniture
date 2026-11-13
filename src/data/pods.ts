/**
 * Content for the Ace pod product pages (src/components/pod-page.tsx).
 *
 * Each Ace model has several layouts and EVERY layout is its own product with its own price
 * (src/data/ace-layouts.json -> scripts/split_ace_layouts.py -> catalog.json).
 * This file holds the shared model content (specs, intro, feature blocks); the layout file holds
 * what differs per layout (slug, code, label, price, photos).
 * Layout codes (DK1, BS1+ ...) live only in ace-layouts.json, so renaming them later is one edit there.
 */
import layoutsJson from "./ace-layouts.json";

export type PodFeature = { title: string; body: string; image: string; fit?: "contain" | "cover" };
export type Layout = {
  slug: string; model: ModelId; code: string; label: string; name: string; blurb: string; price: number;
  gallery: string[]; colourImages: Record<string, string>; swatchNote: string;
  colours: string[]; interior: string[]; colourOpt: string; interiorOpt: string;
};
export type ModelId = "uno" | "plus" | "flex" | "duo" | "meet" | "hub";

export type PodContent = {
  title: string;
  layoutCode: string;
  layoutLabel: string;
  tagline: string;
  seats: string;
  dims: { w: number; d: number; h: number }; // mm, external
  intro: string[];
  suitableFor: string[];
  specs: { title: string; rows: [string, string][] }[];
  gallery: string[];
  swatches: Record<string, { hex: string; image?: string; tile?: string }>;
  swatchNote?: string;
  colourOpt: string;
  chart?: { name: string; image: string }[]; // fabric colour chart
  details?: { title: string; image: string }[]; // close-up detail photos
  features: PodFeature[];
  install: string;
  leadTime: string;
  modelId: ModelId;
};

const A = (k: string) => `/ace/${k}.webp`;
const R = (id: string) => `https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/i/${id}.webp`;

/* ── Spec sheet builder: values shared by every Ace pod live here ── */
const SHARED = {
  extWalls: "Melamine-faced chipboard, CARB Phase 2 / EPA, upholstery with sponge fabric",
  frame: "Metal structure with epoxy powder coating",
  door: "10 mm tempered door with flush hinges, made in Italy",
  intWalls: "Egg-crate acoustic foam with sound-grooved melamine-faced MDF + drilled acoustic tiled panels with nonwoven felt",
  table: "Melamine-faced chipboard, 25 mm, CARB Phase 2, with 2 mm ABS edging",
  floorCarpet: "Melamine-faced chipboard, 25 mm, CARB Phase 2, with carpet cladding",
  ceiling: "PET polyester wool",
  wallAcc: "Foldable hanging hook, holds up to 3 kg",
  ventSystem: "Ambient air exchange with super silent fans",
  fanSpeed: "100% PWM / 12V / 1500 rpm",
  motion: "Integrated into ceiling; controls illumination and ventilation, AC100–240V, 50–60Hz",
  touch: "Light dimmer on/off and brightness knob; exhaust fan on/off knob",
  powerCable: "Power connector with fuse via floor 13A UK plug, 3 m, 110–240V",
  acoustic: "Verified: 27 dB(A), TÜV SÜD",
  strip: "LED strip lights in suspended ceiling panel, cool white 4000K",
  strip2: "LED strip lights 4000K + additional downlight 4000K (sharing pod)",
  ledW: "LED lights 22.4W; quiet fan 4.8W; exhaust fan 3.12W",
  ledW2: "LED lights 22.4W; downlights 3W; quiet fan 4.8W; exhaust fan 3.12W",
};

type SpecIn = {
  capacity: string; category: string; ext: string; int: string; weight: string;
  castors: string; furnishing: string; ventFans: string; airflow: string;
  socketType: string; socketDetail: string;
} & Partial<typeof SHARED> & { controlWall?: string; illum?: string; power?: string };

function buildSpecs(d: SpecIn): PodContent["specs"] {
  const s = { ...SHARED, ...d };
  const rows = (r: [string, string | undefined][]) => r.filter((x): x is [string, string] => !!x[1]);
  return [
    {
      title: "Size and weight",
      rows: rows([
        ["Capacity", s.capacity],
        ["Category", s.category],
        ["External dimensions", s.ext],
        ["Internal dimensions", s.int],
        ["Internal height", '2070 mm (81.50")'],
        ["External height", '2350 mm (92.52"). Room height required: 2500 mm (98.43")'],
        ["Weight", s.weight],
      ]),
    },
    {
      title: "Build",
      rows: rows([
        ["Exterior walls", s.extWalls],
        ["Frame structure", s.frame],
        ["Swing glass door", s.door],
        ["Heavy-duty castors", s.castors],
        ["Interior walls", s.intWalls],
        ["Control wall elements", s.controlWall],
        ["Table", s.table],
        ["Floor carpet", s.floorCarpet],
        ["Ceiling roof", s.ceiling],
        ["Wall accessories", s.wallAcc],
        ["Furnishing", s.furnishing],
      ]),
    },
    {
      title: "Ventilation",
      rows: rows([
        ["Ventilation system", s.ventSystem],
        ["Fan speed", s.fanSpeed],
        ["Ventilation fans, ceiling", s.ventFans],
        ["Exhaust fans, ceiling", "1"],
        ["Airflow", s.airflow],
      ]),
    },
    {
      title: "Lighting and power",
      rows: rows([
        ["Illumination", d.illum ?? s.strip],
        ["Motion sensor", s.motion],
        ["Touch buttons", s.touch],
        ["Power cable", s.powerCable],
        ["Socket type", s.socketType],
        ["Socket detail", s.socketDetail],
        ["Power consumption", d.power ?? s.ledW],
      ]),
    },
    { title: "Acoustic", rows: [["Published acoustic claim", s.acoustic]] },
  ];
}


const HEX: Record<string, string> = {
  "Orange Squash": "#b4532f", "Mustard Yellow": "#c4962b", "Green Moss": "#46481f",
  "Ocean Blue": "#2f3f63", "Grey Ash": "#8b8982", "Charcoal Grey": "#2c2c2a",
  "Warm Sand": "#e2d2b4", "Pine Green": "#4d7c4a", "Shadow Grey": "#3c3d40", "Dusty Turquoise": "#4f9fa6",
};

/* Fabric colour chart (six exterior fabrics). Uno has its own four colours and no fabric tiles. */
const TILE: Record<string, string> = {
  "Orange Squash": A("tile-orange-squash"), "Mustard Yellow": A("tile-mustard-yellow"), "Green Moss": A("tile-green-moss"),
  "Ocean Blue": A("tile-ocean-blue"), "Grey Ash": A("tile-grey-ash"), "Charcoal Grey": A("tile-charcoal-grey"),
};
/* Close-up photos of hardware shared by the Plus, Flex, Duo, Meet and Hub pods. */
const DETAILS = [
  { title: "Slatted wood-look acoustic wall", image: A("detail-slat-wall") },
  { title: "Motion sensor and LED lighting", image: A("detail-sensor-lights") },
  { title: "Silent ventilation fans", image: A("detail-airflow") },
  { title: "Dimmer and fan controls", image: A("detail-controls") },
  { title: "Power inlet", image: A("detail-power-inlet") },
  { title: "Door handle", image: A("detail-handle") },
  { title: "Ventilation grille", image: A("detail-vent-grille") },
  { title: "Door hinge", image: A("detail-hinge") },
];
/* Extra on-site photos appended to a model's gallery. */
const EXTRA_GALLERY: Partial<Record<ModelId, string[]>> = {
  plus: [A("install-plus-1"), A("install-plus-2")],
  duo: [A("install-duo-1"), A("install-duo-2"), A("install-duo-3")],
};

const LEAD = "3–4 working weeks after order and payment confirmation";
const SIX_BODY = "Choose from six exterior fabric colours, from Charcoal Grey and Grey Ash to Ocean Blue, Green Moss, Mustard Yellow and Orange Squash. The interior is finished in Shimo Ash.";

type Model = Omit<PodContent, "gallery" | "swatches" | "swatchNote" | "colourOpt" | "chart" | "details" | "layoutCode" | "layoutLabel" | "modelId">;

const models: Record<ModelId, Model> = {
  /* ───────────── Ace Uno ───────────── */
  uno: {
    title: "Ace Uno Acoustic Office Pod",
    tagline: "A compact, modern one-person pod for calls, video meetings and focused work.",
    seats: "1 person",
    dims: { w: 1418, d: 1018, h: 2185 },
    intro: [
      "Ace Uno is a modern single-person acoustic office pod that creates a comfortable private space within an open-plan office.",
      "It suits phone calls, video meetings, focused work, online interviews and private conversations, without any permanent renovation.",
      "It stands on its own and installs plug-and-play, with adjustable floor levellers to sit steady on uneven floors.",
    ],
    suitableFor: ["Corporate offices", "Co-working spaces", "Universities and libraries", "Healthcare facilities", "Open-plan workplaces"],
    specs: [
      {
        title: "Size",
        rows: [
          ["Capacity", "1 person"],
          ["Category", "Single-person acoustic call and focus pod"],
          ["External dimensions", "W1418 × D1018 × H2185 mm"],
          ["External height", '2185 mm. Room height required: 2500 mm (98.43")'],
        ],
      },
      {
        title: "Build",
        rows: [
          ["Frame construction", "Steel frame with MFC structure"],
          ["Acoustic panels", "9 mm polyester fibre"],
          ["Door", "10 mm clear tempered glass"],
          ["Rear panel", "Laminated safety glass"],
          ["Work surface", "Natural Oak MFC worktop"],
          ["Interior colour", "Soft Sand"],
          ["Levelling", "Adjustable floor levellers"],
          ["Installation", "Freestanding plug-and-play design"],
        ],
      },
      { title: "Ventilation", rows: [["Ventilation", "Dual quiet airflow fans"], ["Airflow", "108 CFM per fan"]] },
      {
        title: "Lighting and power",
        rows: [
          ["Lighting", "Round LED ceiling light, 4000K, 6W"],
          ["Power socket", "Universal socket with USB Type-A and USB Type-C"],
          ["Electrical input", "AC 100–240V"],
        ],
      },
      { title: "Acoustic", rows: [["Published acoustic claim", "Approximately 25 dB(A)"]] },
    ],
    features: [
      { title: "A private space, no renovation", body: "Ace Uno gives one person an enclosed space in an open-plan office for calls, video meetings, interviews and focused work. It is freestanding and plug-and-play, so there are no permanent works.", image: A("uno-warm-sand"), fit: "contain" },
      { title: "Fresh air and good light", body: "Two quiet airflow fans move 108 CFM each, and a round 4000K LED ceiling light keeps the space bright for video calls.", image: A("uno-interior"), fit: "cover" },
      { title: "Power at your fingertips", body: "A universal socket with USB Type-A and USB Type-C ports sits beside an ergonomic natural oak worktop, so laptops and phones stay charged.", image: A("uno-controls"), fit: "cover" },
      { title: "Four colours", body: "Choose Pine Green, Shadow Grey, Dusty Turquoise or Warm Sand for the exterior fabric. The interior is Soft Sand.", image: A("uno-pine-green"), fit: "contain" },
    ],
    install: "RM450 per unit, Klang Valley.",
    leadTime: LEAD,
  },

  /* ───────────── Ace Plus ───────────── */
  plus: {
    title: "Ace Plus Acoustic Office Pod",
    tagline: "A premium one-person pod for private calls, video meetings and focused work.",
    seats: "1 person",
    dims: { w: 1000, d: 1000, h: 2350 },
    intro: [
      "Ace Plus is a premium one-person office pod designed for private calls, video meetings and focused individual work.",
      "With verified acoustic performance of 27 dB(A), it reduces surrounding office noise and improves speech privacy, so you can talk clearly and concentrate with fewer distractions.",
      "Its compact footprint fits into open-plan offices without taking much floor space. Built-in lighting, low-noise ventilation, power access and a practical worktable make it comfortable for regular daily use.",
      "It is a faster alternative to building a permanent private room. Installation causes minimal disruption, and the pod can be relocated if your office layout changes.",
    ],
    suitableFor: ["Private phone calls", "Video and online meetings", "Focused individual work", "Extended daily use", "Open-plan offices"],
    specs: buildSpecs({
      capacity: "1 pax", category: "1-pax phone / focus pod",
      ext: "1000W × 1000D × 2350H mm", int: "853W × 918D × 2070H mm",
      weight: "335 kg without crate / 455 kg with crate", castors: "4",
      door: "10 mm tempered door with hinges, made in Italy",
      intWalls: "Recycled PET felt, polyethylene terephthalate",
      furnishing: "Standing table", ventFans: "1", airflow: "155 CFM, complete air exchange at 100% fan power",
      socketType: "Type A", socketDetail: "1 universal power socket",
    }),
    features: [
      { title: "Quiet when you need it", body: "Verified at 27 dB(A) by TÜV SÜD, Ace Plus keeps calls private and cuts the chatter of an open-plan floor, so you can focus or take a sensitive conversation without leaving your desk area.", image: R("108886026"), fit: "cover" },
      { title: "Fits the floor you already have", body: "A compact one-person footprint slots into open-plan layouts without much floor space. No construction needed: installation is quick, and the pod rolls on four heavy-duty castors if your layout changes.", image: R("108886024"), fit: "cover" },
      { title: "Ready for daily use", body: "LED lighting with a dimmer, super silent ventilation, a power socket and a standing table are all built in, so it works for a five-minute call or a full afternoon of focused work.", image: R("108885996"), fit: "contain" },
      { title: "Six colours to match your office", body: SIX_BODY, image: R("108886011"), fit: "cover" },
    ],
    install: "RM450 per unit, Klang Valley.",
    leadTime: LEAD,
  },

  /* ───────────── Ace Flex ───────────── */
  flex: {
    title: "Ace Flex Acoustic Office Pod",
    tagline: "A larger one-person pod for longer sessions of calls and focused work.",
    seats: "1 person",
    dims: { w: 1600, d: 1200, h: 2350 },
    intro: [
      "Ace Flex is a spacious one-person acoustic office pod for professionals who need a comfortable, private place for calls, video meetings and focused work.",
      "Its larger interior gives you more freedom of movement than a standard phone booth, which suits longer working sessions. Choose a fixed table or a height-adjustable table so you can switch between sitting and standing.",
      "Built-in lighting, low-noise ventilation and convenient power access make it ready for daily use. The acoustic construction cuts surrounding office noise so you can talk and concentrate with more privacy.",
      "It is a practical alternative to a permanent private room, installs with minimal disruption and can be relocated when your layout changes.",
    ],
    suitableFor: ["Private phone calls", "Video and online meetings", "Focused individual work", "Longer working sessions", "Quiet breakout space"],
    specs: buildSpecs({
      capacity: "1 pax", category: "1-pax larger focus / work pod",
      ext: "1600W × 1200D × 2350H mm", int: "1452W × 1100D × 2070H mm",
      weight: "523 kg without crate / 663 kg with crate", castors: "4",
      furnishing: "Fixed table / height-adjustable table (HAT)", ventFans: "1",
      airflow: "155 CFM, complete air exchange at 100% fan power",
      socketType: "Type B",
      socketDetail: "Netbox M 2-gang, 1 universal power socket, 1 USB charging port, 1 Type-C charging port",
    }),
    features: [
      { title: "More room to think and work", body: "With an internal size of 1452 × 1100 mm, Ace Flex gives you far more space than a standard phone booth. It is built for longer sessions, not just a quick call.", image: A("flex-orange-squash"), fit: "contain" },
      { title: "Sit or stand", body: "Choose an empty pod, a fixed-height table, or a height-adjustable table that lets you switch between sitting and standing through the day.", image: A("flex-adjustable-table"), fit: "contain" },
      { title: "Quiet and fresh", body: "Verified at 27 dB(A) by TÜV SÜD. Super silent fans give a complete air exchange at 155 CFM, so the pod stays comfortable during long calls.", image: A("flex-grey-ash"), fit: "contain" },
      { title: "Six colours to match your office", body: SIX_BODY, image: A("flex-ocean-blue"), fit: "contain" },
    ],
    install: "RM550 per unit, Klang Valley.",
    leadTime: LEAD,
  },

  /* ───────────── Ace Flex Duo ───────────── */
  duo: {
    title: "Ace Flex Duo Acoustic Office Pod",
    tagline: "A two-person pod for private discussions, focused work and small collaborative sessions.",
    seats: "2 people",
    dims: { w: 1600, d: 1200, h: 2350 },
    intro: [
      "Ace Flex Duo is a comfortable two-person office pod for private discussions, focused work and small collaborative sessions.",
      "It suits one-to-one meetings, HR interviews, manager discussions, coaching sessions, client calls and paired work. Two users get their own enclosed space without taking up a full meeting room.",
      "It comes with built-in lighting, ventilation and power access for everyday office use, and its compact footprint makes better use of available floor space.",
    ],
    suitableFor: ["One-to-one meetings", "HR interviews", "Manager discussions", "Coaching sessions", "Client calls", "Paired work"],
    specs: [
      {
        title: "Size",
        rows: [
          ["Capacity", "2 persons"],
          ["External size", "1600W × 1200D × 2350H mm"],
          ["Internal size", "1452W × 1100D × 2070H mm"],
          ["Recommended room height", "Minimum 2500 mm"],
        ],
      },
      { title: "Included", rows: [["Built in", "Lighting, ventilation and power access"], ["Exterior", "Fabric, 6 colours"], ["Interior", "Melamine (MFC / MDF), Shimo Ash"]] },
    ],
    features: [
      { title: "Two people, one enclosed space", body: "Ace Flex Duo gives two people a private place to talk or work side by side, without booking or building a full meeting room.", image: A("duo-hero"), fit: "contain" },
      { title: "Ready for everyday use", body: "Built-in lighting, ventilation and power access make it comfortable for a quick one-to-one or a longer working session.", image: A("duo-front"), fit: "contain" },
      { title: "Plan your ceiling height", body: "The pod stands 2350 mm tall and needs a room height of at least 2500 mm. Its compact footprint makes good use of floor space.", image: A("duo-grey-ash"), fit: "contain" },
      { title: "Six colours to match your office", body: SIX_BODY, image: A("duo-orange-squash"), fit: "contain" },
    ],
    install: "RM800 per unit, Klang Valley.",
    leadTime: "Approx. 3–6 weeks after order and payment confirmation",
  },

  /* ───────────── Ace Meet ───────────── */
  meet: {
    title: "Ace Meet Acoustic Office Pod",
    tagline: "A 2 to 4 person meeting pod for private discussions and small-team work.",
    seats: "2–4 people",
    dims: { w: 2200, d: 1200, h: 2350 },
    intro: [
      "Ace Meet is a 2 to 4 person office pod designed for private discussions, hybrid meetings and small-team collaboration.",
      "With verified acoustic performance of 27 dB(A), it cuts surrounding office noise and keeps conversations private, so teams can share ideas and hold meetings with fewer distractions.",
      "Built-in lighting, low-noise ventilation and power access make it ready for daily use, in the layout you choose.",
      "It is a flexible alternative to building a permanent meeting room, installs with minimal disruption and can be relocated when your needs or layout change.",
    ],
    suitableFor: ["Small-team meetings", "Private discussions", "Hybrid and video meetings", "Client consultations", "Interviews and presentations", "Collaborative working sessions"],
    specs: buildSpecs({
      capacity: "2–4 pax", category: "2–4 pax meeting pod",
      ext: "2200W × 1200D × 2350H mm", int: "2030W × 1140D × 2070H mm",
      weight: "636 kg without crate / 826 kg with crate", castors: "4",
      furnishing: "Empty / sofa / chair optional", ventFans: "2",
      airflow: "310 CFM, complete air exchange at 100% fan power",
      socketType: "Type B",
      socketDetail: "Netbox M 2-gang, 1 universal power socket, 1 USB charging port, 1 Type-C charging port",
      illum: SHARED.strip2, power: SHARED.ledW2,
    }),
    features: [
      { title: "A meeting room without the renovation", body: "Ace Meet gives a small team a private, enclosed space in the middle of an open-plan office. There is no construction, and it installs with minimal disruption.", image: A("meet-dk1-orange-squash"), fit: "contain" },
      { title: "Pick your layout", body: "Choose an empty pod, a sofa settee with a fixed centre table, a height-adjustable table, a fixed-height table, or the sofa layout with a whiteboard. Each layout is its own product, with its own price.", image: A("meet-dk1-menu"), fit: "contain" },
      { title: "Quiet and fresh", body: "Verified at 27 dB(A) by TÜV SÜD. Two super silent fans plus an exhaust fan move 310 CFM, so the air stays fresh during longer meetings.", image: A("meet-dk2"), fit: "contain" },
      { title: "Six colours to match your office", body: SIX_BODY, image: A("meet-dk1-green-moss"), fit: "contain" },
    ],
    install: "RM650 per unit, Klang Valley.",
    leadTime: LEAD,
  },

  /* ───────────── Ace Hub ───────────── */
  hub: {
    title: "Ace Hub Acoustic Meeting Pod",
    tagline: "A spacious pod for private meetings and presentations with up to six people.",
    seats: "Up to 6 people",
    dims: { w: 2200, d: 1500, h: 2350 },
    intro: [
      "Ace Hub is a spacious office pod designed for private meetings, presentations and collaborative sessions with up to six people.",
      "With verified acoustic performance of 27 dB(A), it cuts surrounding workplace noise and keeps conversations private, so teams can discuss ideas and meet clients with fewer distractions.",
      "Seating, built-in lighting, low-noise ventilation and power access make a comfortable meeting space that suits longer discussions.",
      "It is a flexible alternative to building a permanent meeting room, installs with minimal disruption and moves on six heavy-duty castors when your layout changes.",
    ],
    suitableFor: ["Team meetings", "Client presentations", "Hybrid and video meetings", "Project discussions", "Interviews and consultations", "Collaborative working sessions"],
    specs: buildSpecs({
      capacity: "Up to 6 pax", category: "Up-to-6-pax hub / lounge pod",
      ext: "2200W × 1500D × 2350H mm", int: "2030W × 1440D × 2070H mm",
      weight: "700 kg", castors: "6",
      intWalls: "Additional option: recycled PET felt, polyethylene terephthalate",
      controlWall: "Magnetic writing board with metal channel control panel",
      furnishing: "Empty / sofa / chair optional", ventFans: "2",
      airflow: "310 CFM, complete air exchange at 100% fan power",
      socketType: "Type D",
      socketDetail: "Mount on table, Netbox Smart 2-gang, 1 universal power socket, 1 USB charging port, 1 Type-C charging port",
      illum: SHARED.strip2, power: SHARED.ledW2,
    }),
    features: [
      { title: "Room for up to six", body: "At 2200 × 1500 mm, Ace Hub seats a full project team, with enough interior space (2030 × 1440 mm) for longer sessions.", image: A("hub-dk1"), fit: "contain" },
      { title: "Three layouts", body: "DK1+ has a fixed centre table and two sofas. DK4+ adds a whiteboard. BS1+ has an L-shape sofa with a multimedia facility (TV not included). Each is its own product, with its own price.", image: A("hub-bs1-grey-ash"), fit: "contain" },
      { title: "Quiet and fresh", body: "Verified at 27 dB(A) by TÜV SÜD. Two super silent fans plus an exhaust fan move 310 CFM, and the pod rolls on six heavy-duty castors.", image: A("hub-dk4-grey-ash"), fit: "contain" },
      { title: "Six colours to match your office", body: SIX_BODY, image: A("hub-dk1-grey-ash"), fit: "contain" },
    ],
    install: "RM800 per unit, Klang Valley.",
    leadTime: LEAD,
  },
};

/* ── Lookups ── */
export const layouts = layoutsJson as Layout[];
const bySlug = new Map(layouts.map((l) => [l.slug, l]));

export const getLayout = (slug: string) => bySlug.get(slug);
export const layoutsOf = (model: ModelId) => layouts.filter((l) => l.model === model);
/** The layout a model's menu / comparison link goes to (first listed). */
export const defaultLayout = (model: ModelId) => layoutsOf(model)[0];

export function getPodContent(slug: string): PodContent | undefined {
  const l = bySlug.get(slug);
  if (!l) return undefined;
  const m = models[l.model];
  const multi = layoutsOf(l.model).length > 1;
  return {
    ...m,
    modelId: l.model,
    layoutCode: l.code,
    layoutLabel: multi ? l.label : "",
    tagline: multi && l.blurb ? l.blurb : m.tagline,
    intro: multi && l.blurb ? [l.blurb, ...m.intro] : m.intro,
    gallery: [...l.gallery, ...(EXTRA_GALLERY[l.model] ?? [])],
    swatches: Object.fromEntries(l.colours.map((c) => [c, { hex: HEX[c] ?? "#999", image: l.colourImages[c], tile: TILE[c] }])),
    chart: l.model === "uno" ? undefined : Object.entries(TILE).map(([name, image]) => ({ name, image })),
    details: l.model === "uno" ? [
      { title: "Power and controls", image: A("uno-controls") },
    ] : DETAILS,
    swatchNote: l.swatchNote || undefined,
    colourOpt: l.colourOpt,
  };
}
