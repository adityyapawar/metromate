// Operational passenger stations only (Range Hill Depot and Hill View Park Car Depot are depots; Phase 2 / under-construction stations excluded).
// Names and order follow the official "Know Your Stations" page (punemetrorail.org), fetched 12 Nov 2026.
// Dec 2025 renames (Ideal Colony->Paud Phata, Nal Stop->SNDT College, Mandai->Mahatma Phule Mandai) are confirmed by press reports; the official page's
// Aqua list shows "R.T.O Pune" for the station previously called Mangalwar Peth (also reported by housing.com). Old names are kept as search aliases.
// The official page does not state which stations are open; operational status rests on press reports that both lines run end to end.
export type LineId = "purple" | "aqua";
export const VERIFIED_ON = "2026-11-12";
export const SOURCES = [
  { label: "Pune Metro: Know Your Stations (official)", url: "https://www.punemetrorail.org/know-your-metro-stations?lang=en-US" },
  { label: "Pune Metro: Train Time Table (official, image only)", url: "https://www.punemetrorail.org/time-table" },
  { label: "Free Press Journal: Dec 2025 station renames", url: "https://www.freepressjournal.in/pune/pune-after-public-demand-mandai-nalstop-and-ideal-colony-metro-stations-get-new-names" },
  { label: "Wikipedia: Purple Line (Pune Metro)", url: "https://en.wikipedia.org/wiki/Purple_Line_(Pune_Metro)" },
  { label: "Wikipedia: Aqua Line (Pune Metro)", url: "https://en.wikipedia.org/wiki/Aqua_Line_(Pune_Metro)" },
];
export const LINE_SEQUENCES: Record<LineId, string[]> = {
 "purple": [
  "PCMC",
  "Sant Tukaram Nagar",
  "Bhosari (Nashik Phata)",
  "Kasarwadi",
  "Phugewadi",
  "Dapodi",
  "Bopodi",
  "Khadki",
  "Range Hill",
  "Shivaji Nagar",
  "District Court",
  "Kasba Peth",
  "Mahatma Phule Mandai",
  "Swargate"
 ],
 "aqua": [
  "Vanaz",
  "Anand Nagar",
  "Paud Phata",
  "SNDT College",
  "Garware College",
  "Deccan Gymkhana",
  "Chhatrapati Sambhaji Udyan",
  "PMC",
  "District Court",
  "RTO Pune",
  "Pune Railway Station",
  "Ruby Hall Clinic",
  "Bund Garden",
  "Yerawada",
  "Kalyani Nagar",
  "Ramwadi"
 ]
};
export const ALIASES: Record<string, string[]> = {
 "Bhosari (Nashik Phata)": [
  "Nashik Phata",
  "Bhosari"
 ],
 "Paud Phata": [
  "Ideal Colony"
 ],
 "SNDT College": [
  "Nal Stop",
  "Nalstop",
  "SNDT"
 ],
 "Mahatma Phule Mandai": [
  "Mandai"
 ],
 "District Court": [
  "Civil Court",
  "Pune District Court"
 ],
 "RTO Pune": [
  "Mangalwar Peth",
  "RTO"
 ],
 "Pune Railway Station": [
  "Pune Rly. Station",
  "Pune Junction"
 ],
 "Range Hill": [
  "Range Hills"
 ],
 "PMC": [
  "PMC Bhavan"
 ],
 "Yerawada": [
  "Yerwada"
 ],
 "PCMC": [
  "PCMC Bhavan",
  "Pimpri Chinchwad"
 ],
 "Kasba Peth": [
  "Budhwar Peth"
 ]
};
