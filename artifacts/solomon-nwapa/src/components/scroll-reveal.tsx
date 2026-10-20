"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let observer: IntersectionObserver;
    let fallbackTimer: number | undefined;

    const reveal = () => {
      element.dataset.revealState = "visible";
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal();
              observer.unobserve(element);
              if (fallbackTimer !== undefined) {
                window.clearTimeout(fallbackTimer);
              }
            }
          }
        },
        { rootMargin: "0px 0px -36px 0px", threshold: 0.08 },
      );

      observer.observe(element);
      element.dataset.revealState = "waiting";
      fallbackTimer = window.setTimeout(() => {
        reveal();
        observer.disconnect();
      }, 7000);
    } catch {
      reveal();
      return;
    }

    return () => {
      observer.disconnect();
      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
