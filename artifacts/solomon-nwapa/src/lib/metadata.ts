import type { Metadata } from "next";
import { site } from "@/content/site";
import { getSiteOrigin } from "@/lib/site-url";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  absoluteTitle = false,
  image?: { url: string; alt: string; width: number; height: number },
): Metadata {
  const origin = getSiteOrigin();
  const canonical = origin ? new URL(path, origin).toString() : undefined;
  const socialTitle = title.includes(site.name)
    ? title
    : `${title} — ${site.name}`;
  const socialImage = image ?? {
    url: site.images.socialImage ?? "/opengraph-image",
    alt: socialTitle,
    width: 1200,
    height: 630,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      siteName: site.name,
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
