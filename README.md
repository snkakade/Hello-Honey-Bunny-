# Hello Honey Bunny static site snapshot

This folder contains a VS Code-ready static rebuild of the public page at `https://www.hellohoneybunny.com/`.

## Files

- `index.html` — static HTML page
- `css/styles.css` — responsive styling
- `js/main.js` — mobile nav, waitlist form behavior, and FAQ accordion
- `assets/images/` — downloaded public images from the site
- `asset-manifest.json` — original asset URLs used or referenced

## Running locally

Open `index.html` directly in a browser, or use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

This is a clean static recreation based on the public page content and assets available at scrape time. It is not the original site builder source code and does not include server-side form handling. The demo waitlist form stores submissions in browser `localStorage` only.

Only reuse third-party/site images, branding, text, or trademarks if you have the right to do so.
