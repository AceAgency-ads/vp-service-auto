@AGENTS.md

# VP Service Auto — vpserviceauto.ro

Website multi-pagină de prezentare pentru service auto în București
(Splaiul Unirii 969), focus: **centrul de constatare daune RCA/CASCO**.

## Stack & overrides față de aceagency-defaults

- Next.js 16 App Router + TS strict + TailwindCSS 4 (`@theme` în
  `globals.css`, fără config js) | bun | Vercel.
- **Doar română** — fără next-intl/i18n routing. Slug-uri fără diacritice.
- Animații: **anime.js v4** (NU Framer Motion, NU gsap/motion) prin
  `RevealProvider` global, markup-driven: `data-reveal`,
  `data-reveal-group`/`data-reveal-child`, `data-count-to`, `data-line-draw`.
  API v4: named exports, `ease` (nu `easing`), `autoplay: onScroll({...})`,
  `repeat: false` = once. MCP-ul anime-js servește docs v3 — ignoră-l.
- ReactBits vendored în `src/components/reactbits/` (dep-free, re-tematizate).
- Fără fundaluri WebGL. Marquee-uri = CSS pur.

## Structură

- `src/lib/site.ts` — NAP, program, parteneri, valori (single source).
- `src/lib/services.ts` — cele 6 servicii → carduri, rute `[slug]`,
  sitemap, JSON-LD, enum formular.
- `src/lib/images.ts` — manifest imagini; fișierele din `public/images`
  sunt stock Unsplash (swap list: `public/images/SOURCES.md`);
  `hero-facade.webp` e fotografia reală a clientului.
- Pagini/secțiuni = server components; insule client doar la frunze.

## Comenzi

- `bun run dev` / `bun run build`
- `bun scripts/fetch-images.ts` — re-descarcă imaginile din manifest
- `bun run build && bun start` apoi `bun scripts/verify.ts` — E2E Playwright

## Brand

Temă full-dark: coal-950 fundal, coal-800 carduri, roșu LED `#e30613`
doar accente/CTA (niciodată body text — contrast 3.6:1). Titluri Plus
Jakarta Sans 700/800, body Inter. Motiv: `.led-line`, `.led-frame`,
`.red-edge`, `.slash-strip`, `.eyebrow` (în globals.css).
Tagline: „Ne pasă de mașina ta!".

## Reguli & placeholders

- Date client nefinalizate marcate `TODO(client)` — grep înainte de live:
  telefon, WhatsApp, email, SRL/CUI, cod poștal, pin hartă, program.
- GDPR: `<Analytics/>` se randează DOAR după consent „all"
  (`vp-consent` în localStorage). Harta = click-to-load.
- Footer obligatoriu: linkuri ANPC + SOL.
- Formularul merge fără `RESEND_API_KEY` (log server + succes UI).
