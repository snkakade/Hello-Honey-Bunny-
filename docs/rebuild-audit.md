# Local SEO and marketing rebuild audit

## Starting point

- Branch: `codex/local-seo-marketing-rebuild`
- Starting branch: `hhb-revamped-june2026`
- Starting commit: `df946a6cc5be75b22c33aad5623fff5a60eaa2f0`
- Baseline date: 14 July 2026, Europe/London
- Runtime: local macOS workspace, Node.js project dependencies installed with `npm ci`

## Baseline commands

| Command | Result |
| --- | --- |
| `npm ci` | Passed. 284 packages installed. Four moderate development-tool findings reported. |
| `npm run check` | Passed. 25 files, zero errors, warnings or hints. |
| `npm run build` | Passed. Seven static `.html` pages generated. |
| `npm run test:e2e` | Passed. Two Chromium tests in 15.3 seconds. |
| `npm audit` | Four moderate findings in the Astro language/checking toolchain. |
| `npm audit --omit=dev` | Zero production dependency findings. |

The development findings trace through `@astrojs/language-server`, `yaml-language-server`, `volar-service-yaml` and `yaml`. No automatic major-version audit fix was applied.

## Baseline screenshots

Required sizes were 390 by 844, 768 by 1024 and 1440 by 900. The approved in-app browser surface reported no available browser in this session, so baseline screenshots could not be captured. The empty `docs/screenshots/baseline/` directory is retained to make the missing evidence explicit. No substitute screenshots are presented as baseline evidence.

## Repository findings

- Seven hand-authored pages used `.html` canonicals and internal links.
- The sitemap was hand-maintained with priorities and legacy URLs.
- Current and future product data was duplicated across pages and JavaScript.
- The request script assembled HTML strings and produced an inaccurate greeting.
- The separate gallery repeated four available images and included placeholder film interactions.
- Global scripts loaded navigation, accordions, commerce, gallery and motion code on every page.
- Public social links included `href="#"` placeholders.
- The old public logo contained unsupported wording and an establishment year.
- GitHub Pages deployment was configured; Cloudflare behaviour was described only in the README. No version-controlled Cloudflare redirects or headers existed.
- The web manifest implied an installable experience that the static marketing site did not provide.

## Rebuild decisions

- Canonical URLs are extensionless and use no trailing slash.
- `src/data/products.ts` controls every current product surface.
- The only requestable products are fresh goat milk and goat milk paneer.
- Planned products are visible only in the restrained development section.
- Product schema contains no Offer, price or availability property.
- Native `details` and `summary` replaced accordion JavaScript.
- Gallery, modal, motion, parallax and global commerce scripts were removed.
- Cloudflare Pages redirect and response-header files were added.
- The manifest was removed because the site does not provide an installable-app experience.

## Performance testing environment

Automated responsive checks use Playwright Chromium at 360 by 800, 390 by 844, 768 by 1024, 1024 by 768 and 1440 by 900 on the local machine without network throttling. This is a lab and functional environment, not field Core Web Vitals evidence. A production Lighthouse run with documented hardware and mobile throttling remains a deployment action.

## Final evidence

- `npm run check`: passed with zero errors, warnings or hints across 30 files.
- `npm run build`: passed, including source and built-content safety checks and responsive AVIF/WebP generation.
- `npm run test:e2e`: 11 tests passed across canonical pages and the five required viewports.
- Accessibility: no serious or critical axe violations, including colour contrast checks.
- `GITHUB_PAGES=true npm run build`: passed; preview links and generated image URLs include the repository base path while canonicals retain the production host.
- `npm audit`: four known moderate findings in development tooling.
- `npm audit --omit=dev`: zero findings.

The approved in-app browser remained unavailable, so final screenshots and Lighthouse output could not be captured in this session. The draft pull request records this limitation rather than presenting substitute evidence. The final branch commit SHA is recorded in the pull request and deployment handoff.

## Visual redesign iteration

The follow-up design pass adds an editorial forest, honey, clay and cream system; a more expressive system-serif typography stack; two original illustrative assets; layered responsive layouts; and GSAP 3.15 motion with ScrollTrigger. The illustrations are intentionally non-documentary and do not represent live inventory or verified farm scenes.

Motion remains progressive enhancement. Reduced-motion users receive the static layout, essential content is visible without JavaScript, and the mobile navigation remains usable if scripts fail. The complete SEO, content-safety, accessibility and five-viewport test suite passes after the redesign. The in-app browser remained unavailable for a manual rendered visual review, so that preview task remains explicitly open rather than being represented as complete.
