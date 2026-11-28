import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("requestfailed", request => errors.push("Request failed: " + request.url()));
try {
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded" });
  await page.locator("#app .hero h1").waitFor({ state: "visible", timeout: 60000 });
  if (!(await page.locator("#app").innerText()).includes("JEE")) throw new Error("Home page content did not render");

  await page.locator('#app a[href="#c11"]').first().click();
  await page.locator('#app a[href="#b11-physics"]').waitFor({ state: "visible" });
  await page.locator('#app a[href="#b11-physics"]').click();
  await page.locator('#app a[href="#b11-physics-p1"]').waitFor({ state: "visible" });
  await page.locator('#app a[href="#b11-physics-p1"]').click();
  await page.locator("#app .paper").waitFor({ state: "visible" });

  await page.locator("#pg-next").click();
  await page.locator("#app .paper").waitFor({ state: "visible" });
  await page.locator("a.brand").click();
  await page.locator("#app .hero h1").waitFor({ state: "visible" });

  await page.locator('#app a[href="#c11"]').first().click();
  await page.locator('#app a[href="#b11-physics"]').click();
  await page.locator('#app a[href="#b11-physics-toc"]').click();
  const chapterRows = page.locator("#app .tl-list a.tl");
  await chapterRows.nth(1).click();
  await page.locator("#app .op-t").filter({ hasText: "Motion in a Straight Line" }).waitFor({ state: "visible" });

  const topicRows = page.locator("#app .tl-list a.tl");
  await topicRows.filter({ hasText: "2.1 Motion and reference frame" }).click();
  await page.locator("#app .paper").waitFor({ state: "visible" });
  await page.locator("#app .d3 canvas").waitFor({ state: "visible" });

  await page.locator("a.brand").click();
  await page.locator('#app a[href="#c11"]').first().click();
  await page.locator('#app a[href="#b11-physics"]').click();
  await page.locator('#app a[href="#b11-physics-toc"]').click();
  await page.locator("#app .tl-list a.tl").nth(1).click();
  await page.locator("#app .tl-list a.tl").filter({ hasText: "2.3 Average speed and average velocity" }).click();
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
