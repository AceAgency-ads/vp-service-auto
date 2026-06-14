import Link from "next/link";
import { VIDEOS } from "@/lib/videos";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { HeroTitle } from "@/components/ui/HeroTitle";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import StarBorder from "@/components/reactbits/StarBorder";

export function DauneHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* video în loop (panou avariat → reparat) — poster placeholder */}
      <BackgroundVideo
        src={VIDEOS.dauneLoop.src}
        poster={VIDEOS.dauneLoop.poster}
        alt={VIDEOS.dauneLoop.alt}
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(75deg, rgba(11,13,14,0.97) 0%, rgba(11,13,14,0.85) 45%, rgba(11,13,14,0.55) 100%)",
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

      <div className="wrap relative flex min-h-[72dvh] flex-col justify-center py-24">
        <p
          className="led-frame inline-flex w-fit items-center gap-2.5 !rounded-full px-4 py-2 text-[13px] font-bold text-paper"
          data-reveal
        >
          <Icon name="timer" size={16} className="text-red-bright" />
          Te ajutăm să avizezi dauna în termenul legal
        </p>
        <h1 className="mt-6 max-w-3xl">
          <HeroTitle text="Constatare daune" accent="RCA / CASCO" />
        </h1>
        <p
          className="mt-6 max-w-xl text-lg text-steel-200"
          data-reveal
          data-reveal-delay="420"
        >
          Aduci mașina, restul facem noi: avizare, fotografiere, dosar complet
          la asigurator și reparația în atelierul propriu.
        </p>
        <div
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          data-reveal
          data-reveal-delay="540"
        >
          <StarBorder as="a" href={SITE.phoneHref}>
            <Icon name="phone" size={18} />
            Sună acum — {SITE.phoneDisplay}
          </StarBorder>
          <Link href="/contact" className="btn btn-ghost">
            Programează constatarea
          </Link>
        </div>
      </div>
      <hr className="led-line relative" />
    </section>
  );
}
