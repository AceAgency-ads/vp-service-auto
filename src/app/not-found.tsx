import Link from "next/link";
import FuzzyText from "@/components/reactbits/FuzzyText";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center">
      <div className="font-heading" aria-hidden>
        <FuzzyText
          fontSize="clamp(5rem, 18vw, 11rem)"
          fontWeight={800}
          color="#ff3b45"
          baseIntensity={0.16}
          hoverIntensity={0.45}
        >
          404
        </FuzzyText>
      </div>
      <h1 className="mt-6 !text-[clamp(22px,3vw,32px)]">
        Pagina asta a ieșit de pe traseu
      </h1>
      <p className="mt-3 max-w-md text-steel-300">
        Linkul nu există sau a fost mutat. Dar noi suntem tot aici — și
        mașina ta are prioritate.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Înapoi acasă
        </Link>
        <a href={SITE.phoneHref} className="btn btn-ghost">
          <Icon name="phone" size={17} />
          {SITE.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
