"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ============================================================
   Fundal video în loop, accesibil + LCP-friendly.

   Filozofie aliniată cu RevealProvider:
   - SSR (și `prefers-reduced-motion: reduce`) randează DOAR
     posterul (next/image fill) ⇒ poster = LCP candidate, fără
     CLS, zero JS necesar pentru primul render.
   - La mount, dacă mișcarea e permisă, se montează <video>
     autoplay/muted/loop peste poster. Dacă mp4-ul lipsește încă
     (placeholder) sau eșuează, `onError` ascunde videoul și
     posterul rămâne vizibil — degradare grațioasă.

   Toate clipurile sunt first-party în /public ⇒ fără cookie,
   fără consimțământ GDPR (spre deosebire de hartă/Analytics).
   ============================================================ */

interface BackgroundVideoProps {
  /** mp4 din manifestul VIDEOS. */
  src: string;
  /** primul cadru — poster + fallback. */
  poster: string;
  /** webm opțional (servit înaintea mp4). */
  webm?: string;
  alt?: string;
  /** clase aplicate ATÂT posterului cât și videoului (ex. blur la CTA). */
  className?: string;
  /** strat de întunecare deasupra (ex. „bg-coal-950/80" la CTA). */
  overlayClassName?: string;
  /** poster cu prioritate mare (hero-uri above-the-fold). */
  priority?: boolean;
  sizes?: string;
  /** ex. „object-center", „object-[70%_50%]". */
  objectPosition?: string;
}

export function BackgroundVideo({
  src,
  poster,
  webm,
  alt = "",
  className = "",
  overlayClassName,
  priority = false,
  sizes = "100vw",
  objectPosition = "object-center",
}: BackgroundVideoProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowVideo(true);
  }, []);

  return (
    <>
      {/* poster: baza SSR + LCP + fallback reduced-motion/eroare */}
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={60}
        sizes={sizes}
        className={`object-cover ${objectPosition} ${className}`}
      />

      {showVideo && !failed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setFailed(true)}
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover ${objectPosition} ${className}`}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
      )}
    </>
  );
}
