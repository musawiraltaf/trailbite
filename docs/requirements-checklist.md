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
| Rule 1 availability (numerical limit) | `src/rules/businessRules.js` → `checkQuantity` | ✅ logic · ⬜ UI (M3) |
| Rule 2 eligibility | `checkAgeEligibility` | ✅ logic · ⬜ UI (M3) |
| Rule 3 pricing/fulfilment | `getDeliveryFee`, `checkServiceArea` | ✅ logic · ⬜ UI (M3) |
| Each rule: exact condition, where the user is told, behaviour met/broken, boundary case | README table + UI messages | 🟡 |
| Rules change app behaviour and block invalid completion | Cart + checkout (M3) | ⬜ |

## Task 3 — DECISIONS.md

| Requirement | Status |
|---|---|
| One decision per problem: problem, decision, alternative, reason, tradeoff, code location, evidence | 🟡 drafted; code locations and evidence to fill |
| ≥1 interaction/state decision (D02) and ≥1 information hierarchy/mobile decision (D01) | ✅ |

## Task 4 — Functional requirements (20 marks)

| ID | Requirement | Where | Status |
|---|---|---|---|
| FR01 | ≥3 meaningful routes, Back/Forward work | `src/app/App.jsx` (/, /shop, /products/:id, /cart, /checkout, /confirmation) | 🟡 M2/M3 |
| FR02 | Parameterised route; invalid ID shows useful feedback | `src/pages/ProductPage.jsx` (`ProductNotFound`) | ✅ |
| FR03 | ≥10 local records with stable IDs | `src/data/products.js` | ✅ |
| FR04 | Search relevant text fields | `src/lib/catalogue.js` (`matchesSearch`), `ShopPage` | ✅ |
| FR05 | ≥1 filter + ≥1 sort, both work with search | `ShopFilters`, `ShopPage` (category, diet, in-stock; 4 sorts) | ✅ |
| FR06 | Details: price, conditions, availability | `ProductPage` | ✅ (add-to-cart in M3) |
| FR07 | Add/remove, change quantities | Cart context, `QuantityStepper` | ⬜ M3 |
| FR08 | Shared state across listing, details, cart, summary | Cart context | ⬜ M3 |
| FR09 | Controlled form, ≥3 fields in main journey | `CheckoutPage` | ⬜ M3 |
| FR10 | ≥3 validation rules, specific messages, valid input kept | `CheckoutPage`, `src/lib/validation.js` | ⬜ M3 |
| FR11 | Calculated summary (count, subtotal, delivery, total) | `OrderSummary` | ⬜ M3 |
| FR12 | All three rules work and block invalid completion | Cart + checkout | ⬜ M3 |
| FR13 | localStorage save and restore | `src/lib/storage.js` | ⬜ M3 |
| FR14 | Async mock loader with loading, failure, retry | `src/lib/mockLoader.js`, `CatalogueContext`, `CatalogueStatus` | 🟡 works; demo toggle in M5 |
| FR15 | Empty dataset vs no matches, with guidance | `ShopPage` (`NoMatches`) | 🟡 no-match done; empty-dataset demo in M5 |
| FR16 | Clear confirmation | `ConfirmationPage` | ⬜ M3 |
| FR17 | Works at 390 px and 1280 px, and by keyboard | CSS + manual check | ⬜ M4 |
| FR18 | All three problems addressed in the app | P1 `ProductCard`, P2 stepper + cart, P3 `ProductPage` sections | ⬜ |
| FR19 | Deployed: assets, navigation, nested-route refresh | Vercel + `vercel.json` | ⬜ M5 |

## Task 4 — React and JavaScript (20 marks)

| Topic | Where it is shown | Status |
|---|---|---|
| Components and modules (imports/exports) | `src/components`, `src/pages` | 🟡 |
| JSX, suitable HTML elements | All components | 🟡 |
| Props | `ProductCard`, `StockStatus`, `ProductGrid` | ✅ |
| Callback props | `ShopFilters onChange/onClear`; stepper in M3 | 🟡 |
| Events, preventDefault on form submit | `CheckoutPage` | ⬜ |
| useState and controlled inputs | `ShopPage` filters, checkout form | ⬜ |
| Functional updates | `setAttempt(n => n + 1)`, cart updates | 🟡 |
| Object updates without mutation | Checkout form state | ⬜ |
| Array add/remove/update without mutation | Cart reducer | ⬜ |
| Lists and stable keys | Product grid (`product.id`) | 🟡 |
| Conditional rendering (availability, validation, loading, error, empty) | Several | 🟡 |
| Shared state (context) | `CatalogueContext`, cart context | 🟡 |
| Derived values | `ShopPage` results (`useMemo`); totals in M3 | 🟡 |
| useEffect with dependencies and cleanup | `CatalogueContext` (AbortController), storage sync | 🟡 |
| Array methods, spread, destructuring | `catalogue.js` (filter/sort/every), cart in M3 | 🟡 |
| async/await or .then with failure handling | `CatalogueContext` | ✅ |
| localStorage read/write | `storage.js` | ⬜ |
| Routes, URL params, links, navigation | `App.jsx`, `useParams`, `useSearchParams`, `useNavigate` | 🟡 |
| Folders: components, pages, data, assets, styles, mock loader, rules, tests | `src/*`, `tests/` | ✅ |
| Simulated operations clearly labelled; fictional payment; no personal data stored | Footer, checkout | 🟡 |

## Task 5 — Visual design (7) · Responsive and accessibility (8)

| Requirement | Status |
|---|---|
| Consistent identity, hierarchy, spacing, typography, colour roles | ⬜ M4 |
| Clear primary and secondary actions | ⬜ M4 |
| Selected, unavailable, error and success states | ⬜ M3/M4 |
| Semantic HTML, logical headings | 🟡 |
| Labels tied to inputs | ⬜ |
| Buttons for actions, links for navigation | 🟡 |
| Keyboard access, visible focus | ⬜ M4 |
| Alt text for meaningful images | ⬜ |
| Status colours always paired with text | ⬜ |
| No page-wide horizontal overflow at 390 px | ⬜ M4 |
| Authored CSS only, no UI kits or templates | ✅ |
| Annotated screenshots of the final app | ⬜ report |

## Task 6 — Edge cases (5) and rule test (2)

| Case | Status |
|---|---|
| Missing or long content keeps the layout usable, with fallbacks | 🟡 data prepared (long name, missing description/prep) |
| Empty results or invalid URL: explain + next action | ✅ `NoMatches`, `ProductNotFound`, `NotFoundPage` |
| Invalid form input: specific feedback, valid input kept | ⬜ M3 |
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
