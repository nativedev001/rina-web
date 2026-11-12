# Rina investor website

A separate Next.js App Router / TypeScript website for Rina. The Flutter app and backend are unchanged. Uses the existing Rina logo, purple/pink palette, local Plus Jakarta Sans font, readable 16px body text, and actual Flutter app screenshots.

## Run

```sh
cd /Users/helloo/Desktop/Rina/app_ui/rina-website
npm ci
npm run dev
```

Open http://localhost:3001. For a production build, run `npm run build`. The site exports into `out/`, which can be deployed to any static host. Run `npm start` after building to preview the static production export at http://localhost:3001.

## Included

- Responsive investor landing page with screenshots captured from the real Flutter app.
- Live / Voice / PK / Moments screenshot viewer plus a Home / Profile / Inbox gallery with full-resolution images.
- A filterable inventory of 22 implemented, integration-ready and planned capabilities.
- Creator, community, agency and proposed business-model sections.
- Milestone roadmap, expandable FAQ, investor contact dialog.
- Direct download of a designed seven-page PDF overview, plus a responsive `/investor-brief/` with download and print actions.
- Keyboard focus styles, native modal focus trapping, mobile navigation, reduced-motion support, local fonts, SEO metadata and social artwork.

## Contact and deployment

The investor contact defaults to `faizanrasool041@gmail.com`, as provided by the founder. The contact form opens a prefilled email draft in the visitor's email client. It does not send email or store leads. No backend or credentials are required.

Optional public build-time settings are documented in `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before building for publication so canonical and social image URLs use your domain. Set `NEXT_PUBLIC_INVESTOR_EMAIL` to override the contact address. Rebuild after changing either value. Never put private credentials in public environment variables.

For Vercel, use this folder as the project root; framework Next.js, build command `npm run build`, output `out`. Other static hosts can serve the contents of `out/` directly. The site has not been deployed or submitted to any investor listing service.

## Content sources and editing

`lib/content.ts` holds the feature inventory, status definitions, roadmap and investor contact. `components/website.tsx` holds landing-page copy, FAQs and contact flow. `app/globals.css` holds styling and responsive/print rules. `/investor-brief/` shares the feature inventory with the landing page.

Content is grounded in the existing repository, prioritizing newer implementation documentation over older frontend-only audits:

- `../backend/README.md`
- `../backend/docs/backend-completion.md`
- `../backend/docs/ui-backend-review.md`
- `../backend/docs/party-capture-update.md`
- `../backend/docs/social-solo-games.md`
- Existing Flutter account, agency and branding code.

“Implemented” describes development code, not production deployment or independent verification. Agora media and Stripe sandbox flows require account-backed verification. Live payments/payouts, push, transcoding and production launch work are not represented as completed. No traction, revenue, testimonials, funding target or valuation is invented. Screenshots render actual Flutter widgets using demo/fixture content and are labeled accordingly; sample balances, viewer counts and identities are not traction or revenue claims.

Review the content as implementation progresses. The milestones are proposed directions without promised dates or fixed capital allocations.

## Checks

```sh
npm run typecheck
npm run build
```

The lockfile is included for reproducible installs. Generated output and dependencies are ignored.

## Verified handoff

Production static export and TypeScript compilation pass. Browser checks against the exported site passed at 320, 375, 390, 768 and 1440px without horizontal page scrolling or JavaScript errors. Checks exercised experience tabs, screenshot switching/full-resolution links, status filters, feature expansion, dialogs, validated investor form fields, the email destination, PDF download, mobile navigation and the printable brief. The dependency audit reports zero known vulnerabilities at handoff.

`public/Rina-Investor-Overview.pdf` is the seven-page branded overview served by the Investor Overview download link. A matching copy is in `investor-materials/Rina-Investor-Brief.pdf`. It includes the actual app screens, all 22 feature statuses, proposed business model, remaining launch work, funding priorities, roadmap and contact.

## App screenshot capture

The seven screens in `public/screenshots/` are captures of the actual Flutter UI (780×1688), produced by `scripts/capture_app_screens_test.dart`. No website mockups are used for the phone screens. The capture harness uses existing demo/fixture data and substitutes unavailable native audio/capture services. It does not alter the mobile app. PNG originals are retained alongside optimized WebP versions used by the website.

To recapture, run from `../xena_mobile`:

```sh
flutter test --no-pub ../rina-website/scripts/capture_app_screens_test.dart
```

Regenerate the WebP copies with `node scripts/optimize-screenshots.cjs` from this website folder before rebuilding (uses the workspace backend’s existing Sharp installation). The harness loads the macOS emoji font when present; other platforms can provide an equivalent emoji font. Screenshot typography remains the actual app typography; the website uses Plus Jakarta Sans.

## Regenerate the designed investor PDF

After editing document content or screenshots, run:

```sh
npm run build:investor
```

This builds the static website, generates the PDF using locally installed Google Chrome, verifies that all seven pages fit without clipping, and writes matching copies to `public/`, `out/`, and `investor-materials/`. Set `CHROME_PATH` if Chrome is installed at a custom location. `npm run pdf` regenerates from an existing build.

The document uses A4 pages, Rina branding, embedded local typography, vector icons, real app captures, page numbering, clickable contact links, a tagged PDF and document outline. JPEG copies of the screenshots keep the downloadable PDF compact; WebP copies remain in use on the landing page. `npm run build` on a deployment host includes the prepared PDF without requiring a browser there. Regenerate the PDF locally before publishing content changes.
# rina-web
