import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="page-shell grid gap-9 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="serif text-[25px]">{site.name}</p>
          <p className="mt-3 max-w-xl text-xs leading-6 text-[var(--muted)]">{site.identityLine}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[var(--muted)]">
          <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
          <Link href="/work" className="hover:text-[var(--accent)]">Work</Link>
          <Link href="/contact" className="hover:text-[var(--accent)]">Contact</Link>
          <a href={`mailto:${site.email}`} className="hover:text-[var(--accent)]">Email</a>
          <SocialLinks className="flex items-center text-xs" />
          <span>© {new Date().getFullYear()} Solomon Nwapa</span>
        </div>
      </div>
    </footer>
  );
}
