import { Link } from 'react-router-dom'
import { business } from '../data/business.js'
import { CATEGORIES } from '../data/products.js'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, SERVICE_CITIES } from '../rules/businessRules.js'
import { formatPrice } from '../lib/format.js'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Delivered across {SERVICE_CITIES.join(' & ')}</p>
        <h1>{business.tagline}</h1>
        <p className="hero__lead">
          Freeze-dried desi meals, trail snacks and stove fuel, packed for day hikes on Trail 5 or a weekend at Shogran.
          Add everything for your trip from one page.
        </p>
        <div className="button-row">
          <Link to="/shop" className="button button--primary">
            Shop trail food
          </Link>
          <a href="#how-it-works" className="button button--secondary">
            How delivery works
          </a>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="section">
        <h2 id="categories-heading">Shop by category</h2>
        <ul className="category-list">
          {CATEGORIES.map((category) => (
            <li key={category}>
              {/* The category travels in the URL, so the shop opens already filtered. */}
              <Link to={`/shop?category=${encodeURIComponent(category)}`} className="category-chip">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="how-it-works" aria-labelledby="delivery-heading" className="section info-grid">
        <h2 id="delivery-heading" className="visually-hidden">
          Delivery and ordering rules
        </h2>
        <article className="info-card">
          <h3>Delivery</h3>
          <p>
            {formatPrice(DELIVERY_FEE)} delivery in {SERVICE_CITIES.join(' and ')}. Free on orders of{' '}
            {formatPrice(FREE_DELIVERY_THRESHOLD)} or more.
          </p>
        </article>
        <article className="info-card">
          <h3>Fair limits</h3>
          <p>Up to 5 of each item per order, so popular meals stay available for every group.</p>
        </article>
        <article className="info-card">
          <h3>Fuel and knives</h3>
          <p>Gas canisters and knives can only be ordered by customers aged 18 or over.</p>
        </article>
      </section>
    </>
  )
}
