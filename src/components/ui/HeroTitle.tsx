"use client";

import { useEffect, useRef } from "react";

/* Word-split manual pentru H1 (înlocuiește SplitText, care ar
   cere gsap). Cuvintele intră stagger la mount; reduced-motion
   sau no-JS → text static normal. */

export function HeroTitle({
  text,
  accent,
  className = "",
}: {
  text: string;
  /** cuvinte randate cu roșu LED (ex. „RCA/CASCO") */
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".ht-w").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
        w.style.transition = "none";
      });
      return;
    }
    const id = requestAnimationFrame(() => {
      el.querySelectorAll<HTMLElement>(".ht-w").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "translateY(0)";
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const renderWords = (str: string, isAccent: boolean, offset: number) =>
    str
      .split(" ")
      .filter(Boolean)
      .map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-1 align-top"
        >
          <span
            className={`ht-w inline-block ${isAccent ? "text-red-bright" : ""}`}
            style={{
              opacity: 0,
              transform: "translateY(105%)",
              transition: `opacity 0.55s ease ${(offset + i) * 80}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${(offset + i) * 80}ms`,
            }}
          >
            {word}
          </span>
          {" "}
        </span>
      ));

  const baseWords = text.split(" ").filter(Boolean).length;

  return (
    <span ref={ref} className={className}>
      {renderWords(text, false, 0)}
      {accent && renderWords(accent, true, baseWords)}
    </span>
  );
}
