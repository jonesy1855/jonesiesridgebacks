# jonesiesridgebacks.co.uk

Static site for Jonesies Ridgebacks, hosted on GitHub Pages (custom domain via
Cloudflare DNS). No build step — plain HTML/CSS/JS.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero and links to the dogs |
| `about.html` | About Steven + the "What to know before getting a puppy" guide |
| `dogs.html` | Index of our three Ridgebacks |
| `zuri.html`, `kiwi.html`, `lyla.html` | Individual dog galleries |
| `gallery.html` | Combined photo gallery |
| `blog.html` | News and external reads |

Shared styles in `css/site.css`; small progressive-enhancement script in
`js/main.js` (mobile nav + missing-photo placeholder).

## Adding photos

Drop image files into `images/` using the exact filenames referenced in the
page markup. Any image that is missing shows a tidy "add file" placeholder
instead of a broken icon. Current filenames expected:

**Zuri:** `zuricamp.jpg`, `sleepyzuri.jpg`, `zuribed.jpg`, `zuri-kiwi.jpg`,
`dogsandgrandma.jpg`, `dogsbeach.jpg`, `zuritable.jpg`, `zuribeach.jpg`

**Kiwi:** `DSCN3409.JPG`, `DSCN2375.JPG`, `IMG_0312.JPG`, `DSCN2398.JPG`,
`DSCN3408.JPG`, `kiandc.jpg`, `citydogs.jpg`

**Lyla:** `lyla_so_beautiful.jpg`, `20220906_090513.jpg`,
`IMG-20220628-WA0000.jpg`, `Lyla_ate_my_homework.jpg`, `Lyla_campin.jpg`,
`Lyla_are_you_comfy.jpg`, `Lyla_pose_garen.jpg`, `Lyla_asleep_woolrug.jpg`

## SEO / meta audit (2026-10-15)

Headers are already compliant across all pages (title, description, canonical,
robots, OG, Twitter Card, theme-color, valid `WebSite` JSON-LD, sitemap,
robots.txt). Four optional polish items are parked for later:

1. **Add `og:image:alt`** to the 8 indexable pages (`index`, `about`, `dogs`,
   `gallery`, `blog`, `zuri`, `kiwi`, `lyla`) — recommended for accessibility;
   validators flag its absence.
2. **Add `og:image:width` / `og:image:height`** — helps social renderers pick
   the aspect ratio before the image loads.
3. **Swap JSON-LD `publisher.logo` off `favicon.svg`** — Google ignores SVG
   logos for the knowledge panel; use a raster PNG ≥112×112.
4. **Compress og:image** — currently ~840KB Cloudinary JPEG; add
   `w_1200,f_auto,q_auto` (or similar) for faster social scrapes.

All four are non-blocking — the site is fully indexable and social cards
already render without them.

## Legacy redirects

Old (pre-rebuild) addresses were 404-ing — notably `/home`, `/our-dogs`,
`/contact` and `/puppies` (Weebly-style URLs without `.html`). GitHub Pages
serves clean URLs, so bare `/about`, `/dogs` etc. already resolve to the
`.html` files. To catch the rest:

- `home.html`, `our-dogs.html`, `contact.html`, `puppies.html` are lightweight
  redirect stubs (meta-refresh + JS) so the extension-less URLs forward to the
  right page.
- `404.html` carries a small JS legacy-URL map as a catch-all.

Both use `noindex, follow` so the stubs don't get indexed but still pass
visitors through.

## Installable app (PWA)

The site can be added to a phone's home screen and opens full-screen, like a
native app:

- `manifest.json` — app name, colours (`#b5532a` terracotta / `#fbf3e8` cream)
  and icons; `display: standalone`, `start_url: /`.
- `icons/` — PNG app icons generated from the `favicon.svg` paw logo:
  `icon-192.png`, `icon-512.png`, a padded `icon-maskable-512.png` for Android
  and `apple-touch-icon.png` (180px) for iOS.
- `sw.js` — service worker. Network-first for page loads (with an offline
  fallback), cache-first with background refresh for CSS/JS/images. Bump
  `CACHE_NAME` (e.g. `-v2`) to force clients to pick up a fresh cache.
- `offline.html` — friendly "You're offline" page, shown when a page can't load.
- Every page links the manifest + icons and registers the service worker via
  `js/main.js`.

To install: Chrome (Android) → menu → "Add to Home screen"; Safari (iOS) →
Share → "Add to Home Screen". Requires HTTPS (already in place).

## Deploy

Push to `main`. GitHub Pages (Settings → Pages → Deploy from branch → `main` /
root) publishes automatically. The `CNAME` file sets the custom domain.

Note: GitHub Pages' CDN caches HTML for ~10 minutes (`cache-control:
max-age=600`). Immediately after a push a device may briefly serve the old
page or a 404 while the new deployment propagates — this is normal and
self-resolves.
