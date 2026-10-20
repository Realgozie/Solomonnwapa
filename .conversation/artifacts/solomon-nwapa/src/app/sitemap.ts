import type { MetadataRoute } from "next";
import { getRequestSiteOrigin } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const paths = [
  "/",
  "/about",
  "/work",
  "/work/adboss",
  "/work/novasplit",
  "/capabilities",
  "/industries",
  "/insights",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getRequestSiteOrigin();

  return paths.map((path) => ({
    url: new URL(path, origin).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
