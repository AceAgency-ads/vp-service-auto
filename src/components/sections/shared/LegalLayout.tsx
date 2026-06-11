import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <section className="wrap py-14 md:py-20">
        <div className="prose-legal red-edge mx-auto rounded-2xl border border-coal-700 bg-coal-850 p-7 md:p-12">
          <p className="!mb-8 text-sm !text-steel-400">
            Ultima actualizare: {updated}
          </p>
          {children}
        </div>
      </section>
    </>
  );
}
