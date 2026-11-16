# Assignment requirements checklist

Every requirement from the CS4032 A#02 brief, where it is handled, and its status.
Milestones: M1 setup/data · M2 routes/browsing · M3 cart/form/rules · M4 improvements/styling · M5 edge cases/docs/deploy.

Status: ✅ done · 🟡 partial · ⬜ to do

## Task 1 — Investigation (7 marks with decisions)

| Requirement | Where | Status |
|---|---|---|
| Three *different* problems on a real site in the same domain | `docs/investigation.md` (P1 card hierarchy, P2 cart building, P3 empty Instructions tab) | ✅ |
| For each: URL, screenshot, user task, what goes wrong, business consequence, our fix | `docs/investigation.md` + `Evidence/` folder (outside repo) | ✅ notes · ⬜ report write-up |
| Observation kept separate from assumed consequence; no invented statistics | Report | ⬜ |

## Task 2 — Business profile and rules (rules = 10 marks)

| Requirement | Where | Status |
|---|---|---|
| Name, offering, audience, operating area, main task, goal | `src/data/business.js`, README | ✅ |
| ≥10 products with stable IDs | `src/data/products.js` (15) | ✅ |
| Rule 1 availability (numerical limit) | `checkQuantity` → `QuantityStepper`, `findStockProblems` | ✅ |
| Rule 2 eligibility | `checkAgeEligibility` → checkout date of birth | ✅ |
| Rule 3 pricing/fulfilment | `getDeliveryFee` → `OrderSummary`; `checkServiceArea` → checkout city | ✅ |
| Each rule: exact condition, where the user is told, behaviour met/broken, boundary case | README table + UI messages | 🟡 |
| Rules change app behaviour and block invalid completion | Stepper, cart, checkout | ✅ |

## Task 3 — DECISIONS.md

| Requirement | Status |
|---|---|
| One decision per problem: problem, decision, alternative, reason, tradeoff, code location, evidence | 🟡 drafted; code locations and evidence to fill |
| ≥1 interaction/state decision (D02) and ≥1 information hierarchy/mobile decision (D01) | ✅ |

## Task 4 — Functional requirements (20 marks)

| ID | Requirement | Where | Status |
|---|---|---|---|
| FR01 | ≥3 meaningful routes, Back/Forward work | `src/app/App.jsx` (/, /shop, /products/:id, /cart, /checkout, /confirmation) | ✅ |
| FR02 | Parameterised route; invalid ID shows useful feedback | `src/pages/ProductPage.jsx` (`ProductNotFound`) | ✅ |
| FR03 | ≥10 local records with stable IDs | `src/data/products.js` | ✅ |
| FR04 | Search relevant text fields | `src/lib/catalogue.js` (`matchesSearch`), `ShopPage` | ✅ |
| FR05 | ≥1 filter + ≥1 sort, both work with search | `ShopFilters`, `ShopPage` (category, diet, in-stock; 4 sorts) | ✅ |
| FR06 | Details: price, conditions, availability | `ProductPage` | ✅ (add-to-cart in M3) |
| FR07 | Add/remove, change quantities | `CartContext`, `AddToCart`, `QuantityStepper`, `CartPage` | ✅ |
| FR08 | Shared state across listing, details, cart, summary | `CartContext` | ✅ |
| FR09 | Controlled form, ≥3 fields in main journey | `CheckoutPage` (7 fields) | ✅ |
| FR10 | ≥3 validation rules, specific messages, valid input kept | `src/lib/validation.js` (`validateCheckout`), `FormField` | ✅ |
| FR11 | Calculated summary (count, subtotal, delivery, total) | `src/lib/orderSummary.js`, `OrderSummary` | ✅ |
| FR12 | All three rules work and block invalid completion | `QuantityStepper`, `validateCheckout`, `findStockProblems` | ✅ |
| FR13 | localStorage save and restore | `src/lib/storage.js`, `CartContext` | ✅ |
| FR14 | Async mock loader with loading, failure, retry | `src/lib/mockLoader.js`, `CatalogueContext`, `CatalogueStatus` | 🟡 works; demo toggle in M5 |
| FR15 | Empty dataset vs no matches, with guidance | `ShopPage` (`NoMatches`) | 🟡 no-match done; empty-dataset demo in M5 |
| FR16 | Clear confirmation | `ConfirmationPage` (survives refresh via sessionStorage) | ✅ |
| FR17 | Works at 390 px and 1280 px, and by keyboard | Checked every page at both widths; focus moves to main on route change | ✅ |
| FR18 | All three problems addressed in the app | P1 `ProductCard`, P2 stepper + cart, P3 `ProductPage` sections | ⬜ |
| FR19 | Deployed: assets, navigation, nested-route refresh | Vercel + `vercel.json` | ⬜ M5 |

