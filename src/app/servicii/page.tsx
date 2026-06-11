import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { Icon } from "@/components/ui/Icon";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Servicii Auto Complete București",
  description:
    "Toate serviciile VP Service Auto: constatare daune RCA/CASCO, tinichigerie, vopsitorie, mecanică, încărcare freon, piese auto și mașină la schimb.",
  alternates: { canonical: "/servicii" },
};

export default function ServiciiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Servicii", path: "/servicii" },
        ])}
      />

      <PageHero
        eyebrow="Serviciile noastre"
        title={
          <>
            Un singur service.{" "}
            <span className="text-red-bright">Toate soluțiile.</span>
          </>
        }
        sub="De la dosarul de daună la ultima verificare înainte de predare — fiecare etapă se întâmplă aici, sub ochii noștri."
      />

      <section className="wrap py-16 md:py-24">
        {/* featured: constatare daune */}
        <Link
          href="/constatare-daune"
          className="led-frame group grid overflow-hidden transition-shadow hover:shadow-[0_0_44px_rgba(227,6,19,0.3)] md:grid-cols-2"
          data-reveal
        >
          <div className="relative min-h-56 overflow-hidden md:min-h-full">
            <Image
              src={IMAGES.damagedCar.src}
              alt={IMAGES.damagedCar.alt}
              fill
              sizes="(min-width: 768px) 38rem, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <p className="eyebrow">Serviciul principal</p>
            <h2 className="!text-[clamp(24px,3vw,34px)]">
              Constatare daune RCA / CASCO
            </h2>
            <p className="text-steel-300">
              Avizare, constatare, dosar complet și reparație — fără drumuri la
              asigurator, cu mașină la schimb inclusă.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-red-bright">
              Pagina dedicată
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {SERVICES.map((service) => (
            <div key={service.slug} data-reveal-child>
              <Link href={`/servicii/${service.slug}`} className="group block h-full">
                <SpotlightCard className="flex h-full flex-col overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={IMAGES[service.imageKey].src}
                      alt={IMAGES[service.imageKey].alt}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(22,24,27,0.92) 100%)",
                      }}
                      aria-hidden
                    />
                    <span className="absolute bottom-3 left-5 flex h-10 w-10 items-center justify-center rounded-lg border border-coal-700 bg-coal-900/90 text-red-bright">
                      <Icon name={service.icon} size={19} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h2 className="!text-xl">{service.title}</h2>
                    <p className="text-sm text-steel-300">{service.short}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-bold text-red-bright">
                      Detalii
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
