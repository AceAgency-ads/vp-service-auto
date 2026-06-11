import { DAUNE_FAQ } from "@/lib/faq";
import { Icon } from "@/components/ui/Icon";

/* Accordion 100% nativ (<details>/<summary>) — zero JS.
   FAQPage JSON-LD se generează din ACELAȘI array, în page.tsx. */

export function DauneFaq() {
  return (
    <section className="wrap py-20 md:py-28">
      <p className="eyebrow" data-reveal>
        Întrebări frecvente
      </p>
      <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
        Răspunsuri pe scurt, fără limbaj de asigurător
      </h2>

      <div className="mt-12 flex max-w-3xl flex-col gap-3" data-reveal-group>
        {DAUNE_FAQ.map((item) => (
          <details
            key={item.q}
            data-reveal-child
            className="group rounded-xl border border-coal-700 bg-coal-850 open:border-[rgba(227,6,19,0.45)] open:shadow-[0_0_18px_rgba(227,6,19,0.15)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-heading text-[15px] font-bold text-paper [&::-webkit-details-marker]:hidden">
              {item.q}
              <Icon
                name="chevron-right"
                size={18}
                className="shrink-0 text-red-bright transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-steel-300">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
