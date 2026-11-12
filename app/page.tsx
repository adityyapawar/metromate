import Link from "next/link";
import { Map, MapPin, CircleHelp } from "lucide-react";
import JourneyPlanner from "@/components/JourneyPlanner";
import NetworkOverview from "@/components/NetworkOverview";
import { STATIONS } from "@/lib/stations";
export default function Home() {
  return (<div className="mx-auto max-w-6xl px-4 md:px-6">
    <section className="grid gap-8 py-8 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:py-16">
      <div>
        <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-display md:text-6xl">Your Pune Metro journey, made simple.</h1>
        <p className="mt-4 max-w-md text-lg text-muted">Find stations, explore metro lines and plan your journey across Pune.</p>
        <div className="mt-6 hidden flex-wrap gap-3 md:flex">
          <Link href="/map" className="flex items-center gap-2 rounded-ctl border border-rule bg-surface px-4 py-2.5 text-sm font-medium"><Map size={16}/>Explore Metro Map</Link>
          <Link href="/stations" className="flex items-center gap-2 rounded-ctl border border-rule bg-surface px-4 py-2.5 text-sm font-medium"><MapPin size={16}/>View All Stations</Link>
          <Link href="/help" className="flex items-center gap-2 rounded-ctl px-4 py-2.5 text-sm font-medium text-muted hover:text-ink"><CircleHelp size={16}/>How to use MetroMate</Link>
        </div>
      </div>
      <JourneyPlanner />
    </section>
    <section className="pb-10 md:hidden"><div className="grid grid-cols-3 gap-2 text-center text-xs font-medium">
      {[["/map","Metro Map",Map],["/stations","Stations",MapPin],["/help","How to use",CircleHelp]].map(([h,l,I]:any)=>(<Link key={h} href={h} className="flex flex-col items-center gap-1.5 rounded-card border border-rule bg-surface py-3"><I size={20}/>{l}</Link>))}</div></section>
    <section className="pb-10 md:pb-16"><h2 className="mb-3 text-xl font-semibold tracking-tight">The network</h2><NetworkOverview /></section>
    <section className="pb-12 md:pb-20"><h2 className="mb-3 text-xl font-semibold tracking-tight">Start from a station</h2>
      <ul className="flex flex-wrap gap-2">{STATIONS.filter((s) => ["pcmc","shivaji-nagar","district-court","swargate","vanaz","pune-railway-station","ramwadi","deccan-gymkhana"].includes(s.id)).map((s) => (<li key={s.id}><Link href={`/stations/${s.id}`} className="flex min-h-11 items-center gap-2 rounded-full border border-rule bg-surface px-4 text-sm font-medium">
        <span className="flex -space-x-1">{s.lines.map((l) => <i key={l} className={`h-2.5 w-2.5 rounded-full ring-2 ring-white ${l === "purple" ? "bg-purple-line" : "bg-aqua-line"}`} />)}</span>{s.name}</Link></li>))}</ul></section>
  </div>);
}