## Task 4 — React and JavaScript (20 marks)

| Topic | Where it is shown | Status |
|---|---|---|
| Components and modules (imports/exports) | `src/components`, `src/pages` | 🟡 |
| JSX, suitable HTML elements | All components | 🟡 |
| Props | `ProductCard`, `StockStatus`, `ProductGrid` | ✅ |
| Callback props | `ShopFilters onChange/onClear`, `QuantityStepper onChange` | ✅ |
| Events, preventDefault on form submit | `CheckoutPage handleSubmit` | ✅ |
| useState and controlled inputs | Checkout form, `QuantityStepper` draft | ✅ |
| Functional updates | `setAttempt(n => n + 1)`, cart updates | 🟡 |
| Object updates without mutation | `setForm(prev => ({ ...prev, [name]: value }))` | ✅ |
| Array add/remove/update without mutation | `CartContext setQuantity` (map/filter/spread) | ✅ |
| Lists and stable keys | Product grid (`product.id`) | 🟡 |
| Conditional rendering (availability, validation, loading, error, empty) | Several | 🟡 |
| Shared state (context) | `CatalogueContext`, cart context | 🟡 |
| Derived values | `ShopPage` results, `calculateSummary`, checkout `errors` | ✅ |
| useEffect with dependencies and cleanup | `CatalogueContext` (AbortController), storage sync | 🟡 |
| Array methods, spread, destructuring | `catalogue.js`, `orderSummary.js` (reduce), `CartContext` | ✅ |
| async/await or .then with failure handling | `CatalogueContext` | ✅ |
| localStorage read/write | `storage.js` | ✅ |
| Routes, URL params, links, navigation | `App.jsx`, `useParams`, `useSearchParams`, `useNavigate` | 🟡 |
| Folders: components, pages, data, assets, styles, mock loader, rules, tests | `src/*`, `tests/` | ✅ |
| Simulated operations clearly labelled; fictional payment; no personal data stored | Footer, checkout | 🟡 |

## Task 5 — Visual design (7) · Responsive and accessibility (8)

| Requirement | Status |
|---|---|
| Consistent identity, hierarchy, spacing, typography, colour roles | ✅ `tokens.css` |
| Clear primary and secondary actions | ✅ one ember primary, one outline secondary |
| Selected, unavailable, error and success states | ✅ |
| Semantic HTML, logical headings | 🟡 |
| Labels tied to inputs | ✅ `FormField`, `ShopFilters` |
| Buttons for actions, links for navigation | 🟡 |
| Keyboard access, visible focus | ✅ |
| Alt text for meaningful images | ✅ SVG art has `role=img` + label; decorative art hidden |
| Status colours always paired with text | ✅ stock, difficulty, errors use icon + words |
| No page-wide horizontal overflow at 390 px | ✅ checked on every page |
| Authored CSS only, no UI kits or templates | ✅ |
| Annotated screenshots of the final app | ⬜ report |

## Task 6 — Edge cases (5) and rule test (2)

| Case | Status |
|---|---|
| Missing or long content keeps the layout usable, with fallbacks | 🟡 data prepared (long name, missing description/prep) |
| Empty results or invalid URL: explain + next action | ✅ `NoMatches`, `ProductNotFound`, `NotFoundPage` |
| Invalid form input: specific feedback, valid input kept | ✅ checkout |
| Unavailable or restored selection checked against current data, conflict explained, correctable | ⬜ M5 |
| Loading failure: clear error + working retry | 🟡 |
| Documented demo controls for load failure and changed availability | ⬜ M5 |
| Actions/expected/observed checklist for each improvement | ⬜ M5 |
| No console errors or React warnings in Chrome/Edge | ⬜ M5 |
| node:test file with valid, at-limit and breaking cases, same function used by the app | ✅ `tests/businessRules.test.js` |

## Task 7 — GitHub (3) and deployment (3)

| Requirement | Status |
|---|---|
| Public repo from the start, used throughout | ✅ |
| Meaningful commits through all 5 milestones; no backdating | 🟡 M1 done |
| Source, lockfile, README, DECISIONS, test included; node_modules, dist, secrets excluded | ✅ |
| Final commit hash recorded | ⬜ |
| Public deployment, assets load, journey works, nested-route refresh, matches final commit | ⬜ |

## Submission

| Item | Status |
|---|---|
| PDF report: student details, business profile, rules, investigation, decisions, annotated screenshots, verification, limitations | ⬜ |
| README: details, description, commands, links, routes, edge-case reproduction, simulated ops, limitations, concept map | 🟡 |
| ZIP `RollNo_Name_Section_A#02.zip` without node_modules/dist | ⬜ |
| Viva prep: explain code, change a constant, modify a function | ⬜ |
