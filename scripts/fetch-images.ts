/* ============================================================
   VP SERVICE AUTO — pipeline de imagini
   Run: bun scripts/fetch-images.ts

   1. Descarcă imaginile stock din manifest (Unsplash CDN,
      URL-uri alese MANUAL și verificate — nu inventa ID-uri).
   2. Procesează cu sharp → WebP la dimensiunea exactă din
      src/lib/images.ts, sub MAX_KB (scade calitatea adaptiv).
   3. Copiază fotografia reală a fațadei din FACADE_SRC.
   4. Compune og-image.webp (fațadă + overlay + wordmark).
   5. Scrie public/images/SOURCES.md (credit + lista de swap
      pentru când vin pozele reale ale clientului).
   ============================================================ */

import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const OUT = path.join(import.meta.dir, "..", "public", "images");
const MAX_KB = 250;

const FACADE_SRC =
  "/Users/mihaigrigore/Downloads/WhatsApp Image 2026-06-07 at 15.25.17.jpeg";

interface StockEntry {
  file: string;
  /** images.unsplash.com photo id — verificat HTTP 200 */
  id: string;
  width: number;
  height: number;
  credit: string;
  query: string;
}

/* Dimensiunile DUPLICĂ src/lib/images.ts (single source pentru
   componente); aici sunt țintele de procesare. */
const STOCK: StockEntry[] = [
  { file: "workshop-dark.webp",  id: "1756575527484-2839c593ed84", width: 1600, height: 1000, credit: "Unsplash", query: "car mechanic garage dark" },
  { file: "damaged-car.webp",    id: "1745845979138-be64a85272a5", width: 2000, height: 1250, credit: "Unsplash", query: "damaged car accident" },
  { file: "paperwork.webp",      id: "1450101499163-c8848c66ca85", width: 1600, height: 1000, credit: "Unsplash", query: "signing documents" },
  { file: "diagnostics.webp",    id: "1717068341695-9d33ffb66968", width: 1600, height: 1000, credit: "Unsplash", query: "car diagnostic engine hood open" },
  { file: "mechanic-lift.webp",  id: "1711386689622-1cda23e10217", width: 1600, height: 1000, credit: "Unsplash", query: "car welding body repair (lift)" },
  { file: "panel-beating.webp",  id: "1743314777689-1bb71ae148ca", width: 1600, height: 1000, credit: "Unsplash", query: "mechanic grinder under car sparks" },
  { file: "paint-booth.webp",    id: "1614888441158-de25f0ea4bc5", width: 1600, height: 1000, credit: "Unsplash", query: "car polishing detailing dark (red truck)" },
  { file: "ac-service.webp",     id: "1542399204-b8dd4af5113d",    width: 1600, height: 1000, credit: "Unsplash", query: "car air vent dashboard" },
  { file: "parts-oem.webp",      id: "1519752594763-2633d8d4ea29", width: 1600, height: 1000, credit: "Unsplash", query: "car engine parts black red" },
  { file: "tow-truck.webp",      id: "1673187139211-1e7ec3dd60ec", width: 1600, height: 1000, credit: "Unsplash", query: "red car on flatbed tow truck" },
  { file: "keys-handover.webp",  id: "1727893512947-8bdc773ceb02", width: 1600, height: 1000, credit: "Unsplash", query: "car keys handover" },
  { file: "brake-disc.webp",     id: "1763087978864-fe5b2778c9f7", width: 1200, height: 800,  credit: "Unsplash", query: "red carbon ceramic brake caliper" },
  { file: "red-car-dark.webp",   id: "1735928560793-dc5effe5b53e", width: 2000, height: 1250, credit: "Unsplash", query: "red car in black garage" },
];

mkdirSync(OUT, { recursive: true });

async function toWebpUnderLimit(
  input: Buffer,
  width: number,
  height: number,
  dest: string,
) {
  let quality = 78;
  for (;;) {
    const buf = await sharp(input)
      .resize(width, height, { fit: "cover", position: "attention" })
      .webp({ quality })
      .toBuffer();
    if (buf.byteLength <= MAX_KB * 1024 || quality <= 40) {
      writeFileSync(dest, buf);
      return { kb: Math.round(buf.byteLength / 1024), quality };
    }
    quality -= 6;
  }
}

