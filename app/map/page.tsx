"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { LINE_SEQUENCES } from "@/lib/network";
import { LINES, slug, byId, type LineId } from "@/lib/stations";
import { planRoute } from "@/lib/route";
const STEP = 62, DC = 520, Y = { purple: 80, aqua: 240 } as const;
const X = (l: LineId, i: number) => DC + (i - LINE_SEQUENCES[l].indexOf("District Court")) * STEP;
function Inner() {
  const p = useSearchParams(); const [sel, setSel] = useState<string | null>(p.get("from")); const [z, setZ] = useState(1);
  const r = p.get("from") && p.get("to") ? planRoute(p.get("from")!, p.get("to")!) : null; const on = new Set("stops" in (r ?? {}) ? (r as { stops: string[] }).stops : sel ? [sel] : []);
  const st = byId(sel);
  return (<div className="mx-auto max-w-6xl px-4 py-8 md:px-6"><h1 className="text-3xl font-semibold tracking-display">Metro map</h1>
    <p className="mt-2 text-muted">Schematic diagram, not geographic. Tap a station; scroll to pan and use the buttons to zoom.</p>
    <div className="mt-4 flex gap-2"><button aria-label="Zoom in" onClick={() => setZ(Math.min(2, z + 0.25))} className="flex h-11 w-11 items-center justify-center rounded-ctl border border-rule bg-surface"><Plus size={18} /></button>
      <button aria-label="Zoom out" onClick={() => setZ(Math.max(0.75, z - 0.25))} className="flex h-11 w-11 items-center justify-center rounded-ctl border border-rule bg-surface"><Minus size={18} /></button></div>
    <div data-tour="map" className="mt-3 overflow-auto rounded-card border border-rule bg-surface p-3"><svg viewBox="0 0 1120 330" style={{ width: `${z * 1000}px`, maxWidth: "none" }} role="group" aria-label="Schematic Pune Metro map">
      <line x1={DC} x2={DC} y1={Y.purple} y2={Y.aqua} stroke="#172033" strokeWidth="5" strokeDasharray="2 8" strokeLinecap="round" />
      {(["purple", "aqua"] as LineId[]).map((l) => { const q = LINE_SEQUENCES[l]; return <g key={l}><line x1={X(l, 0)} x2={X(l, q.length - 1)} y1={Y[l]} y2={Y[l]} stroke={LINES[l].color} strokeWidth="7" strokeLinecap="round" />
        {q.map((n, i) => { const id = slug(n), x = X(l, i), ty = Y[l] + (l === "purple" ? -16 : 22), sx = on.has(id), dc = n === "District Court"; return <g key={n} role="button" tabIndex={0} aria-label={`${n}, ${LINES[l].name}`} className="cursor-pointer" onClick={() => setSel(id)} onKeyDown={(e) => e.key === "Enter" && setSel(id)}>
          <circle cx={x} cy={Y[l]} r={dc ? 12 : sx ? 9 : 6.5} fill={sx ? "#172033" : "#fff"} stroke="#172033" strokeWidth="3" /><text x={x} y={ty} fontSize="11" fontWeight={dc || sx ? 700 : 500} fill="#172033" textAnchor={l === "purple" ? "start" : "end"} transform={`rotate(-35 ${x} ${ty})`}>{n}</text></g>; })}</g>; })}
      <text x={DC + 18} y={160} fontSize="12" fontWeight="700" fill="#172033">Interchange: District Court</text>
    </svg></div>
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">{Object.values(LINES).map((l) => <li key={l.name} className="flex items-center gap-2"><i className="h-2 w-5 rounded-full" style={{ background: l.color }} />{l.name}</li>)}<li>Dark marker: selected or on your route</li></ul>
    {st && <div className="mt-4 rounded-card border border-rule bg-surface p-4"><p className="font-semibold">{st.name} <span className="font-normal text-muted">{st.note}</span></p><p className="mt-2 flex gap-4 text-sm"><Link className="underline" href={`/stations/${st.id}`}>Station details</Link><Link className="underline" href={`/plan?from=${st.id}`}>Plan from here</Link></p></div>}</div>);
}
export default function MapPage() { return <Suspense fallback={<div className="p-8 text-muted">Loading map…</div>}><Inner /></Suspense>; }
