import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/layout";
import { ProfileImageSlot } from "@/components/profile-image-slot";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteOrigin } from "@/lib/site-url";

export const metadata: Metadata = createPageMetadata(
  site.pages.about.metaTitle,
  site.pages.about.metaDescription,
  "/about",
);

export default function AboutPage() {
  const origin = getSiteOrigin();
  const biography = site.biography ?? [];
  const visionHeading = site.pages.about.visionHeading;
  const profileParagraphs = biography.slice(0, 4);
  const visionParagraphs = biography.slice(4);
  const sameAs = Object.values(site.profiles).filter(
    (url): url is string => Boolean(url),
  );
  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `About ${site.name}`,
    ...(origin ? { url: new URL("/about", origin).toString() } : {}),
    mainEntity: {
      "@type": "Person",
      ...(origin ? { "@id": `${origin}/about#person` } : {}),
      name: site.name,
      jobTitle: site.title,
      description: biography.join(" ") || site.description,
      worksFor: { "@type": "Organization", name: site.organizationName },
      ...(origin ? { url: origin } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
  };

  return <>
    <JsonLd data={profilePage} />
    <PageIntro eyebrow={site.pages.about.eyebrow} title={site.pages.about.title} summary={site.pages.about.summary} />
    <section className="page-shell grid gap-12 border-t border-[var(--line)] py-14 md:grid-cols-[.65fr_1.35fr] md:py-20">
      <ScrollReveal><p className="eyebrow">{site.pages.about.profileLabel}</p></ScrollReveal>
      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
        <ScrollReveal><div className="max-w-3xl">
          <div className="space-y-6 text-base leading-8 text-[var(--muted)]">
            {profileParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div></ScrollReveal>
        <ProfileImageSlot
          slot={site.images.aboutPortrait}
          displayName={site.name}
          label="About portrait"
          variant="about"
          className="w-full md:ml-auto"
        />
      </div>
    </section>
    <section className="bg-[var(--blue-soft)] py-14 md:py-20">
      <div className="page-shell grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <ProfileImageSlot
          slot={site.images.professionalPortrait}
          displayName={site.name}
          label="Professional photograph"
          variant="professional"
          className="w-full"
        />
        <ScrollReveal><div>
          <p className="eyebrow !text-[var(--ink)]">{site.pages.about.visionLabel}</p>
          <h2 className="serif mt-5 text-4xl leading-tight md:text-6xl">{visionHeading}</h2>
          <div className="mt-6 max-w-2xl space-y-6 text-base leading-8 text-[var(--muted)]">
            {visionParagraphs.map((paragraph, index) => (
              <p key={paragraph}>
                {index === 0
                  ? paragraph.slice(visionHeading.length).trimStart()
                  : paragraph}
              </p>
            ))}
          </div>
          <Link href="/contact" className="cta cta-text mt-5">{site.pages.about.contactLink} <span aria-hidden>↗</span></Link>
        </div></ScrollReveal>
      </div>
    </section>
  </>;
}
