import { adboss } from "./adboss";
import { novasplit } from "./novasplit";

export const projects = [adboss, novasplit] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
