"use client";
import { motion } from "motion/react";
import { planRoute } from "@/lib/route";
import { byId, LINES } from "@/lib/stations";
export default function JourneyResult({ from, to }: { from: string; to: string }) {
  const r = planRoute(from, to);
  if ("error" in r) return <p role="alert" className="mt-6 rounded-card border border-rule bg-surface p-4 text-sm">{r.error}</p>;
  const nm = (id: string) => byId(id)!.name;
  return (<section aria-label="Journey result" data-tour="result" className="mt-6">
    <h2 className="text-xl font-semibold tracking-tight">{nm(r.from)} to {nm(r.to)}</h2>
    <p className="mt-1 text-sm text-muted">{r.hops} stops{r.interchanges.length ? `, change at ${r.interchanges.map(nm).join(", ")}` : ", no change needed"}. Duration and fare are not shown because no verified data is loaded yet.</p>
    <div className="mt-5 space-y-5">{r.legs.map((leg, i) => { const L = LINES[leg.line]; return (
      <div key={i} className="rounded-card border border-rule bg-surface p-4 shadow-lift">
        <p className="text-sm font-semibold" style={{ color: L.ink }}>{i === 0 ? "Board" : "Change to"} the {L.name} at {nm(leg.stations[0])}, towards {leg.towards}</p>
        <ol className="mt-4">{leg.stations.map((s, j) => (<motion.li key={s} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.04, duration: 0.2 }} className="relative flex min-h-9 items-center gap-4 pl-1">
          {j < leg.stations.length - 1 && <span className="absolute left-[8px] top-1/2 h-full w-1 -translate-x-1/2" style={{ background: L.color }} />}
          <i className="relative z-10 h-3.5 w-3.5 rounded-full border-[3px] bg-white" style={{ borderColor: j === 0 || j === leg.stations.length - 1 ? "#172033" : L.color }} />
          <span className={j === 0 || j === leg.stations.length - 1 ? "font-semibold" : "text-muted"}>{nm(s)}</span></motion.li>))}</ol>
        {i < r.legs.length - 1 && <p data-tour="interchange" className="mt-3 text-sm font-medium">Interchange: walk to the {LINES[r.legs[i + 1].line].name} platforms.</p>}
      </div>); })}
      <p className="text-sm font-medium">Exit at {nm(r.to)}.</p></div></section>);
}
