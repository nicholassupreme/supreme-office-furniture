// Workstation builder: options and the rules that decide which combinations exist.
// Source: supplier partition catalogue (word descriptions only, no supplier codes) and Nic's notes.

export type Swatch = readonly [name: string, css: string];

export const TOP_COLOURS: Swatch[] = [
  ["White", "#f4f2ec"],
  ["Maple", "#d9b98a"],
  ["Ash", "#c9c1b3"],
  ["Cappuccino", "#a88b70"],
  ["Walnut", "#6b4a33"],
  ["Light Grey", "#c8c9cb"],
];

export const METAL: Swatch[] = [
  ["White", "#f2f2f2"],
  ["Silver", "#c3c7cc"],
  ["Dark Grey", "#4a4d52"],
  ["Black", "#1d1d1f"],
  ["Dark Grey / Silver", "linear-gradient(90deg, #c3c7cc 0 50%, #4a4d52 50% 100%)"],
];

export const PARTITION_FRAMES: Swatch[] = [
  ["Dark Grey", "#4a4d52"],
  ["Silver", "#c3c7cc"],
  ["Light Grey", "#d4d5cf"],
  ["White", "#f4f4f2"],
];

export const FABRICS: Swatch[] = [
  ["Cloud", "#ebe3d5"], ["Frosty", "#ebe3c5"], ["Raw Silk", "#dcd2bf"], ["Shell", "#dbcbba"], ["Platinum", "#b7a794"],
  ["Pewter", "#827566"], ["Jawa", "#886d5b"], ["Sand", "#e7c58a"], ["Fur", "#c19e4d"], ["Leather", "#bc7e31"],
  ["Oxidize", "#6f6b47"], ["Mercury", "#acb3b9"], ["Sliver", "#cfd7d9"], ["Steel Grey", "#989a9a"], ["Ash", "#99908d"],
  ["Battleship", "#8b8373"], ["Cinder", "#8a8993"], ["Steel", "#969eb1"], ["Rain Cloud", "#5e6770"], ["Midnight", "#475264"],
  ["Black", "#1b1e1f"], ["Rum", "#c8d0e1"], ["Precibo", "#b0d6ea"], ["Cyan", "#92d1d7"], ["Blue Tailed", "#4ca2d2"],
  ["Tranquil", "#128cad"], ["Palace Blue", "#106cab"], ["True Blue", "#0a5590"], ["Bluebell", "#5474b5"], ["Violet Storm", "#5c65a9"],
  ["Indigo", "#171e49"], ["Emery", "#5d8ca2"], ["Airforce Blue", "#6c8b91"], ["Forest", "#60969d"], ["Aqua", "#479ea0"],
  ["Turile", "#cfd5bd"], ["Apple Green", "#bdd348"], ["Apple", "#6ea86a"], ["Citrine", "#f0e549"], ["Ceylon Yellow", "#e4b130"],
  ["Golden Stone", "#f5c058"], ["Sun", "#f38633"], ["Orange", "#ef712c"], ["Terra Cotta", "#c26336"], ["Wild Red", "#c65031"],
  ["Fleme", "#a21f29"], ["Crimson", "#852443"], ["Ruby Wine", "#67121f"], ["Ametayst", "#7e688c"], ["Purple", "#42396d"],
];

export const IMG = {
  none: "/configurator/none.svg",
  hang: "/configurator/desk-mounted.svg",
  stand: "/configurator/floor-standing.svg",
  glass: "/configurator/screen-glass.webp",
  acrylic: "/configurator/screen-acrylic.webp",
};

