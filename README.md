# TrailBite

A React storefront for **TrailBite**, a fictional trail-food shop delivering freeze-dried meals, snacks, drink mixes, camp kitchen kit, trail gear and merch within Islamabad and Rawalpindi. It also includes a trail finder for hikes around the twin cities and a Trail Journal.

Built for CS4032 Web Programming, Assignment 02. All orders are **simulated**: no payment is taken and nothing is delivered.

## Student details

- Name: TODO
- Roll number: TODO
- Section: TODO
- GitHub repository: TODO
- Live deployment: TODO
- Final commit hash: TODO

## Commands

Requires Node.js 20.19+ (developed on Node 24).

```sh
npm install      # install dependencies
npm run dev      # start the development server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm test         # run business-rule tests with node --test
```

## Business profile

| Element | Detail |
|---|---|
| Offering | Trail meals, breakfasts, snacks, drinks, camp kitchen, trail gear and merch (30 products in 7 categories) |
| Audience | Hikers, campers and university outdoor clubs in the twin cities |
| Operating area | Home delivery within Islamabad and Rawalpindi only |
| Main customer task | Compare trail food, build a multi-item trip order, place a simulated order |
| Business goal | A completed, valid trip order the customer has reviewed |

## Operating rules

| # | Category | Rule | Boundary |
|---|---|---|---|
| 1 | Availability | 1–5 units per product, and never more than the stock left. Out-of-stock items cannot be added. | Stock 18: 5 accepted, 6 rejected. Stock 2: 3 rejected. |
| 2 | Eligibility | Orders containing gas canisters or knives need a customer aged 18+ (date of birth at checkout). | 18th birthday today: accepted. Tomorrow: rejected. |
| 3 | Fulfilment | Delivery to Islamabad/Rawalpindi only. Rs 150 delivery below Rs 2,000; free at Rs 2,000 or more. | Rs 1,999: Rs 150 fee. Rs 2,000: free. |

Rule logic lives in `src/rules/businessRules.js`. Tests are in `tests/businessRules.test.js`.

## Routes

| Route | Page |
|---|---|
| `/` | Landing page: animated ridge hero, trailhead-to-summit scroll moment, categories, trending trails |
| `/shop` | Product listing with search, category/diet/stock filters and sort (state in the URL) |
| `/products/:id` | Product details, preparation, order limits, trails it suits; invalid IDs handled |
| `/trails` | Trail finder: search, area, difficulty and time filters, four sorts |
| `/trails/:id` | Trail details, elevation chart and a pack list with "Add the whole kit" |
| `/journal`, `/journal/:slug` | Trail Journal posts linked to trails and products |
| `/cart` | Cart with quantity steppers and live order summary |
| `/checkout` | Controlled, validated form with rule checks |
| `/confirmation` | Simulated order confirmation (survives refresh) |

## Project structure

```
src/
  app/         App shell, routes, shared state (later milestones)
  components/  Reusable UI components
  pages/       Route-level pages
  data/        Local product data and business profile
  rules/       Business-rule functions (shared with tests)
  lib/         Mock loader, formatting and storage helpers
  styles/      Authored CSS: tokens, base, layout, components, one file per page
tests/         node:test business-rule tests
docs/          Reference-site investigation notes
```

## Progress

- [x] Milestone 1: setup, business data, rules module and tests
- [x] Milestone 2: components, routes, browsing (search, filter, sort, details)
- [x] Milestone 3: cart, checkout form, rule enforcement
- [x] Milestone 4: dark theme, landing page, trail finder, journal, responsive styling and motion
- [ ] Milestone 5: edge cases, documentation, deployment

## Design and assets

- Dark "night on the ridge" theme defined as tokens in `src/styles/tokens.css`; every text colour checked against WCAG AA.
- Product and landscape illustrations are original SVG drawn in code (`ProductArt.jsx`, `HeroLandscape.jsx`, `TrailJourney.jsx`).
- Fonts: Fraunces and Manrope (SIL Open Font License), self-hosted through `@fontsource-variable`.
- Icons: lucide-react (ISC licence).
- Motion: one hero entrance and one scroll moment on the landing page, plus small hover/press feedback; everything respects `prefers-reduced-motion`.
- Trail figures are approximate and labelled as such on the site.
