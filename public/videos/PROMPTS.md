# VP Service Auto — Prompturi generare AI (poze site + video)

Handoff de generare. Generator țintă: **Nano Banana** (Gemini 2.5 Flash Image).
Toate prompturile de mai jos sunt scrise **pentru Nano Banana** — adică
descriere fotografică în proză curgătoare, nu liste de cuvinte-cheie.

Acoperă două lucruri:
1. **Pozele integrate în site** — înlocuiesc stock-ul Unsplash din
   `src/lib/images.ts` cu imagini proprii, în paleta brandului (vezi tabelul
   din `public/images/SOURCES.md`).
2. **Cele 3 clipuri de fundal în loop** — întâi imaginea (Nano Banana =
   primul/ultimul cadru), apoi mișcarea (model video: OMNI/Veo/Kling),
   cu **primul cadru = ultimul cadru** ⇒ loop fără cusătură.

---

## Cum „gândește" Nano Banana (citește o dată)

Nano Banana NU e Midjourney. Nu îi arunca etichete separate prin virgulă.
Optimizează după aceste reguli:

- **Descrie o scenă, ca un fotograf.** O frază–două care spun *ce* e în cadru,
  *unde*, *cum e luminat*, *ce aparat/obiectiv*. Proză, nu „dark, moody, 4k, hd".
- **Limbaj de aparat foto.** Precizează obiectiv și senzor — „shot on a
  full-frame camera with a 35mm lens", „shallow depth of field", „low-angle",
  „eye-level documentary shot". Nano Banana respectă termenii fotografici reali.
- **Culorile în hex, în text.** Brandul: fundal cărbune-negru `#0b0d0e`,
  accent LED roșu `#e30613` / `#ff3b45`. Roșul = doar rim-light / accent, NU
  inundă cadrul.
- **Compoziție „text-safe".** Subiectul spre **dreapta**; **treimea stângă mai
  întunecată și goală** (acolo cade textul de pe site). Spune-i asta explicit.
- **Aspect ratio în prompt.** Nano Banana ascultă: scrie „in a 16:9 widescreen
  aspect ratio" (sau 3:2 / 1.91:1, vezi fiecare slot). Setează și raportul în
  API/UI dacă poți.
