# TrailBite

A React storefront for **TrailBite**, a fictional trail-food shop delivering freeze-dried meals, snacks, drink mixes, camp kitchen kit, trail gear and merch within Islamabad and Rawalpindi. It also includes a trail finder for hikes around the twin cities and a Trail Journal.

Built for CS4032 Web Programming, Assignment 02. All orders are **simulated**: no payment is taken and nothing is delivered.

## Student details

- Name: Musawir Altaf
- Roll number: 24I2134
- Section: A
- GitHub repository: https://github.com/musawiraltaf/trailbite
- Live deployment: pending publication
- Submission revision: see the accompanying PDF report.

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

**Test result:** `npm test` runs 14 cases with Node's built-in runner (valid, exactly-at-limit and breaking inputs for each rule, plus restored-cart checks): 14 passed, 0 failed.

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
  app/         App shell, routes, shared state
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
- [x] Milestone 5: demo controls, restored-cart checks, verification, deployment preparation

## Reproducing the edge cases

Open **Assignment demo controls** at the bottom of any page. Settings last until the browser tab is closed; "Reset to normal data" turns them off.

| Case | Steps |
|---|---|
| Loading failure and retry | Tick *Loading failure*: the catalogue shows an error with **Try again**, which reloads successfully. |
| Empty catalogue vs no matches | Tick *Empty catalogue* to see "The shelves are empty". Untick it and open `/shop?q=pizza&category=Drinks` to see the different no-match state. |
| Changed availability / restored cart | Add 3 Daal Chawal, 1 Chicken Biryani and the Ridge Patch, then tick *Supplier stock update* (or refresh with it on). A banner appears on every page; the cart explains each conflict with **Change to 1** / **Remove** / **Fix all**; checkout is blocked until fixed. |
| Invalid URLs | `/products/not-a-product`, `/trails/unknown`, `/journal/unknown`, `/any/other/path`. |
| Invalid form input | At checkout, enter a one-word name, `12345` as phone, choose Lahore, and (with a knife in the cart) a date of birth less than 18 years ago. |
| Rule boundaries | Type 5 then 6 into a stepper; Beef Pulao stops at 2 (stock); Rs 1,950 vs Rs 2,000 subtotal; birthday exactly 18 years ago today. |

Full actions / expected / observed results: `docs/verification.md`.

## Simulated operations and limitations

- Orders are simulated: nothing is sent to a server and no payment is taken (cash on delivery is only described). The confirmation is kept in `sessionStorage` so a refresh still shows it.
- The cart (product IDs, names, quantities) is saved in `localStorage`. Phone numbers and addresses are never stored.
- Stock is local data; it does not decrease when an order is placed. Changed stock is demonstrated with the demo controls.
- The age check trusts the date of birth entered; a real shop would check ID on delivery (stated at checkout).
- Product images are illustrations, not photographs. Trail distances and times are approximate.
- Trail and journal content is static local data (no CMS).

## Concept map

| Concept | File | Component / function |
|---|---|---|
| Function components, JSX, props | `src/components/ProductCard.jsx` | `ProductCard({ product })` |
| Callback props | `src/components/QuantityStepper.jsx`, `ShopFilters.jsx` | `onChange`, `onClear` |
| Events, preventDefault | `src/pages/CheckoutPage.jsx` | `handleSubmit` |
| useState, controlled inputs | `src/pages/CheckoutPage.jsx` | `form` state, `bind()` |
| Functional updates | `src/app/CartContext.jsx` | `setItems((current) => ...)` |
| Immutable object update | `src/pages/CheckoutPage.jsx` | `setForm((prev) => ({ ...prev, [name]: value }))` |
| Immutable array add/remove/update | `src/app/CartContext.jsx` | `setQuantity`, `removeById`, `fixAllIssues` |
| Lists and stable keys | `src/components/ProductGrid.jsx` | `key={product.id}` |
| Conditional rendering | `src/components/AddToCart.jsx`, `CatalogueStatus.jsx` | out of stock / add / stepper; loading / error |
| Shared state (Context) | `src/app/CatalogueContext.jsx`, `CartContext.jsx` | `useCatalogue`, `useCart` |
| Derived values | `src/lib/orderSummary.js`, `src/pages/ShopPage.jsx` | `calculateSummary`, filtered `results` |
| useEffect, dependencies, cleanup | `src/app/CatalogueContext.jsx`, `src/components/TrailJourney.jsx` | AbortController; scroll listener + IntersectionObserver |
| Async code with failure handling | `src/lib/mockLoader.js`, `CatalogueContext.jsx` | `loadProducts().then().catch()` |
| localStorage | `src/lib/storage.js` | `readCart`, `saveCart` |
| Routing, URL params, navigation | `src/app/App.jsx`, `ProductPage.jsx`, `ShopPage.jsx` | `useParams`, `useSearchParams`, `useNavigate` |
| Business rules and tests | `src/rules/businessRules.js`, `tests/businessRules.test.js` | `checkQuantity`, `checkAgeEligibility`, `getDeliveryFee`, `findCartIssues` |

## Deployment

The app is a static Vite build. On Vercel: import the GitHub repository, keep the detected **Vite** preset (build `npm run build`, output `dist`) and deploy. `vercel.json` rewrites every path to `index.html`, so direct links and refreshes on nested routes work. (`public/_redirects` does the same on Netlify.)

## Design and assets

- Dark "night on the ridge" theme defined as tokens in `src/styles/tokens.css`; every text colour checked against WCAG AA.
- Product and landscape illustrations are original SVG drawn in code (`ProductArt.jsx`, `HeroLandscape.jsx`, `TrailJourney.jsx`).
- Fonts: Fraunces and Manrope (SIL Open Font License), self-hosted through `@fontsource-variable`.
- Icons: lucide-react (ISC licence).
- Motion: one hero entrance and one scroll moment on the landing page, plus small hover/press feedback; everything respects `prefers-reduced-motion`.
- Trail figures are approximate and labelled as such on the site.

