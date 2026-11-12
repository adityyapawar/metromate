import Link from "next/link";
import Logo from "./Logo";
const LINKS = [["About MetroMate","/about"],["Official Pune Metro","https://www.punemetrorail.org/"],["Data Sources","/data-sources"],["Help","/help"],["Feedback","/feedback"]];
export default function Footer() {
  return (<footer className="border-t border-rule bg-surface"><div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
    <div className="flex flex-col gap-8 md:flex-row md:justify-between">
      <div><Logo /><p className="mt-3 max-w-xs text-sm text-muted">Know your route. Find your way. Move Pune.</p></div>
      <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm md:grid-cols-1">{LINKS.map(([l,h])=>(<li key={l}>{h.startsWith("http")?<a href={h} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">{l}</a>:<Link href={h} className="text-muted hover:text-ink">{l}</Link>}</li>))}</ul></div>
    <div className="mt-8 flex flex-col gap-1 border-t border-rule pt-5 text-sm text-muted md:flex-row md:justify-between">
      <p>Copyright © 2026 MetroMate.</p><p>Made with care by Aditya Pawar 👨🏻‍💻</p></div></div></footer>);
}
