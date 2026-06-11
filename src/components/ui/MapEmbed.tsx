"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/* Harta Google se încarcă DOAR la click — zero requesturi către
   Google înainte de acțiunea explicită a utilizatorului (GDPR). */

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={SITE.mapsEmbedUrl}
        title={`Harta Google — ${SITE.name}, ${SITE.address.street}`}
        className="h-[380px] w-full rounded-2xl border border-coal-700"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className="red-edge relative flex h-[380px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-coal-700 bg-coal-850 px-6 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(58,62,68,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(58,62,68,0.22) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-coal-600 bg-coal-800 text-red-bright">
        <Icon name="map-pin" size={26} />
      </span>
      <p className="font-heading text-lg font-bold text-paper">
        {SITE.address.street}, {SITE.address.city}
      </p>
      <p className="max-w-sm text-sm text-steel-400">
        Harta se încarcă de la Google la cerere — apăsând butonul, accepți
        transferul de date către Google Maps.
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="btn btn-primary"
        data-testid="load-map"
      >
        Încarcă harta Google
      </button>
      <a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-red-bright underline underline-offset-2"
      >
        sau deschide direct în Google Maps
      </a>
    </div>
  );
}
