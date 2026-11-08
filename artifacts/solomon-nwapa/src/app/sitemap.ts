import type { MetadataRoute } from "next";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

export const dynamic = "force-static";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, PRODUCTION_SITE_ORIGIN).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
