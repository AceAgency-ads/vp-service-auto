# Surse imagini — VP Service Auto

`hero-facade.webp` = fotografia REALĂ a fațadei (client, WhatsApp 07.06.2026).
`og-image.webp` = derivată din fațadă (compusă de scripts/fetch-images.ts).

Restul sunt stock Unsplash (licență Unsplash, fără atribuire obligatorie),
alese să respecte paleta dark/roșu. **Lista de swap** — când vin pozele
reale ale clientului, înlocuiește fișierul păstrând numele și dimensiunile,
apoi șterge rândul de aici:

| Fișier | Unsplash ID | Căutare | De înlocuit cu |
|---|---|---|---|
| workshop-dark.webp | photo-1756575527484-2839c593ed84 | car mechanic garage dark | foto reală workshop dark |
| damaged-car.webp | photo-1745845979138-be64a85272a5 | damaged car accident | foto reală damaged car |
| paperwork.webp | photo-1450101499163-c8848c66ca85 | signing documents | foto reală paperwork |
| diagnostics.webp | photo-1717068341695-9d33ffb66968 | car diagnostic engine hood open | foto reală diagnostics |
| mechanic-lift.webp | photo-1711386689622-1cda23e10217 | car welding body repair (lift) | foto reală mechanic lift |
| panel-beating.webp | photo-1743314777689-1bb71ae148ca | mechanic grinder under car sparks | foto reală panel beating |
| paint-booth.webp | photo-1614888441158-de25f0ea4bc5 | car polishing detailing dark (red truck) | foto reală paint booth |
| ac-service.webp | photo-1542399204-b8dd4af5113d | car air vent dashboard | foto reală ac service |
| parts-oem.webp | photo-1519752594763-2633d8d4ea29 | car engine parts black red | foto reală parts oem |
| tow-truck.webp | photo-1673187139211-1e7ec3dd60ec | red car on flatbed tow truck | foto reală tow truck |
| keys-handover.webp | photo-1727893512947-8bdc773ceb02 | car keys handover | foto reală keys handover |
| brake-disc.webp | photo-1763087978864-fe5b2778c9f7 | red carbon ceramic brake caliper | foto reală brake disc |
| red-car-dark.webp | photo-1735928560793-dc5effe5b53e | red car in black garage | foto reală red car dark |

Regenerare completă: `bun scripts/fetch-images.ts`
