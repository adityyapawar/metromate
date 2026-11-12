import Page from "@/components/Page";
import { SOURCES, VERIFIED_ON } from "@/lib/network";
export default function DS() { return <Page title="Data sources" intro={`Station data last compiled on ${VERIFIED_ON}.`}><ul className="list-disc space-y-2 pl-5">{SOURCES.map((s) => <li key={s.url}><a className="underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
  <p className="text-muted">Station sequences have not yet been cross-checked against punemetrorail.org. Proposed and under-construction stations are excluded. No fares, timings, coordinates or facilities are included.</p></Page>; }
