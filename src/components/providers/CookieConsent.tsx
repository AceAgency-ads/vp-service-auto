"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

/* ============================================================
   GDPR: niciun script de tracking înainte de consimțământ.
   <Analytics/> (Vercel) se randează DOAR după „Accept toate".
   Starea persistă în localStorage sub cheia `vp-consent`:
   "all" | "necessary". Nu randează nimic până la mount
   (evită hydration mismatch).
   ============================================================ */

const STORAGE_KEY = "vp-consent";

type Consent = "all" | "necessary" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "all" || stored === "necessary") setConsent(stored);
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  if (!mounted) return null;

  return (
    <>
      {consent === "all" && <Analytics />}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Consimțământ cookie-uri"
          data-testid="cookie-consent"
          className="led-frame fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl p-5 shadow-2xl sm:p-6"
        >
          <p className="font-heading text-base font-bold text-paper">
            Respectăm confidențialitatea ta
          </p>
          <p className="mt-2 text-sm text-steel-300">
            Folosim cookie-uri necesare funcționării site-ului și, doar cu
            acordul tău, statistici anonime de trafic. Detalii în{" "}
            <Link
              href="/politica-de-confidentialitate"
              className="text-red-bright underline underline-offset-2"
            >
              politica de confidențialitate
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => decide("all")}
              className="btn btn-primary flex-1 !py-3"
            >
              Accept toate
            </button>
            <button
              type="button"
              onClick={() => decide("necessary")}
              className="btn btn-ghost flex-1 !py-3"
            >
              Doar necesare
            </button>
          </div>
        </div>
      )}
    </>
  );
}
