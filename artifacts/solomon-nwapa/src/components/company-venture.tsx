import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { ProjectContent } from "@/content/projects/types";
import { site } from "@/content/site";

export function CompanyVenture({ project }: { project: ProjectContent }) {
  const liveUrl = project.liveUrl;
  const email = project.contactEmail;
  const screenshot = project.screenshots[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: project.name,
    description: project.summary,
    ...(liveUrl ? { url: liveUrl } : {}),
    ...(email ? { email } : {}),
    founder: {
      "@type": "Person",
      name: site.name,
      jobTitle: project.roleTitle,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="page-intro page-shell pb-12 pt-14 md:pb-16 md:pt-24">
        <ScrollReveal>
          <p className="eyebrow">Company venture</p>
          <h1 className="serif mt-5 max-w-4xl text-[clamp(3rem,8vw,6.75rem)] leading-[.97]">{project.name}</h1>
          {project.headline ? (
            <p className="serif mt-6 max-w-3xl text-3xl leading-tight text-[var(--ink)] md:text-5xl">{project.headline}</p>
          ) : null}
          <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">{project.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="cta cta-primary">
                Visit AxSpec Technologies <span aria-hidden>↗</span>
              </a>
            ) : null}
            <a href="#company-overview" className="cta cta-secondary">Explore the company</a>
          </div>
        </ScrollReveal>
      </section>

      {screenshot ? (
        <section className="page-shell pb-12" aria-label="AxSpec Technologies visual identity">
          <ScrollReveal>
            <figure className="overflow-hidden border border-[var(--line)] bg-[var(--ink)]">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                priority
                sizes="(max-width: 767px) 86vw, 1200px"
                className="h-auto w-full"
              />
            </figure>
          </ScrollReveal>
        </section>
      ) : null}

      {project.sections?.map((section) => (
        <section key={section.id} id={section.id} className="page-shell grid gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
          <ScrollReveal><h2 className="serif text-4xl leading-tight md:text-5xl">{section.heading}</h2></ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-base leading-8 text-[var(--muted)]">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.id === "vision" && project.focusAreas && project.focusAreas.length > 0 ? (
                <ul className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-5">
                  {project.focusAreas.map((area) => (
                    <li key={area} className="border border-[var(--line)] bg-[var(--white)] px-4 py-5 text-sm font-semibold text-[var(--ink)]">{area}</li>
                  ))}
                </ul>
              ) : null}
              {section.id === "website" && project.technologyStack.length > 0 ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--ink)]">Confirmed website stack</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologyStack.map((technology) => (
                      <li key={technology} className="border border-[var(--line)] px-3 py-1.5 text-xs">{technology}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </ScrollReveal>
        </section>
      ))}

      <section className="page-shell grid gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
        <ScrollReveal><h2 className="serif text-4xl leading-tight md:text-5xl">Leadership and direction.</h2></ScrollReveal>
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[.14em]">{project.roleTitle}</p>
          <div className="mt-5 space-y-6 text-base leading-8 text-[var(--muted)]">
            {project.roleParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </ScrollReveal>
      </section>

      <section className="page-shell grid gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
        <ScrollReveal><h2 className="serif text-4xl leading-tight md:text-5xl">Project status.</h2></ScrollReveal>
        <ScrollReveal>
          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {project.status?.map((item) => (
              <li key={item} className="py-4 text-sm leading-7 text-[var(--ink)]">{item}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <section className="page-shell grid gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
        <ScrollReveal><h2 className="serif text-4xl leading-tight md:text-5xl">Explore AxSpec Technologies.</h2></ScrollReveal>
        <ScrollReveal>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">Discover the company, its direction and its approach to developing purposeful technology and engineering solutions.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="cta cta-primary">
                Visit AxSpec Technologies <span aria-hidden>↗</span>
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} className="cta cta-secondary">{email}</a>
            ) : null}
            <Link href="/work" className="cta cta-text">Back to work</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
