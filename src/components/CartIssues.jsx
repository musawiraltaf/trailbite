import { Link } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'
import { useCart } from '../app/CartContext.jsx'

// Explains conflicts between the saved cart and the current catalogue and offers
// a fix for each one (edge case: "unavailable or restored selection").
//   variant="panel"  full list with fix buttons (cart and checkout pages)
//   variant="banner" one-line alert with a link to the cart (every other page)
export default function CartIssues({ variant = 'panel' }) {
  const { issues, items, setQuantity, removeById, fixAllIssues } = useCart()
  if (issues.length === 0) return null

  const count = issues.length
  const heading = `${count} ${count === 1 ? 'item in your cart has' : 'items in your cart have'} changed since you added ${count === 1 ? 'it' : 'them'}`

  if (variant === 'banner') {
    return (
      <div className="cart-issues-banner" role="alert">
        <TriangleAlert size={18} aria-hidden="true" />
        <p>{heading}.</p>
        <Link to="/cart">Review cart</Link>
      </div>
    )
  }

  return (
    <section className="cart-issues" role="alert" aria-labelledby="cart-issues-heading">
      <h2 id="cart-issues-heading">
        <TriangleAlert size={20} aria-hidden="true" />
        {heading}
      </h2>
      <p>Stock is checked again whenever the catalogue loads. Fix these before you check out:</p>
      <ul>
        {issues.map((issue) => {
          // Discontinued items are gone from the catalogue, so use the name saved with the cart line.
          const name = issue.product?.name ?? items.find((item) => item.id === issue.id)?.name ?? 'A saved item'
          return (
            <li key={issue.id}>
              <span>
                <strong>{name}:</strong> {issue.message}
              </span>
              {issue.fixQuantity > 0 ? (
                <button type="button" className="link-button" onClick={() => setQuantity(issue.product, issue.fixQuantity)}>
                  Change to {issue.fixQuantity}
                </button>
              ) : (
                <button type="button" className="link-button" onClick={() => removeById(issue.id)}>
                  Remove
                </button>
              )}
            </li>
          )
        })}
      </ul>
      {count > 1 && (
        <button type="button" className="button button--primary" onClick={fixAllIssues}>
          Fix all {count}
        </button>
      )}
    </section>
  )
}
