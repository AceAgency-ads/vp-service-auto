import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { IMAGES } from "@/lib/images";
import { Icon } from "@/components/ui/Icon";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export function ServicesOverview() {
  return (
    <section className="wrap py-20 md:py-28">
      <p className="eyebrow" data-reveal>
        Ce facem
      </p>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl" data-reveal data-reveal-delay="80">
          De la constatare la predarea cheilor — totul sub un singur acoperiș
        </h2>
        <Link
          href="/servicii"
          className="group flex shrink-0 items-center gap-2 text-sm font-bold text-red-bright"
          data-reveal
          data-reveal-delay="160"
        >
          Toate serviciile
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* featured: constatare daune — ușa cu LED a clădirii */}
      <Link
        href="/constatare-daune"
        className="led-frame group mt-12 grid overflow-hidden transition-shadow hover:shadow-[0_0_44px_rgba(227,6,19,0.3)] md:grid-cols-2"
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 30%, rgba(31,34,37,0.55) 100%)",
            }}
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
          <p className="eyebrow">Serviciul principal</p>
          <h3 className="!text-[clamp(24px,3vw,34px)]">
            Constatare daune RCA / CASCO
          </h3>
          <p className="text-steel-300">
            Centru de constatare autorizat: avizăm dauna, fotografiem,
            întocmim dosarul complet și ținem legătura cu asiguratorul.
            Tu nu faci niciun drum în plus.
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-red-bright">
            Vezi cum funcționează
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>

      <div
        className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        data-reveal-group
      >
        {SERVICES.map((service) => (
          <div key={service.slug} data-reveal-child>
            <Link href={`/servicii/${service.slug}`} className="group block h-full">
              <SpotlightCard className="flex h-full flex-col gap-4 p-7">
                <span className="red-edge flex h-12 w-12 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name={service.icon} size={22} />
                </span>
                <h3 className="!text-xl">{service.title}</h3>
                <p className="text-sm text-steel-300">{service.short}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-red-bright">
                  Detalii
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </SpotlightCard>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
