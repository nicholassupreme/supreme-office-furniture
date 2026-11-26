/* Ace pods are listed first, smallest to largest by seater count, then by price. */
const SEATS: [prefix: string, seats: number][] = [
  ["ace-uno", 1],
  ["ace-plus", 1],
  ["ace-flex-duo", 2],
  ["ace-flex-sofa", 2],
  ["ace-flex", 1],
  ["ace-meet", 4],
  ["ace-hub", 6],
];

/** Seat count for an Ace pod slug, or null if it isn't an Ace pod. */
export function aceSeats(slug: string): number | null {
  return SEATS.find(([p]) => slug.startsWith(p))?.[1] ?? null;
}

/** Seat groups used for the Office Pods collections and filter chips. */
export const SEAT_GROUPS: { key: string; seats: number; label: string; blurb: string }[] = [
  { key: "1", seats: 1, label: "1 Seater", blurb: "Phone booths and focus pods" },
  { key: "2", seats: 2, label: "2 Seater", blurb: "Calls, pair work and quick chats" },
  { key: "4", seats: 4, label: "Up to 4 Seater", blurb: "Small team meeting pods" },
  { key: "6", seats: 6, label: "Up to 6 Seater", blurb: "Larger team meeting pods" },
];

const OTHER_PODS: [prefix: string, seats: number][] = [
  ["satu-", 1],
  ["movable-silence", 1],
  ["quattro-", 4],
];

/** Seat count for any pod (Ace or not), or null if unknown. */
export function podSeats(slug: string): number | null {
  return aceSeats(slug) ?? OTHER_PODS.find(([p]) => slug.startsWith(p))?.[1] ?? null;
}
