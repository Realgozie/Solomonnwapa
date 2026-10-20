import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollReveal } from "@/components/scroll-reveal";

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--ink)] focus:px-4 focus:py-3 focus:text-white">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></>;
}

export function PageIntro({ eyebrow, title, summary }: { eyebrow: string; title: ReactNode; summary: string }) {
  return <section className="page-intro page-shell pb-12 pt-14 md:pb-16 md:pt-24"><ScrollReveal><p className="eyebrow">{eyebrow}</p><h1 className="serif mt-5 max-w-4xl text-[clamp(3rem,8vw,6.75rem)] leading-[.97]">{title}</h1><p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">{summary}</p></ScrollReveal></section>;
}
