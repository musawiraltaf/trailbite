import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../app/CartContext.jsx'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import CartIssues from '../components/CartIssues.jsx'
import FormField from '../components/FormField.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { formatPrice } from '../lib/format.js'
import { saveLastOrder } from '../lib/storage.js'
import {
  CITY_OPTIONS,
  DELIVERY_SLOTS,
  EMPTY_FORM,
  todayISO,
  validateCheckout,
} from '../lib/validation.js'
import { MIN_AGE, SERVICE_CITIES } from '../rules/businessRules.js'

const FIELD_ORDER = ['fullName', 'phone', 'city', 'address', 'slot', 'dateOfBirth']

// Checkout (/checkout): controlled form (FR09), validation (FR10), rule
// enforcement before completion (FR12) and the order review (FR11).
export default function CheckoutPage() {
  const navigate = useNavigate()
  const { status } = useCatalogue()
  const { lines, issues, summary, removeItem, clearCart } = useCart()

  // One state object for the whole form; every input reads its value from here.
  const [form, setForm] = useState(EMPTY_FORM)
  const [touched, setTouched] = useState({}) // fields the customer has left
  const [submitted, setSubmitted] = useState(false)
  const errorSummaryRef = useRef(null)

  if (status !== 'ready') return <CatalogueStatus />

  if (lines.length === 0) {
    return (
      <section className="state-panel">
        <h1>Nothing to check out yet</h1>
        <p>Your cart is empty. Add something for your trip first.</p>
        <Link to="/shop" className="button button--primary">
          Go to the shop
        </Link>
      </section>
    )
  }

  const today = todayISO()
  const needsAge = lines.some((line) => line.product.ageRestricted)
  // Derived on every render from current values, so messages are never stale.
  const errors = validateCheckout(form, { lines, today })
  const visibleError = (field) => (submitted || touched[field] ? errors[field] : undefined)
  const errorList = FIELD_ORDER.filter((field) => errors[field])

  function handleChange(event) {
    const { name, value } = event.target
    // Copy the previous object and replace one property; never mutate state.
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((previous) => ({ ...previous, [name]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault() // stay in the React app instead of reloading the page
    setSubmitted(true)

    // Rule 1 re-check: the cart must match current stock before ordering.
    if (errorList.length > 0 || issues.length > 0) {
      // Move focus to the error list after React has rendered it.
      // Move focus to the form's error list, or to the top where the stock conflicts are.
      setTimeout(() => {
        if (errorSummaryRef.current) errorSummaryRef.current.focus()
        else window.scrollTo({ top: 0 })
      }, 0)
      return // invalid input is kept so the customer only fixes what is wrong
    }

    // Simulated order: nothing is sent anywhere. The saved copy has no phone or address.
    const order = {
      id: `TB-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      firstName: form.fullName.trim().split(/\s+/)[0],
      city: form.city,
      slot: form.slot,
      lines: lines.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })),
      summary,
    }
    saveLastOrder(order)
    clearCart()
    navigate('/confirmation', { replace: true, state: { order } })
  }

  // Shared props for each input: name, value and the two handlers.
  const bind = (name) => ({ name, value: form[name], onChange: handleChange, onBlur: handleBlur })

  return (
    <section aria-labelledby="checkout-heading">
      <h1 id="checkout-heading">Checkout</h1>
      <p className="simulated-note">
        <strong>Simulated order.</strong> Nothing is charged or delivered. Payment would be cash on delivery.
      </p>

      {/* Stock conflicts are shown straight away, not only after submitting */}
      <CartIssues />

      {submitted && errorList.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
          <h2>Please fix {errorList.length === 1 ? 'this problem' : 'these problems'}</h2>
          <ul>
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#checkout-${field}`}>{errors[field]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Contact</legend>
            <FormField id="checkout-fullName" label="Full name" error={visibleError('fullName')}>
              {(a11y) => <input {...a11y} {...bind('fullName')} type="text" autoComplete="name" />}
            </FormField>

            <FormField
              id="checkout-phone"
              label="Mobile number"
              hint="11 digits, e.g. 0300 1234567"
              error={visibleError('phone')}
            >
              {(a11y) => <input {...a11y} {...bind('phone')} type="tel" inputMode="tel" autoComplete="tel" />}
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Delivery</legend>
            <FormField
              id="checkout-city"
              label="City"
              hint={`We deliver to ${SERVICE_CITIES.join(' and ')} only.`}
              error={visibleError('city')}
            >
              {(a11y) => (
                <select {...a11y} {...bind('city')}>
                  <option value="">Choose a city</option>
                  {CITY_OPTIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            <FormField
              id="checkout-address"
              label="Address"
              hint="House, street and sector, e.g. House 12, Street 5, G-9/2"
              error={visibleError('address')}
            >
              {(a11y) => <textarea {...a11y} {...bind('address')} rows={3} autoComplete="street-address" />}
            </FormField>

            <FormField id="checkout-slot" label="Delivery time" error={visibleError('slot')}>
              {(a11y) => (
                <select {...a11y} {...bind('slot')}>
                  <option value="">Choose a time slot</option>
                  {DELIVERY_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
          </fieldset>

          {/* Rule 2: only asked when the cart contains an 18+ item. */}
          {needsAge && (
            <fieldset>
              <legend>Age check</legend>
              <FormField
                id="checkout-dateOfBirth"
                label="Date of birth"
                hint={`Your cart has items for customers aged ${MIN_AGE}+. The rider checks ID on delivery.`}
                error={visibleError('dateOfBirth')}
              >
                {(a11y) => <input {...a11y} {...bind('dateOfBirth')} type="date" max={today} />}
              </FormField>
              {visibleError('dateOfBirth') && form.dateOfBirth && (
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => lines.filter((l) => l.product.ageRestricted).forEach((l) => removeItem(l.product))}
                >
                  Remove 18+ items from my cart
                </button>
              )}
            </fieldset>
          )}

          <FormField id="checkout-notes" label="Notes for the rider (optional)">
            {(a11y) => <textarea {...a11y} {...bind('notes')} rows={2} maxLength={200} />}
          </FormField>

          <button type="submit" className="button button--primary button--block checkout-submit">
            Place order · {formatPrice(summary.total)}
          </button>
        </form>

        <div className="checkout-review">
          <OrderSummary summary={summary}>
            <h3 className="review-heading">Your items</h3>
            <ul className="review-lines">
              {lines.map(({ product, quantity }) => (
                <li key={product.id}>
                  <span>
                    {quantity} × {product.name}
                  </span>
                  <span>{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
            <Link to="/cart">Edit cart</Link>
          </OrderSummary>
        </div>
      </div>
    </section>
  )
}
