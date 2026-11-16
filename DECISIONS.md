# Frontend decisions

Reference site: https://packitgourmet.com (investigated 16 Nov 2026 at 1280 px and 390 px).
Full observations: `docs/investigation.md`.

Code locations and evidence are completed as each feature is built.

## D01 — Product cards with fixed information areas (information hierarchy)

- **Problem:** On the reference listing at 1280 px, the price range and "OUT OF STOCK" share one line and collide. Long names are cut to "Chicken Broth...", and cards do not show pack size.
- **Decision:** Each TrailBite card has separate, fixed areas for name, pack size, price and a stock line, with stock always shown as text.
- **Alternative:** Show a coloured stock badge over the product image.
- **Reason:** Shoppers compare name, size, price and availability without opening each product.
- **Tradeoff:** Cards are taller, so fewer fit on screen.
- **Code location:** `src/components/ProductCard.jsx` (`ProductCard`), `src/components/StockStatus.jsx` (`getStockLabel`), `src/styles/global.css` section 7 (`.product-card__body`, `.product-card__footer`)
- **Evidence:** TODO

## D02 — Build the cart in place with shared state (interaction / state)

- **Problem:** On the reference listing, quick-add navigates to the cart page, so every extra item means going back to the listing. The cart's +/− buttons are 23×14 px.
- **Decision:** Add turns into a quantity stepper on the card itself (44 px targets). The listing, details, cart and checkout all read one shared cart state.
- **Alternative:** Keep navigation to the cart but show a "Continue shopping" popup.
- **Reason:** A trip order usually has several items, and customers keep their place in the listing.
- **Tradeoff:** Shared state and persistence add complexity; customers may forget to review the cart, so a cart count and subtotal stay visible.
- **Code location:** TODO (milestone 3)
- **Evidence:** TODO

## D03 — Only show product sections that have content (content / findability)

- **Problem:** On all 12 reference grocery products checked, the Instructions tab opens an empty panel, while the preparation info is buried in "About".
- **Decision:** Preparation is a structured field (method, water, time, steps) shown in its own section. Sections render only when data exists, with an explicit fallback when instructions are missing.
- **Alternative:** Keep a fixed tab set and show "Coming soon" in empty tabs.
- **Reason:** Customers deciding on a trail meal need to know the water and time it requires before buying.
- **Tradeoff:** Product data must follow a stricter structure.
- **Code location:** `src/pages/ProductPage.jsx` (`buildSections`), `src/components/PreparationInfo.jsx` (`PrepSummary`, `PrepSteps`), `src/data/products.js` (`preparation` field)
- **Evidence:** TODO
