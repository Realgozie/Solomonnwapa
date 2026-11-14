export const PRODUCTION_SITE_ORIGIN = "https://solomonnwapa.vercel.app";

function normalizeOrigin(value: string): string {
  const parsed = new URL(value);
  return parsed.origin;
}

export function getSiteOrigin(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return normalizeOrigin(configuredUrl);

  return PRODUCTION_SITE_ORIGIN;
}
