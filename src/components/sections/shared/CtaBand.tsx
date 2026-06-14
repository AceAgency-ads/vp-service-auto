import Link from "next/link";
import { SITE } from "@/lib/site";
import { VIDEOS } from "@/lib/videos";
import { Icon } from "@/components/ui/Icon";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import StarBorder from "@/components/reactbits/StarBorder";

/* Banda finală de conversie — telefon-first, pe fiecare pagină. */

export function CtaBand({
  title = "Ai avut un accident? Te ajutăm chiar acum.",
  sub = "Sună-ne și îți spunem pe loc ce acte îți trebuie și cum deschidem dosarul de daună.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-coal-800 bg-coal-900">
      {/* refolosește clipul de hero, întunecat + blurat ca ambianță discretă */}
      <BackgroundVideo
        src={VIDEOS.heroLoop.src}
        poster={VIDEOS.heroLoop.poster}
        className="scale-105 blur-md"
        overlayClassName="bg-coal-950/80"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at 80% 120%, rgba(227,6,19,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="wrap relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div data-reveal>
          <h2 className="max-w-xl">{title}</h2>
          <p className="mt-3 max-w-xl text-steel-300">{sub}</p>
        </div>
        <div
          className="flex flex-col gap-4 sm:flex-row md:shrink-0"
          data-reveal
          data-reveal-delay="120"
        >
          <StarBorder as="a" href={SITE.phoneHref}>
            <Icon name="phone" size={18} />
            {SITE.phoneDisplay}
          </StarBorder>
          <Link href="/contact" className="btn btn-ghost">
            Programează-te online
          </Link>
        </div>
      </div>
      <hr className="led-line" />
    </section>
  );
}
