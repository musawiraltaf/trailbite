import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="state-panel">
      <h1>We couldn’t find that page</h1>
      <p>The link may be old or mistyped. Our trail food is all in the shop.</p>
      <div className="button-row">
        <Link to="/shop" className="button button--primary">
          Browse the shop
        </Link>
        <Link to="/" className="button button--secondary">
          Go to home page
        </Link>
      </div>
    </section>
  )
}
