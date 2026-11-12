"use client";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownUp, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { STATIONS, LINES, byId, matches, type Station } from "@/lib/stations";

function Dot({ s }: { s: Station }) {
  return (<span className="flex -space-x-1">{s.lines.map((l) => <i key={l} className="h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: LINES[l].color }} />)}</span>);
}
function StationField({ label, value, onPick, tourId }: { label: string; value: Station | null; onPick: (s: Station | null) => void; tourId: string }) {
  const [q, setQ] = useState(""); const [open, setOpen] = useState(false); const id = useId();
  const results = useMemo(() => STATIONS.filter((s) => matches(s, q)), [q]);
  return (<div className="relative" data-tour={tourId}>
    <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted">{label}</label>
    <input id={id} role="combobox" aria-expanded={open} aria-controls={id + "-l"} autoComplete="off" inputMode="search" enterKeyHint="search"
      value={open ? q : value?.name ?? ""} placeholder="Search station"
      onFocus={() => { setOpen(true); setQ(""); }} onBlur={() => setTimeout(() => setOpen(false), 120)} onChange={(e) => setQ(e.target.value)}
      className="h-12 w-full rounded-ctl border border-rule bg-surface px-3 text-base outline-none transition-shadow focus:border-ink focus:shadow-[0_0_0_3px_rgba(23,32,51,.08)]" />
    <AnimatePresence>{open && (<motion.ul id={id + "-l"} role="listbox" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-ctl border border-rule bg-surface shadow-lift">
      {results.length === 0 && <li className="px-3 py-3 text-sm text-muted">No station matches “{q}”. Check the spelling.</li>}
      {results.map((s) => (<li key={s.id} role="option" aria-selected={value?.id === s.id}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); onPick(s); setOpen(false); }} className="flex min-h-12 w-full items-center gap-3 px-3 text-left hover:bg-canvas">
          <Dot s={s} /><span className="flex-1 text-sm font-medium">{s.name}</span><span className="text-xs text-muted">{s.aliases.find((a) => q && a.toLowerCase().includes(q.trim().toLowerCase())) ? `formerly ${s.aliases[0]}` : s.note}</span></button></li>))}
    </motion.ul>)}</AnimatePresence></div>);
}
export default function JourneyPlanner({ initialFrom, initialTo }: { initialFrom?: string | null; initialTo?: string | null } = {}) {
  const router = useRouter();
  const [from, setFrom] = useState<Station | null>(byId(initialFrom)); const [to, setTo] = useState<Station | null>(byId(initialTo));
  const [msg, setMsg] = useState<string | null>(null);
  const swap = () => { setFrom(to); setTo(from); };
  const plan = () => { if (!from || !to) return setMsg("Choose both stations to plan a journey."); if (from.id === to.id) return setMsg("Origin and destination are the same station."); setMsg(null); router.push(`/plan?from=${from.id}&to=${to.id}`); };
  return (<section aria-label="Journey planner" data-tour="planner" className="rounded-card border border-rule bg-surface p-4 shadow-lift md:p-5">
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
      <StationField label="From" value={from} onPick={setFrom} tourId="from" />
      <button type="button" onClick={swap} aria-label="Swap origin and destination" data-tour="swap"
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-surface text-muted transition active:scale-95 hover:text-ink md:mb-1"><ArrowDownUp size={18} className="md:rotate-90" /></button>
      <StationField label="To" value={to} onPick={setTo} tourId="to" />
    </div>
    <button type="button" onClick={plan} data-tour="plan" className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-ctl bg-ink font-medium text-white transition active:scale-[.98]">Plan journey <ArrowRight size={18} /></button>
    <p role="status" className="mt-2 min-h-5 text-sm text-muted">{msg}</p></section>);
}
