export default function Page({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (<div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-14"><h1 className="text-3xl font-semibold tracking-display md:text-4xl">{title}</h1>
    {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}<div className="mt-8 space-y-4 text-[15px] leading-relaxed">{children}</div></div>);
}
