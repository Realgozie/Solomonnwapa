import type { Metadata } from "next";
import "./globals.css";
import { SiteLayout } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { getSiteOrigin } from "@/lib/site-url";

const baseUrl = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl ?? "http://localhost:3000"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  title: { default: site.seoTitle, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    title: site.seoTitle,
    description: site.description,
    siteName: site.name,
    url: baseUrl,
    images: [
      {
        url: site.images.socialImage ?? "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.identityLine}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
    images: [site.images.socialImage ?? "/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sameAs = Object.values(site.profiles).filter(
    (url): url is string => Boolean(url),
  );
  const personId = baseUrl ? `${baseUrl}/about#person` : undefined;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(personId ? { "@id": personId } : {}),
    name: site.name,
    jobTitle: site.title,
    description: site.biography?.join(" ") ?? site.description,
    worksFor: { "@type": "Organization", name: site.organizationName },
    ...(baseUrl ? { url: baseUrl } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.identityLine}`,
    ...(baseUrl
      ? {
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
        }
      : {}),
    publisher: personId
      ? { "@type": "Person", "@id": personId }
      : { "@type": "Person", name: site.name },
  };

  return (
    <html lang="en">
      <body>
        <JsonLd data={person} />
        <JsonLd data={website} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
