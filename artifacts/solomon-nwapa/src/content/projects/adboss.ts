import type { ProjectContent } from "./types";

export const adboss: ProjectContent = {
  slug: "adboss",
  name: "AdBOSS",
  index: "01",
  tone: "coral",
  summary:
    "AdBOSS brings campaign tools, analytics, and automation together in one dashboard to help businesses grow through digital advertising.",
  intendedAudience: "Businesses and marketing teams running digital advertising campaigns.",
  capabilities: [
    "Campaign performance dashboard",
    "Campaign analytics and reporting",
    "Campaign workflow automation",
  ],
  technologyStack: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Vercel",
  ],
  productExperience:
    "A central dashboard brings revenue, campaign activity, conversion rates, and performance trends together with campaign tools.",
  screenshots: [
    {
      src: "/images/projects/adboss/adboss-hero.png",
      alt: "AdBOSS landing page with a campaign analytics dashboard and revenue metrics.",
      width: 1255,
      height: 631,
    },
  ],
  liveUrl: "https://adbossng.vercel.app",
  sourceUrl: "https://github.com/Realgozie/adbossng",
};
