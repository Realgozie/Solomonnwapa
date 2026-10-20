export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
};
