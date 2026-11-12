"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import JourneyPlanner from "@/components/JourneyPlanner";
import JourneyResult from "@/components/JourneyResult";
function Inner() {
  const p = useSearchParams(); const from = p.get("from"), to = p.get("to");
  return (<div className="mx-auto max-w-2xl px-4 py-8 md:px-6"><h1 className="mb-5 text-3xl font-semibold tracking-display">Plan journey</h1>
    <JourneyPlanner key={`${from}${to}`} initialFrom={from} initialTo={to} />{from && to && <JourneyResult from={from} to={to} />}</div>);
}
export default function Plan() { return <Suspense fallback={<div className="p-8 text-muted">Loading planner…</div>}><Inner /></Suspense>; }
