# Redirect map

Cloudflare Pages reads `public/_redirects`. Rules are permanent and point directly to the final canonical destination.

| Legacy URL | Destination |
| --- | --- |
| `/index.html` | `/` |
| `/about.html` | `/our-farm` |
| `/about` | `/our-farm` |
| `/products.html` | `/products` |
| `/shop.html` | `/request-a-batch` |
| `/shop` | `/request-a-batch` |
| `/gallery.html` | `/our-farm#photos` |
| `/gallery` | `/our-farm#photos` |
| `/faq.html` | `/faqs` |
| `/faq` | `/faqs` |
| `/contact.html` | `/contact` |

Path rules preserve query strings under Cloudflare Pages. Host and protocol redirects cannot be expressed safely as path-only Pages `_redirects` rules. Enable Cloudflare **Always Use HTTPS** for the zone and add a Bulk Redirect from `www.hellohoneybunny.com/*` to `https://hellohoneybunny.com/${path}` with query-string preservation. Verify both in a Cloudflare preview because Astro's local static preview does not execute Cloudflare redirect rules.
