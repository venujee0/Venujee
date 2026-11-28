import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const errors = [];
page.on("pageerror", error => errors.push(error.stack || error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("requestfailed", request => errors.push("Request failed: " + request.url()));
try {
  const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173/";
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.locator("#app .hero h1").waitFor({ state: "visible", timeout: 60000 });
  if (!(await page.locator("#app").innerText()).includes("JEE")) throw new Error("Home page content did not render");

  await page.locator('#app a[href="#c11"]').first().click();
  await page.locator('#app a.btn.pri[href="#b11-physics"]').waitFor({ state: "visible" });
  await page.locator('#app a.btn.pri[href="#b11-physics"]').click();
  await page.locator('#app a[href="#b11-physics-p1"]').waitFor({ state: "visible" });
  await page.locator('#app a[href="#b11-physics-p1"]').click();
  await page.locator("#app .paper").waitFor({ state: "visible" });

  await page.locator("#pg-next").click();
  await page.locator("#app .paper").waitFor({ state: "visible" });
  await page.locator("a.brand").click();
  await page.locator("#app .hero h1").waitFor({ state: "visible" });

  await page.locator('#app a[href="#c11"]').first().click();
  await page.locator('#app a.btn.pri[href="#b11-physics"]').click();
  await page.locator('#app a[href="#b11-physics-toc"]').click();
  const chapterRows = page.locator("#app .tl-list a.tl");
  await chapterRows.nth(1).click();
  await page.locator("#app .op-t").filter({ hasText: "Motion in a Straight Line" }).waitFor({ state: "visible" });

  const chapter2Links = await page.locator("#app .tl-list a.tl").evaluateAll(els => els
    .map(a => ({ href: a.getAttribute("href"), text: a.innerText.trim() }))
    .filter(item => /^2\\./.test(item.text) && item.href));
  if (chapter2Links.length < 10) throw new Error("Expected Chapter 2 topic links, found " + chapter2Links.length);
  for (const item of chapter2Links) {
    await page.goto(baseURL + item.href, { waitUntil: "domcontentloaded" });
    await page.locator("#app .paper").waitFor({ state: "visible", timeout: 15000 });
    const visibleText = await page.locator("#app").innerText();
    if (visibleText.includes("Venu JEE loading error")) throw new Error("Chapter 2 topic failed: " + item.text + "\\n" + visibleText.slice(0,500));
  }
  console.log("PASS: Chapter 2 topic pages rendered: " + chapter2Links.length);

  await page.goto(baseURL + "#b11-physics-p58", { waitUntil: "domcontentloaded" });
  await page.locator("#app .paper").waitFor({ state: "visible" });
  await page.locator("#app .d3 canvas").waitFor({ state: "visible" });

  await page.goto(baseURL + "#b11-physics-p59", { waitUntil: "domcontentloaded" });
  await page.locator("#app .paper").waitFor({ state: "visible" });
  await page.locator("#app .diagram2d").waitFor({ state: "visible" });

  await page.locator('[data-lang="hi"]').first().click();
  if ((await page.locator("html").getAttribute("lang")) !== "hi") throw new Error("Hindi language switch failed");
  await page.locator('[data-lang="en"]').first().click();

  if (errors.length) throw new Error("Browser errors:\n" + errors.join("\n"));
  console.log("PASS: mobile viewport Home, Class 11, Physics book, page navigation, Chapter 2, 3D canvas, 2D diagram and language switch.");
} finally {
  await browser.close();
}
