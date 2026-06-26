"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, stagger, createScope } from "animejs";

/* ============================================================
   Coreografia globală de scroll (anime.js v4).

   Secțiunile (server components) opt-in doar prin markup:
   - data-reveal                → fade-up la intrarea în viewport
     (+ data-reveal-delay="120" pentru întârziere în ms)
   - data-reveal-group + data-reveal-child → stagger 90ms pe copii
   - data-count-to="4500" (+ data-count-suffix="+")
                                → counter animat (Intl ro-RO)
   - data-line-draw / data-line-draw="y"
                                → linia LED „se desenează" (scale 0→1)

   Trigger = IntersectionObserver (play-once-până-la-capăt;
   ScrollObserver-ul anime pauzează animațiile legate când ținta
   iese din viewport — nedorit pentru countere). Tween-urile rămân
   anime.js, în interiorul unui createScope (cleanup cu revert()).

   FOUC-safe: .js [data-reveal]{opacity:0} în globals.css —
   scriptul inline din layout adaugă clasa `js` pe <html>.
   prefers-reduced-motion: totul vizibil static, counterele
   primesc direct valoarea finală.
   ============================================================ */

const COUNT_FORMAT = new Intl.NumberFormat("ro-RO");

function countText(el: HTMLElement, n: number) {
  return `${el.dataset.countPrefix ?? ""}${COUNT_FORMAT.format(n)}${el.dataset.countSuffix ?? ""}`;
}

export function RevealProvider({ children }: { children: ReactNode }) {
  /* App Router NU remontează layout-ul la navigare — doar `children` se
     schimbă. usePathname re-randează provider-ul la fiecare rută, iar
     dependența [pathname] face effect-ul să re-inițializeze observerele pe
     DOM-ul noii pagini (altfel elementele [data-reveal] rămân la opacity:0
     din globals.css și pagina pare goală până la un hard refresh). */
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-child], [data-line-draw]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
        el.textContent = countText(el, Number(el.dataset.countTo ?? 0));
      });
      return;
    }

    const scope = createScope();
    /* fiecare element observat are o acțiune de „aprindere" */
    const actions = new Map<Element, () => void>();

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      actions.set(el, () => {
        scope.add(() => {
          animate(el, {
            opacity: [0, 1],
            translateY: [26, 0],
            duration: 850,
            ease: "outCubic",
            delay: Number(el.dataset.revealDelay ?? 0),
          });
        });
      });
    });

    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      const children = Array.from(
        group.querySelectorAll<HTMLElement>("[data-reveal-child]"),
      );
      if (!children.length) return;
      actions.set(group, () => {
        scope.add(() => {
          animate(children, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 800,
            ease: "outCubic",
            delay: stagger(90),
          });
        });
      });
    });

    document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
      actions.set(el, () => {
        scope.add(() => {
          const target = { n: 0 };
          animate(target, {
            n: Number(el.dataset.countTo ?? 0),
            duration: 1600,
            ease: "outQuad",
            onUpdate: () => {
              el.textContent = countText(el, Math.round(target.n));
            },
          });
        });
      });
    });

    document.querySelectorAll<HTMLElement>("[data-line-draw]").forEach((el) => {
      const prop = el.dataset.lineDraw === "y" ? "scaleY" : "scaleX";
      actions.set(el, () => {
        scope.add(() => {
          animate(el, {
            [prop]: [0, 1],
            duration: 1200,
            ease: "inOutQuart",
          });
        });
      });
    });

    const fire = (el: Element) => {
      actions.get(el)?.();
      actions.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) fire(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    actions.forEach((_, el) => io.observe(el));

    /* flush inițial: la navigarea soft Next.js resetează scroll-ul la top,
       deci elementele above-the-fold ale noii pagini sunt deja în viewport.
       Le aprindem sincron (același criteriu ca onScroll) ca să nu rămână o
       clipă ascunse până când IntersectionObserver livrează primul callback. */
    {
      const limit = window.innerHeight * 0.95;
      actions.forEach((_, el) => {
        if (el.getBoundingClientRect().top < limit) fire(el);
      });
    }

    /* plasă de siguranță pentru scroll foarte rapid (fling):
       IO poate „sări" elemente traversate între două frame-uri —
       aprindem tot ce e deja în viewport sau deasupra lui. */
    let raf = 0;
    const onScroll = () => {
      if (raf || actions.size === 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const limit = window.innerHeight * 0.95;
        actions.forEach((_, el) => {
          if (el.getBoundingClientRect().top < limit) fire(el);
        });
        if (actions.size === 0) window.removeEventListener("scroll", onScroll);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      scope.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
