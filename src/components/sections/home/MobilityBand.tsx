import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { Icon } from "@/components/ui/Icon";

export function MobilityBand() {
  return (
    <section className="border-y border-coal-800 bg-coal-900">
      <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
        <div className="relative" data-reveal>
          <div className="red-edge overflow-hidden rounded-2xl border border-coal-700">
            <Image
              src={IMAGES.towTruck.src}
              alt={IMAGES.towTruck.alt}
              width={IMAGES.towTruck.width}
              height={IMAGES.towTruck.height}
              sizes="(min-width: 768px) 36rem, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="led-frame absolute -right-3 -bottom-5 hidden items-center gap-3 px-5 py-3.5 sm:flex">
            <Icon name="truck" size={20} className="text-red-bright" />
            <span className="text-sm font-bold text-paper">
              Venim noi după mașină
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow" data-reveal>
            Mobilitate pe durata reparației
          </p>
          <h2 className="mt-4" data-reveal data-reveal-delay="80">
            Mașina ta e în service. Tu mergi mai departe.
          </h2>
          <ul className="mt-7 flex flex-col gap-5" data-reveal-group>
            <li className="flex gap-4" data-reveal-child>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                <Icon name="car-swap" size={20} />
              </span>
              <div>
                <h3 className="!text-base">Mașină la schimb</h3>
                <p className="mt-1 text-sm text-steel-300">
                  Primești o mașină la schimb pe toată durata reparației — în
                  dosarele RCA poate fi decontată de asigurator.
                </p>
              </div>
            </li>
            <li className="flex gap-4" data-reveal-child>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                <Icon name="truck" size={20} />
              </span>
              <div>
                <h3 className="!text-base">Transport pe platformă</h3>
                <p className="mt-1 text-sm text-steel-300">
                  Mașina nu mai rulează? Trimitem platforma și o aducem în
                  service în siguranță, fără bătăi de cap.
                </p>
              </div>
            </li>
          </ul>
          <Link
            href="/servicii/masina-la-schimb"
            className="btn btn-ghost mt-8"
            data-reveal
          >
            Cum primești mașina la schimb
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
