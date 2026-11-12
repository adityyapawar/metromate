"use client";
export default function ReplayTour() { return <button onClick={() => window.dispatchEvent(new Event("mm:tour"))} className="rounded-ctl bg-ink px-4 py-3 font-medium text-white">Replay the guided tour</button>; }
