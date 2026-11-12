import Link from "next/link";
import { notFound } from "next/navigation";
import { STATIONS, byId, LINES, slug } from "@/lib/stations";
import { LINE_SEQUENCES, VERIFIED_ON } from "@/lib/network";
import Page from "@/components/Page";
export const dynamicParams = false;
export const generateStaticParams = () => STATIONS.map((s) => ({ id: s.id }));
export default async function Station({ params }: { params: Promise<{ id: string }> }) {
  const s = byId((await params).id); if (!s) notFound();
  return (<Page title={s.name} intro={s.lines.length > 1 ? "Interchange between the Purple and Aqua lines" : s.note}>
    {s.aliases.length > 0 && <p className="text-muted">Also searched as: {s.aliases.join(", ")}.</p>}
    {s.lines.map((l) => { const seq = LINE_SEQUENCES[l], i = seq.indexOf(s.name); const n = (k: number) => seq[k] ? <Link className="underline" href={`/stations/${slug(seq[k])}`}>{seq[k]}</Link> : <span className="text-muted">end of line</span>;
      return <div key={l} className="rounded-card border border-rule bg-surface p-4"><b style={{ color: LINES[l].ink }}>{LINES[l].name}</b><p className="mt-1">Station {i + 1} of {seq.length}. Previous: {n(i - 1)}. Next: {n(i + 1)}.</p></div>; })}
    <p className="text-muted">Status: operational (per official station list and press reports, checked {VERIFIED_ON}). Facilities, landmarks and coordinates are not shown because they are not verified.</p>
    <div className="flex flex-wrap gap-3"><Link href={`/plan?from=${s.id}`} className="rounded-ctl bg-ink px-4 py-3 font-medium text-white">Plan from here</Link><Link href={`/plan?to=${s.id}`} className="rounded-ctl border border-rule bg-surface px-4 py-3 font-medium">Plan to here</Link><Link href={`/map?from=${s.id}`} className="rounded-ctl border border-rule bg-surface px-4 py-3 font-medium">Show on map</Link></div></Page>);
}
