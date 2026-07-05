import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function LocationTeaser() {
  return (
    <section className="wrap grid items-center gap-10 py-20 md:grid-cols-2 md:py-24">
      <div className="red-edge overflow-hidden rounded-2xl border border-coal-700" data-reveal>
        <Image
          src={IMAGES.facadeBillboard.src}
          alt={IMAGES.facadeBillboard.alt}
          width={IMAGES.facadeBillboard.width}
          height={IMAGES.facadeBillboard.height}
          sizes="(min-width: 768px) 36rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
      <div data-reveal data-reveal-delay="120">
        <p className="eyebrow">Ne găsești ușor</p>
        <h2 className="mt-4 max-w-md">Atelierul nostru, chiar la stradă</h2>
        <p className="mt-4 max-w-md text-steel-300">
          Pe {SITE.address.street}, cu panoul VP Service Auto vizibil de
          departe — recepție dedicată, mașină la schimb și acte pregătite
          înainte să cobori din mașină.
        </p>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-6 inline-flex items-center gap-2"
        >
          <Icon name="map-pin" size={18} />
          Vezi traseul pe hartă
        </a>
      </div>
    </section>
  );
}
