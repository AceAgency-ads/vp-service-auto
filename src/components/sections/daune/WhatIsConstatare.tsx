import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Icon } from "@/components/ui/Icon";

export function WhatIsConstatare() {
  return (
    <section className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="eyebrow" data-reveal>
          Ce înseamnă constatarea
        </p>
        <h2 className="mt-4" data-reveal data-reveal-delay="80">
          Documentăm dauna corect, ca despăgubirea să iasă corect
        </h2>
        <p className="mt-5 text-steel-300" data-reveal data-reveal-delay="160">
          Constatarea este evaluarea oficială a avariilor după accident:
          inspecția mașinii, fotografierea după standardele asiguratorilor și
          consemnarea fiecărei avarii în dosarul de daună. De calitatea ei
          depinde direct cât și cât de repede primești despăgubirea.
        </p>
        <ul className="mt-7 flex flex-col gap-3.5" data-reveal-group>
          {[
            "Inspecție completă — inclusiv avariile ascunse, nu doar ce se vede",
            "Fotografiere conform cerințelor fiecărui asigurator",
            "Deviz estimativ transparent, înainte de orice lucrare",
            "Comunicarea cu asiguratorul o purtăm noi, până la final",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3" data-reveal-child>
              <Icon name="check" size={18} className="mt-1 shrink-0 text-red-bright" />
              <span className="text-[15px] text-steel-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="red-edge overflow-hidden rounded-2xl border border-coal-700" data-reveal>
        <Image
          src={IMAGES.paperwork.src}
          alt={IMAGES.paperwork.alt}
          width={IMAGES.paperwork.width}
          height={IMAGES.paperwork.height}
          sizes="(min-width: 768px) 36rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
