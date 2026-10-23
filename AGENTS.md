# Hello Honey Bunny Website Rules

These instructions apply to the entire repository.

## Product and customer promise

- Present Hello Honey Bunny as a small-batch goat dairy serving Pune and nearby PCMC through planned delivery corridors.
- Availability, final price, route day and fulfilment arrangement must be confirmed personally before an order is accepted.
- Never promise unlimited supply, guaranteed delivery, guaranteed freshness, fixed daily delivery across Pune or an always-available product.
- Use plain customer language. Prefer "Check availability", "Confirm your route" and "Reserve a weekly quantity" over internal business terminology.
- Keep health and nutrition language factual and conservative. Do not diagnose, prescribe, promise treatment outcomes or imply that goat milk cures a condition.

## Delivery and location privacy

- Public route content may show only customer-facing corridor names, covered localities, scheduled route days and approximate windows.
- Do not expose internal processing or dispatch locations, private coordinates, vehicle origins, exact navigation paths, GeoJSON, hidden map markers or operational notes in HTML, scripts, metadata, structured data, comments, assets or network calls.
- Do not create navigation-grade public route maps. If a visual is needed, use generalised corridor graphics without precise start or end coordinates.
- Treat route days as scheduled service days, not guarantees. State that the current batch, date and window are confirmed before accepting an order.
- Boundary locations such as Wakad and Shivajinagar require address review and a stable route assignment.

## Conversion and analytics

- Every important page should have one clear primary action and no more than one nearby secondary action.
- WhatsApp CTAs should use a prefilled message that captures the page context, area and intended quantity without sending sensitive form content to analytics.
- Add `data-analytics-location` and `data-analytics-label` to conversion links.
- Track intent, not personal data. Never send names, addresses, notes, phone numbers or message contents to GA4.
- Keep the analytics preference control in the footer. Only the first-choice consent panel may overlay the page when a visitor has no saved preference.

## SEO and content

- Preserve one search intent per indexable page. Do not create near-duplicate location pages that compete with an existing page.
- Keep one H1 per page, descriptive H2 and H3 hierarchy, useful internal links, accurate canonicals and unique metadata.
- Write location names naturally. Use "Koregaon Park (KP)" as the canonical form.
- Optimise for people first: headings must answer the visitor's decision, not read like keyword lists.
- Do not invent prices, certifications, customer reviews, stock, delivery guarantees or health claims.
- Run `npm run build`; it includes content safety checks and Astro validation.

## Design and implementation

- Follow `DESIGN.md` and reuse existing components, tokens and layout patterns before adding new ones.
- Build mobile-first and verify at 320, 768, 1024 and 1440 px when a layout changes materially.
- Use semantic HTML, visible focus states, keyboard-accessible controls and WCAG AA contrast.
- Keep pages fast: use existing optimised assets, explicit image dimensions and minimal client JavaScript.
- Do not change the footer logo dimensions unless the user explicitly requests it.

## Verification and delivery

- For visual work, validate locally in the browser before pushing. A successful local browser pass does not need to be repeated in the browser after Cloudflare publishes.
- After pushing, use a lightweight deployment-status check. Only run a live content or browser check when deployment fails, the production response is unexpected, or the user specifically requests it.
- Do not stage unrelated working-tree changes. Commit only files that belong to the current task.
