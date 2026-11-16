import { Link } from 'react-router-dom'
import { ShieldCheck, ShoppingBag } from 'lucide-react'
import { useCart } from '../app/CartContext.jsx'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import CartIssues from '../components/CartIssues.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import ProductArt from '../components/ProductArt.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { formatPrice } from '../lib/format.js'

// Cart page (/cart): change quantities in place, remove items, see the summary.
// Quantity changes update the totals immediately; nothing reloads (Problem 2).
export default function CartPage() {
  const { status } = useCatalogue()
  const { lines, issues, summary, setQuantity, removeItem } = useCart()

  if (status !== 'ready') return <CatalogueStatus />

  // Only discontinued items left: still show the explanation instead of "empty"
  if (lines.length === 0 && issues.length === 0) {
    return (
      <section className="state-panel">
        <ShoppingBag size={36} className="state-panel__icon" aria-hidden="true" />
        <h1>Your cart is empty</h1>
        <p>Add meals, snacks and fuel for your next trip. Items you add stay here even if you close the page.</p>
        <Link to="/shop" className="button button--primary">
          Browse trail food
        </Link>
      </section>
    )
  }

  return (
    <section aria-labelledby="cart-heading">
      <h1 id="cart-heading">Your cart</h1>
      <CartIssues />

      <div className="cart-layout">
        <ul className="cart-lines">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="cart-line">
              <ProductArt product={product} size="thumb" />

              <div className="cart-line__info">
                <h2 className="cart-line__name">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h2>
                <p className="product-card__meta">
                  {product.packSize} · {formatPrice(product.price)} each
                </p>
                {product.ageRestricted && (
                  <p className="badge-warning">
                    <ShieldCheck size={15} aria-hidden="true" />
                    18+ item: date of birth needed at checkout
                  </p>
                )}
              </div>

              <div className="cart-line__qty">
                <QuantityStepper
                  product={product}
                  quantity={quantity}
                  onChange={(next) => setQuantity(product, next)}
                  size="large"
                />
              </div>

              <p className="cart-line__total">
                <span className="visually-hidden">Line total: </span>
                {formatPrice(product.price * quantity)}
              </p>

              <button
                type="button"
                className="link-button"
                onClick={() => removeItem(product)}
                aria-label={`Remove ${product.name} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <OrderSummary summary={summary}>
          <div className="order-summary__actions">
            {issues.length > 0 ? (
              <button type="button" className="button button--primary button--block" disabled>
                Fix the cart to continue
              </button>
            ) : (
              <Link to="/checkout" className="button button--primary button--block">
                Continue to checkout
              </Link>
            )}
            <Link to="/shop" className="button button--secondary button--block">
              Keep shopping
            </Link>
          </div>
        </OrderSummary>
      </div>
    </section>
  )
}
