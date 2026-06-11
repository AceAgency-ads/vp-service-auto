import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE, TRUST_CHIPS } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { HeroTitle } from "@/components/ui/HeroTitle";
import StarBorder from "@/components/reactbits/StarBorder";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* fațada reală — fundalul întregului hero */}
      <Image
        src={IMAGES.heroFacade.src}
        alt={IMAGES.heroFacade.alt}
        fill
        priority
        fetchPriority="high"
        quality={60}
        sizes="(max-width: 767px) 75vw, 100vw"
        className="object-cover object-center"
      />
      {/* gradient: lizibilitate text + topire în coal-950 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(78deg, rgba(11,13,14,0.96) 0%, rgba(11,13,14,0.82) 38%, rgba(11,13,14,0.45) 68%, rgba(11,13,14,0.35) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(11,13,14,0.97))",
        }}
        aria-hidden
      />

      <div className="wrap relative flex min-h-[88dvh] flex-col justify-center py-24">
        <p className="eyebrow" data-reveal>
          Splaiul Unirii 969 · București
        </p>
        <h1 className="mt-5 max-w-4xl">
          <HeroTitle text="Centru de Constatare Daune" accent="RCA / CASCO" />
        </h1>
        <p
          className="mt-6 max-w-xl text-lg text-steel-200"
          data-reveal
          data-reveal-delay="500"
        >
          {SITE.tagline} Avizăm dauna, întocmim dosarul complet și reparăm
          totul într-un singur loc — tu primești mașină la schimb.
        </p>

        <div
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          data-reveal
          data-reveal-delay="620"
        >
          <StarBorder as="a" href={SITE.phoneHref}>
            <Icon name="phone" size={18} />
            Sună acum — {SITE.phoneDisplay}
          </StarBorder>
          <Link href="/contact" className="btn btn-ghost">
            Programează constatarea
          </Link>
        </div>

        <ul
          className="mt-12 flex flex-wrap gap-3"
          data-reveal-group
          aria-label="Avantaje"
        >
          {TRUST_CHIPS.map((chip) => (
            <li
              key={chip}
              data-reveal-child
              className="flex items-center gap-2 rounded-full border border-coal-700 bg-coal-900/80 px-4 py-2 text-[13px] font-semibold text-steel-200 backdrop-blur-sm"
            >
              <Icon name="check" size={15} className="text-red-bright" />
              {chip}
            </li>
          ))}
        </ul>
      </div>
      <hr className="led-line relative" />
    </section>
  );
}
