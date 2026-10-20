import type { Metadata } from "next";
import { PageIntro } from "@/components/layout";
import { SocialLinks } from "@/components/social-links";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BrandIcon } from "@/components/brand-icon";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  site.pages.contact.metaTitle,
  site.pages.contact.metaDescription,
  "/contact",
);

export default function ContactPage() {
  const page = site.pages.contact;

  return <><PageIntro eyebrow={page.eyebrow} title={page.title} summary={page.summary} />
    <section className="page-shell grid gap-10 border-t border-[var(--line)] py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
      <ScrollReveal><p className="eyebrow">{page.promptLabel}</p></ScrollReveal>
      <ScrollReveal><div className="max-w-2xl">
        <h2 className="serif text-3xl leading-tight md:text-5xl">{page.promptTitle}</h2>
        <p className="mt-6 text-sm leading-7 text-[var(--muted)]">{page.promptCopy}</p>
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr]">
            <span className="text-xs font-semibold">Email</span>
            <a className="break-words text-sm underline decoration-[var(--accent)] underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr]">
            <span className="text-xs font-semibold">Phone</span>
            <a className="text-sm underline decoration-[var(--accent)] underline-offset-4" href="tel:+2347030292398">{site.phone}</a>
          </div>
          <a
            className="group grid min-h-11 grid-cols-[24px_1fr] items-center gap-3 py-5 sm:grid-cols-[150px_1fr]"
            href="https://wa.me/2347030292398"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message ${site.whatsapp} on WhatsApp`}
          >
            <span className="flex items-center" aria-hidden="true">
              <BrandIcon name="whatsapp" className="h-6 w-6" />
            </span>
            <span className="flex min-h-11 items-center gap-2 text-sm underline decoration-[var(--accent)] underline-offset-4">
              {site.whatsapp}
              <span aria-hidden="true" className="not-italic">↗</span>
            </span>
          </a>
          <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr]">
            <span className="text-xs font-semibold">Professional profiles</span>
            <SocialLinks className="text-sm" />
          </div>
        </div>
      </div></ScrollReveal>
    </section>
  </>;
}
