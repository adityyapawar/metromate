import { LINES } from "@/lib/stations";
export default function NetworkOverview() {
  // Schematic only (not geographic). Full verified stations arrive in M2.
  return (<figure className="rounded-card border border-rule bg-surface p-4 md:p-6">
    <svg viewBox="0 0 360 190" role="img" aria-label="Schematic of the Purple and Aqua lines meeting at District Court" className="w-full">
      <line x1="30" y1="150" x2="330" y2="40" stroke="#A855F7" strokeWidth="6" strokeLinecap="round" />
      <line x1="30" y1="40" x2="330" y2="150" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" />
      {[[30,150],[330,40],[30,40],[330,150]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="7" fill="#fff" stroke="#172033" strokeWidth="3"/>)}
      <circle cx="180" cy="95" r="11" fill="#fff" stroke="#172033" strokeWidth="3.5" />
      <g fontSize="12" fill="#172033" fontWeight="600"><text x="30" y="176" textAnchor="start">PCMC</text><text x="330" y="28" textAnchor="end">Swargate</text><text x="30" y="26">Vanaz</text><text x="330" y="176" textAnchor="end">Ramwadi</text><text x="180" y="122" textAnchor="middle">District Court</text></g>
    </svg>
    <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
      {Object.values(LINES).map((l) => <span key={l.name} className="flex items-center gap-2"><i className="h-2 w-5 rounded-full" style={{ background: l.color }} />{l.name}: {l.from} to {l.to}</span>)}
      <span>Schematic, not to scale.</span></figcaption></figure>);
}
