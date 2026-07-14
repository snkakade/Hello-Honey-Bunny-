# Hello Honey Bunny

Astro 7 static website for a small-batch goat dairy in Kunjirwadi, Maharashtra 412201, near Pune. The site is focused on current batch availability for fresh goat milk and goat milk paneer.

The visual system combines responsive Astro imagery with GSAP and ScrollTrigger motion. Animations are progressive enhancement only: content remains visible and navigation remains usable when JavaScript is unavailable, and motion is disabled when the user requests reduced motion.

## Local development

Node.js 22 or newer is required.

```bash
npm ci
npm run dev
npm run check
npm run build
npm run test:e2e
```

The build includes the content-safety check. Run it independently with `npm run content:check`.

## Route map

Canonical routes use no file extension and no trailing slash:

- `/`
- `/fresh-goat-milk`
- `/goat-milk-paneer`
- `/products`
- `/request-a-batch`
- `/our-farm`
- `/for-chefs-and-retailers`
- `/faqs`
- `/contact`
- `/privacy`

`/404` is generated but excluded from the sitemap and marked noindex. Legacy routes are mapped in `public/_redirects`; see `docs/redirect-map.md`.

## Product and business data

`src/data/products.ts` is the only product source. Change `status`, `requestable`, `planned`, `schemaEnabled` and `indicativePackSizes` there. A current product must be requestable, not planned and explicitly schema-enabled. Planned products must remain non-requestable and schema-disabled.

Business name, telephone, WhatsApp digits, email, postal address, social links and the defensive quantity limit live in `src/config/site.ts`. Add a social link only after its public profile is verified, then render it in `src/components/Footer.astro`.

The request builder is server-rendered from the product source. `src/scripts/request-builder.js` formats the WhatsApp message and shows the copy fallback. `src/scripts/business-form.js` handles food business enquiries. Neither script sends form values to this website.

## SEO, redirects and deployment

`BaseLayout.astro` supplies metadata and accepts schema objects. `src/utils/schema.ts` builds homepage, product and breadcrumb schema. Product schema deliberately has no Offer because no public price exists.

`src/pages/sitemap.xml.ts` generates the sitemap from the canonical route list. `public/robots.txt` points to the production sitemap. Cloudflare Pages reads redirects from `public/_redirects` and response headers from `public/_headers`.

For Cloudflare Pages use:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22

The GitHub Pages workflow sets `GITHUB_PAGES=true`; Astro then applies `/Hello-Honey-Bunny-/` as the base path for preview assets and internal links. Canonical tags continue to target the production domain.

## Images and brand assets

The retired public logo is archived at `docs/archive/legacy-logo.png`. Current original wordmark, favicon and social assets are in `public/assets/brand/`. Existing photographs are in `public/assets/images/editorial/`. Before publishing a replacement image:

1. Confirm its provenance and permission for use.
2. Optimise it to WebP or AVIF where suitable.
3. Add intrinsic dimensions and factual alt text.
4. Do not imply an unverified farm practice, breed, process or availability state.

The generated editorial illustrations live in `src/assets/images/illustrated-landscape-v2.webp` and `src/assets/images/illustrated-still-life-v2.webp`. They are intentionally illustrative and must not be described as documentary farm photography.

## Motion system

`src/scripts/motion.js` imports GSAP and ScrollTrigger from the local `gsap` package. It controls the hero entrance, scroll reveals, image depth, section ornaments and fine-pointer button movement. Keep all essential information visible before the script runs, avoid animating layout-critical dimensions and test every change with reduced motion enabled.

## Verification

`npm run test:e2e` checks canonical pages, metadata, internal links, sitemap, redirect configuration, schema parsing, request safeguards, mobile navigation, viewport overflow, images, JavaScript-free readability and axe accessibility results.

Structured data can also be checked by parsing every `application/ld+json` block in `dist`, then using Google's Rich Results Test against a deployed preview. Follow `docs/deployment-checklist.md` for Cloudflare, Search Console and rollback steps.
