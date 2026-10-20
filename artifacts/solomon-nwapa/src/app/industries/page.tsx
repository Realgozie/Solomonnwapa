import type { Metadata } from "next";
import { PageIntro } from "@/components/layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.industries.metaTitle,
  site.pages.industries.metaDescription,
  "/industries",
);

export default function IndustriesPage() {
  const page = site.pages.industries;

  return <><PageIntro eyebrow={page.eyebrow} title={page.title} summary={page.summary} />
    <section className="page-shell pb-8"><div className="grid border-l border-t border-[var(--line)] sm:grid-cols-2">{site.industries.map((item, i) => <ScrollReveal key={item.title} delayMs={i * 75}><article className="min-h-[225px] border-b border-r border-[var(--line)] p-6 md:p-8"><span className="font-mono text-xs text-[var(--accent)]">0{i + 1} / INTEREST</span><h2 className="serif mt-7 text-3xl">{item.title}</h2><p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">{item.text}</p></article></ScrollReveal>)}</div></section>
  </>;
}
