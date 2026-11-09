/**
 * Projects completed per state since 2022, shown on the portfolio map.
 * Keys are state codes: KL Kuala Lumpur, SL Selangor, PJ Putrajaya, PG Penang, KH Kedah, PL Perlis,
 * PK Perak, KN Kelantan, TE Terengganu, PH Pahang, NS Negeri Sembilan, ME Melaka, JH Johor,
 * SA Sabah, SK Sarawak, LA Labuan.
 * Leave a state out (or 0) and it stays grey. The map is hidden until at least one count is filled in.
 */
export const projectsSince = 2022;

export const projectLocations: Partial<Record<StateCode, number>> = {
  // KL: 50,
  // PG: 10,
  // SA: 5,
};

export type StateCode =
  | "KL"
  | "SL"
  | "PJ"
  | "PG"
  | "KH"
  | "PL"
  | "PK"
  | "KN"
  | "TE"
  | "PH"
  | "NS"
  | "ME"
  | "JH"
  | "SA"
  | "SK"
  | "LA";

export const stateNames: Record<StateCode, string> = {
  KL: "Kuala Lumpur",
  SL: "Selangor",
  PJ: "Putrajaya",
  PG: "Penang",
  KH: "Kedah",
  PL: "Perlis",
  PK: "Perak",
  KN: "Kelantan",
  TE: "Terengganu",
  PH: "Pahang",
  NS: "Negeri Sembilan",
  ME: "Melaka",
  JH: "Johor",
  SA: "Sabah",
  SK: "Sarawak",
  LA: "Labuan",
};
