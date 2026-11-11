export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
};

export type ProjectContent = {
  slug: string;
  name: string;
  index: string;
  tone: "coral" | "sage";
  summary: string;
  intendedAudience: string | null;
  capabilities: readonly string[];
  technologyStack: readonly string[];
  productExperience: string | null;
  screenshots: readonly ProjectScreenshot[];
  liveUrl: string | null;
  sourceUrl?: string | null;
  kind?: "product" | "venture";
  category?: string;
  headline?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections?: readonly ProjectSection[];
  focusAreas?: readonly string[];
  roleTitle?: string;
  roleParagraphs?: readonly string[];
  status?: readonly string[];
  contactEmail?: string;
};
