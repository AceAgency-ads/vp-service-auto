import type { ReactNode } from "react";

/* Hero compact pentru paginile secundare. */

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-coal-800 bg-coal-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 380px at 18% -10%, rgba(227,6,19,0.14), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="wrap relative py-16 md:py-20">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h1
          className="mt-4 max-w-3xl !text-[clamp(32px,5vw,52px)]"
          data-reveal
          data-reveal-delay="80"
        >
          {title}
        </h1>
        {sub && (
          <p
            className="mt-4 max-w-2xl text-lg text-steel-300"
            data-reveal
            data-reveal-delay="160"
          >
            {sub}
          </p>
        )}
        {children}
      </div>
      <hr className="led-line" />
    </section>
  );
}
