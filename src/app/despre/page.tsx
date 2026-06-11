import type { Metadata } from "next";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { StatsBand } from "@/components/sections/home/StatsBand";
import { PartnersMarquee } from "@/components/sections/shared/PartnersMarquee";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { Icon } from "@/components/ui/Icon";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Despre Noi — Service Auto cu Suflet în București",
  description:
    "VP Service Auto: echipă cu experiență, atelier modern pe Splaiul Unirii 969 și un singur principiu — ne pasă de mașina ta ca de a noastră.",
  alternates: { canonical: "/despre" },
};

export default function DesprePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Despre noi", path: "/despre" },
        ])}
      />

      {/* hero cu fațada */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={IMAGES.heroFacade.src}
          alt={IMAGES.heroFacade.alt}
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(78deg, rgba(11,13,14,0.95) 0%, rgba(11,13,14,0.75) 45%, rgba(11,13,14,0.4) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(11,13,14,0.97))",
          }}
          aria-hidden
        />
        <div className="wrap relative flex min-h-[60dvh] flex-col justify-center py-20">
          <p className="eyebrow" data-reveal>
            Despre VP Service Auto
          </p>
          <h1 className="mt-5 max-w-3xl !text-[clamp(34px,5.5vw,58px)]" data-reveal data-reveal-delay="80">
            {SITE.tagline.replace("!", "")}
            <span className="text-red-bright">!</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-steel-200" data-reveal data-reveal-delay="160">
            Nu e doar sloganul de pe fațadă — e felul în care lucrăm, în
            fiecare zi, la fiecare mașină care intră pe poartă.
          </p>
        </div>
        <hr className="led-line relative" />
      </section>

      {/* povestea */}
      <section className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="red-edge order-2 overflow-hidden rounded-2xl border border-coal-700 md:order-1" data-reveal>
          <Image
            src={IMAGES.workshopDark.src}
            alt={IMAGES.workshopDark.alt}
            width={IMAGES.workshopDark.width}
            height={IMAGES.workshopDark.height}
            sizes="(min-width: 768px) 36rem, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <p className="eyebrow" data-reveal>
            Povestea noastră
          </p>
          <h2 className="mt-4" data-reveal data-reveal-delay="80">
            Un atelier construit în jurul unei singure întrebări
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-steel-300" data-reveal data-reveal-delay="160">
            <p>
              „Cum am vrea să fim tratați noi, dacă mașina noastră ar fi
              lovită?" — de la întrebarea asta a pornit VP Service Auto. Fără
              termene vagi, fără devize umflate, fără telefoane la care nu
              răspunde nimeni.
            </p>
            <p>
              Astăzi suntem centru de constatare daune și service complet pe
              Splaiul Unirii 969: tinichigerie, vopsitorie în cabină
              profesională, mecanică și piese — totul sub același acoperiș,
              cu aceiași oameni responsabili de la început până la final.
            </p>
            <p>
              Lucrăm cu toți marii asiguratori din România și gestionăm
              dosarul tău de daună cap-coadă, ca tu să-ți vezi de viață.
            </p>
          </div>
        </div>
      </section>

      {/* valorile — cele 4 de pe fațadă */}
      <section className="border-y border-coal-800 bg-coal-900 py-20 md:py-28">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            Valorile de pe fațadă
          </p>
          <h2 className="mt-4 max-w-2xl" data-reveal data-reveal-delay="80">
            Le-am scris pe clădire ca să nu le putem ocoli
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {SITE.values.map((value) => (
              <div key={value.title} data-reveal-child>
                <SpotlightCard className="h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                    <Icon name={value.icon} size={22} />
                  </span>
                  <h3 className="mt-4 !text-lg">{value.title}</h3>
                  <p className="mt-2 text-sm text-steel-300">{value.text}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
      <PartnersMarquee title="Asiguratorii cu care lucrăm zi de zi" />
      <CtaBand
        title="Hai să ne cunoaștem."
        sub="Treci pe la noi pe Splaiul Unirii 969 sau sună — o discuție de 5 minute îți poate scuti săptămâni de drumuri."
      />
    </>
  );
}
