# Surse imagini — VP Service Auto

`hero-facade.webp` = fotografia REALĂ a fațadei (client, WhatsApp 07.06.2026).
`og-image.webp` = derivată din fațadă (compusă de scripts/fetch-images.ts).
`facade-hero.webp` = decupaj (client, WhatsApp 03.07.2026) — doar firma +
clădirea, fără panoul publicitar de sus (evită coliziunea cu H1 din hero).
`facade-billboard.webp` = sursa completă (nedecupată) a celor de mai sus —
nu mai e referențiată în manifest, păstrată doar ca sursă pentru viitoare
decupaje.

Restul sunt stock Unsplash (licență Unsplash, fără atribuire obligatorie),
alese să respecte paleta dark/roșu. **Lista de swap** — când vin pozele
reale ale clientului, înlocuiește fișierul păstrând numele și dimensiunile,
apoi șterge rândul de aici:

| Fișier | Unsplash ID | Căutare | De înlocuit cu |
|---|---|---|---|
| workshop-dark.webp | **AI — nano banana** | prompt în `public/videos/PROMPTS.md` | foto reală workshop dark |
| damaged-car.webp | **AI — nano banana** | prompt în `public/videos/PROMPTS.md` (= cadru daune-loop) | foto reală damaged car |
| paperwork.webp | photo-1450101499163-c8848c66ca85 | signing documents | foto reală paperwork |
| diagnostics.webp | photo-1717068341695-9d33ffb66968 | car diagnostic engine hood open | foto reală diagnostics |
| mechanic-lift.webp | photo-1711386689622-1cda23e10217 | car welding body repair (lift) | foto reală mechanic lift |
| panel-beating.webp | photo-1743314777689-1bb71ae148ca | mechanic grinder under car sparks | foto reală panel beating |
| paint-booth.webp | **AI — nano banana** | prompt în `public/videos/PROMPTS.md` (= cadru paint-loop) | foto reală paint booth |
| ac-service.webp | photo-1542399204-b8dd4af5113d | car air vent dashboard | foto reală ac service |
| parts-oem.webp | **AI — nano banana** | prompt în `public/videos/PROMPTS.md` | foto reală parts oem |
| tow-truck.webp | photo-1673187139211-1e7ec3dd60ec | red car on flatbed tow truck | foto reală tow truck |
| keys-handover.webp | photo-1727893512947-8bdc773ceb02 | car keys handover | foto reală keys handover |
| brake-disc.webp | photo-1763087978864-fe5b2778c9f7 | red carbon ceramic brake caliper | foto reală brake disc |
| red-car-dark.webp | **AI — nano banana** | prompt în `public/videos/PROMPTS.md` | foto reală red car dark |

> **AI — nano banana**: 5 sloturi + `public/videos/hero-loop.webp` (posterul hero,
> Porsche) au fost generate cu Gemini 2.5 Flash Image (24.06.2026). Sursele brute
> 2752×1536 nu sunt în repo (vezi `ai-source/` local). Rămân placeholdere până
> vin fotografiile reale ale clientului.

Regenerare stock Unsplash rămas: `bun scripts/fetch-images.ts`
(NU rescrie sloturile AI — manifestul le ține separat).
