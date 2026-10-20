import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.work.metaTitle,
  site.pages.work.metaDescription,
  "/work",
);

export default function WorkPage() {
  const page = site.pages.work;

  return <><PageIntro eyebrow={page.eyebrow} title={page.title} summary={page.summary} />
    <section className="page-shell pb-10"><div className="border-t border-[var(--line)]">{projects.map((project, i) => <ScrollReveal key={project.slug} delayMs={i * 85}><Link href={`/work/${project.slug}`} className="work-index-link group grid gap-6 border-b border-[var(--line)] py-9 md:grid-cols-[90px_1fr_1fr_48px] md:items-center md:px-5"><span className="font-mono text-xs text-[var(--accent)]">{project.index} / PRODUCT</span><h2 className="serif text-5xl md:text-6xl">{project.name}</h2><p className="text-sm leading-6 text-[var(--muted)]">{project.summary}</p><span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] transition-transform group-hover:rotate-45 group-hover:border-[var(--ink)]" aria-hidden="true">↗</span></Link></ScrollReveal>)}</div></section>
    <section className="page-shell flex justify-end border-t border-[var(--line)] py-12"><Link href="/contact" className="cta cta-primary">Discuss a project <span aria-hidden>↗</span></Link></section>
  </>;
}
