// Order calculations (FR11). Derived from the current cart every time it renders,
// never stored, so the numbers cannot get out of sync with the cart.
import { amountToFreeDelivery, getDeliveryFee } from '../rules/businessRules.js'

/**
 * @param {Array<{product: object, quantity: number}>} lines cart lines joined with product data
 */
export function calculateSummary(lines) {
  const itemCount = lines.reduce((sum, { quantity }) => sum + quantity, 0)
  const subtotal = lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  const deliveryFee = getDeliveryFee(subtotal)

  return {
    itemCount,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    toFreeDelivery: amountToFreeDelivery(subtotal),
  }
}
