import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

const canonicalRoutes = ["/", "/fresh-goat-milk", "/goat-milk-paneer", "/products", "/request-a-batch", "/our-farm", "/for-chefs-and-retailers", "/faqs", "/contact", "/privacy"];
const indexableRoutes = canonicalRoutes;
const viewports = [[360,800],[390,844],[768,1024],[1024,768],[1440,900]];

test("canonical pages have complete, unique SEO and valid structured data", async ({ page }) => {
  const titles = new Set(); const descriptions = new Set();
  for (const route of canonicalRoutes) {
    const response = await page.goto(route); expect(response.status(), route).toBe(200);
    await expect(page.locator("h1"), `${route} one H1`).toHaveCount(1);
    const canonical = page.locator("link[rel='canonical']"); await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", `https://hellohoneybunny.com${route}`);
    const title = await page.title(); const description = await page.locator("meta[name='description']").getAttribute("content");
    expect(title).toBeTruthy(); expect(description).toBeTruthy(); expect(titles.has(title), `${route} unique title`).toBeFalsy(); expect(descriptions.has(description), `${route} unique description`).toBeFalsy(); titles.add(title); descriptions.add(description);
    const blocks = await page.locator("script[type='application/ld+json']").allTextContents(); blocks.forEach((block) => expect(() => JSON.parse(block)).not.toThrow());
  }
});

test("internal links are canonical, valid and do not use placeholders", async ({ page, request }) => {
  const links = new Set();
  for (const route of canonicalRoutes) { await page.goto(route); const hrefs = await page.locator("a[href]").evaluateAll((items) => items.map((item) => item.getAttribute("href"))); hrefs.filter((href) => href?.startsWith("/")).forEach((href) => links.add(href.split("#")[0].split("?")[0] || "/")); expect(hrefs.some((href) => href === "#"), `${route} placeholder link`).toBeFalsy(); expect(hrefs.some((href) => href?.includes(".html")), `${route} html link`).toBeFalsy(); }
  for (const href of links) { const response = await request.get(href); expect(response.status(), href).toBe(200); }
});

test("sitemap and robots expose canonical production URLs only", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text(); const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("https://hellohoneybunny.com/sitemap.xml");
  for (const route of indexableRoutes) expect(sitemap).toContain(`<loc>https://hellohoneybunny.com${route}</loc>`);
  expect(sitemap).not.toContain(".html"); expect(sitemap).not.toContain("/404");
});

test("Cloudflare redirect map is permanent and single hop", async () => {
  const rules = await readFile("public/_redirects", "utf8");
  const expected = [["/index.html","/"],["/about.html","/our-farm"],["/about","/our-farm"],["/products.html","/products"],["/shop.html","/request-a-batch"],["/shop","/request-a-batch"],["/gallery.html","/our-farm#photos"],["/gallery","/our-farm#photos"],["/faq.html","/faqs"],["/faq","/faqs"],["/contact.html","/contact"]];
  for (const [from,to] of expected) expect(rules).toContain(`${from} ${to} 301`);
});

test("planned products are not orderable or represented as current schema", async ({ page }) => {
  await page.goto("/request-a-batch"); expect(await page.locator("[data-product-id]").allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining("Fresh Goat Milk"),expect.stringContaining("Goat Milk Paneer")])); await expect(page.locator("[data-product-id]")).toHaveCount(2); expect((await page.locator("main").innerText()).toLowerCase()).not.toContain("curd"); expect((await page.locator("main").innerText()).toLowerCase()).not.toContain("cheese");
  for (const route of canonicalRoutes) { await page.goto(route); const schemas = (await page.locator("script[type='application/ld+json']").allTextContents()).join(" "); expect(schemas).not.toContain('"@type":"Offer"'); expect(schemas).not.toContain("InStock"); expect(schemas).not.toContain("Goat Milk Curd"); expect(schemas).not.toContain("Goat Cheese"); }
});

