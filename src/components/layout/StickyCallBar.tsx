"use client";

import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { DirectionsTrigger } from "@/components/ui/DirectionsTrigger";

/* ============================================================
   Bară de acțiuni permanentă, doar mobil/tabletă (md:hidden).
   Nu mai apare „după 420px de scroll" — pe primul ecran nu
   exista niciun CTA persistent. Se comportă ca un tab bar de
   aplicație: icon deasupra, label 11px dedesubt, 3 coloane
   egale (3 butoane orizontale sparg textul pe 360px).

   Numele componentei rămâne StickyCallBar — importul din
   layout.tsx și `data-testid` sunt asertate în scripts/verify.ts.
   Nu folosim `.btn` (inline-flex pe rând, padding 1rem 1.65rem)
   ca să evităm lanțul de override-uri `!`.
   ============================================================ */

const TAB =
  "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold leading-none";

export function StickyCallBar() {
  return (
    <div
      data-testid="sticky-call-bar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-coal-700 bg-coal-900/95 px-3 pt-2 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3 gap-2">
        <a href={SITE.phoneHref} className={`${TAB} bg-red text-white`}>
          <Icon name="phone" size={20} />
          Sună
        </a>
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${TAB} border border-coal-600 text-paper`}
        >
          <Icon name="whatsapp" size={20} />
          WhatsApp
        </a>
        <DirectionsTrigger
          className={`${TAB} border border-coal-600 text-paper`}
          ariaLabel="Cum ajungi la noi"
        >
          <Icon name="map-pin" size={20} />
          Locație
        </DirectionsTrigger>
      </div>
    </div>
  );
}
