# public/videos — surse & encoding

Clipuri de fundal în loop, generate AI (Pista A): **imagine Gemini → video OMNI**,
cu **primul cadru = ultimul cadru** ⇒ loop fără cusătură. 16:9, fără audio.

> **STARE: `TODO(client)`** — fișierele `.mp4` încă NU au fost livrate.
> Până atunci `BackgroundVideo` afișează `poster` (pozele actuale din
> `public/images`, mapate în `src/lib/videos.ts`). Site funcțional fără clipuri.

## Sloturi (vezi `src/lib/videos.ts`)

| fișier            | folosit în                | conținut                                         |
| ----------------- | ------------------------- | ------------------------------------------------ |
| `hero-loop.mp4`   | `HomeHero` + `CtaBand`*   | mașina se dezasamblează (exploded view) → reasamblează |
| `daune-loop.mp4`  | `DauneHero`               | panou avariat → reparat (scan-line „heal")       |
| `paint-loop.mp4`  | `StatsBand` (accent mic)  | cabină de vopsitorie, pistol care vopsește       |

\* `CtaBand` refolosește `hero-loop.mp4`, afișat întunecat + blurat (nicio randare nouă).

## Reguli de generare

- 16:9, fotorealist, atelier întunecat (coal `#0b0d0e`), accente LED roșii
  `#e30613` / `#ff3b45`, ceață volumetrică, fără text / oameni / logo-uri.
- Subiectul spre **dreapta**, **stânga mai întunecată** (acolo stă overlay-ul de text).
- Mișcare **dus-întors** ~10s (6–8s pentru `paint-loop`), **first frame = last frame**.

## Encoding (după ce vin clipurile brute)

```bash
# compresie mp4 (H.264), țintă < ~5MB, fără audio, faststart pentru streaming
ffmpeg -i raw.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -an \
  -movflags +faststart public/videos/hero-loop.mp4

# poster = primul cadru → webp; apoi schimbă `poster` în src/lib/videos.ts
ffmpeg -i public/videos/hero-loop.mp4 -frames:v 1 -q:v 2 /tmp/f.png \
  && cwebp -q 80 /tmp/f.png -o public/videos/hero-loop.webp
```

Opțional `.webm` (VP9) pentru fișiere mai mici — adaugă `webm` în slotul din `videos.ts`.
