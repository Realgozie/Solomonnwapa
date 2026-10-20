import Link from "next/link";
import { PageIntro } from "@/components/layout";

export default function NotFoundPage() {
  return (
    <>
      <PageIntro
        eyebrow="Not found"
        title="This page isn’t here."
        summary="The address may have changed, or the page may not exist."
      />
      <section className="page-shell pb-20">
        <Link
          href="/"
          className="inline-flex border border-[var(--ink)] px-5 py-4 text-xs font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          Return to the homepage
        </Link>
      </section>
    </>
  );
}
