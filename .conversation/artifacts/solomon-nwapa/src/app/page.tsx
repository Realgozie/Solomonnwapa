import type { Metadata } from "next";
import Link from "next/link";
import { ProfileImageSlot } from "@/components/profile-image-slot";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = createPageMetadata(
  site.pages.home.metaTitle,
  site.pages.home.metaDescription,
  "/",
  true,
);

export default function HomePage() {
  return <div className="home-page">
    <section className="home-hero page-shell grid min-h-0 items-center gap-8 pb-14 pt-12 md:min-h-[690px] md:grid-cols-[1.2fr_.8fr] md:gap-12 md:pb-24 md:pt-20">
      <div className="hero-entrance home-hero-copy">
        <p className="eyebrow hero-eyebrow">{site.pages.home.eyebrow}</p>
        <h1 className="serif mt-6 max-w-[900px] text-[clamp(2.85rem,11.5vw,6.5rem)] leading-[.92] tracking-[-.075em] md:mt-7 md:text-[clamp(3.8rem,6.4vw,6.5rem)]">
          <span className="hero-phrase-one inline-block">{site.headline.lead} </span>
          <em className="text-[var(--accent)]"><span className="hero-phrase-two inline-block">{site.headline.emphasis}</span></em>
          <span className="hero-phrase-three inline-block"> {site.headline.ending}</span>
        </h1>
        <p className="hero-support mt-7 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:mt-8 md:text-[17px] md:leading-8">{site.pages.home.introduction}</p>
        <div className="hero-actions mt-8 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4">
          <Link href="/work" className="cta cta-primary">Explore My Work <span aria-hidden>↗</span></Link>
          <Link href="/contact" className="cta cta-secondary">Let’s Talk <span aria-hidden>↗</span></Link>
        </div>
      </div>
      <ProfileImageSlot
        slot={site.images.heroPortrait}
        displayName={site.name}
        label="Homepage portrait"
        variant="hero"
        priority
        className="home-hero-portrait relative mx-auto w-full max-w-[400px] md:ml-auto md:translate-y-3"
      />
    </section>
    <section className="home-focus border-y border-[var(--line)] bg-[var(--white)] py-7 md:py-8">
      <div className="page-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><p className="eyebrow !text-[9px]">{site.pages.home.focusLabel}</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">{site.capabilities.map((x) => <span key={x}>{x}</span>)}</div></div>
    </section>
    <section className="home-projects page-shell pb-20 pt-16 md:pb-24 md:pt-20">
      <ScrollReveal className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-end"><div><p className="eyebrow">{site.pages.home.projectsLabel}</p><h2 className="serif mt-4 text-4xl leading-[1.05] md:text-7xl">{site.pages.home.projectsTitle}</h2></div><Link href="/work" className="cta cta-text">{site.pages.home.projectsLink} <span aria-hidden>↗</span></Link></ScrollReveal>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => <ScrollReveal key={project.slug} delayMs={i * 90}><Link href={`/work/${project.slug}`} className={`project-card-link home-project-card group relative flex min-h-[280px] flex-col justify-between overflow-hidden border border-[var(--line)] p-6 sm:min-h-[315px] sm:p-7 md:min-h-[390px] md:p-9 ${project.tone === "coral" ? "bg-[var(--accent-soft)]" : "bg-[var(--blue-soft)]"}`}>
          <div className="flex items-start justify-between"><span className="eyebrow !text-[var(--ink)]/65">Product / {project.index}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--ink)]/30 transition-transform group-hover:rotate-45">↗</span></div>
          <div><p className="mb-2 text-xs leading-5 text-[var(--muted)]">{project.summary}</p><h3 className="home-project-title serif text-[clamp(2.75rem,8vw,6rem)] leading-[.95]">{project.name}</h3><div className="mt-5 border-t border-[var(--ink)]/20 pt-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--muted)]">Open case study <span aria-hidden>↗</span></div></div>
        </Link></ScrollReveal>)}
      </div>
    </section>
    <section className="home-closing page-shell pb-20 md:pb-28"><ScrollReveal className="flex flex-col items-start justify-between gap-8 border-t border-[var(--line)] pt-8 md:flex-row md:items-end"><div><p className="eyebrow">{site.pages.home.contactEyebrow}</p><h2 className="serif mt-4 max-w-2xl text-5xl leading-tight md:text-7xl">{site.pages.home.contactTitle}</h2></div><Link href="/contact" className="cta cta-primary">{site.pages.home.contactLink} <span aria-hidden>↗</span></Link></ScrollReveal></section>
  </div>;
}
