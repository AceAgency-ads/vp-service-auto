/* ============================================================
   VP SERVICE AUTO — manifest de videoclipuri (oglindă pentru
   src/lib/images.ts). Single source of truth pentru clipurile
   de fundal în loop (generate AI: imagine Gemini → video OMNI,
   first frame = last frame ⇒ loop fără cusătură).

   STARE CURENTĂ (Pista B): fișierele .mp4 încă NU există —
   componenta BackgroundVideo degradează grațios la `poster`,
   iar posterele sunt pozele ACTUALE (placeholder) ca site-ul
   să meargă imediat. Când vin clipurile reale:
     1. pune .mp4 în public/videos/ (vezi public/videos/SOURCES.md)
     2. exportă primul cadru ca .webp (ffmpeg) și schimbă `poster`
        cu /videos/<nume>.webp
   ============================================================ */

import { IMAGES } from "@/lib/images";

export interface VideoSlot {
  /** clip mp4 H.264 din public/videos (loop, fără audio). */
  src: string;
  /** poster = primul cadru; LCP candidate + fallback reduced-motion. */
  poster: string;
  /** webm opțional (codec mai mic), servit înaintea mp4. */
  webm?: string;
  alt: string;
}

export const VIDEOS = {
  // HERO home: mașina se dezasamblează → reasamblează (exploded view).
  heroLoop: {
    src: "/videos/hero-loop.mp4",
    poster: "/videos/hero-loop.webp", // cadru AI (Porsche atelier) până vine .mp4
    alt: "Atelier VP Service Auto cu lumini LED roșii — mașină în prezentare",
  },
  // DAUNE hero: panou avariat → reparat (loop „heal").
  dauneLoop: {
    src: "/videos/daune-loop.mp4",
    poster: IMAGES.damagedCar.src, // TODO(client): → /videos/daune-loop.webp
    alt: "Constatare daune — panou auto reparat în atelier cu accente roșii",
  },
  // ACCENT inline: cabină de vopsitorie (clip mic, încadrat).
  paintLoop: {
    src: "/videos/paint-loop.mp4",
    poster: IMAGES.paintBooth.src, // TODO(client): → /videos/paint-loop.webp
    alt: "Vopsire auto în cabină profesională",
  },
} as const satisfies Record<string, VideoSlot>;

export type VideoKey = keyof typeof VIDEOS;