test("batch request validates fields and creates the approved WhatsApp message with fallback", async ({ page }) => {
  await page.addInitScript(() => { window.open = () => null; Object.defineProperty(navigator, "clipboard", { value: { writeText: async (text) => { window.__copied = text; } } }); });
  await page.goto("/request-a-batch"); await page.locator("#batch-form button[type='submit']").click(); await expect(page.locator("#request-status")).toContainText("Choose at least one");
  await page.locator("[data-action='increase']").first().click(); await page.locator("#batch-form button[type='submit']").click(); await expect(page.locator("#request-name")).toHaveAttribute("aria-invalid", "true");
  await page.locator("#request-name").fill("Test Customer"); await page.locator("#request-area").fill("412201"); await page.locator("#request-arrangement").selectOption({ label: "Either option" });
  await page.locator("#request-date").evaluate((input) => { input.removeAttribute("min"); input.value = "2000-01-01"; }); await page.locator("#batch-form button[type='submit']").click(); await expect(page.locator("#request-date-error")).toContainText("today or a future date");
  await page.locator("#request-date").fill(""); await page.locator("#batch-form button[type='submit']").click(); await expect(page.locator("[data-fallback]")).toBeVisible(); const message = await page.locator("[data-request-text]").innerText(); expect(message).toContain("Fresh Goat Milk (500 ml) x 1"); expect(message).toContain("Please confirm current batch availability, final pricing"); expect(message).not.toContain("Hello Hello Honey Bunny"); await page.locator("[data-copy-request]").click(); expect(await page.evaluate(() => window.__copied)).toContain("Fresh Goat Milk (500 ml) x 1");
});

test("mobile menu supports keyboard, Escape and focus return", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/"); const toggle = page.locator(".nav-toggle"); await toggle.focus(); await page.keyboard.press("Enter"); await expect(toggle).toHaveAttribute("aria-expanded", "true"); await expect(toggle).toContainText("Close menu"); await expect(page.locator("#site-nav")).toBeVisible(); await expect(page.locator("#site-nav a").last()).toBeVisible(); await page.keyboard.press("Escape"); await expect(toggle).toHaveAttribute("aria-expanded", "false"); await expect(toggle).toBeFocused(); await expect(toggle).toContainText("Open menu");
  await page.setViewportSize({ width: 950, height: 800 }); await toggle.click(); await expect(page.locator("body")).toHaveClass(/menu-open/); await page.setViewportSize({ width: 1000, height: 800 }); await expect(toggle).toHaveAttribute("aria-expanded", "false"); await expect(page.locator("body")).not.toHaveClass(/menu-open/);
});

test("all required viewports avoid horizontal overflow and browser errors", async ({ page }) => {
  const errors = []; page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); }); page.on("pageerror", (error) => errors.push(error.message));
  for (const [width,height] of viewports) { await page.setViewportSize({width,height}); for (const route of canonicalRoutes) { await page.goto(route); const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); expect(overflow, `${route} at ${width}x${height}`).toBeLessThanOrEqual(1); } }
  expect(errors).toEqual([]);
});

test("images load, meaningful alt text is present and LCP images are eager", async ({ page }) => {
  for (const route of canonicalRoutes) { await page.goto(route); const images = page.locator("img"); for (let i=0;i<await images.count();i+=1) await images.nth(i).scrollIntoViewIfNeeded(); await page.waitForFunction(() => [...document.images].every((image) => image.complete)); const states = await images.evaluateAll((items) => items.map((img) => ({ width: img.naturalWidth, alt: img.getAttribute("alt") }))); states.forEach((state) => { expect(state.width).toBeGreaterThan(0); expect(state.alt).not.toBeNull(); }); const priority = page.locator("img[fetchpriority='high']"); if (await priority.count()) await expect(priority.first()).not.toHaveAttribute("loading", "lazy"); }
});

test("pages have no serious or critical accessibility violations", async ({ page }) => {
  for (const route of canonicalRoutes) { await page.goto(route); const results = await new AxeBuilder({ page }).analyze(); const blocking = results.violations.filter((item) => ["serious","critical"].includes(item.impact)); expect(blocking, route).toEqual([]); }
});

test("site remains readable without JavaScript and 404 is noindex", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage(); await page.goto("/"); await expect(page.locator("h1")).toBeVisible(); await expect(page.locator("main")).toContainText("Small-batch goat milk near Pune"); await page.goto("/404"); await expect(page.locator("h1")).toContainText("could not find"); await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", "noindex, follow"); await context.close();
});
