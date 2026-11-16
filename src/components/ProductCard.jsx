import { Link } from 'react-router-dom'
import ProductArt from './ProductArt.jsx'
import StockStatus from './StockStatus.jsx'
import AddToCart from './AddToCart.jsx'
import { formatPrice } from '../lib/format.js'

// Product card — fix for Problem 1 (reference cards let price and stock collide,
// cut names off with "..." and hid pack size). Each fact has its own row:
//   category · full name (wraps, never truncated) · pack size/servings/kcal · tags
//   price and stock (pinned to the bottom) · cart control
// The cart control is the fix for Problem 2: adding or changing a quantity happens
// right here, without leaving the listing.
//
// `index` staggers the one-time entrance animation (see .product-grid in shop.css).
export default function ProductCard({ product }) {
  const { id, name, category, packSize, servings, calories, price, stock, dietary } = product
  const outOfStock = stock <= 0

  const meta = [
    packSize,
    servings ? `${servings} ${servings === 1 ? 'serving' : 'servings'}` : null,
    calories ? `${calories} kcal` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className={`product-card${outOfStock ? ' product-card--unavailable' : ''}`}>
      <ProductArt product={product} />

      <div className="product-card__body">
        <p className="product-card__category">{category}</p>

        {/* The name link stretches over the whole card (see .product-card__name a::after) */}
        <h3 className="product-card__name">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>

        <p className="product-card__meta">{meta}</p>

        {dietary.length > 0 && (
          <ul className="tag-list" aria-label="Dietary information">
            {dietary.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="product-card__footer">
          <div className="product-card__price-row">
            <p className="price">{formatPrice(price)}</p>
            <StockStatus stock={stock} />
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  )
}
