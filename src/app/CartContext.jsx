// Shared cart state (FR07, FR08) — the core of the fix for Problem 2.
//
// The cart is ONE array of { id, quantity } kept here. The product cards, the
// details page, the header count, the cart page and checkout all read and change
// this same array, so a quantity changed in one place is correct everywhere.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useCatalogue } from './CatalogueContext.jsx'
import { checkQuantity } from '../rules/businessRules.js'
import { readCart, saveCart } from '../lib/storage.js'
import { calculateSummary } from '../lib/orderSummary.js'
import { findCartIssues } from '../rules/businessRules.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { products, status } = useCatalogue()

  // Lazy initial state: read localStorage once, on first render only.
  const [items, setItems] = useState(() => readCart())
  // Short message announced after each cart change (shown by <CartToast>).
  const [notice, setNotice] = useState(null)

  // Keep localStorage in sync whenever the cart changes (FR13).
  useEffect(() => {
    saveCart(items)
  }, [items])

  /**
   * Sets a product's quantity after checking Rule 1. Quantity 0 removes the line.
   * Returns the rule result so the caller can show its message.
   */
  const setQuantity = useCallback((product, quantity) => {
    if (quantity <= 0) {
      // Remove without mutating: filter returns a new array.
      setItems((current) => current.filter((item) => item.id !== product.id))
      setNotice({ id: Date.now(), text: `Removed ${product.name} from your cart.` })
      return { ok: true }
    }

    const result = checkQuantity(product, quantity)
    if (!result.ok) return result

    // Functional update: the next cart depends on the previous cart.
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id)
      return exists
        ? current.map((item) => (item.id === product.id ? { ...item, quantity } : item)) // update one line
        : [...current, { id: product.id, name: product.name, quantity }] // add a new line (name kept for messages)
    })
    setNotice({ id: Date.now(), text: `${product.name}: ${quantity} in cart.` })
    return result
  }, [])

  const removeItem = useCallback((product) => setQuantity(product, 0), [setQuantity])
  const clearCart = useCallback(() => setItems([]), [])
  const dismissNotice = useCallback(() => setNotice(null), [])

  // Derived data: join each saved line with the current product record.
  // Lines whose product no longer exists in the catalogue are skipped.
  const lines = useMemo(
    () =>
      items
        .map(({ id, quantity }) => ({ product: products.find((p) => p.id === id), quantity }))
        .filter((line) => line.product),
    [items, products],
  )
  const summary = useMemo(() => calculateSummary(lines), [lines])

  const getQuantity = useCallback((id) => items.find((item) => item.id === id)?.quantity ?? 0, [items])

  // Restored-selection check (edge case): the saved cart is compared with the
  // CURRENT catalogue every time either changes. Only run once the catalogue has
  // loaded, otherwise every saved item would look "discontinued" while loading.
  const issues = useMemo(
    () => (status === 'ready' ? findCartIssues(items, products) : []),
    [items, products, status],
  )

  /** Removes a saved line by id (works even when the product no longer exists). */
  const removeById = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  /** Applies every suggested fix at once: lower to the limit, or remove. */
  const fixAllIssues = useCallback(() => {
    setItems((current) =>
      current
        .map((item) => {
          const issue = issues.find((entry) => entry.id === item.id)
          return issue ? { ...item, quantity: issue.fixQuantity } : item
        })
        .filter((item) => item.quantity > 0),
    )
    setNotice({ id: Date.now(), text: 'Your cart now matches what is in stock.' })
  }, [issues])

  const value = {
    items,
    lines,
    summary,
    issues,
    getQuantity,
    setQuantity,
    removeItem,
    removeById,
    fixAllIssues,
    clearCart,
    notice,
    dismissNotice,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
