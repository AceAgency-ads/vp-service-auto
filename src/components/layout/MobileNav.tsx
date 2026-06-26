"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, createTimeline, stagger, type Timeline } from "animejs";
import { SITE } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";

/* ============================================================
   Meniu mobil — drawer animat din dreapta, temă „mașină".

   Probleme rezolvate față de versiunea veche:
   - overlay-ul randat în <header> (cu backdrop-blur) devenea
     containing-block pentru `fixed` → caseta se raporta la cele
     72px ale header-ului, lăsând hero-ul vizibil dedesubt.
     FIX: backdrop + panou randate prin createPortal în <body>,
     deci `fixed` se raportează din nou la viewport.
   - Mașină de stări în 4 faze (nu simplu open:boolean) ca să
     putem rula timeline-ul de IEȘIRE înainte de demontare.
   anime.js v4 (regula proiectului — NU Framer Motion / gsap).
   ============================================================ */

type Phase = "closed" | "opening" | "open" | "closing";

const DRAWER_LINKS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Acasă", icon: "car" },
  { href: "/constatare-daune", label: "Constatare daune", icon: "shield" },
  { href: "/servicii", label: "Servicii", icon: "wrench" },
  { href: "/despre", label: "Despre noi", icon: "car-swap" },
  { href: "/contact", label: "Contact", icon: "map-pin" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* useLayoutEffect logează un warning în SSR — pe server cădem pe useEffect. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MobileNav() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("closed");
  const mounted = phase !== "closed";

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLSpanElement>(null);
  const wheelRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLSpanElement>(null);
  const barBotRef = useRef<HTMLSpanElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const tlRef = useRef<Timeline | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  /* ---------- comenzi de stare ---------- */
  const openDrawer = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setPhase((p) => (p === "closed" || p === "closing" ? "opening" : p));
  }, []);

  const closeDrawer = useCallback(() => {
    setPhase((p) => (p === "open" || p === "opening" ? "closing" : p));
  }, []);

  const restoreFocus = useCallback(() => {
    lastFocusRef.current?.focus?.();
    lastFocusRef.current = null;
  }, []);

  /* ---------- hamburger ↔ X (două bare) ---------- */
  const morphBars = useCallback((toX: boolean, reduce: boolean) => {
    const top = barTopRef.current;
    const bot = barBotRef.current;
    if (!top || !bot) return;
    if (reduce) {
      top.style.transform = toX
        ? "translateY(0px) rotate(45deg)"
        : "translateY(-5px) rotate(0deg)";
      bot.style.transform = toX
        ? "translateY(0px) rotate(-45deg)"
        : "translateY(5px) rotate(0deg)";
      return;
    }
    animate(top, {
      translateY: toX ? 0 : -5,
      rotate: toX ? 45 : 0,
      duration: 320,
      ease: "outBack",
    });
    animate(bot, {
      translateY: toX ? 0 : 5,
      rotate: toX ? -45 : 0,
      duration: 320,
      ease: "outBack",
    });
  }, []);

  const navItems = () =>
    navRef.current?.querySelectorAll<HTMLElement>("[data-nav-item]") ?? [];

  const setInstantOpen = useCallback(() => {
    if (backdropRef.current) backdropRef.current.style.opacity = "1";
    if (panelRef.current) panelRef.current.style.transform = "translateX(0%)";
    if (roadRef.current) roadRef.current.style.transform = "scaleY(1)";
    if (wheelRef.current) {
      wheelRef.current.style.opacity = "1";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
    navItems().forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    if (footerRef.current) {
      footerRef.current.style.opacity = "1";
      footerRef.current.style.transform = "none";
    }
  }, []);

  /* ---------- coregrafia IN / OUT ---------- */
  useIsoLayoutEffect(() => {
    const reduce = prefersReduced();

    if (phase === "opening") {
      morphBars(true, reduce);
      if (reduce) {
        setInstantOpen();
        setPhase("open");
        return;
      }
      tlRef.current?.cancel();
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
        onComplete: () => setPhase("open"),
      });
      tl.add(backdropRef.current!, { opacity: [0, 1], duration: 380, ease: "outQuad" }, 0)
        .add(panelRef.current!, { translateX: ["100%", "0%"], duration: 480 }, 0)
        .add(roadRef.current!, { scaleY: [0, 1], duration: 520, ease: "outQuart" }, 80)
        .add(
          wheelRef.current!,
          {
            opacity: [0, 1],
            rotate: [-30, 0],
            scale: [0.92, 1],
            duration: 900,
            ease: "outElastic(1, 0.6)",
          },
          120,
        )
        .add(
          navItems(),
          { opacity: [0, 1], translateX: [28, 0], duration: 520, delay: stagger(60) },
          140,
        )
        .add(
          footerRef.current!,
          { opacity: [0, 1], translateY: [16, 0], duration: 460 },
          "<<+=200",
        );
      tlRef.current = tl;
    } else if (phase === "closing") {
      morphBars(false, reduce);
      if (reduce) {
        setPhase("closed");
        restoreFocus();
        return;
      }
      tlRef.current?.cancel();
      const tl = createTimeline({
        defaults: { ease: "inExpo" },
        onComplete: () => {
          setPhase("closed");
          restoreFocus();
        },
      });
      tl.add(
        navItems(),
        {
          opacity: [1, 0],
          translateX: [0, 24],
          duration: 220,
          delay: stagger(40, { from: "last" }),
        },
        0,
      )
        .add(panelRef.current!, { translateX: ["0%", "100%"], duration: 320 }, 120)
        .add(backdropRef.current!, { opacity: [1, 0], duration: 260 }, "<<+=80");
      tlRef.current = tl;
    }
  }, [phase, morphBars, restoreFocus, setInstantOpen]);

  /* focus pe butonul de închidere imediat ce drawer-ul e montat */
  useEffect(() => {
    if (phase === "opening") closeBtnRef.current?.focus();
  }, [phase]);

  /* scroll-lock cât timp drawer-ul e montat */
  useEffect(() => {
    if (!mounted) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted]);

  /* închidere automată la schimbarea rutei */
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* cleanup la demontarea componentei */
  useEffect(
    () => () => {
      tlRef.current?.cancel();
    },
    [],
  );

  /* focus trap + Escape pe dialog */
  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDrawer();
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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => (mounted ? closeDrawer() : openDrawer())}
        aria-controls="mobile-drawer"
        aria-expanded={mounted}
        aria-label={mounted ? "Închide meniul" : "Deschide meniul"}
        className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-coal-700 text-paper"
      >
        <span className="relative block h-4 w-6" aria-hidden>
          <span
            ref={barTopRef}
            className="absolute left-0 top-1/2 block h-[2px] w-6 rounded-full bg-paper"
            style={{ transform: "translateY(-5px)" }}
          />
          <span
            ref={barBotRef}
            className="absolute left-0 top-1/2 block h-[2px] w-6 rounded-full bg-paper"
            style={{ transform: "translateY(5px)" }}
          />
        </span>
      </button>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={backdropRef}
              onClick={closeDrawer}
              aria-hidden
              className="fixed inset-0 z-[60] bg-coal-950/70 backdrop-blur-sm"
              style={{ opacity: 0 }}
            />

            <div
              ref={panelRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Meniu de navigare"
              onKeyDown={onDialogKeyDown}
              className="fixed inset-y-0 right-0 z-[60] flex h-full w-[min(86vw,380px)] flex-col overflow-y-auto border-l border-coal-800 bg-coal-950"
              style={{ transform: "translateX(100%)" }}
            >
              {/* motiv „mașină" 1: linia LED de drum pe muchia stângă */}
              <span
                ref={roadRef}
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[2px]"
                style={{
                  transform: "scaleY(0)",
                  transformOrigin: "top",
                  background:
                    "linear-gradient(180deg, transparent, var(--color-red) 18%, var(--color-red-bright) 50%, var(--color-red) 82%, transparent)",
                  boxShadow: "0 0 12px rgba(227,6,19,0.55)",
                }}
              />
              {/* motiv „mașină" 2: watermark volan, colț dreapta-jos */}
              <span
                ref={wheelRef}
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -right-12 text-red/[0.06]"
                style={{ opacity: 0 }}
              >
                <Icon name="car" size={220} />
              </span>

              <div className="relative flex items-start justify-between px-6 pt-6">
                <div>
                  <span className="font-heading text-lg font-extrabold text-paper">
                    Meniu
                  </span>
                  <p className="text-xs text-steel-300">{SITE.tagline}</p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Închide meniul"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-coal-700 text-paper"
                >
                  <Icon name="x" size={22} />
                </button>
              </div>

              <hr className="led-line mx-6 mt-5" />

              <nav
                ref={navRef}
                aria-label="Meniu mobil"
                className="relative flex flex-col gap-1 px-6 py-6"
              >
                {DRAWER_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      data-nav-item
                      onClick={closeDrawer}
                      aria-current={active ? "page" : undefined}
                      style={{ opacity: 0 }}
                      className={`font-heading flex items-center gap-3 rounded-lg px-2 py-3 text-2xl font-bold ${
                        active ? "text-red-bright" : "text-paper"
                      }`}
                    >
                      <Icon
                        name={link.icon}
                        size={24}
                        className={active ? "text-red-bright" : "text-steel-300"}
                      />
                      <span className="flex-1">{link.label}</span>
                      {active && (
                        <Icon name="check" size={20} className="text-red-bright" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <hr className="led-line mx-6" />

              <div className="relative flex flex-col gap-1 px-6 py-6 text-sm text-steel-200">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 py-1.5"
                >
                  <Icon name="phone" size={18} className="text-red-bright" />
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-1.5"
                >
                  <Icon name="whatsapp" size={18} className="text-red-bright" />
                  WhatsApp
                </a>
                <div className="flex items-start gap-3 py-1.5">
                  <Icon
                    name="clock"
                    size={18}
                    className="mt-0.5 shrink-0 text-red-bright"
                  />
                  <span>
                    {SITE.hours.map((h) => `${h.days}: ${h.interval}`).join(" · ")}
                  </span>
                </div>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 py-1.5"
                >
                  <Icon
                    name="map-pin"
                    size={18}
                    className="mt-0.5 shrink-0 text-red-bright"
                  />
                  <span>
                    {SITE.address.street}, {SITE.address.city}
                  </span>
                </a>
              </div>

              <div
                ref={footerRef}
                className="relative mt-auto flex flex-col gap-3 px-6 pb-6"
                style={{ opacity: 0 }}
              >
                <a href={SITE.phoneHref} className="btn btn-primary w-full">
                  <Icon name="phone" size={18} />
                  Sună acum — {SITE.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  onClick={closeDrawer}
                  className="btn btn-ghost w-full"
                >
                  Programează o vizită
                </Link>
                <p className="pt-1 text-center text-xs text-steel-300">
                  {SITE.tagline}
                </p>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
