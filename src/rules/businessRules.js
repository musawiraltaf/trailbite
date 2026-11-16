// TrailBite operating rules (Task 2.2).
//
// These are plain functions with no React or browser code, so the same functions
// are used by the app (components call them) and by tests/businessRules.test.js.
// Every check returns an object such as { ok: true } or { ok: false, message },
// so the UI can show the message and the tests can assert on the result.

// ---------------------------------------------------------------------------
// Rule 1 — Availability / capacity
// A customer may order 1 to MAX_PER_PRODUCT units of a product, and never more
// than the units currently in stock. Products with 0 stock cannot be ordered.
// Boundary: stock 18 -> 5 is accepted, 6 is rejected.
//           stock 2  -> 2 is accepted, 3 is rejected.
// ---------------------------------------------------------------------------
export const MAX_PER_PRODUCT = 5

/** Highest quantity the customer may currently select for this product. */
export function getMaxQuantity(product) {
  if (!product || product.stock <= 0) return 0
  return Math.min(product.stock, MAX_PER_PRODUCT)
}

export function checkQuantity(product, quantity) {
  const max = getMaxQuantity(product)

  if (max === 0) {
    return { ok: false, max, message: 'This item is out of stock.' }
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { ok: false, max, message: 'Choose at least 1 unit.' }
  }
  if (quantity > max) {
    const reason = max < MAX_PER_PRODUCT ? `only ${max} left in stock` : `limit of ${MAX_PER_PRODUCT} per order`
    return { ok: false, max, message: `You can order up to ${max} (${reason}).` }
  }
  return { ok: true, max }
}

// ---------------------------------------------------------------------------
// Rule 2 — Eligibility
// Orders that contain an age-restricted item (gas canisters, knives) can only be
// placed by a customer who is at least MIN_AGE years old on the order date.
// Boundary: 18th birthday today -> accepted; 18th birthday tomorrow -> rejected.
// ---------------------------------------------------------------------------
export const MIN_AGE = 18

// Parse 'YYYY-MM-DD' into numbers. We avoid new Date('YYYY-MM-DD') because that
// is read as UTC midnight and can shift the day in Pakistan's time zone.
function parseISODate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  if (!match) return null
  const [, y, m, d] = match.map(Number)
  return { y, m, d }
}

/** Whole years between dateOfBirth and onDate (both 'YYYY-MM-DD'). Returns null if invalid. */
export function getAge(dateOfBirth, onDate) {
  const birth = parseISODate(dateOfBirth)
  const today = parseISODate(onDate)
  if (!birth || !today) return null

  let age = today.y - birth.y
  const birthdayNotYetReached = today.m < birth.m || (today.m === birth.m && today.d < birth.d)
  if (birthdayNotYetReached) age -= 1
  return age
}

/**
 * @param {Array<{ageRestricted: boolean}>} items products in the cart
 * @param {string} dateOfBirth 'YYYY-MM-DD' from the checkout form
 * @param {string} onDate      'YYYY-MM-DD' (today)
 */
export function checkAgeEligibility(items, dateOfBirth, onDate) {
  const restricted = items.filter((item) => item.ageRestricted)
  if (restricted.length === 0) return { ok: true, restricted: [] }

  const age = getAge(dateOfBirth, onDate)
  if (age === null) {
    return { ok: false, restricted, message: 'Enter your date of birth to buy age-restricted items.' }
  }
  if (age < MIN_AGE) {
    return {
      ok: false,
      restricted,
      message: `You must be ${MIN_AGE} or older to buy ${restricted.map((item) => item.name).join(', ')}. Remove them to continue.`,
    }
  }
  return { ok: true, restricted }
}

// ---------------------------------------------------------------------------
// Rule 3 — Pricing / fulfilment
// Delivery is available in SERVICE_CITIES only. Orders with a subtotal below
// FREE_DELIVERY_THRESHOLD pay DELIVERY_FEE; at or above it, delivery is free.
// Boundary: Rs 1,999 -> Rs 150 fee; Rs 2,000 -> free.
// ---------------------------------------------------------------------------
export const DELIVERY_FEE = 150
export const FREE_DELIVERY_THRESHOLD = 2000
export const SERVICE_CITIES = ['Islamabad', 'Rawalpindi']

export function getDeliveryFee(subtotal) {
  if (subtotal <= 0) return 0 // nothing to deliver
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}

/** How much more the customer must add to unlock free delivery (0 when already free). */
export function amountToFreeDelivery(subtotal) {
  return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
}

export function checkServiceArea(city) {
  if (SERVICE_CITIES.includes(city)) return { ok: true }
  return { ok: false, message: `We currently deliver only to ${SERVICE_CITIES.join(' and ')}.` }
}
