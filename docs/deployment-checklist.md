# Deployment checklist

## Before deployment

1. Record the current production commit and preserve the previous successful Cloudflare deployment.
2. Run `npm ci`, `npm run check`, `npm run build`, `npm run test:e2e`, `npm audit` and `npm audit --omit=dev`.
3. Preview `dist` locally at all documented viewports.
4. Confirm `sitemap.xml` is valid XML and contains only canonical indexable URLs.
5. Confirm `robots.txt` references `https://hellohoneybunny.com/sitemap.xml`.
6. Parse every JSON-LD block.
7. Enable Always Use HTTPS, configure the documented `www` Bulk Redirect, then deploy a Cloudflare preview and test every path rule, including query strings and one-hop behaviour.
8. Confirm all canonicals use the production domain and every WhatsApp link uses `918208665234`.
9. Reconfirm the public email and LinkedIn profile with the business owner.
10. Confirm no private farm directions or planned-product order controls are present.
11. Verify the response headers in `public/_headers` do not block scripts, styles, images, WhatsApp or email handoffs.
12. Record final screenshots and the final commit SHA.

HSTS is deliberately omitted until HTTPS and subdomain ownership are verified. The inline script allowance in the initial CSP supports JSON-LD and should be tightened only after a deployed preview proves a nonce or hash strategy.

## After deployment

1. Test apex HTTPS, HTTP redirect and `www` redirect.
2. Test all legacy URLs, sitemap and robots responses.
3. Inspect rendered canonical tags on the homepage, milk, paneer and food-business pages.
4. Test WhatsApp and copy fallbacks on Android, iOS and desktop where available.
5. Run Lighthouse with the device, CPU and network throttling recorded. Do not present lab results as field Core Web Vitals.
6. Run Google's Rich Results Test for the homepage and both current product pages.
7. Submit the sitemap in Search Console and inspect the homepage, milk, paneer and food-business URLs.
8. Monitor 404 responses, redirect errors, indexing and conversion behaviour.

## Rollback

Rollback triggers include incorrect canonicals, redirect loops, failed WhatsApp handoff, missing current products, CSP failures, major mobile layout problems, unavailable sitemap or new-page 404s.

1. Restore the previous successful Cloudflare deployment.
2. Restore the recorded production commit.
3. Keep only emergency redirects that prevent broken indexed URLs.
4. Document the fault and correct it on the rebuild branch.
5. Repeat the complete verification checklist before redeployment.
