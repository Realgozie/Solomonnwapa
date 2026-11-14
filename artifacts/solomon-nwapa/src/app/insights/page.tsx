import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.insights.metaTitle,
  site.pages.insights.metaDescription,
  "/insights",
  true,
);

export default function InsightsPage() {
  const page = site.pages.insights;

  return <>
    <section className="page-intro page-shell pb-12 pt-14 md:pb-16 md:pt-24">
      <ScrollReveal>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl">{page.title}</h1>
        <div className="mt-7 max-w-2xl space-y-6 text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
          {page.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </ScrollReveal>
    </section>
    <section className="page-shell pb-8">
      <ScrollReveal>
        <p className="eyebrow">Subject areas</p>
      </ScrollReveal>
      <div className="mt-7 grid border-l border-t border-[var(--line)] sm:grid-cols-2">
        {page.subjects.map((subject, index) => (
          <ScrollReveal key={subject} delayMs={index * 65}>
            <article className="border-b border-r border-[var(--line)] p-6 md:p-8">
              <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
              <h2 className="serif mt-6 text-2xl leading-snug md:text-[1.7rem]">{subject}</h2>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
    <section className="page-shell border-t border-[var(--line)] py-14 md:py-20">
      <ScrollReveal>
        <h2 className="serif max-w-3xl text-4xl leading-tight md:text-6xl">{page.closingTitle}</h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">{page.closingCopy}</p>
      </ScrollReveal>
    </section>
    <section className="page-shell border-t border-[var(--line)] py-12">
      <Link href="/contact" className="cta cta-text">{page.contactLink} <span aria-hidden>↗</span></Link>
    </section>
  </>;
}
