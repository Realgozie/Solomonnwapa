"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navigation, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  function isCurrentPage(href: string) {
    return (
      pathname === href ||
      (href === "/work" && pathname?.startsWith("/work/") === true)
    );
  }

  return (
    <header className="relative z-20 border-b border-[var(--line)]">
      <div className="page-shell flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3" aria-label="Solomon Nwapa home">
          <span className="grid h-9 w-9 place-items-center border border-[var(--ink)] text-[11px] font-semibold tracking-[-.08em] transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]">SN</span>
          <span className="text-[13px] font-semibold tracking-[-.03em]">{site.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage(item.href) ? "page" : undefined}
              className={`text-[12px] transition-colors hover:text-[var(--accent)] ${isCurrentPage(item.href) ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="cta cta-secondary">Start a conversation <span aria-hidden>↗</span></Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="icon-button grid h-10 w-10 place-items-center border border-[var(--line)] text-xl lg:hidden"
        >
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>{open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              toggleRef.current?.focus();
            }
          }}
          className="absolute left-0 right-0 top-full border-b border-[var(--line)] bg-[var(--paper)] px-6 py-5 shadow-[0_18px_24px_-24px_rgba(25,47,57,.45)] lg:hidden"
        >
          {[...navigation, { label: "Contact", href: "/contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="flex justify-between border-b border-[var(--line)] py-4 text-sm"
            >
              {item.label}<span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
