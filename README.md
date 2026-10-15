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

## Deploy

Push to `main`. GitHub Pages (Settings → Pages → Deploy from branch → `main` /
root) publishes automatically. The `CNAME` file sets the custom domain.
