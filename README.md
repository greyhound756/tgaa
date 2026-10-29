# VECHTEL Engineering & Construction — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. It builds as a static site with no server needed.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out — upload to any static host (Vercel, Netlify, S3, etc.)
```

## Configure (environment variables)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL that receives the contact form as JSON POST (`name, email, company, inquiryType, message, page`). Works with Formspree, Basin, HubSpot forms API or your own function. **If it's not set, the form validates but tells the user nothing was sent.** |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for canonical URLs, the sitemap and robots.txt. |

## Where things are
- `lib/content.ts`: all copy (navigation, expertise, sectors, approach, job posting).
- `lib/media.ts`: photo list (Unsplash CDN ids and alt text). Swap ids or point to your own images here.
- `app/`: pages: `/`, `/company`, `/expertise`, `/sectors`, `/careers`, `/careers/validation-testing-engineer`, `/contact`, and a 404 page.
- `components/`: header (transparent → solid, full-screen mobile menu), footer, expertise list/accordion, approach timeline, contact form, motion.
- `public/brand/`: the VECHTEL logo, unchanged and only trimmed of empty margin. Favicons are in `app/`.
- `OWNER_CHECKLIST.md`: information still needed before launch.

## Photos (temporary → permanent)
All photo slots are listed in `lib/media.ts`. **A block is shown only when its photo is stored in the project**: `local` in `lib/media.ts`, or an entry in `lib/local-photos.json`. Slots without a stored photo are hidden, so the site never shows empty grey boxes. 8 temporary architecture photos (free Unsplash images, via github.com/ServiceStack/images) are included.

**Save the temporary photos into the project** (recommended, so the site doesn't depend on the Unsplash CDN):
```bash
npm run photos          # downloads every slot to public/photos/ (1080px + 2400px)
npm run dev             # restart to use them
```
It writes `lib/local-photos.json`; the site uses those files automatically. `npm run photos -- --force` re-downloads.

To use VECHTEL's own photo for a slot:
1. Put the file in `public/photos/`, e.g. `public/photos/hero.jpg` (JPG or WebP, ~2400px wide for full-screen slots, ~1600px for the rest).
2. In `lib/media.ts`, add `local: "/photos/hero.jpg"` to that slot (and update `alt`).
3. Once the photos are VECHTEL's own projects, the "Illustrative image" labels can be removed.

## Logo intro
- On the home page, the VECHTEL wordmark flies along a curved path and lands in the globe (`components/Intro.tsx`; styles in `app/globals.css`, section "Logo intro"). It lasts about 3 seconds, then a curtain lifts to the first screen.
- It plays once per browser session, never for visitors with reduced-motion enabled, and can be skipped with the button, Escape, a click or scrolling.
- Add `?intro` to the URL to replay it (e.g. `https://site/?intro`).
- The two animation layers (`public/brand/intro-globe.webp`, `intro-wordmark.webp`) are cut from the original logo file, so the landed result is the logo unchanged.

## Notes
- Fonts (Archivo variable, IBM Plex Mono) are self-hosted. There are no external font requests.
- Motion: text reveals, light photo parallax and a timeline line-draw. There is no preloader and no scroll hijacking. Everything turns off under `prefers-reduced-motion`.
- Accessibility: skip link, visible focus, semantic landmarks, an accordion with `aria-expanded`, and a focus-trapped mobile menu with Escape to close. Form errors are linked with `aria-describedby`.
