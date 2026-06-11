import { SITE } from "@/lib/site";

/* Logo-urile asiguratorilor ca trust signal — marquee CSS pur
   (wordmark-uri text până la primirea logo-urilor oficiale).
   Track-ul e duplicat pentru bucla infinită (translateX -50%). */

export function PartnersMarquee({
  title = "Lucrăm cu toți asiguratorii din România",
}: {
  title?: string;
}) {
  const items = [...SITE.partners, ...SITE.partners];
  return (
    <section className="border-y border-coal-800 bg-coal-900 py-10">
      <p className="eyebrow wrap mb-6">{title}</p>
      <div className="marquee" aria-hidden>
        <div className="marquee-track items-center gap-14 pr-14">
          {items.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-heading text-2xl font-extrabold tracking-wide whitespace-nowrap text-steel-400 transition-colors hover:text-paper"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      {/* varianta accesibilă, statică, pentru screen readers */}
      <p className="sr-only">Asiguratori parteneri: {SITE.partners.join(", ")}</p>
    </section>
  );
}