let failures = 0;

/* 1+2 — stock */
for (const s of STOCK) {
  const url = `https://images.unsplash.com/photo-${s.id}?q=85&w=${Math.min(s.width * 1.2, 2400)}&fit=crop`;
  const res = await fetch(url);
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.startsWith("image/")) {
    console.error(`✗ ${s.file}: HTTP ${res.status} (${type}) — ${url}`);
    failures++;
    continue;
  }
  const raw = Buffer.from(await res.arrayBuffer());
  const { kb, quality } = await toWebpUnderLimit(
    raw,
    s.width,
    s.height,
    path.join(OUT, s.file),
  );
  console.log(`✓ ${s.file} ${s.width}×${s.height} q${quality} ${kb}KB`);
}

/* 3 — fațada reală */
if (existsSync(FACADE_SRC)) {
  const { kb, quality } = await toWebpUnderLimit(
    await sharp(FACADE_SRC).toBuffer(),
    2400,
    1500,
    path.join(OUT, "hero-facade.webp"),
  );
  console.log(`✓ hero-facade.webp 2400×1500 q${quality} ${kb}KB (foto reală client)`);
} else {
  console.error(`✗ lipsește fotografia fațadei: ${FACADE_SRC}`);
  failures++;
}

/* 4 — og-image: fațadă + overlay întunecat + wordmark */
{
  const base = await sharp(path.join(OUT, "hero-facade.webp"))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0b0d0e" stop-opacity="0.25"/>
        <stop offset="62%" stop-color="#0b0d0e" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#0b0d0e" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="623" width="1200" height="7" fill="#e30613"/>
    <g transform="translate(72, 430)">
      <path d="M30 0 L60 12 V36 C60 53 47 66.5 30 74 C13 66.5 0 53 0 36 V12 Z" fill="#e30613"/>
      <text x="30" y="47" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle">VP</text>
      <text x="84" y="34" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="800" fill="#f5f6f7">VP SERVICE AUTO</text>
      <text x="84" y="66" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#ff3b45">Constatare daune RCA / CASCO — București</text>
    </g>
  </svg>`);

  const buf = await sharp(base)
    .composite([{ input: overlay, left: 0, top: 0 }])
    .webp({ quality: 78 })
    .toBuffer();
  writeFileSync(path.join(OUT, "og-image.webp"), buf);
  console.log(`✓ og-image.webp 1200×630 ${Math.round(buf.byteLength / 1024)}KB`);
}

/* 5 — SOURCES.md */
{
  const lines = [
    "# Surse imagini — VP Service Auto",
    "",
    "`hero-facade.webp` = fotografia REALĂ a fațadei (client, WhatsApp 07.06.2026).",
    "`og-image.webp` = derivată din fațadă (compusă de scripts/fetch-images.ts).",
    "",
    "Restul sunt stock Unsplash (licență Unsplash, fără atribuire obligatorie),",
    "alese să respecte paleta dark/roșu. **Lista de swap** — când vin pozele",
    "reale ale clientului, înlocuiește fișierul păstrând numele și dimensiunile,",
    "apoi șterge rândul de aici:",
    "",
    "| Fișier | Unsplash ID | Căutare | De înlocuit cu |",
    "|---|---|---|---|",
    ...STOCK.map(
      (s) =>
        `| ${s.file} | photo-${s.id} | ${s.query} | foto reală ${s.file.replace(".webp", "").replace(/-/g, " ")} |`,
    ),
    "",
    "Regenerare completă: `bun scripts/fetch-images.ts`",
    "",
  ];
  writeFileSync(path.join(OUT, "SOURCES.md"), lines.join("\n"));
  console.log("✓ SOURCES.md");
}

if (failures > 0) {
  console.error(`\n${failures} EȘEC(URI)`);
  process.exit(1);
}
console.log("\nTOATE IMAGINILE OK");
