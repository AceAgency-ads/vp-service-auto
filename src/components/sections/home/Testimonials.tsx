import SpotlightCard from "@/components/reactbits/SpotlightCard";
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

type Testimonial = (typeof TESTIMONIALS)[number];

/* Card recenzie: spotlight roșu (mouse-follow) + tilt 3D discret pe hover,
   monogramă cu inel LED, ghilimea-motiv mare în fundal. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <SpotlightCard className="tilt-card relative flex h-full flex-col p-7">
      <span
        className="quote-mark pointer-events-none absolute -top-2 right-4 text-8xl"
        aria-hidden
      >
        „
      </span>

      <div className="flex gap-1 text-red-bright" role="img" aria-label="5 din 5 stele">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={15} />
        ))}
      </div>

      <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-steel-200">
        „{t.text}"
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-coal-700 pt-4">
        <span className="font-heading grid h-11 w-11 shrink-0 place-items-center rounded-full border border-red bg-coal-900 text-base font-extrabold text-paper shadow-[0_0_12px_rgba(227,6,19,0.45),inset_0_0_8px_rgba(227,6,19,0.18)]">
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
    </SpotlightCard>
  );
}

export function Testimonials() {
  // track dublat pentru bucla infinită (translateX -50%), ca la parteneri
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          Clienții despre noi
        </p>
        <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
          „Ne pasă de mașina ta" nu e doar un slogan
        </h2>
      </div>

      {/* Mobil: stivă verticală. Vizualul e decorativ (aria-hidden) —
          conținutul accesibil e în blocul sr-only de mai jos. */}
      <div
        className="wrap mt-12 grid gap-6 md:hidden"
        data-reveal-group
        aria-hidden
      >
        {TESTIMONIALS.map((t) => (
          <div key={t.name} data-reveal-child>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* Desktop: marquee orizontal auto-scroll, pauză pe hover, CSS pur */}
      <div className="marquee mt-12 hidden md:block" data-reveal aria-hidden>
        <div className="marquee-track items-stretch gap-6 pr-6">
          {loop.map((t, i) => (
            <div key={`${t.name}-${i}`} className="w-[360px] shrink-0">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* varianta accesibilă, statică, pentru screen readers */}
      <div className="sr-only">
        <h3>Recenzii clienți</h3>
        <ul>
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              {t.name}, {t.car}: „{t.text}" — 5 din 5 stele.
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
