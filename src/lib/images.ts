/* ============================================================
   VP SERVICE AUTO — manifest de imagini
   Single source of truth pentru fiecare slot de imagine.

   heroFacade = fotografia REALĂ a fațadei (client).
   Restul = stock Unsplash, alese manual să respecte paleta
   (frame-uri dark/desaturate cu accente roșii) — se înlocuiesc
   1:1 cu pozele reale când vin de la client.
   Credit + sursă: public/images/SOURCES.md
   ============================================================ */

export interface ImageSlot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const IMAGES = {
  heroFacade: {
    src: "/images/hero-facade.webp",
    width: 2400,
    height: 1500,
    alt: "Fațada VP Service Auto — clădire antracit cu linii LED roșii, Splaiul Unirii 969, București",
  },
  workshopDark: {
    src: "/images/workshop-dark.webp",
    width: 1600,
    height: 1000,
    alt: "Atelierul VP Service Auto — zonă de lucru cu echipamente moderne",
  },
  damagedCar: {
    src: "/images/damaged-car.webp",
    width: 2000,
    height: 1250,
    alt: "Autoturism avariat pregătit pentru constatarea daunelor",
  },
  paperwork: {
    src: "/images/paperwork.webp",
    width: 1600,
    height: 1000,
    alt: "Completarea actelor pentru dosarul de daună",
  },
  diagnostics: {
    src: "/images/diagnostics.webp",
    width: 1600,
    height: 1000,
    alt: "Diagnoză computerizată la VP Service Auto",
  },
  mechanicLift: {
    src: "/images/mechanic-lift.webp",
    width: 1600,
    height: 1000,
    alt: "Mecanic lucrând la o mașină ridicată pe elevator",
  },
  panelBeating: {
    src: "/images/panel-beating.webp",
    width: 1600,
    height: 1000,
    alt: "Lucrări de tinichigerie — îndreptarea caroseriei",
  },
  paintBooth: {
    src: "/images/paint-booth.webp",
    width: 1600,
    height: 1000,
    alt: "Vopsire auto în cabină profesională",
  },
  acService: {
    src: "/images/ac-service.webp",
    width: 1600,
    height: 1000,
    alt: "Service climatizare — încărcare freon auto",
  },
  partsOem: {
    src: "/images/parts-oem.webp",
    width: 1600,
    height: 1000,
    alt: "Piese auto de calitate pregătite pentru montaj",
  },
  towTruck: {
    src: "/images/tow-truck.webp",
    width: 1600,
    height: 1000,
    alt: "Transport auto pe platformă",
  },
  keysHandover: {
    src: "/images/keys-handover.webp",
    width: 1600,
    height: 1000,
    alt: "Predarea cheilor pentru mașina la schimb",
  },
  brakeDisc: {
    src: "/images/brake-disc.webp",
    width: 1200,
    height: 800,
    alt: "Disc de frână nou montat",
  },
  redCarDark: {
    src: "/images/red-car-dark.webp",
    width: 2000,
    height: 1250,
    alt: "Autoturism roșu pe fundal întunecat",
  },
  ogImage: {
    src: "/images/og-image.webp",
    width: 1200,
    height: 630,
    alt: "VP Service Auto — Centru de Constatare Daune RCA/CASCO București",
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof IMAGES;
