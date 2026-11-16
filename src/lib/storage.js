// localStorage helpers (FR13). Only the cart (product IDs and quantities) is
// saved. Customer details from the checkout form are never stored.
const CART_KEY = 'trailbite-cart-v1'
const LAST_ORDER_KEY = 'trailbite-last-order-v1'

/** Reads the saved cart. Anything malformed is dropped instead of crashing the app. */
export function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((item) => typeof item?.id === 'string' && Number.isInteger(item?.quantity) && item.quantity > 0)
  } catch {
    return [] // corrupted JSON or storage blocked (e.g. private mode)
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // Storage full or blocked: the cart still works for this visit.
  }
}

// The confirmation page keeps the last order in sessionStorage so a refresh of
// /confirmation still shows it. It holds no phone number or address.
export function saveLastOrder(order) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))
  } catch {
    /* ignore */
  }
}

export function readLastOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY) ?? 'null')
  } catch {
    return null
  }
}
