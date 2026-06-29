# Hello Honey Bunny

A premium, mobile-first static website for Hello Honey Bunny, a small-batch goat dairy near Pune.

## Run locally

No build step or package install is required.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Structure

- `index.html` — home
- `about.html` — farm story and values
- `products.html` — product range and launch status
- `shop.html` — WhatsApp order builder
- `gallery.html` — filterable gallery and lightbox
- `faq.html` — accessible FAQs and FAQ schema
- `contact.html` — enquiries, partnerships and visits
- `css/styles.css` — design system and responsive layouts
- `js/main.js` — navigation, motion, accordions, gallery, cart and forms
- `assets/images/logo.png` — original logo; keep this file unchanged
- `assets/images/editorial/` — optimized original WebP photography
- `sitemap.xml`, `robots.txt` — search discovery files

## Update products

Product storytelling lives in `products.html`. Orderable items live in `shop.html`.

For each shop item:

1. Duplicate or edit an element with `data-product-id`.
2. Give it a unique `data-product-id`.
3. Update `data-product-name` and `data-product-size`.
4. Keep the quantity buttons and `output` element inside the card.

Prices are intentionally confirmed manually because availability and pack details are not yet fixed. When pricing is stable, add it to both the card and generated message in `js/main.js`.

## Update the WhatsApp number

Change the constant at the top of `js/main.js`:

```js
const WHATSAPP_NUMBER = "918208665234";
```

Use the country code and number only—no `+`, spaces or punctuation. The footer and farm-visit links also contain the number. Search the project for `918208665234` and replace every occurrence.

## Replace photos or videos

Place optimized images in `assets/images/editorial/` and update the matching `src`, `width`, `height` and descriptive `alt` text.

Recommended:

- WebP or AVIF
- 1600–2000 px wide for hero images
- 900–1400 px wide for cards
- under 250 KB where practical
- consistent warm, neutral color grading

Gallery video cards currently use `data-video="true"` placeholders. To add real video, update the gallery modal code in `js/main.js` to insert a local `<video controls>` element or privacy-conscious hosted embed. Never autoplay with sound.

## SEO and business details

Every page has a unique title, description, canonical URL and social metadata. Before launch:

1. Confirm the production domain and update canonical, Open Graph and sitemap URLs if needed.
2. Confirm the phone, email and postal address.
3. Replace placeholder social links (`href="#"`).
4. Add a dedicated 1200 × 630 social image if desired.
5. Submit `sitemap.xml` in Google Search Console.

Structured data is included for the business, FAQs and available products. Keep it consistent with visible content.

## Future backend or checkout

The order and contact flows generate WhatsApp messages in the browser. No customer details are stored by this site.

To add a backend:

1. Replace the submit handlers marked in `js/main.js` with calls to your API.
2. Validate all input again on the server.
3. Add inventory, pricing, delivery and payment services.
4. Show server-backed confirmation and error states.
5. Add a privacy policy before storing personal data.

The existing HTML forms and product data attributes can remain as the front-end interface or be migrated to framework components later.

## Accessibility and motion

- Semantic landmarks and heading order
- Keyboard-accessible navigation, accordions and gallery modal
- Visible focus states
- Live regions for form and cart feedback
- `prefers-reduced-motion` support
- Lazy-loaded below-the-fold imagery

Test product changes with keyboard navigation and on a small mobile screen before publishing.
