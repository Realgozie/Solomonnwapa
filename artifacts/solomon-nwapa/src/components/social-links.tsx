import { site } from "@/content/site";
import { BrandIcon, type BrandIconName } from "@/components/brand-icon";

const profileDefinitions = [
  { label: "LinkedIn", icon: "linkedin", url: site.profiles.linkedin },
  { label: "X", icon: "x", url: site.profiles.x },
];

function verifiedWebUrl(value: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function SocialLinks({
  className = "",
}: {
  className?: string;
}) {
  const profiles = profileDefinitions.flatMap(({ label, icon, url }) => {
    const safeUrl = verifiedWebUrl(url);
    return safeUrl ? [{ label, icon: icon as BrandIconName, url: safeUrl }] : [];
  });

  if (profiles.length === 0) return null;

  return (
    <nav aria-label="Professional profiles" className={className}>
      <ul className="flex flex-wrap gap-3">
        {profiles.map((profile) => (
          <li key={profile.label}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${profile.label} profile in a new tab`}
              title={profile.label}
              className="group inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--blue-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <BrandIcon name={profile.icon} className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