export const LEGS = [
  { id: "J", label: "J leg", sub: "Classic metal side leg", img: "/configurator/leg-j.svg", colours: ["White", "Silver", "Black"] },
  { id: "JS", label: "JS leg", sub: "J leg in two-tone dark grey and silver", img: "/configurator/leg-js.svg", colours: ["Dark Grey / Silver"] },
  { id: "IV", label: "Invert V leg", sub: "Angled legs, modern look", img: "/configurator/leg-iv.svg", colours: ["White", "Black"] },
  { id: "Ultra", label: "Ultra leg", sub: "Four square legs with frame", img: "/configurator/leg-ultra.svg", colours: ["White", "Dark Grey"] },
  { id: "SQ", label: "SQ leg", sub: "Square closed frame", img: "/configurator/leg-sq.svg", colours: ["Dark Grey"] },
  { id: "SLIM", label: "SLIM leg", sub: "Slim legs with perforated modesty panel", img: "/configurator/leg-slim.svg", colours: ["White"] },
  { id: "Panel", label: "Panel leg", sub: "Wood side panel, matches top", img: "/configurator/leg-panel.svg", colours: [] as string[] },
] as const;

export type StyleId =
  | "glass" | "acrylic" | "solid" | "two" | "three" | "half" | "half2" | "wb" | "wb2" | "fullglass" | "fullpoly" | "full" | "two2g";

export const STYLES: Record<StyleId, { label: string; sub: string; img?: string; glaze?: boolean; heights?: number[] }> = {
  glass: { label: "Frosted glass", sub: "Sandblast tempered glass", img: IMG.glass },
  acrylic: { label: "Acrylic", sub: "White acrylic screen", img: IMG.acrylic },
  solid: { label: "Solid fabric", sub: "One fabric colour" },
  two: { label: "Two-tone", sub: "Two fabric colours" },
  three: { label: "Three-tone", sub: "Three fabric colours" },
  half: { label: "Half glass / polycarbonate", sub: "Window on top, fabric below", glaze: true },
  half2: { label: "Half glass, two-tone", sub: "Fabric band, window, fabric", glaze: true },
  wb: { label: "Whiteboard", sub: "Writable top, fabric below" },
  wb2: { label: "Whiteboard, two-tone", sub: "Fabric band, whiteboard, fabric" },
  fullglass: { label: "Full glass", sub: "300 or 450 mm only", heights: [300, 450] },
  fullpoly: { label: "Full polycarbonate", sub: "300 or 450 mm only", heights: [300, 450] },
  full: { label: "Full glass / polycarbonate", sub: "See-through panel", glaze: true },
  two2g: { label: "Two-tone glass", sub: "Two see-through sections", glaze: true },
};

type SysDef = { t: number; sub: string; styles: StyleId[]; heights: number[]; frame?: boolean; sides?: boolean };
const BLOCK_H = [900, 1050, 1200, 1350, 1500, 1650, 1800];
const BLOCK_STYLES: StyleId[] = ["solid", "two", "three", "half", "half2", "wb2", "full", "two2g"];

export const SYSTEMS: Record<"hang" | "stand", SysDef[]> = {
  hang: [
    { t: 6, sub: "Frosted glass or acrylic, clamp-on", styles: ["glass", "acrylic"], heights: [300] },
    { t: 16, sub: "Slim fabric screen, clip-on", styles: ["solid"], heights: [300, 750] },
    { t: 18, sub: "Framed screen, most styles", styles: ["solid", "two", "half", "fullglass", "fullpoly", "wb"], heights: [300, 450, 600], frame: true, sides: true },
    { t: 30, sub: "Heavier framed panel, raceway option", styles: ["solid", "two", "half"], heights: [350, 400], frame: true },
  ],
  stand: [
    { t: 30, sub: "Floor panel", styles: BLOCK_STYLES, heights: BLOCK_H, frame: true },
    { t: 45, sub: "Floor panel, thicker", styles: BLOCK_STYLES, heights: BLOCK_H, frame: true },
    { t: 60, sub: "Floor panel, thickest", styles: BLOCK_STYLES, heights: BLOCK_H, frame: true },
  ],
};

export type RaceId = "WR" | "MR" | "BR" | "DR";
export const RACEWAYS: Record<RaceId, [string, string]> = {
  WR: ["No raceway", "Plain panel"],
  MR: ["Middle raceway", "Sockets at desk height"],
  BR: ["Base raceway", "Cables along the floor"],
  DR: ["Double raceway", "Middle + base"],
};
const RACE_HANG30: Partial<Record<StyleId, RaceId[]>> = { solid: ["WR", "MR"], half: ["WR", "MR"], two: ["WR"] };
const RACE_BLOCK: Partial<Record<StyleId, RaceId[]>> = {
  solid: ["WR", "MR", "BR", "DR"], two: ["WR", "BR"], three: ["WR", "MR", "BR"], half: ["WR", "MR", "BR", "DR"],
  half2: ["WR", "MR", "BR"], wb2: ["WR", "MR", "BR"], full: ["BR"], two2g: ["BR"],
};

