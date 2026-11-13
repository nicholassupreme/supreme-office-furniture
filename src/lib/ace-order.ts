/* Ace pods are listed first, smallest to largest by seater count, then by price. */
const SEATS: [prefix: string, seats: number][] = [
  ["ace-uno", 1],
  ["ace-plus", 1],
  ["ace-flex-duo", 2],
  ["ace-flex", 1],
  ["ace-meet", 4],
  ["ace-hub", 6],
];

/** Seat count for an Ace pod slug, or null if it isn't an Ace pod. */
export function aceSeats(slug: string): number | null {
  return SEATS.find(([p]) => slug.startsWith(p))?.[1] ?? null;
}
