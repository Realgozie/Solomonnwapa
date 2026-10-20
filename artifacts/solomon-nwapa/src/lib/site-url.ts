import { headers } from "next/headers";

function normalizeOrigin(value: string): string {
  const parsed = new URL(value);
  return parsed.origin;
}

export function getSiteOrigin(): string | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return normalizeOrigin(configuredUrl);

  const vercelHost = process.env.VERCEL_URL?.trim();
  return vercelHost ? normalizeOrigin(`https://${vercelHost}`) : undefined;
}

export async function getRequestSiteOrigin(): Promise<string> {
  const configuredOrigin = getSiteOrigin();
  if (configuredOrigin) return configuredOrigin;

  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    ""
  )
    .split(",")[0]
    .trim();
  if (!host) return "http://localhost:3000";

  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol?.split(",")[0].trim() ||
    (process.env.NODE_ENV === "development" ? "http" : "https");
  return normalizeOrigin(`${protocol}://${host}`);
}
