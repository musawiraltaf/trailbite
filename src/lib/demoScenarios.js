// Assignment demo scenarios (Task 6.1: "a documented setting or clearly labelled
// demonstration control for loading failure and changed availability").
//
// The settings are kept in sessionStorage so a demo survives a page refresh,
// which is exactly when a saved cart is restored and must be re-checked.

const KEY = 'trailbite-demo-v1'

export const DEFAULT_DEMO = {
  failNextLoad: false, // next catalogue load rejects -> error state with Retry
  emptyCatalogue: false, // loader returns [] -> "empty shelves" state (not "no matches")
  supplierUpdate: false, // stock changes below are applied to the catalogue
}

// "Supplier update" scenario: what changes in the catalogue
export const SUPPLIER_UPDATE = {
  stock: {
    'tb-daal-chawal': 1, // was 25: a cart holding 2+ now exceeds stock
    'tb-chicken-biryani': 0, // was 18: now sold out
  },
  discontinued: ['tb-ridge-patch'], // removed from the catalogue entirely
}

/** Applies the active scenario to a fresh copy of the product list. */
export function applyScenario(products, demo) {
  if (demo.emptyCatalogue) return []
  if (!demo.supplierUpdate) return products

  return products
    .filter((product) => !SUPPLIER_UPDATE.discontinued.includes(product.id))
    .map((product) =>
      product.id in SUPPLIER_UPDATE.stock ? { ...product, stock: SUPPLIER_UPDATE.stock[product.id] } : product,
    )
}

export function readDemo() {
  try {
    return { ...DEFAULT_DEMO, ...JSON.parse(sessionStorage.getItem(KEY) ?? '{}') }
  } catch {
    return { ...DEFAULT_DEMO }
  }
}

export function saveDemo(demo) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(demo))
  } catch {
    /* demo still works for this page view */
  }
}
