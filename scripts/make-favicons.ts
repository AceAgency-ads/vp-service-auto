/* ============================================================
   VP SERVICE AUTO — pipeline favicon / icon set
   Run (one-off, manual — NU în build): bun scripts/make-favicons.ts

   Randează marca-sursă src/app/icon.svg (scut LED + „VP") în:
     1. src/app/apple-icon.png  — 180×180, fundal coal-950 (iOS)
     2. public/icon-192.png     — 192×192 (manifest)
     3. public/icon-512.png     — 512×512 (manifest)
     4. src/app/favicon.ico      — 16/32/48, fundal coal-950 (tab-uri)

   sharp nu scrie .ico nativ → folosim png-to-ico peste buffere PNG.
   ============================================================ */

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dir, "..");
const SRC = path.join(ROOT, "src", "app", "icon.svg");
const COAL = "#0b0d0e"; // fundal temă (iOS/tab nu acceptă transparență curată)

const svg = readFileSync(SRC);

/* Randează SVG-ul centrat pe un pătrat de fundal coal, cu un mic padding
   ca scutul să nu atingă marginile (mai ales pe maskable/iOS). */
async function renderPng(size: number, bg: string | null, padRatio = 0.1) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const mark = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const base = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  return base
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

function kb(p: string) {
  return Math.round(statSync(p).size / 1024);
}

/* 1 — apple-icon: fundal coal opac (iOS nu randează transparența) */
{
  const dest = path.join(ROOT, "src", "app", "apple-icon.png");
  writeFileSync(dest, await renderPng(180, COAL, 0.12));
  console.log(`✓ apple-icon.png 180×180 ${kb(dest)}KB`);
}

/* 2+3 — manifest icons: fundal coal, padding mic (sigur ca „any") */
for (const size of [192, 512]) {
  const dest = path.join(ROOT, "public", `icon-${size}.png`);
  writeFileSync(dest, await renderPng(size, COAL, 0.1));
  console.log(`✓ icon-${size}.png ${size}×${size} ${kb(dest)}KB`);
}

/* 4 — favicon.ico multi-size din PNG-uri pe fundal coal (citește bine pe
   tab-uri light și dark) */
{
  const dest = path.join(ROOT, "src", "app", "favicon.ico");
  const buffers = await Promise.all(
    [16, 32, 48].map((s) => renderPng(s, COAL, 0.06)),
  );
  writeFileSync(dest, await pngToIco(buffers));
  console.log(`✓ favicon.ico 16/32/48 ${kb(dest)}KB`);
}

console.log("\nTOATE ICONIȚELE OK");
