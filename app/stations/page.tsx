"use client";
import Link from "next/link";
import { useState } from "react";
import { STATIONS, LINES, matches, type LineId } from "@/lib/stations";
export default function Stations() {
  const [q, setQ] = useState(""); const [f, setF] = useState<LineId | "all">("all");
  const list = STATIONS.filter((s) => matches(s, q) && (f === "all" || s.lines.includes(f)));
  return (<div className="mx-auto max-w-3xl px-4 py-8 md:px-6"><h1 className="text-3xl font-semibold tracking-display">Stations</h1>
    <p className="mt-2 text-muted">{STATIONS.length} operational stations.</p>
    <input aria-label="Search stations" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search stations" className="mt-5 h-12 w-full rounded-ctl border border-rule bg-surface px-3 text-base" />
    <div className="mt-3 flex gap-2">{(["all", "purple", "aqua"] as const).map((k) => <button key={k} onClick={() => setF(k)} aria-pressed={f === k} className={`min-h-11 rounded-full border px-4 text-sm font-medium ${f === k ? "border-ink bg-ink text-white" : "border-rule bg-surface"}`}>{k === "all" ? "All lines" : LINES[k].name}</button>)}</div>
    <ul data-tour="stationlist" className="mt-4 divide-y divide-rule rounded-card border border-rule bg-surface">{list.map((s) => <li key={s.id}><Link href={`/stations/${s.id}`} className="flex min-h-14 items-center gap-3 px-4">
      <span className="flex -space-x-1">{s.lines.map((l) => <i key={l} className="h-3 w-3 rounded-full ring-2 ring-white" style={{ background: LINES[l].color }} />)}</span><span className="flex-1 font-medium">{s.name}</span><span className="text-sm text-muted">{s.note}</span></Link></li>)}
      {list.length === 0 && <li className="p-4 text-sm text-muted">No stations match. Try a shorter name.</li>}</ul></div>);
}