export const HEIGHT_NOTE: Record<number, string> = {
  300: "Low, easy to talk over", 450: "Seated privacy", 750: "Tall screen",
  900: "Low, talk over it seated", 1200: "Seated privacy", 1500: "Standing privacy", 1800: "Full privacy",
};

export type FabKey = "fab" | "fab2" | "fab3";
export const FABRIC_SLOTS: Partial<Record<StyleId, [string, FabKey][]>> = {
  solid: [["Fabric colour", "fab"]],
  two: [["Top fabric colour", "fab2"], ["Bottom fabric colour", "fab"]],
  three: [["Top fabric colour", "fab2"], ["Middle fabric colour", "fab3"], ["Bottom fabric colour", "fab"]],
  half: [["Lower fabric colour", "fab"]],
  wb: [["Lower fabric colour", "fab"]],
  half2: [["Top band fabric colour", "fab2"], ["Lower fabric colour", "fab"]],
  wb2: [["Top band fabric colour", "fab2"], ["Lower fabric colour", "fab"]],
};

export const CABLES = [
  ["flipcover", "Flipper cover", "Flip-up lid over cable access"],
  ["flipbox", "Flipper box", "Flip-up lid with storage below"],
  ["console", "Socket console", "Power, USB and data in the top"],
  ["under", "Under-table socket", "Power strip fixed under the top"],
  ["clamp", "Table clamp socket", "Power strip clamped to the edge"],
  ["ltray", "L-shape wire tray", "Holds cables under the desk"],
  ["utray", "U-shape wire tray", "Deeper cable tray"],
  ["floor", "Floor wire holder", "Spine guiding cables from floor to desk"],
] as const;

export const STORAGE = [
  ["none", "None", ""],
  ["p2", "Mobile pedestal 2D1F", "2 drawers + 1 file drawer"],
  ["p3", "Mobile pedestal 3D", "3 drawers"],
] as const;

export const SEATS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const WIDTHS = [1200, 1500, 1800];
export const DEPTHS = [600, 700, 750];

export type Config = {
  seats: number;
  layout: "lin" | "bb";
  w: number;
  d: number;
  top: string;
  sys: "none" | "hang" | "stand";
  thick: number;
  pstyle: StyleId;
  ph: number;
  glaze: "Glass" | "Polycarbonate";
  race: RaceId;
  sides: "4" | "3";
  pframe: string;
  tunnel: boolean;
  fab: string;
  fab2: string;
  fab3: string;
  leg: string;
  legColour: string;
  cables: string[];
  storage: string;
  qty: number;
};

export const DEFAULT_CONFIG: Config = {
  seats: 4, layout: "bb", w: 1500, d: 700, top: "White",
  sys: "hang", thick: 18, pstyle: "two", ph: 450, glaze: "Glass", race: "WR", sides: "4", pframe: "Silver", tunnel: false,
  fab: "Cinder", fab2: "Golden Stone", fab3: "Steel Grey",
  leg: "J", legColour: "Silver", cables: ["flipcover", "ltray"], storage: "p2", qty: 1,
};

export const swatch = (list: Swatch[], name: string) => (list.find((s) => s[0] === name) ?? list[0])[1];

