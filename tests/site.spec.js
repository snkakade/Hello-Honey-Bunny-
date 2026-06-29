import { test, expect } from "@playwright/test";

const pages = ["index.html", "about.html", "products.html", "shop.html", "gallery.html", "faq.html", "contact.html"];

test("every built page renders with images, styles and no browser errors", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const file of pages) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${file}`);
    expect(response.status(), file).toBe(200);
    const images = page.locator("img");
    for (let index = 0; index < await images.count(); index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(() => [...document.images].every((image) => image.complete));
    const imageState = await page.locator("img").evaluateAll((images) => images.map((image) => ({
      src: image.getAttribute("src"),
      complete: image.complete,
      width: image.naturalWidth
    })));
    expect(imageState.filter((image) => !image.complete || image.width === 0), file).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${file} horizontal overflow`).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test("navigation, accordion, gallery and WhatsApp order remain interactive", async ({ page }) => {
  await page.addInitScript(() => {
    window.__openedUrls = [];
    window.open = (url) => window.__openedUrls.push(url);
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/index.html");
  await page.locator(".nav-toggle").click();
  await expect(page.locator("#site-nav")).toHaveClass(/open/);

  await page.goto("/faq.html");
  const question = page.locator(".faq-question").first();
  await question.scrollIntoViewIfNeeded();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");

  await page.goto("/gallery.html");
  const image = page.locator(".gallery-item").first();
  await image.scrollIntoViewIfNeeded();
  await image.click();
  await expect(page.locator("#gallery-modal")).toHaveClass(/open/);
  await page.locator(".modal-close").click();

  await page.goto("/shop.html");
  await page.locator("[data-quantity-action='increase']").first().click();
  await page.locator("#order-name").fill("Test Customer");
  await page.locator("#order-location").fill("Baner, Pune");
  await page.locator("#order-form button[type='submit']").click();
  const url = await page.evaluate(() => window.__openedUrls[0]);
  expect(decodeURIComponent(url)).toContain("Fresh Goat Milk (500 ml) x 1");
});
