"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, createTimeline, type Timeline } from "animejs";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/* ============================================================
   „Cum ajungi" — un singur trigger reutilizat peste tot
   (bara de jos, header, footer, drawer, hero, hartă, CTA band).

   Progressive enhancement: randăm un <a> real către Google Maps
   — crawlabil, funcțional fără JS, copiabil cu click-dreapta —
   iar onClick face preventDefault() și deschide sheet-ul cu
   Google Maps / Waze doar când JS rulează.

   Sheet-ul se randează prin createPortal în <body>: header-ul are
   `backdrop-blur`, care creează containing block pentru `fixed`
   (aceeași capcană rezolvată în MobileNav.tsx). z-[70] îl ține
   peste bara de jos (z-40), bannerul de cookie (z-50) și drawer
   (z-[60]). anime.js v4 — API `ease`, nu `easing`.
   ============================================================ */

type Phase = "closed" | "opening" | "open" | "closing";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* useLayoutEffect logează un warning în SSR — pe server cădem pe useEffect. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function DirectionsTrigger({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const [phase, setPhase] = useState<Phase>("closed");
  const mounted = phase !== "closed";

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<Timeline | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setPhase((p) => (p === "closed" || p === "closing" ? "opening" : p));
  }, []);

  const close = useCallback(() => {
    setPhase((p) => (p === "open" || p === "opening" ? "closing" : p));
  }, []);

  /* ---------- coregrafia IN / OUT ---------- */
  useIsoLayoutEffect(() => {
    const reduce = prefersReduced();

    if (phase === "opening") {
      if (reduce) {
        if (backdropRef.current) backdropRef.current.style.opacity = "1";
        if (panelRef.current) panelRef.current.style.transform = "translateY(0%)";
        setPhase("open");
        return;
      }
      tlRef.current?.cancel();
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
        onComplete: () => setPhase("open"),
      });
      tl.add(backdropRef.current!, { opacity: [0, 1], duration: 300, ease: "outQuad" }, 0)
        .add(panelRef.current!, { translateY: ["100%", "0%"], duration: 460 }, 0);
      tlRef.current = tl;
    } else if (phase === "closing") {
      const done = () => {
        setPhase("closed");
        lastFocusRef.current?.focus?.();
        lastFocusRef.current = null;
      };
      if (reduce) {
        done();
        return;
      }
      tlRef.current?.cancel();
      const tl = createTimeline({
        defaults: { ease: "inQuad" },
        onComplete: done,
      });
      tl.add(panelRef.current!, { translateY: ["0%", "100%"], duration: 280 }, 0)
        .add(backdropRef.current!, { opacity: [1, 0], duration: 240 }, 40);
      tlRef.current = tl;
    }
  }, [phase]);

  /* focus pe butonul de închidere imediat ce sheet-ul e montat */
  useEffect(() => {
    if (phase === "opening") closeBtnRef.current?.focus();
  }, [phase]);

  /* scroll-lock cât timp sheet-ul e montat */
  useEffect(() => {
    if (!mounted) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted]);

  /* cleanup la demontarea componentei */
  useEffect(
    () => () => {
      tlRef.current?.cancel();
    },
    [],
  );

  /* focus trap + Escape */
  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <a
        href={SITE.maps.directions}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={mounted}
        onClick={(e) => {
          /* lasă cmd/ctrl/middle-click să deschidă link-ul nativ */
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          open();
        }}
        className={className}
      >
        {children}
      </a>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={backdropRef}
              onClick={close}
              aria-hidden
              className="fixed inset-0 z-[70] bg-coal-950/75 backdrop-blur-sm"
              style={{ opacity: 0 }}
            />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Cum ajungi la VP Service Auto"
              data-testid="directions-sheet"
              onKeyDown={onDialogKeyDown}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-lg rounded-t-2xl border border-coal-700 bg-coal-900 px-5 pt-5 sm:bottom-6 sm:rounded-2xl"
              style={{
                transform: "translateY(100%)",
                paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">Cum ajungi</p>
                  <p className="font-heading mt-2 text-lg font-bold text-paper">
                    {SITE.address.street}
                  </p>
                  <p className="text-sm text-steel-300">
                    {SITE.address.postalCode} {SITE.address.city}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Închide"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-coal-700 text-paper"
                >
                  <Icon name="x" size={20} />
                </button>
              </div>

              <hr className="led-line my-5" />

              <div className="flex flex-col gap-3">
                <a
                  href={SITE.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="btn btn-primary w-full"
                >
                  <Icon name="route" size={18} />
                  Google Maps
                </a>
                <a
                  href={SITE.maps.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="btn btn-ghost w-full"
                >
                  <Icon name="navigation" size={18} />
                  Waze
                </a>
              </div>

              <a
                href={SITE.maps.place}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-4 block text-center text-sm text-steel-300 underline underline-offset-4 hover:text-paper"
              >
                Vezi fișa și recenziile
              </a>

              <button
                type="button"
                onClick={close}
                className="mt-2 w-full py-3 text-sm font-semibold text-steel-400 hover:text-paper"
              >
                Anulează
              </button>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
