import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CircleCheck, X } from 'lucide-react'
import { useCart } from '../app/CartContext.jsx'
import { formatPrice } from '../lib/format.js'

const VISIBLE_MS = 4000

// Small status bar confirming each cart change without leaving the page
// (Problem 2: the reference site sends the customer to the cart page instead).
export default function CartToast() {
  const { notice, dismissNotice, summary } = useCart()
  const { pathname } = useLocation()

  // Hide the toast after a few seconds. The cleanup clears the timer if a newer
  // notice arrives first, so each message gets its full time on screen.
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(dismissNotice, VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [notice, dismissNotice])

  return (
    // The live region is always in the page so screen readers announce changes.
    <div className="cart-toast-region" role="status" aria-live="polite">
      {notice && (
        <div className="cart-toast" key={notice.id}>
          <CircleCheck size={20} className="icon" aria-hidden="true" />
          <p>
            {notice.text}{' '}
            <span className="cart-toast__total">
              Cart: {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'} · {formatPrice(summary.subtotal)}
            </span>
          </p>
          {pathname !== '/cart' && pathname !== '/checkout' && summary.itemCount > 0 && (
            <Link to="/cart" className="cart-toast__link">
              View cart
            </Link>
          )}
          <button type="button" className="cart-toast__close" onClick={dismissNotice} aria-label="Dismiss message">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
