import Image from "next/image";
import type { ProfileImageSlotConfig } from "@/content/site";

type Variant = "hero" | "about" | "professional";

const variantStyles: Record<
  Variant,
  { figure: string; placeholder: string; monogram: string; frame: string }
> = {
  hero: {
    figure: "aspect-[.86] bg-[var(--blue-soft)] p-5",
    placeholder:
      "left-1/2 top-1/2 grid h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 place-items-center bg-[var(--paper)]/45",
    monogram: "text-[clamp(6rem,15vw,10rem)]",
    frame: "inset-5 border-[#b9c9c4]",
  },
  about: {
    figure: "aspect-[.82] bg-[var(--paper-deep)] p-5",
    placeholder:
      "left-1/2 top-1/2 grid h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 place-items-center bg-[var(--white)]/45",
    monogram: "text-[clamp(5rem,12vw,8rem)]",
    frame: "inset-5 border-[var(--ink)]/15",
  },
  professional: {
    figure: "aspect-[1200/1773] bg-[var(--accent-soft)] p-5",
    placeholder:
      "left-[12%] top-1/2 grid h-[66%] w-[42%] -translate-y-1/2 place-items-center bg-[var(--white)]/40",
    monogram: "text-[clamp(4rem,9vw,7rem)]",
    frame: "inset-5 border-[var(--ink)]/15",
  },
};

export function ProfileImageSlot({
  slot,
  displayName,
  label,
  variant,
  priority = false,
  className = "",
}: {
  slot: ProfileImageSlotConfig;
  displayName: string;
  label: string;
  variant: Variant;
  priority?: boolean;
  className?: string;
}) {
  const styles = variantStyles[variant];
  const sizes =
    variant === "hero"
      ? "(max-width: 767px) 86vw, 400px"
      : variant === "about"
        ? "(max-width: 767px) 86vw, 300px"
        : "(max-width: 767px) 86vw, 680px";

  return (
    <figure
      className={`relative isolate w-full overflow-hidden border border-[var(--line)] ${styles.figure} ${className}`}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt?.trim() || `${label} of ${displayName}`}
          fill
          priority={priority}
          sizes={sizes}
          className={
            variant === "professional"
              ? "object-contain object-center"
              : "object-cover"
          }
        />
      ) : (
        <>
          <div
            role="img"
            aria-label={`${label} photo placeholder for ${displayName}`}
            className={`absolute border border-[var(--ink)]/15 ${styles.placeholder}`}
          >
            <span
              aria-hidden="true"
              className={`serif leading-none tracking-[-.08em] text-[var(--ink)]/75 ${styles.monogram}`}
            >
              SN
            </span>
          </div>
          <div
            aria-hidden="true"
            className={`absolute border ${styles.frame}`}
          />
          {variant === "professional" && (
            <div
              aria-hidden="true"
              className="absolute inset-y-5 left-[64%] border-l border-[var(--ink)]/15"
            />
          )}
          <figcaption className="absolute bottom-9 left-9 right-9 flex items-center justify-between gap-3 border-t border-[var(--ink)]/20 pt-4 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">
            <span>{label}</span>
            <span className="eyebrow shrink-0 !text-[9px]">Photo placeholder</span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
