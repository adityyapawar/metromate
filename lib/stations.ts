import { LINE_SEQUENCES, ALIASES, type LineId } from "./network";
export type { LineId };
export interface Station { id: string; name: string; lines: LineId[]; note: string; aliases: string[] }
export const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const LINES = {
  purple: { name: "Purple Line", color: "#A855F7", ink: "#7E22CE", from: "PCMC", to: "Swargate" },
  aqua: { name: "Aqua Line", color: "#0EA5E9", ink: "#0369A1", from: "Vanaz", to: "Ramwadi" },
} as const;
const map = new Map<string, Station>();
(Object.keys(LINE_SEQUENCES) as LineId[]).forEach((l) => LINE_SEQUENCES[l].forEach((n, i, a) => {
  const s = map.get(slug(n)) ?? { id: slug(n), name: n, lines: [], note: "", aliases: ALIASES[n] ?? [] };
  s.lines.push(l);
  s.note = s.lines.length > 1 ? "Interchange" : i === 0 || i === a.length - 1 ? `${LINES[l].name} terminal` : LINES[l].name;
  map.set(s.id, s);
}));
export const STATIONS: Station[] = [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
export const byId = (id?: string | null) => (id ? map.get(id) ?? null : null);
export const matches = (s: Station, q: string) => [s.name, ...s.aliases].some((n) => n.toLowerCase().includes(q.trim().toLowerCase()));
