import { Icon } from "@/components/ui/Icon";

const TESTIMONIALS = [
  {
    name: "Andrei M.",
    car: "VW Passat · dosar RCA",
    text: "Am venit direct după accident, fără programare. Au avizat dauna, au vorbit ei cu asiguratorul și am plecat cu mașină la schimb în aceeași zi.",
  },
  {
    name: "Ioana D.",
    car: "Škoda Octavia · CASCO",
    text: "Mi-au explicat exact ce acte îmi trebuie și au ținut legătura cu mine pe tot parcursul reparației. Vopseaua a ieșit perfect, nu se vede nicio diferență.",
  },
  {
    name: "Cristian P.",
    car: "Dacia Duster · tinichigerie",
    text: "Prețuri corecte și termene respectate. Mi-au trimis poze din service la fiecare etapă. Recomand cu încredere, sunt oameni serioși.",
  },
];

export function Testimonials() {
  return (
    <section className="wrap py-20 md:py-28">
      <p className="eyebrow" data-reveal>
        Clienții despre noi
      </p>
      <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
        „Ne pasă de mașina ta" nu e doar un slogan
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            data-reveal-child
            className="red-edge flex h-full flex-col rounded-2xl border border-coal-700 bg-coal-850 p-7"
          >
            <div className="flex gap-1 text-red-bright" role="img" aria-label="5 din 5 stele">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-steel-200">
              „{t.text}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-coal-700 pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coal-700 text-sm font-bold text-paper">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-bold text-paper">{t.name}</span>
                <span className="flex items-center gap-1.5 text-xs text-steel-400">
                  <Icon name="car" size={13} />
                  {t.car}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
