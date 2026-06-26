/* Focused verification of the two fixes in this branch.
   Run: bun run build && bun start  then  bun scripts/verify-fixes.ts */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
let failures = 0;
const errors: string[] = [];
function ok(label: string, pass: boolean, detail = "") {
  console.log(`${pass ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!pass) failures++;
}

const browser = await chromium.launch();

/* ---- 1. SOFT NAVIGATION reveal (the critical bug) ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[soft-nav] ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });

  const targets: [string, string][] = [
    ["Servicii", "/servicii"],
    ["Despre noi", "/despre"],
    ["Contact", "/contact"],
    ["Constatare daune", "/constatare-daune"],
  ];
  for (const [label, url] of targets) {
    await page.locator("header nav").getByRole("link", { name: label }).first().click();
    await page.waitForURL((u) => u.pathname.startsWith(url));
    const h1 = page.locator("h1").first();
    await h1.waitFor({ state: "attached", timeout: 3000 });
    // poll: a broken fix leaves opacity stuck at 0 forever; a working one animates to 1
    let opacity = 0;
    for (let i = 0; i < 20; i++) {
      opacity = await h1.evaluate((el) => parseFloat(getComputedStyle(el).opacity));
      if (opacity > 0.9) break;
      await page.waitForTimeout(100);
    }
    ok(`soft-nav ${url}: h1 se dezvăluie (opacity ${opacity.toFixed(2)})`, opacity > 0.9);
  }
  // a [data-reveal] section below the fold must also reveal on the freshly-navigated page
  let revealedSomewhere = false;
  for (let i = 0; i < 20; i++) {
    revealedSomewhere = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!els.length) return true;
      return els.some((el) => parseFloat(getComputedStyle(el).opacity) > 0.9);
    });
    if (revealedSomewhere) break;
    await page.waitForTimeout(100);
  }
  ok("soft-nav: [data-reveal] aprins pe pagina nouă", revealedSomewhere);
  await ctx.close();
}

/* ---- 2. MOBILE DRAWER: covers viewport, traps focus, escape closes ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[drawer] ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const dialog = page.locator("#mobile-drawer");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(700); // let IN timeline settle

  // backdrop covers full viewport (the "overlaps hero" bug => backdrop must be 844px tall, not 72)
  const backdropH = await page.evaluate(() => {
    const bd = document.querySelector('[aria-hidden].fixed.inset-0') as HTMLElement | null;
    return bd ? bd.getBoundingClientRect().height : 0;
  });
  ok(`drawer: backdrop acoperă tot viewport-ul (${backdropH}px)`, backdropH >= 800);

  // panel is on-screen (translateX settled to 0 => right edge at viewport right)
  const panelBox = await dialog.boundingBox();
  ok("drawer: panou pe ecran", !!panelBox && panelBox.x < 390 && panelBox.width > 250);

  // aria-expanded reflects open state
  const ariaModal = await dialog.getAttribute("aria-modal");
  const role = await dialog.getAttribute("role");
  ok("drawer: role=dialog aria-modal", role === "dialog" && ariaModal === "true");

  // focus trap: Tab repeatedly stays within the dialog
  let trapped = true;
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => {
      const d = document.getElementById("mobile-drawer");
      return !!d && d.contains(document.activeElement);
    });
    if (!inside) { trapped = false; break; }
  }
  ok("drawer: focus trap (Tab rămâne în meniu)", trapped);

  // Escape closes
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);
  const stillThere = await page.locator("#mobile-drawer").count();
  ok("drawer: Escape închide", stillThere === 0);

  // reopen + click-outside (backdrop) closes
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await page.waitForTimeout(700);
  await page.mouse.click(20, 400); // far-left, on backdrop (panel is on the right)
  await page.waitForTimeout(700);
  ok("drawer: click pe backdrop închide", (await page.locator("#mobile-drawer").count()) === 0);

  // auto-close on navigation
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await page.waitForTimeout(500);
  await page.locator("#mobile-drawer").getByRole("link", { name: "Servicii" }).click();
  await page.waitForURL((u) => u.pathname.startsWith("/servicii"));
  await page.waitForTimeout(700);
  ok("drawer: se închide automat la navigare", (await page.locator("#mobile-drawer").count()) === 0);

  await ctx.close();
}

/* ---- 3. reduced-motion: content instantly visible, drawer instant ---- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[reduced] ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  const h1op = await page.locator("h1").first().evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  ok(`reduced-motion: conținut vizibil instant (opacity ${h1op.toFixed(2)})`, h1op > 0.9);
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await page.waitForTimeout(120);
  const panelOpacity = await page.locator("#mobile-drawer").evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  const navOp = await page.locator("#mobile-drawer [data-nav-item]").first().evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  ok("reduced-motion: drawer + linkuri vizibile instant", panelOpacity > 0.9 && navOp > 0.9);
  await ctx.close();
}

await browser.close();
if (errors.length) {
  console.log("\nErori de consolă:");
  for (const e of errors) console.log("  ✗ " + e);
}
console.log(`\n${failures === 0 && errors.length === 0 ? "✓ TOATE TRECUTE" : `✗ ${failures} eșecuri, ${errors.length} erori`}`);
process.exit(failures === 0 && errors.length === 0 ? 0 : 1);
