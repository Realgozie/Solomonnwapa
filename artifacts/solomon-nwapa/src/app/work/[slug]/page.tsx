import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteOrigin } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return createPageMetadata(
      "Project not found",
      "This project profile is not available.",
      "/work",
    );
  }

  return createPageMetadata(
    `${project.name} case study`,
    project.summary,
    `/work/${project.slug}`,
  );
}

function safeExternalUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const details = [
    { label: "Audience", value: project.intendedAudience },
    { label: "Product experience", value: project.productExperience },
  ].filter((detail) => detail.value);

  const origin = getSiteOrigin();
  const projectUrl = origin
    ? new URL(`/work/${project.slug}`, origin).toString()
    : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    creator: { "@type": "Person", name: site.name },
    ...(project.summary ? { description: project.summary } : {}),
    ...(projectUrl ? { url: projectUrl } : {}),
  };
  const liveUrl = safeExternalUrl(project.liveUrl);
  const sourceUrl = safeExternalUrl(project.sourceUrl);
  const nextProject =
    projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <JsonLd data={schema} />
      <PageIntro
        eyebrow={`Project / ${project.index}`}
        title={project.name}
        summary={project.summary}
      />

      <section className="page-shell pb-10">
        <ScrollReveal>
        {project.screenshots.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {project.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="overflow-hidden border border-[var(--line)] bg-[var(--blue-soft)]">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 767px) 86vw, 600px"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        ) : null}
        </ScrollReveal>
      </section>

      <section className="page-shell grid gap-12 border-t border-[var(--line)] py-10 md:grid-cols-[.65fr_1.35fr]">
        <ScrollReveal><p className="eyebrow">Project details</p></ScrollReveal>
        <ScrollReveal>
        {details.length > 0 ||
        project.capabilities.length > 0 ||
        project.technologyStack.length > 0 ? (
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {details.map((detail) => (
              <article key={detail.label} className="grid gap-2 py-6 md:grid-cols-[190px_1fr]">
                <h2 className="text-xs font-semibold">{detail.label}</h2>
                <p className="text-sm leading-7 text-[var(--muted)]">{detail.value}</p>
              </article>
            ))}
            {project.capabilities.length > 0 && (
              <article className="grid gap-3 py-6 md:grid-cols-[190px_1fr]">
                <h2 className="text-xs font-semibold">Product capabilities</h2>
                <ul className="space-y-2 text-sm leading-7 text-[var(--muted)]">
                  {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </article>
            )}
            {project.technologyStack.length > 0 && (
              <article className="grid gap-3 py-6 md:grid-cols-[190px_1fr]">
                <h2 className="text-xs font-semibold">Technology stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.technologyStack.map((technology) => (
                    <li key={technology} className="border border-[var(--line)] px-3 py-1.5 text-xs">{technology}</li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        ) : null}
        </ScrollReveal>
      </section>

      <section className="page-shell border-t border-[var(--line)] py-8">
        <ScrollReveal className="flex flex-wrap items-center justify-between gap-6">
        <Link href="/work" className="cta cta-text">← Back to work</Link>
        <div className="flex flex-wrap gap-6">
          <Link href="/contact" className="cta cta-primary">Discuss a similar project <span aria-hidden>↗</span></Link>
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline decoration-[var(--accent)] underline-offset-4">Visit {project.name} ↗</a>}
          {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline decoration-[var(--accent)] underline-offset-4">View source ↗</a>}
          {nextProject && nextProject.slug !== project.slug && <Link href={`/work/${nextProject.slug}`} className="text-xs font-semibold underline decoration-[var(--accent)] underline-offset-4">Next project: {nextProject.name} →</Link>}
        </div>
        </ScrollReveal>
      </section>
    </>
  );
}
