import { Link, useLocation } from 'react-router-dom'
import { readLastOrder } from '../lib/storage.js'
import { formatPrice } from '../lib/format.js'

// Confirmation (/confirmation) — the end of the journey (FR16).
// The order comes from navigation state; after a refresh it is read back from
// sessionStorage, so the page still works when reloaded.
export default function ConfirmationPage() {
  const location = useLocation()
  const order = location.state?.order ?? readLastOrder()

  if (!order) {
    return (
      <section className="state-panel">
        <h1>No recent order</h1>
        <p>We could not find an order from this browser session. Your cart is still saved if you had one.</p>
        <Link to="/shop" className="button button--primary">
          Go to the shop
        </Link>
      </section>
    )
  }

  const { id, firstName, city, slot, lines, summary } = order

  return (
    <section className="confirmation" aria-labelledby="confirm-heading">
      <div className="confirmation__banner">
        <p className="confirmation__icon" aria-hidden="true">
          ✓
        </p>
        <h1 id="confirm-heading">Order placed — thank you, {firstName}!</h1>
        <p>
          Order number <strong>{id}</strong>. This was a <strong>simulated</strong> order: nothing has been charged or
          will be delivered.
        </p>
      </div>

      <div className="confirmation__details">
        <h2>What you ordered</h2>
        <ul className="review-lines">
          {lines.map((line) => (
            <li key={line.id}>
              <span>
                {line.quantity} × {line.name}
              </span>
              <span>{formatPrice(line.price * line.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="summary-rows">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(summary.subtotal)}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{summary.deliveryFee === 0 ? 'Free' : formatPrice(summary.deliveryFee)}</dd>
          </div>
          <div className="summary-rows__total">
            <dt>Total (cash on delivery)</dt>
            <dd>{formatPrice(summary.total)}</dd>
          </div>
        </dl>

        <p>
          Delivery to <strong>{city}</strong>, {slot.toLowerCase()}.
        </p>

        <Link to="/shop" className="button button--primary">
          Plan another trip
        </Link>
      </div>
    </section>
  )
}
