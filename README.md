# TrailBite

A React storefront for **TrailBite**, a fictional trail-food shop delivering freeze-dried meals, snacks, drink mixes and small camp essentials within Islamabad and Rawalpindi.

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
| Offering | Freeze-dried trail meals, breakfasts, snacks, drink mixes and camp essentials (15 products) |
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

## Project structure

```
src/
  app/         App shell, routes, shared state (later milestones)
  components/  Reusable UI components
  pages/       Route-level pages
  data/        Local product data and business profile
  rules/       Business-rule functions (shared with tests)
  lib/         Mock loader, formatting and storage helpers
  styles/      Authored CSS
tests/         node:test business-rule tests
docs/          Reference-site investigation notes
```

## Progress

- [x] Milestone 1: setup, business data, rules module and tests
- [ ] Milestone 2: components, routes, browsing (search, filter, sort, details)
- [ ] Milestone 3: cart, checkout form, rule enforcement
- [ ] Milestone 4: frontend improvements and responsive styling
- [ ] Milestone 5: edge cases, documentation, deployment
