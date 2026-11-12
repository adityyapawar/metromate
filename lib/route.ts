import { LINE_SEQUENCES, type LineId } from "./network";
import { slug, byId } from "./stations";
export interface Leg { line: LineId; stations: string[]; towards: string }
export interface Journey { from: string; to: string; stops: string[]; legs: Leg[]; interchanges: string[]; hops: number }
const TRANSFER = 3; // prefer fewer line changes over marginally fewer stops
const graph = new Map<string, { to: string; line: LineId }[]>();
(Object.keys(LINE_SEQUENCES) as LineId[]).forEach((l) => LINE_SEQUENCES[l].forEach((n, i, a) => {
  const id = slug(n); const e = graph.get(id) ?? [];
  if (i > 0) e.push({ to: slug(a[i - 1]), line: l });
  if (i < a.length - 1) e.push({ to: slug(a[i + 1]), line: l });
  graph.set(id, e);
}));
export function planRoute(from: string, to: string): Journey | { error: string } {
  if (!byId(from) || !byId(to)) return { error: "Unknown station." };
  if (from === to) return { error: "Origin and destination are the same station." };
  // Dijkstra over (station, line) states so line changes can be costed.
  const key = (s: string, l: LineId | "") => `${s}|${l}`;
  const dist = new Map([[key(from, ""), 0]]); const prev = new Map<string, string>(); const done = new Set<string>();
  const queue: [number, string, string, LineId | ""][] = [[0, key(from, ""), from, ""]];
  let end = "";
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]); const [d, k, s, l] = queue.shift()!;
    if (done.has(k)) continue; done.add(k);
    if (s === to) { end = k; break; }
    for (const e of graph.get(s) ?? []) {
      const nd = d + 1 + (l && l !== e.line ? TRANSFER : 0), nk = key(e.to, e.line);
      if (nd < (dist.get(nk) ?? Infinity)) { dist.set(nk, nd); prev.set(nk, k); queue.push([nd, nk, e.to, e.line]); }
    }
  }
  if (!end) return { error: "No metro route found between these stations." };
  const chain: string[] = []; for (let k: string | undefined = end; k; k = prev.get(k)) chain.unshift(k);
  const steps = chain.map((k) => k.split("|") as [string, LineId | ""]);
  const stops = steps.map(([s]) => s); const legs: Leg[] = [];
  for (let i = 1; i < steps.length; i++) {
    const line = steps[i][1] as LineId, last = legs[legs.length - 1];
    if (last && last.line === line) last.stations.push(stops[i]);
    else legs.push({ line, stations: [stops[i - 1], stops[i]], towards: "" });
  }
  legs.forEach((leg) => {
    const seq = LINE_SEQUENCES[leg.line].map(slug), a = seq.indexOf(leg.stations[0]), b = seq.indexOf(leg.stations[leg.stations.length - 1]);
    leg.towards = LINE_SEQUENCES[leg.line][b > a ? seq.length - 1 : 0];
  });
  return { from, to, stops, legs, interchanges: legs.slice(1).map((l) => l.stations[0]), hops: stops.length - 1 };
}
