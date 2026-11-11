import { adboss } from "./adboss";
import { axspec } from "./axspec";
import { novasplit } from "./novasplit";

export const projects = [adboss, novasplit, axspec] as const;

export function featuredProjects() {
  return [
    ...projects.filter((project) => project.kind === "venture"),
    ...projects.filter((project) => project.kind !== "venture"),
  ];
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
