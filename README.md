# Hello Honey Bunny

A premium, mobile-first website for Hello Honey Bunny, a small-batch goat dairy near Pune. It is built with Astro and outputs lightweight static HTML, CSS and JavaScript.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`).

Do not open an HTML file directly from the repository. The editable source lives in `src/`; Astro generates the deployable HTML in `dist/`.

## Commands

```bash
npm run dev       # local development server with live updates
npm run check     # Astro and TypeScript diagnostics
npm run build     # validate and create the production site in dist/
npm run preview   # preview the production build
npm run test:e2e  # build and test all pages/interactions in Chromium
```

For the first browser-test run, install Chromium once:

```bash
npx playwright install chromium
```

## Project structure

```text
public/
  assets/images/       Original logo and editorial WebP images
  robots.txt           Search crawler rules
  sitemap.xml          Public page URLs
src/
  components/          Shared header, footer, heroes, CTAs and FAQ UI
  config/site.js       Phone, WhatsApp, email, address, socials and navigation
  data/faqs.js         Shared FAQ content and schema source
  layouts/             Shared metadata, structured data and page shell
  pages/               The seven editable website pages
  scripts/             Navigation, motion, gallery and commerce interactions
  styles/              Design system and section-specific CSS modules
tests/site.spec.js     Page, image, responsive and interaction checks
```

The original logo is `public/assets/images/logo.png`. Keep its artwork unchanged.

## Update business details

Edit `src/config/site.js` to change:

- WhatsApp and display phone numbers
- email address
- farm location and structured address
- social links
- navigation labels

Use only the country code and number in `whatsappNumber`—no `+`, spaces or punctuation.

## Update products and ordering

- Product storytelling: `src/pages/products.astro`
- Orderable product cards: `src/pages/shop.astro`
- Cart and WhatsApp message logic: `src/scripts/commerce.js`

Each order card uses `data-product-id`, `data-product-name` and `data-product-size`. Keep those values unique and retain the quantity controls when adding an item.

Orders are intentionally confirmed manually. When a backend is introduced, replace the submit flow in `src/scripts/commerce.js` with an API request, then add server-side validation, inventory, pricing, delivery and payment handling. Add a privacy policy before storing customer details.

## Update FAQs

Edit `src/data/faqs.js`. The full FAQ page, home-page preview and `FAQPage` structured data all use this single source, so answers stay consistent.

## Replace photos or videos

Put optimized images in `public/assets/images/editorial/`, then update the relevant `src`, intrinsic `width`/`height` and descriptive `alt` text in `src/pages/`.

Recommended:

- WebP or AVIF
- 1600–2000 px wide for heroes
- 900–1400 px wide for cards
- under 250 KB where practical
- consistent warm, neutral colour grading

Gallery film cards are marked with `data-video="true"`. Their current modal is an intentional placeholder. To add footage, update `src/scripts/gallery.js` to render a local `<video controls>` element or a privacy-conscious hosted embed. Never autoplay with sound.

## SEO and launch checklist

Each page defines its own title, description, canonical path and social image through `BaseLayout`. Business, product and FAQ structured data are generated alongside visible content.

Before launch:

1. Confirm the production domain in `astro.config.mjs` and `src/config/site.js`.
2. Update domain references in `public/sitemap.xml` and `public/robots.txt`.
3. Confirm the phone, email and address.
4. Replace `#` social placeholders.
5. Add a dedicated 1200 × 630 social image if desired.
6. Run `npm run test:e2e`.
7. Submit the sitemap in Google Search Console.

## Accessibility and motion

The site includes semantic landmarks, keyboard-accessible navigation and controls, visible focus states, form feedback, responsive layouts and reduced-motion support. Test meaningful content changes with a keyboard and at a narrow mobile width before publishing.
