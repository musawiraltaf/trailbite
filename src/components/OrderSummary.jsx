import { formatPrice } from '../lib/format.js'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../rules/businessRules.js'

// Calculated summary (FR11) shared by the cart and checkout pages.
// Rule 3 is visible here: the delivery fee line and a progress bar towards free delivery.
export default function OrderSummary({ summary, children }) {
  const { itemCount, subtotal, deliveryFee, total, toFreeDelivery } = summary
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))

  return (
    <aside className="order-summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      <dl className="summary-rows">
        <div>
          <dt>Items</dt>
          <dd>{itemCount}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{deliveryFee === 0 && subtotal > 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
        </div>
        <div className="summary-rows__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {subtotal > 0 && (
        <div className="delivery-progress">
          <p>
            {toFreeDelivery > 0 ? (
              <>
                Add <strong>{formatPrice(toFreeDelivery)}</strong> more for free delivery (saves{' '}
                {formatPrice(DELIVERY_FEE)}).
              </>
            ) : (
              <>
                <span aria-hidden="true">✓ </span>You get <strong>free delivery</strong>.
              </>
            )}
          </p>
          <div
            className="delivery-progress__bar"
            role="progressbar"
            aria-label="Progress towards free delivery"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {children}
    </aside>
  )
}