- **Negative = în pozitiv.** Nu există câmp de negative prompt. Spune ce *vrei*
  („clean, unbranded bodywork") și închide cu o linie scurtă:
  *No text, no watermarks, no logos, no visible faces.*
- **Iterează conversațional.** După prima imagine, corectează în chat:
  „make the red rim-light subtler", „darken the left third", „remove the badge".
  Nano Banana ține contextul și editează aceeași imagine.

### Imagine de referință (IMPORTANT pentru mașini de marcă)

Nano Banana e foarte bun la **păstrarea identității** dintr-o poză atașată.
Pentru orice mașină premium (Audi / BMW / Porsche), atașează o poză reală a
modelului (configurator / press kit / Unsplash, 3/4 față, fundal curat) și pune
înaintea promptului:

> *Use the attached photo as the exact reference for the car's model, shape,
> proportions and badges. Keep the bodywork and emblems faithful to the
> reference — only relight and re-stage the scene as described below.*

Pentru pozele de service (mecanic, acte, piese) marca nu contează — lasă
caroseria **generică, fără embleme**, ca să eviți logo-uri deformate.

---

# PARTEA 1 — Poze integrate în site

Slot → fișier din `public/images/` (vezi `src/lib/images.ts`). Salvează cu
**același nume și aspect**, apoi șterge rândul din `SOURCES.md`. Liniile finale
„No text…" rămân la fiecare prompt.

## `workshop-dark.webp` — atelier (16:9)
```
A wide, eye-level documentary photograph of the interior of a modern
professional auto repair workshop at night, shot on a full-frame camera with a
24mm lens. Near-black charcoal walls (#0b0d0e), a polished concrete floor with
soft reflections, two cars in service bays on the right side of the frame, clean
tool walls and a diagnostics station. Thin red LED light strips (#e30613) run
along the ceiling edges, casting a subtle crimson rim-light; the left third of
the room is darker and empty. Faint volumetric haze, cinematic but realistic
lighting, deep shadows, high detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `damaged-car.webp` — mașină avariată (16:9)
```
A photorealistic three-quarter rear shot of a dark grey modern sedan with
visible accident damage — a dented rear quarter panel and a paint scratch —
parked in a dark professional workshop, shot on a full-frame camera with a 50mm
lens, shallow depth of field. Charcoal environment (#0b0d0e), polished concrete
floor, a subtle red LED accent light (#e30613) grazing the glossy paint. Car on
the right, left third darker and empty. Clean unbranded bodywork. Cinematic,
moody, high detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `paperwork.webp` — dosar de daună (16:9)
```
A close, top-down photograph of hands filling out an insurance damage-claim form
on a clipboard resting on a car bonnet, a pen mid-signature, shot on a 35mm lens
with shallow depth of field. Dark workshop ambience (#0b0d0e), warm task light on
the paper, a faint red LED glow (#e30613) in the background. Composition weighted
to the right, left side darker. Realistic, professional, document blank/unreadable.
16:9 widescreen aspect ratio.
No readable text, no watermarks, no logos, no visible faces.
```

## `diagnostics.webp` — diagnoză computerizată (16:9)
```
A photorealistic close-up of an automotive diagnostics scan tool and a laptop
plugged into a car's OBD port, glowing screen with abstract data, shot on a 50mm
lens with shallow depth of field. Dark workshop (#0b0d0e), polished concrete,
red LED accent light (#e30613) reflecting on the device. Subject on the right,
left third dark and empty. Cinematic, technical, high detail. 16:9 widescreen
aspect ratio.
No readable text, no watermarks, no logos, no visible faces.
```

## `mechanic-lift.webp` — mașină pe elevator (16:9)
```
A low-angle photograph looking up at a car raised on a two-post hydraulic lift in
a dark professional workshop, the undercarriage and suspension visible, shot on a
24mm lens. Charcoal walls (#0b0d0e), polished concrete floor, red LED strip
lighting (#e30613) along the ceiling edges casting a crimson rim-light on the
chassis. Lift on the right, left third darker. Cinematic, industrial, high
detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `panel-beating.webp` — tinichigerie (16:9)
```
A photorealistic action shot of an auto body panel being straightened — an angle
grinder throwing a small shower of warm sparks against bare metal bodywork — in a
dark workshop, shot on a 50mm lens, fast shutter freezing the sparks. Charcoal
environment (#0b0d0e), red LED accent light (#e30613) mixing with the orange
sparks. Subject on the right, left third dark. Cinematic, gritty, high detail.
16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `paint-booth.webp` — cabină vopsitorie (16:9)
```
A photorealistic shot inside a professional paint booth: a spray gun laying a
glossy coat of dark paint onto a car body panel, fine atomized paint mist
drifting in the air, wet glossy finish forming, shot on a 50mm lens with shallow
depth of field. Dark booth (#0b0d0e) with a subtle red accent light (#e30613)
catching the mist. Panel on the right, left side darker. Cinematic, premium, high
detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `ac-service.webp` — service climatizare (16:9)
```
A photorealistic close-up of an automotive air-conditioning recharge manifold
gauge set connected to an engine bay, gauges glowing faintly, shot on a 50mm lens
with shallow depth of field. Dark workshop (#0b0d0e), polished surfaces, a subtle
red LED accent (#e30613). Equipment on the right, left third dark and empty.
Cinematic, technical, high detail. 16:9 widescreen aspect ratio.
No readable text, no watermarks, no logos, no visible faces.
```

## `parts-oem.webp` — piese auto (16:9)
```
A photorealistic flat-lay of new OEM automotive parts — brake pads, filters,
bearings, a belt — arranged neatly on a dark matte surface, shot top-down on a
50mm lens with even soft light. Charcoal background (#0b0d0e), a subtle red LED
accent glow (#e30613) along one edge. Parts grouped to the right, left third
darker and empty. Clean, premium product look, high detail. 16:9 widescreen
aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `tow-truck.webp` — platformă transport (16:9)
```
A photorealistic night photograph of a car secured on a flatbed tow truck on a
wet city street, shot on a 35mm lens. Dark moody scene (#0b0d0e), reflections on
wet asphalt, red tail-lights and a red accent glow (#e30613) in the frame. Truck
and car on the right, left third darker. Clean unbranded vehicles. Cinematic,
high detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `keys-handover.webp` — predare chei (16:9)
```
A photorealistic close-up of one hand passing a car key to another open hand,
shot on an 85mm lens with shallow depth of field, bokeh background. Dark workshop
ambience (#0b0d0e), a soft red LED accent light (#e30613) behind. Hands and key
on the right, left third dark and empty. Warm, trustworthy, premium, high detail.
16:9 widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `brake-disc.webp` — disc de frână (3:2)
```
A photorealistic macro close-up of a new vented brake disc and a red brake
caliper freshly mounted on a wheel hub, shot on a 100mm macro lens with very
shallow depth of field. Dark background (#0b0d0e), the caliper red echoing the
brand red (#e30613), a subtle LED rim-light on the metal. Subject on the right,
left side dark. Crisp, premium, high detail. 3:2 aspect ratio.
No text, no watermarks, no logos.
```

## `red-car-dark.webp` — mașină roșie, fundal întunecat (16:9)
```
A photorealistic three-quarter front shot of a premium red sports car parked in a
dark garage, shot on a full-frame camera with a 35mm lens. Near-black charcoal
environment (#0b0d0e), polished concrete floor with soft reflections, dramatic
red LED strip lighting (#e30613) along the room edges, glossy crimson paint
catching the light. Car on the right, left third darker and empty. Clean
unbranded bodywork. Cinematic, premium, volumetric haze, high detail. 16:9
widescreen aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

## `og-image.webp` — card social (1.91:1)
> Acum e derivat din fațada reală (`scripts/fetch-images.ts`). Dacă vrei un OG
> generat, folosește o variantă cinematografică a fațadei:
```
A wide cinematic exterior photograph of a modern anthracite auto-service building
at dusk, thin red LED accent lines (#e30613) tracing the facade, dark sky,
polished forecourt with soft reflections, shot on a 35mm lens. Building on the
right two-thirds, left third darker for overlay text. Premium, clean, high
detail. 1.91:1 aspect ratio.
No text, no watermarks, no logos, no visible faces.
```

---

# PARTEA 2 — Cele 3 clipuri de fundal (loop)

Flux: **imagine (Nano Banana) → video (model de mișcare)**, cu **primul cadru =
ultimul cadru**. Toate **16:9, fără audio**. Reguli de aur (palette + compoziție
„text-safe" stânga) ca mai sus.

| Generezi | Salvezi ca       | Unde apare                                  | Mașină      |
| -------- | ---------------- | ------------------------------------------- | ----------- |
| Video 1  | `hero-loop.mp4`  | Hero homepage **+** banda CTA (refolosit)   | Porsche 911 |
| Video 2  | `daune-loop.mp4` | Hero „Constatare daune"                     | BMW M4      |
| Video 3  | `paint-loop.mp4` | Accent în secțiunea cu statistici (încadrat)| Audi RS7    |

> Mărci permise: **doar Audi / BMW / Porsche**. Atașează referința modelului
> (vezi linia de identitate de mai sus). Iterează 2–3× și fă și o variantă mai
> scurtă (6–8s) — alege ce curge mai natural.

## 🎬 VIDEO 1 — HERO → `hero-loop.mp4` — Porsche 911 (992), gri argintiu

Hero-ul e **full-bleed, înalt (~88dvh)**, cu titlul peste **treimea stângă**
(gradient întunecat 96%→35% spre dreapta). Deci: mașina **clar în dreapta**,
**stânga foarte întunecată/goală**, spațiu generos sus și jos (cadru tăiat
vertical pe desktop). Mișcare lentă care se întoarce exact ⇒ loop curat.
Recomandat: varianta „signature" de mai jos (cea mai sigură + arată premium).
Exploded-view e spectaculos, dar greu de făcut fără cusătură — e alternativa.

**Referință:** poză 3/4 față, Porsche 911 (992), fundal neutru. Atașează + linia
de identitate.

**Imagine (Nano Banana), 16:9 — cadru de hero:**
```
A cinematic three-quarter front hero shot of a silver-grey Porsche 911 (992),
faithful to the attached reference, positioned in the right two-thirds of the
frame inside a dark, upscale auto-service showroom-workshop. Shot on a full-frame
camera with a 35mm lens, low eye-level, shallow depth of field. Near-black
charcoal environment (#0b0d0e), glossy polished concrete floor with long soft
reflections of the car, faint volumetric haze in the air. A single dramatic red
LED light strip (#e30613) runs along the wall behind the car, throwing a clean
crimson rim-light down the edge of the bodywork and a soft red glow into the
haze. The entire left third of the frame is deep shadow, empty and dark — clean
negative space reserved for overlay text. Generous headroom above the car and
floor below it. Moody, premium, automotive-advertising look, high detail. 16:9
widescreen aspect ratio.
No text, no watermarks, no visible faces, no third-party logos.
```

**Mișcare (model video) — RECOMANDAT „signature loop", ~10s, primul cadru = ultimul cadru:**
```
Start on the still silver Porsche 911 in the dark red-lit workshop, framed in the
right two-thirds, left third in shadow. The motion is extremely slow and elegant:
the camera performs a gentle dolly-and-orbit of only a few degrees to the right,
just enough to make the red rim-light travel smoothly along the length of the
bodywork and a soft highlight sweep across the glossy paint and the floor
reflection; thin volumetric haze drifts slowly; the LED glow pulses almost
imperceptibly. At the midpoint the camera eases to a stop, then reverses the exact
same path back to the opening framing, the rim-light and haze settling to where
they began. No cuts, no people, nothing detaches. Weightless, premium, confident,
cinematic. The final frame must exactly match the first frame for a perfectly
seamless loop. No text, no people.
```

**Alternativă spectaculoasă — exploded view (mai greu de buclat curat):**
```
Start on the assembled silver Porsche 911, still, in the dark red-lit workshop.
Over the first ~4s the car performs a smooth exploded-view disassembly: doors,
hood, bumpers, wheels and body panels detach and float outward, rotating gently,
revealing the chassis, red LED light glinting off each floating part. Hold the
fully exploded view briefly at the midpoint. Then over the next ~4s all parts
smoothly reverse and reassemble, snapping precisely back into place until the car
is whole and identical to the opening frame. Weightless, elegant, premium motion;
the camera orbits only a few degrees and returns to its exact starting position.
The final frame must exactly match the first frame for a seamless loop. No text,
no people.
```

## 🎬 VIDEO 2 — DAUNE → `daune-loop.mp4` — BMW M4 / Seria 4 (G82), gri închis

**Referință:** poză 3/4 spate-lateral, BMW M4 coupe (G82), gri închis.

**Imagine (Nano Banana), 16:9:**
```
A photorealistic close-up of the rear quarter panel and door of a dark grey BMW
M4 coupe (G82), faithful to the attached reference, showing a visible dent and a
paint scratch (accident damage), three-quarter angle, shot on a 50mm lens with
shallow depth of field. Dark professional workshop, charcoal environment
(#0b0d0e), a red LED accent light (#e30613) grazing the glossy paint, soft
reflections. Panel on the right, left side darker and empty. Cinematic, premium,
high detail. 16:9 widescreen aspect ratio.
No text, no watermarks, no visible faces, no third-party logos.
```

**Mișcare (model video), ~10s, primul cadru = ultimul cadru:**
```
Start on the dented, scratched BMW panel in the dark workshop. A thin bright red
LED scan-line sweeps slowly left to right across the panel over ~4s; as it
passes, the dent smooths out and the scratch vanishes, the paint restoring to a
flawless glossy factory finish behind the line. Hold the perfect panel briefly.
Then the red scan-line sweeps back right to left over ~4s and the damage stylishly
reappears exactly as in the opening frame, like a polished before/after demo.
Subtle reflections travel across the glossy paint throughout. The final frame
must exactly match the first frame for a seamless loop. No text, no people.
```

**Alternativă „safe" (fără reapariția avariei — orbită lentă, mașina reparată):**
```
Start on a flawless, freshly repaired glossy dark grey BMW M4 in a dark premium
workshop with red LED accent lighting and soft floor reflections. The camera
slowly orbits a few degrees around the car, a glossy red rim-light traveling along
the bodywork, then smoothly returns to the exact starting position so the final
frame matches the first frame for a seamless loop. Slow, elegant, premium
ambience, volumetric haze. No text, no people, no third-party logos.
```

## 🎬 VIDEO 3 — ACCENT → `paint-loop.mp4` — Audi RS7, close-up cabină vopsitorie

**Referință:** opțional (e close-up de panou).

**Imagine (Nano Banana), 16:9:**
```
A photorealistic close-up of a spray gun painting the body panel of an Audi RS7,
glossy dark paint, inside a pressurized paint booth, fine atomized paint mist in
the air, a wet glossy finish forming on the panel. Shot on a 50mm lens with
shallow depth of field. Dark booth environment (#0b0d0e) with a subtle red accent
light (#e30613) catching the mist. Cinematic, premium, high detail. 16:9
widescreen aspect ratio.
No text, no watermarks, no visible faces, no third-party logos.
```

**Mișcare (model video), ~6–8s, primul cadru = ultimul cadru:**
```
The spray gun glides smoothly across the Audi panel laying down a glossy coat of
paint, fine atomized mist drifting and settling, reflections forming on the
freshly wet surface; the gun then returns to its starting position and the mist
settles so the final frame matches the first frame for a seamless loop. Slow,
premium, ASMR-like motion. Dark booth, subtle red accent light. No text, no
people.
```

---

## Schimbă marca (înlocuiește în prompt + referință)

| Clip   | Implicit          | Variante                                |
| ------ | ----------------- | --------------------------------------- |
| Hero   | Porsche 911 (992) | `BMW M5 (G90)` / `Audi RS e-tron GT`    |
| Daune  | BMW M4 (G82)      | `Audi RS6 Avant` / `Porsche Panamera`   |
| Accent | Audi RS7          | `BMW M4` / `Porsche 911`                |

## Livrare

- **Poze site:** export `.webp` cu numele și aspectul din `src/lib/images.ts`,
  pune în `public/images/`, șterge rândul din `SOURCES.md`.
- **Video:** trimite `.mp4` brut (rezoluție maximă). Compresia (H.264, < ~5MB,
  fără audio, `+faststart`) + posterul `.webp` (primul cadru) le facem noi —
  vezi `public/videos/SOURCES.md`.