/** Snap a config onto a valid combination and work out everything the page needs. */
export function resolve(input: Config) {
  const c: Config = { ...input };
  if (c.seats === 1) c.layout = "lin";
  const bb = c.layout === "bb" && c.seats > 1;
  const odd = c.seats % 2 === 1;
  const endSeat = bb && odd;
  const noPart = c.sys === "none";
  const stand = c.sys === "stand";

  const systems: SysDef[] = c.sys === "none" ? [] : SYSTEMS[c.sys];
  const sys: SysDef = systems.find((s) => s.t === c.thick) ?? systems[0] ?? { t: 0, sub: "", styles: [], heights: [] };
  c.thick = sys.t;
  if (!noPart && !sys.styles.includes(c.pstyle)) c.pstyle = sys.styles[0];
  const style = STYLES[c.pstyle];
  const heights = style.heights ? sys.heights.filter((h) => style.heights!.includes(h)) : sys.heights;
  if (heights.length && !heights.includes(c.ph)) {
    c.ph = heights.reduce((a, b) => (Math.abs(b - c.ph) < Math.abs(a - c.ph) ? b : a));
  }
  const races = noPart ? undefined : stand ? RACE_BLOCK[c.pstyle] : c.thick === 30 ? RACE_HANG30[c.pstyle] : undefined;
  if (races && !races.includes(c.race)) c.race = races[0];
  const race: RaceId = races ? c.race : "WR";
  const fabSlots = noPart ? [] : FABRIC_SLOTS[c.pstyle] ?? [];
  const tunnelOk = stand && (race === "MR" || race === "DR");
  if (!tunnelOk) c.tunnel = false;

  const leg = LEGS.find((l) => l.id === c.leg) ?? LEGS[0];
  c.leg = leg.id;
  const legColours: readonly string[] = leg.colours;
  if (legColours.length && !legColours.includes(c.legColour)) c.legColour = legColours[0];

  const layoutName = !bb ? "linear" : endSeat ? "back-to-back + end seat" : "back-to-back";
  const sysName = noPart ? "None" : `${stand ? "Floor-standing" : "Desk-mounted"} ${c.thick} mm`;
  const partition = noPart ? "None" : `${sysName}, ${style.label.toLowerCase()}, ${c.ph} mm`;
  const details: string[] = [];
  if (!noPart && style.glaze) details.push(c.glaze === "Glass" ? "clear glass" : "polycarbonate");
  if (races) details.push(RACEWAYS[race][0].toLowerCase());
  if (!noPart && sys.sides) details.push(`${c.sides}-sided frame`);
  if (!noPart && sys.frame) details.push(`${c.pframe.toLowerCase()} frame`);
  if (c.tunnel) details.push("wire tunnel");
  const fabrics = fabSlots.map(([, k]) => c[k]).join(" / ");
  const legText = stand ? "None, carried by panels" : leg.id === "Panel" ? "Panel leg (matches top)" : `${leg.label}, ${c.legColour}`;
  const cableText = CABLES.filter(([k]) => c.cables.includes(k)).map(([, l]) => l).join(", ") || "None";
  const storage = STORAGE.find(([k]) => k === c.storage) ?? STORAGE[0];

  const summary: [string, string][] = [
    ["Layout", `${c.seats}-seater ${layoutName}`],
    ["Top size per seat", `${c.w} × ${c.d} mm`],
    ["Top colour", c.top],
    ["Table leg", legText],
    ["Partition", partition],
    ...(details.length ? ([["Partition details", details.join(", ")]] as [string, string][]) : []),
    ...(fabrics ? ([["Fabric", fabrics]] as [string, string][]) : []),
    ["Cable management", cableText],
    ["Storage", c.storage === "none" ? "None" : `${storage[1]} × ${c.seats}`],
  ];

  const cols = bb ? Math.floor(c.seats / 2) : c.seats;
  const rows = bb ? 2 : 1;
  const footW = cols * c.w + (endSeat ? c.d : 0);
  const footD = endSeat ? Math.max(2 * c.d, c.w) : rows * c.d;

  const code = [
    "WS",
    `${c.seats}${!bb ? "L" : endSeat ? "BE" : "BB"}`,
    `${c.w}x${c.d}`,
    c.top.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase(),
    noPart ? "NP" : `${stand ? "FS" : "DM"}${c.thick}-${c.pstyle.toUpperCase()}${c.ph}${races ? "-" + race : ""}`,
  ].join("-");

  return { c, bb, odd, endSeat, noPart, stand, sys, systems, style, heights, races, race, fabSlots, tunnelOk, leg, legColours, summary, cols, rows, footW, footD, code, partition };
}

export type Resolved = ReturnType<typeof resolve>;
