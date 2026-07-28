/* ============================================================
   E2E verification — VP Service Auto (Playwright CLI script)
   Run: bun run build && bun start  (port 3000 sau BASE_URL)
        apoi: bun scripts/verify.ts

   1. 9 rute × {390, 1440}: scroll-through + screenshot + h1
   2. Navigație desktop + meniu mobil
   3. /contact telefon-first: fără formular, fără ruta /api/contact
   4. Cookie consent: persistă în localStorage, dispare la reload
   5. Bara de acțiuni: permanentă pe mobil (inclusiv la scrollY=0),
      absentă pe desktop; „Locație" deschide sheet-ul Maps/Waze
   6. Counterele ajung la valorile finale
   7. 404 cu FuzzyText canvas
   8. sitemap.xml cu 13 URL-uri
   Eșuează la ORICE eroare de consolă neașteptată.
   ============================================================ */

import { chromium, type Page } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.join(import.meta.dir, "..", "qa", "screenshots");
mkdirSync(OUT, { recursive: true });

const ROUTES: [string, string][] = [
  ["home", "/"],
  ["constatare-daune", "/constatare-daune"],
  ["servicii", "/servicii"],
  ["tinichigerie", "/servicii/tinichigerie"],
  ["masina-la-schimb", "/servicii/masina-la-schimb"],
  ["despre", "/despre"],
  ["contact", "/contact"],
  ["politica", "/politica-de-confidentialitate"],
  ["termeni", "/termeni-si-conditii"],
];

let failures = 0;
const consoleErrors: string[] = [];

function ok(label: string, pass: boolean, detail = "") {
  console.log(`${pass ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!pass) failures++;
}

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  });
  await page.waitForTimeout(1100);
}

async function dismissConsent(page: Page) {
  const btn = page.getByRole("button", { name: "Doar necesare" });
  if (await btn.isVisible().catch(() => false)) await btn.click();
}

/* —— 1. rute × viewporturi —— */
const browser = await chromium.launch();

for (const [tag, viewport] of [
  ["mobile-390", { width: 390, height: 844 }],
  ["desktop-1440", { width: 1440, height: 900 }],
] as const) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") {
      consoleErrors.push(`[${tag}] ${m.location().url} ${m.text()}`);
    }
  });
  page.on("pageerror", (e) => consoleErrors.push(`[${tag}] pageerror: ${e.message}`));

  console.log(`\n— ${tag} —`);
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(600);
    if (name === "home") await dismissConsent(page);
    await scrollThrough(page);
    const h1 = await page.locator("h1").first().isVisible();
    ok(`[${tag}] ${route} h1 vizibil`, h1);
    await page.screenshot({ path: path.join(OUT, `${tag}-${name}.png`), fullPage: true });
  }

  /* counterele din StatsBand (home) */
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(400);
  await scrollThrough(page);
  await page.waitForTimeout(900);
  const counters = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-count-to]")).map(
      (el) => el.textContent ?? "",
    ),
  );
  ok(
    `[${tag}] countere la valorile finale`,
    counters.includes("4.500+") && counters.includes("100%"),
    counters.join(" · "),
  );

  /* bara de acțiuni e permanentă — trebuie să fie acolo deja la scrollY = 0 */
  const bar = page.getByTestId("sticky-call-bar");
  await page.evaluate(() =>
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }),
  );
  await page.waitForTimeout(300);
  const topBox = await bar.boundingBox();
  const barAtTop =
    !!topBox && topBox.y < (viewport.height as number) && topBox.y > 0;
  ok(
    `[${tag}] bara de acțiuni la scrollY=0 ${tag === "mobile-390" ? "vizibilă" : "ascunsă"}`,
    tag === "mobile-390" ? barAtTop : !barAtTop,
  );

  /* sticky call bar: doar pe mobil, după scroll */
  await page.evaluate(() =>
    window.scrollTo({ top: 800, behavior: "instant" as ScrollBehavior }),
  );
  await page.waitForTimeout(500);
  const barBox = await bar.boundingBox();
  const barOnScreen =
    !!barBox && barBox.y < (viewport.height as number) && barBox.y > 0;
  ok(
    `[${tag}] sticky call bar ${tag === "mobile-390" ? "vizibil" : "ascuns"}`,
    tag === "mobile-390" ? barOnScreen : !barOnScreen,
  );

  await ctx.close();
}

/* —— 2. navigație desktop —— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[nav] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "load" });
  await dismissConsent(page);
  await page
    .locator("header nav")
    .getByRole("link", { name: "Constatare daune" })
    .click();
  await page.waitForURL("**/constatare-daune");
  ok("nav desktop → /constatare-daune", page.url().includes("/constatare-daune"));
  await page
    .locator("header")
    .getByRole("link", { name: /SERVICE AUTO/ })
    .first()
    .click();
  await page.waitForURL(BASE + "/");
  ok("logo → home", page.url() === BASE + "/");
  await ctx.close();
}

/* —— 3. meniu mobil —— */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[mobilenav] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "load" });
  await dismissConsent(page);
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const menuVisible = await page
    .getByRole("navigation", { name: "Meniu mobil" })
    .isVisible();
  ok("meniu mobil se deschide", menuVisible);
  await page.screenshot({ path: path.join(OUT, "mobile-menu.png") });
  await page
    .getByRole("navigation", { name: "Meniu mobil" })
    .getByRole("link", { name: "Servicii" })
    .click();
  await page.waitForURL("**/servicii");
  ok("meniu mobil → /servicii", page.url().includes("/servicii"));
  await ctx.close();
}

/* —— 3b. sheet-ul „Cum ajungi" din bara de acțiuni —— */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[directions] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "load" });
  await dismissConsent(page);
  await page.getByTestId("sticky-call-bar").getByText("Locație").click();
  const sheet = page.getByTestId("directions-sheet");
  let sheetVisible = true;
  try {
    await sheet.waitFor({ state: "visible", timeout: 4000 });
  } catch {
    sheetVisible = false;
  }
  ok("tap „Locație” → sheet-ul cu Google Maps / Waze", sheetVisible);
  const waze = await sheet
    .getByRole("link", { name: "Waze" })
    .getAttribute("href")
    .catch(() => null);
  ok("sheet-ul oferă navigare Waze", !!waze?.includes("waze.com/ul"), waze ?? "—");
  await page.screenshot({ path: path.join(OUT, "directions-sheet.png") });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const sheetGone = !(await sheet.isVisible().catch(() => false));
  ok("Escape închide sheet-ul", sheetGone);
  await ctx.close();
}

/* —— 4. /contact e telefon-first: zero formular, zero /api/contact —— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[contact] pageerror: ${e.message}`));
  await page.goto(BASE + "/contact", { waitUntil: "load" });
  await dismissConsent(page);

  ok("zero <form> pe /contact", (await page.locator("form").count()) === 0);
  ok("zero inputuri pe /contact",
    (await page.locator("input, textarea, select").count()) === 0);

  const tel = await page.locator(`a[href="${"tel:+40799706706"}"]`).count();
  ok("/contact are linkuri de telefon", tel >= 2, `${tel} linkuri`);
  const wa = await page.locator('a[href*="wa.me"]').count();
  ok("/contact are linkuri WhatsApp", wa >= 2, `${wa} linkuri`);
  await page.screenshot({ path: path.join(OUT, "contact-no-form.png"), fullPage: true });

  /* ruta API a dispărut de tot */
  const res = await page.request.post(BASE + "/api/contact", { data: { name: "x" } });
  ok("POST /api/contact → 404", res.status() === 404, `status ${res.status()}`);
  await ctx.close();
}

