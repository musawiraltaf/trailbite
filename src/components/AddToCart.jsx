import { useCart } from '../app/CartContext.jsx'
import QuantityStepper from './QuantityStepper.jsx'

// Shows the right cart control for a product:
//   out of stock      -> disabled button that clearly looks disabled
//   not in the cart   -> "Add to cart"
//   already in cart   -> quantity stepper (the customer sees what they chose
//                        when they come back to the listing)
export default function AddToCart({ product, size }) {
  const { getQuantity, setQuantity } = useCart()
  const quantity = getQuantity(product.id)

  if (product.stock <= 0) {
    return (
      <button type="button" className="button button--block" disabled>
        Out of stock
      </button>
    )
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        className="button button--primary button--block"
        onClick={() => setQuantity(product, 1)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to cart
      </button>
    )
  }

  return (
    <QuantityStepper
      product={product}
      quantity={quantity}
      onChange={(next) => setQuantity(product, next)}
      size={size}
    />
  )
}
