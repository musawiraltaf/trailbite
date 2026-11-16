import { useEffect, useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { getMaxQuantity } from '../rules/businessRules.js'

// − [qty] + control used on product cards, the details page and the cart (Problem 2).
// Buttons are 44 × 44 px (the reference site's are 23 × 14 px).
//
// The stepper does not change the cart itself. It calls the onChange callback prop
// with the requested quantity; the cart checks Rule 1 and returns { ok, message }.
export default function QuantityStepper({ product, quantity, onChange, size = 'normal' }) {
  const max = getMaxQuantity(product)
  const [draft, setDraft] = useState(String(quantity)) // text in the box while typing
  const [message, setMessage] = useState('')

  // When the quantity changes elsewhere (another page, the cart), show the new value.
  useEffect(() => {
    setDraft(String(quantity))
  }, [quantity])

  function request(next) {
    const result = onChange(next)
    if (result.ok) {
      setMessage('')
    } else {
      setMessage(result.message) // e.g. "You can order up to 5 (limit of 5 per order)."
      setDraft(String(quantity)) // put the last valid value back
    }
  }

  function commitDraft() {
    if (draft === String(quantity)) return
    const next = Number(draft)
    if (draft.trim() === '' || !Number.isInteger(next) || next < 0) {
      setMessage('Enter a whole number.')
      setDraft(String(quantity))
      return
    }
    request(next)
  }

  const atLimit = quantity >= max
  const hintId = `qty-hint-${product.id}`

  return (
    <div className={`stepper stepper--${size}`}>
      <div className="stepper__controls" role="group" aria-label={`Quantity of ${product.name}`}>
        <button
          type="button"
          className="stepper__button"
          onClick={() => request(quantity - 1)}
          aria-label={quantity === 1 ? `Remove ${product.name} from cart` : `Decrease quantity of ${product.name}`}
        >
          {quantity === 1 ? (
            <Trash2 size={18} aria-hidden="true" />
          ) : (
            <Minus size={18} aria-hidden="true" />
          )}
        </button>

        <input
          className="stepper__input"
          type="number"
          inputMode="numeric"
          min="0"
          max={max}
          value={draft}
          aria-label={`Quantity of ${product.name}`}
          aria-describedby={hintId}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              commitDraft()
            }
          }}
        />

        <button
          type="button"
          className="stepper__button"
          onClick={() => request(quantity + 1)}
          disabled={atLimit}
          aria-label={`Increase quantity of ${product.name}`}
        >
          <Plus size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Rule 1 is shown beside the control, not only after it is broken. */}
      <p id={hintId} className={`stepper__hint${message ? ' stepper__hint--error' : ''}`} aria-live="polite">
        {message || stepperHint(quantity, max)}
      </p>
    </div>
  )
}

// Hint under the stepper: Rule 1 stated before it is broken, and an honest
// description when stock changed after the item was added.
function stepperHint(quantity, max) {
  if (max === 0) return 'Out of stock'
  if (quantity > max) return `Only ${max} available`
  if (quantity === max) return `Limit reached: ${max} max`
  return `Max ${max} per order`
}