/* —— 5. cookie consent: persistă —— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[consent] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "load" });
  const banner = page.getByTestId("cookie-consent");
  await banner.waitFor({ state: "visible", timeout: 5000 });
  ok("bannerul de consent apare la prima vizită", true);
  await page.getByRole("button", { name: "Doar necesare" }).click();
  const stored = await page.evaluate(() => localStorage.getItem("vp-consent"));
  ok("alegerea se salvează în localStorage", stored === "necessary", `vp-consent=${stored}`);
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(800);
  const bannerGone = !(await banner.isVisible().catch(() => false));
  ok("bannerul nu reapare după reload", bannerGone);
  /* fără consent „all" → fără script de analytics */
  const analyticsLoaded = await page.evaluate(
    () => !!document.querySelector('script[src*="_vercel/insights"]'),
  );
  ok("zero analytics fără consent total", !analyticsLoaded);
  await ctx.close();
}

/* —— 6. 404 cu FuzzyText —— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`[404] pageerror: ${e.message}`));
  const res = await page.goto(BASE + "/pagina-care-nu-exista", { waitUntil: "load" });
  ok("ruta inexistentă → status 404", res?.status() === 404);
  await page.waitForTimeout(1200);
  const canvasPainted = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    return !!c && c.width > 50;
  });
  ok("FuzzyText canvas randat pe 404", canvasPainted);
  await page.screenshot({ path: path.join(OUT, "notfound.png") });
  await ctx.close();
}

/* —— 7. sitemap —— */
{
  const res = await fetch(BASE + "/sitemap.xml");
  const xml = await res.text();
  const count = (xml.match(/<url>/g) ?? []).length;
  ok("sitemap.xml cu 13 URL-uri", res.ok && count === 13, `${count} URL-uri`);
}

await browser.close();

/* —— erori de consolă —— */
console.log("\n— erori de consolă —");
const realErrors = consoleErrors.filter(
  (e) =>
    !e.includes("Download the React DevTools") &&
    /* 404-urile așteptate: doar pe ruta de test inexistentă */
    !(e.includes("pagina-care-nu-exista") && e.includes("404")) &&
    /* TODO(client): scoate când clipurile reale ajung în public/videos —
       până atunci BackgroundVideo degradează la poster, iar .mp4-urile
       placeholder dau 404 (așteptat). */
    !e.includes("/videos/"),
);
if (realErrors.length) {
  realErrors.forEach((e) => console.log("  ✗", e));
  failures += realErrors.length;
} else {
  console.log("  niciuna");
}

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
