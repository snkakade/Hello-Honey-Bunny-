# Hello Honey Bunny Design System

## Brand character

The site should feel warm, rural, refined and quietly premium. It is an editorial farm brand, not a supermarket, medical product or generic software landing page. The visual tone is calm confidence: generous typography, restrained ornament and direct, honest actions.

## Core palette

Use the existing CSS variables as the source of truth:

- `--forest` and `--forest-deep`: primary brand surfaces, headers, high-intent CTA bands and footer.
- `--milk` and `--cream`: primary page and card surfaces.
- `--honey` and `--honey-dark`: highlights, small labels, focus states and selective emphasis.
- `--ink` and `--muted`: body copy and supporting information.
- `--line`: quiet structural borders.

Do not introduce purple, bright technology colours or decorative gradients. Honey is an accent, not a full-page background.

## Typography

- Display serif: H1, H2 and H3. Use it for warmth and editorial authority.
- Sans serif: body copy, navigation, labels, buttons and form controls.
- One H1 per page.
- Keep headings short, balanced and conversational. Avoid keyword-stuffed titles.
- Eyebrows are short uppercase orientation labels, not substitute headings.

## Layout and spacing

- Use the existing container, section and spacing tokens.
- Prefer clear editorial splits, purposeful feature rows and asymmetric emphasis over repetitive generic card grids.
- Use the established radius hierarchy: small controls use `--radius-sm`, cards use `--radius-md`, and major visual frames may use `--radius-lg`.
- Maintain visible breathing room, but keep conversion forms and plan comparisons compact enough to understand in one screen where practical.

## Buttons and conversion hierarchy

- Primary action: solid forest on light surfaces or solid honey on forest surfaces.
- Secondary action: outlined or quiet text link.
- CTA text should state the next result, for example "Check 4 L weekly availability" or "Check this route on WhatsApp".
- Add a directional arrow only where it clarifies navigation or an external WhatsApp handoff.
- Do not place several visually equal buttons together. One action must clearly lead.
- Reduce uncertainty near high-intent actions with short reassurance such as "No payment now" or "Final price confirmed first".

## Cards

- Cards use milk or cream surfaces, a one-pixel line and minimal shadow.
- Use forest feature cards sparingly to identify a genuinely recommended choice.
- Do not use percentage language or internal pricing logic in customer-facing plan cards.
- Plan cards should explain who the quantity suits, what is included, what happens next and one direct action.
- Delivery route cards should show corridor name, covered localities, scheduled route days, approximate window and a route-specific enquiry link.

## Imagery and decoration

- Prefer original Hello Honey Bunny illustrations and farm-led photography.
- Images should use explicit width and height, useful alt text and efficient formats.
- Organic circles and landscape motifs may support the composition, but must not obscure content or create large empty areas.
- Never embed private coordinates, internal dispatch details or operational metadata in visual assets.

## Forms

- Use the established forest panel with milk-coloured inputs.
- Labels remain visible above inputs. Do not rely on placeholders as labels.
- Keep required fields to the minimum needed for fulfilment.
- On mobile, stack fields and keep submit actions full width.
- Validation messages must be clear, nearby and accessible.

## Responsive and accessibility rules

- Start with the 320 px experience and expand deliberately.
- Prevent horizontal overflow at every supported breakpoint.
- Touch targets should be at least 44 px high.
- Preserve visible keyboard focus and logical source order.
- Normal text should meet WCAG AA contrast. Never use colour alone to communicate state.
- Honour reduced-motion preferences and keep animation subtle.

## Footer and consent

- Keep the existing footer logo size unchanged.
- Social, privacy and analytics preference controls belong in the footer metadata row.
- The saved analytics preference control must not float above page content.
- The first-choice consent panel may remain fixed so a new visitor can make an informed choice.
