"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Route, Map, MapPin, HelpCircle } from "lucide-react";
import Logo from "./Logo";
const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plan", label: "Plan Journey", short: "Plan", icon: Route },
  { href: "/map", label: "Metro Map", short: "Map", icon: Map },
  { href: "/stations", label: "Stations", icon: MapPin },
  { href: "/help", label: "Help", icon: HelpCircle },
];
export default function Navbar() {
  const path = usePathname();
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (<>
    <header className="sticky top-0 z-40 border-b border-rule bg-canvas/90 backdrop-blur" style={{ paddingTop: "var(--safe-t)" }}>
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="MetroMate home"><Logo /></Link>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (<li key={n.href}><Link href={n.href} aria-current={active(n.href) ? "page" : undefined}
            className={`rounded-ctl px-3 py-2 text-sm transition-colors ${active(n.href) ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>{n.label}</Link></li>))}
        </ul>
        <Link href="/help" className="md:hidden rounded-ctl border border-rule bg-surface px-3 py-1.5 text-sm font-medium">Take a tour</Link>
      </nav>
    </header>
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-surface md:hidden" style={{ paddingBottom: "var(--safe-b)" }}>
      <ul className="grid grid-cols-5">
        {NAV.map(({ href, label, short, icon: Icon }) => (<li key={href}><Link href={href} aria-current={active(href) ? "page" : undefined}
          className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] ${active(href) ? "text-ink font-semibold" : "text-muted"}`}>
          <Icon size={20} strokeWidth={active(href) ? 2.4 : 1.8} />{short ?? label}</Link></li>))}
      </ul>
    </nav>
  </>);
}
