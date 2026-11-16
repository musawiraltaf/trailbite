# Verification checklist

Checked in Chromium with the console open, at 1280 × 800 and 390 × 844. No application errors or React warnings were logged during these runs.
Screenshots referenced below are in the submission's `Evidence/app/` folder (not committed to the repository).

## 1. Investigated problems: actions, expected, observed

| # | User actions | Expected | Observed | Evidence |
|---|---|---|---|---|
| P1 | Open `/shop?category=Trail%20meals` at 1280 px; compare Chicken Biryani, Beef Pulao and Mac & Cheese | Name, pack size/kcal, price and stock each on their own line; names never cut off | As expected; "Only 2 left" and "Out of stock" sit beside the price without overlapping, and the long two-person mash name wraps in full | A1 |
| P1 | Same page at 390 px | Compact horizontal cards, nothing overlaps, no sideways scroll | As expected (`scrollWidth` = 390) | — |
| P2 | On the listing, click "Add to cart" on Beef Pulao, then press + | Card turns into a stepper in place; no navigation; toast confirms; header count updates; + disables at stock limit 2 | As expected; page stayed on `/shop`, toast "Beef Yakhni Pulao: 1 in cart", hint "Max 2 per order" | A1 |
| P2 | Change a quantity on `/cart` | Totals update instantly with no page reload; steppers are 44 × 44 px | As expected | E3 |
| P3 | Open `/products/tb-chicken-biryani` | Method, water and time shown beside the price | "Boiling water · 330 ml · 12 min" shown above Add to cart | A2 |
| P3 | Open `/products/tb-egg-wrap-kit#preparation` (instructions missing in data) | A clear notice, not an empty section | Notice shown in the Preparation section | A3 |
| P3 | Open `/products/tb-gas-canister` (not food) | No Preparation section and no single-item section menu | Only "About" and "Good for these trails" | — |

## 2. Operating rules: normal use and boundaries

| Rule | Input | Expected | Observed |
|---|---|---|---|
| 1 | Type 5 into Daal Chawal's quantity | Accepted, + disables, "Limit reached: 5 max" | As expected |
| 1 | Type 6 | Rejected with "You can order up to 5 (limit of 5 per order)."; value returns to 5 | As expected |
| 1 | Beef Pulao (stock 2): press + at 2 | + disabled; "Max 2 per order" | As expected |
| 2 | Knife in cart, date of birth = today minus 18 years | Order accepted | Order placed (confirmation shown) |
| 2 | Date of birth one day short of 18 | "You must be 18 or older to buy Folding Camp Knife. Remove it to continue." + "Remove 18+ items" button | As expected (E8) |
| 3 | Subtotal Rs 1,950 | Delivery Rs 150 and "Add Rs 50 more for free delivery" | As expected |
| 3 | Subtotal Rs 2,000 | Delivery Free | As expected |
| 3 | City = Lahore | "We currently deliver only to Islamabad and Rawalpindi." | As expected (E8, E9) |

Automated: `npm test` runs 14 node:test cases (valid, at-limit and breaking inputs for all three rules plus restored-cart checks). Result: 14 passed, 0 failed.

## 3. Edge cases (Task 6.1)

Use **Assignment demo controls** at the bottom of any page.

| Case | How to reproduce | Expected | Observed | Evidence |
|---|---|---|---|---|
| Loading failure | Tick "Loading failure" | Error panel with message and "Try again"; retry shows loading then succeeds | As expected; retry loaded 30 products | E4 |
| Empty dataset | Tick "Empty catalogue" | "The shelves are empty right now", different from no-match message | As expected | E5 |
| No search matches | `/shop?q=pizza&category=Drinks` | Explains, offers "Search all products for 'pizza'" and "Clear all filters" | As expected | E6 |
| Invalid URL | `/products/tb-chicken-karahi` (old ID), `/nope/deep` | Not-found page with next steps | As expected | E7 |
| Invalid form input | Submit checkout with one-word name, 5-digit phone, Lahore, under-18 DOB | Specific message per field, error summary focused, valid address and slot kept | 4 messages; address and slot kept | E8, E9 |
| Restored selection | Cart: 3 Daal Chawal, 1 Biryani, 1 Ridge Patch, 1 Oats; tick "Supplier stock update" (or refresh with it on) | Banner on every page; cart lists each conflict with a fix; checkout blocked until fixed | "3 items … changed"; Change to 1 / Remove / Remove; Fix all restored checkout | E1, E2, E3 |
| Missing content | Hunza Dried Apricots (no description), long two-person mash name | Fallback text; layout intact | As expected | — |
| Missing image | Every product has `image: null`; ProductArt draws an SVG and would also replace a photo that fails to load | Illustration shown | As expected | A1 |

## 4. Responsive and keyboard

| Check | Result |
|---|---|
| No page-wide horizontal overflow at 390 px (home, shop, product, trails, trail, journal, cart, checkout) | Pass |
| First Tab on a fresh load reaches "Skip to content" | Pass |
| After a route change, focus moves to `<main>` and the page scrolls to the top | Pass |
| Visible focus ring on links, buttons, inputs and whole-card links | Pass |
| Reduced motion: animations reduced to an instant change; journey line shown fully drawn | Implemented (`components.css`, `TrailJourney.jsx`) |

## 5. Deployment

| Check | Result |
|---|---|
| `npm run build` succeeds | Pass |
| Production build: direct loads of `/shop`, `/products/:id`, `/trails/:id`, `/journal/:slug`, `/checkout`, `/confirmation`, unknown paths all return the app (HTTP 200) | Pass (`vite preview`); Vercel uses `vercel.json` rewrites |
| Fonts and JS/CSS assets load from the build | Pass |
| Public deployment matches final commit | Public homepage, shop, product and checkout paths returned the app. Served JavaScript and CSS matched the local production files by SHA-256. |
