"use client";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
const KEY = "mm-tour-done";
const SAMPLE = "/plan?from=vanaz&to=swargate";
const STEPS: { sel?: string; route?: string; title: string; body: string }[] = [
  { route: "/", title: "Meet MetroMate", body: "Plan Pune Metro journeys between stations on the Purple and Aqua lines." },
  { sel: "from", route: "/", title: "Pick your start", body: "Tap From and type a station name. Old names such as Nal Stop also work." },
  { sel: "to", route: "/", title: "Pick your destination", body: "Do the same in To. Try it now." },
  { sel: "swap", route: "/", title: "Swap stations", body: "Heading back? Swap reverses your journey in one tap." },
  { sel: "plan", route: "/", title: "Plan journey", body: "Press Plan journey once both stations are set. Next takes you to a sample." },
  { sel: "result", route: SAMPLE, title: "Read your result", body: "You see the line, direction, every stop and where to exit." },
  { sel: "interchange", route: SAMPLE, title: "Interchanges", body: "District Court is where the Purple and Aqua lines meet. Follow the instruction to change platforms." },
  { sel: "map", route: "/map", title: "Network map", body: "A schematic of both lines. Tap a station to select it; use the buttons to zoom." },
  { sel: "stationlist", route: "/stations", title: "Station explorer", body: "Search or filter by line, then open any station for its neighbours." },
  { route: SAMPLE, title: "Your turn", body: "Vanaz to Swargate is a sample journey with one change. Press Finish to start exploring." },
];
export default function Tour() {
  const router = useRouter(), path = usePathname();
  const [welcome, setWelcome] = useState(false), [i, setI] = useState<number | null>(null), [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => { try { if (!localStorage.getItem(KEY)) setWelcome(true); } catch {} const h = () => { setWelcome(false); setI(0); }; window.addEventListener("mm:tour", h); return () => window.removeEventListener("mm:tour", h); }, []);
  const end = useCallback(() => { try { localStorage.setItem(KEY, "1"); } catch {} setI(null); setWelcome(false); }, []);
  const step = i === null ? null : STEPS[i];
  useEffect(() => { if (step?.route && step.route.split("?")[0] !== path) router.push(step.route); }, [step, path, router]);
  useLayoutEffect(() => {
    if (!step?.sel) { setRect(null); return; }
    let t: ReturnType<typeof setInterval>; const find = () => { const el = document.querySelector(`[data-tour="${step.sel}"]`); if (el) { el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); setTimeout(() => setRect(el.getBoundingClientRect()), 350); clearInterval(t); } };
    setRect(null); find(); t = setInterval(find, 150); const up = () => { const el = document.querySelector(`[data-tour="${step.sel}"]`); if (el) setRect(el.getBoundingClientRect()); };
    addEventListener("resize", up); addEventListener("scroll", up, true); return () => { clearInterval(t); removeEventListener("resize", up); removeEventListener("scroll", up, true); };
  }, [step, path]);
  useEffect(() => { if (i === null) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") end(); if (e.key === "ArrowRight") setI((x) => Math.min(STEPS.length - 1, (x ?? 0) + 1)); if (e.key === "ArrowLeft") setI((x) => Math.max(0, (x ?? 0) - 1)); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [i, end]);
  const btn = "min-h-11 rounded-ctl px-4 text-sm font-medium";
  if (welcome) return (<div role="dialog" aria-modal="true" aria-label="Welcome" className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-4 md:items-center"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-sm rounded-card bg-surface p-6 shadow-lift">
    <h2 className="text-xl font-semibold tracking-tight">Welcome to MetroMate. Let&apos;s make your Pune Metro journey easier.</h2>
    <div className="mt-5 flex flex-col gap-2"><button autoFocus onClick={() => { setWelcome(false); setI(0); }} className={`${btn} bg-ink text-white`}>Start Tour</button><button onClick={end} className={`${btn} border border-rule`}>Explore Independently</button></div></motion.div></div>);
  if (i === null || !step) return null;
  const hole = rect ? { t: rect.top - 6, l: rect.left - 6, w: rect.width + 12, h: rect.height + 12 } : null; const vh = typeof innerHeight === "number" ? innerHeight : 800;
  const below = hole ? hole.t + hole.h + 220 < vh : false;
  return (<div className="fixed inset-0 z-[60]" aria-live="polite">
    {hole ? <>{[{ top: 0, left: 0, right: 0, height: hole.t }, { top: hole.t + hole.h, left: 0, right: 0, bottom: 0 }, { top: hole.t, left: 0, width: hole.l, height: hole.h }, { top: hole.t, left: hole.l + hole.w, right: 0, height: hole.h }].map((s, k) => <div key={k} className="absolute bg-ink/60" style={s} />)}
      <motion.div layout className="pointer-events-none absolute rounded-ctl ring-2 ring-white" initial={false} animate={{ top: hole.t, left: hole.l, width: hole.w, height: hole.h }} transition={{ duration: 0.25 }} /></> : <div className="absolute inset-0 bg-ink/60" />}
    <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} role="dialog" aria-label={`Tour step ${i + 1} of ${STEPS.length}: ${step.title}`}
      className="absolute inset-x-3 mx-auto max-w-sm rounded-card bg-surface p-4 shadow-lift" style={hole ? (below ? { top: hole.t + hole.h + 12 } : { bottom: vh - hole.t + 12 }) : { top: "30%" }}>
      <div className="mb-2 h-1 rounded-full bg-rule"><div className="h-1 rounded-full bg-ink transition-all" style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} /></div>
      <p className="text-xs text-muted">Step {i + 1} of {STEPS.length}</p><h2 className="font-semibold">{step.title}</h2><p className="mt-1 text-sm text-muted">{step.body}</p>
      <div className="mt-3 flex items-center gap-2"><button onClick={end} className={`${btn} text-muted`}>Skip</button><span className="flex-1" />
        {i > 0 && <button onClick={() => setI(i - 1)} className={`${btn} border border-rule`}>Previous</button>}
        <button autoFocus onClick={() => (i === STEPS.length - 1 ? end() : setI(i + 1))} className={`${btn} bg-ink text-white`}>{i === STEPS.length - 1 ? "Finish" : "Next"}</button></div></motion.div></AnimatePresence></div>);
}
