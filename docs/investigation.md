# Packit Gourmet — Investigation Log (checked 16 Nov 2026)

Reference site: https://packitgourmet.com (BigCommerce store)
Viewports tested: 1280×800 and 390×844. Browser: Chromium.
Retake your own screenshots for the report at the URLs and steps below.

---

## P1 — Listing cards: price and stock collide, names are cut off, and pack size is missing (information hierarchy, desktop)

- **URL:** https://packitgourmet.com/grocery/view-all-groceries/
- **Task:** Compare grocery items and decide which one to open or add.
- **Steps:** Open the URL at 1280 px → scroll to the first row of products.
- **Observed:**
  - Cheddar Cheese card: `$11.99 - $35.99` wraps onto two lines and runs into `OUT OF STOCK` on the same baseline. "OUT OF STOCK" pushes past the card's right edge.
  - Chicken Broth Concentrate: the name is truncated to "Chicken Broth..." with an ellipsis, so the full name is hidden on the card.
  - Price ranges (`$11.99 - $35.99`, `$24.99 - $89.99`) do not say which sizes they cover. You only find out on the details page (3 oz / 12 oz).
  - At 390 px the collision disappears ("OUT OF STOCK" moves to its own line), so this is a **desktop grid problem**, not a mobile one.
- **Possible consequence:** Shoppers misread price and availability, and must open each product to compare sizes.
- **TrailBite fix:** Fixed card regions for name (2-line clamp with the full name in `title`/alt), size and weight, price ("from Rs X · 2 sizes"), and a separate stock line. Checked at 1280 and 390.

## P2 — Quick-add leaves the listing, and the cart's quantity steppers are tiny (interaction / state)

- **URL:** listing above → the cart icon on a card (a plain link to `cart.php?action=add&product_id=…`)
- **Task:** Build a cart with several products.
- **Steps:** At 1280 px click the cart icon on "Dehydrated Bell Pepper Mix" → you land on `/cart.php`. Return to the listing to add the next item, then repeat.
- **Observed:**
  - Quick-add on the listing **navigates away to the Cart page** (not Checkout). The listing position is lost.
  - Cart quantity +/- buttons measure **23 × 14 px** at both 1280 and 390, below the WCAG 2.2 minimum target size of 24 × 24.
  - At 390 px the cart page is 410 px wide, so it scrolls sideways (the menu button is cut off).
  - For comparison: **Add to Cart on a product details page does NOT redirect.** It opens a modal with "Continue Shopping". Do not claim that every add redirects.
- **Possible consequence:** Multi-item orders take many back-and-forth trips, and quantity changes are error-prone on touch screens.
- **TrailBite fix:** Add on the card turns into a − qty + stepper (44 px targets) in place. One shared cart state is used by the listing, details, cart and checkout. A mini-cart count and subtotal update without navigating.

## P3 — Product tabs advertise content that does not exist (content / findability)

- **URL:** https://packitgourmet.com/dehydrated-vegetable-blend/ (and every grocery item below)
- **Task:** Find out how to prepare a dehydrated or freeze-dried item before buying it.
- **Steps:** Open the product → scroll to the tab bar → click **Instructions**.
- **Observed:**
  - An empty grey panel. In the page source the Instructions tab has **no content panel at all**.
  - Checked 12/12 products on page 1 of View All Groceries: **Instructions = missing on all 12**, **Press = missing on all 12**, FAQS missing on 5.
  - The preparation info actually exists (for example, Cheddar Cheese: "just add water · ¼ cup cheese + ½ T water · cold · 20 min"), but it sits inside the **About** tab.
  - Trail meals (8 checked) DO have Instructions content, so the tab template is shared and grocery items were never filled in.
- **Possible consequence:** Shoppers conclude there are no prep instructions and leave without buying, or contact support.
- **TrailBite fix:** Build details tabs/sections from the product data and only render a section when it has content. Make "Preparation" a structured field (water, temperature, time) that is always visible, with an explicit "No cooking needed" fallback.

---

## Extra observations (not counted as findings — useful for rules and design)

- **Out-of-stock option looks buyable:** on Cheddar Cheese both sizes are out of stock, but the ADD TO CART button is `disabled` while keeping full opacity and the same green. The size dropdown does not mark unavailable sizes; the message appears only in a narrow grey box. → Use this to justify the TrailBite availability rule UI.
- No "in stock only" filter, and search results mix out-of-stock bundles with in-stock items.
- The cart's free-shipping progress bar ("You're $76.01 away from FREE shipping") is a good pattern. The shipping cost itself only appears as "Add Info", so the charge appears late.
- A newsletter modal opens on the first visit to the homepage.
- Earlier "missing mobile nav" and "filters hard to find" claims: **not reproduced** (hamburger menu and sidebar filters both exist). Do not use them.
