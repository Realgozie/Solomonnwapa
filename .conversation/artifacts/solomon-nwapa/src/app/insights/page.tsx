import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.insights.metaTitle,
  site.pages.insights.metaDescription,
  "/insights",
);

export default function InsightsPage() {
  const page = site.pages.insights;

  return <><PageIntro eyebrow={page.eyebrow} title={page.title} summary={page.summary} />
    <section className="page-shell pb-12">
      <div className="border-t border-[var(--line)] pt-7">
        <Link href="/contact" className="cta cta-text">{page.contactLink} <span aria-hidden>↗</span></Link>
      </div>
    </section>
  </>;
}
