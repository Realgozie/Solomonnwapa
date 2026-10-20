import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.capabilities.metaTitle,
  site.pages.capabilities.metaDescription,
  "/capabilities",
);

export default function CapabilitiesPage() {
  const page = site.pages.capabilities;

  return <><PageIntro eyebrow={page.eyebrow} title={page.title} summary={page.summary} />
    <section className="page-shell pb-10"><div className="border-t border-[var(--line)]">{site.capabilities.map((item, i) => <ScrollReveal key={item} delayMs={i * 65}><article className="grid gap-4 border-b border-[var(--line)] py-7 md:grid-cols-[80px_1fr] md:items-baseline md:py-9"><span className="font-mono text-xs text-[var(--accent)]">0{i + 1}</span><h2 className="serif text-3xl md:text-4xl">{item}</h2></article></ScrollReveal>)}</div></section>
    <section className="page-shell border-t border-[var(--line)] py-12"><Link href="/contact" className="cta cta-text">{page.contactLink} <span aria-hidden>↗</span></Link></section>
  </>;
}
