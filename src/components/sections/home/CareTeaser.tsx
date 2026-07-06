import Link from "next/link";
import Image from "next/image";
import { VIDEOS } from "@/lib/videos";
import { Icon } from "@/components/ui/Icon";

export function CareTeaser() {
  return (
    <section className="wrap grid items-center gap-10 py-20 md:grid-cols-2 md:py-24">
      <div className="red-edge overflow-hidden rounded-2xl border border-coal-700" data-reveal>
        <Image
          src={VIDEOS.heroLoop.poster}
          alt={VIDEOS.heroLoop.alt}
          width={1920}
          height={1080}
          sizes="(min-width: 768px) 36rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
      <div data-reveal data-reveal-delay="120">
        <p className="eyebrow">Ne pasă de fiecare detaliu</p>
        <h2 className="mt-4 max-w-md">Tratăm orice mașină ca pe una premium</h2>
        <p className="mt-4 max-w-md text-steel-300">
          Fiecare mașină care intră pe poartă primește aceeași atenție: piese
          OEM, vopsitorie în cabină profesională și garanție pentru lucrările
          executate.
        </p>
        <Link
          href="/despre"
          className="btn btn-ghost mt-6 inline-flex items-center gap-2"
        >
          Povestea noastră
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </section>
  );
}
