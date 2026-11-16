import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import StockStatus from './StockStatus.jsx'
import AddToCart from './AddToCart.jsx'
import { formatPrice } from '../lib/format.js'

// The cart control at the bottom is the fix for Problem 2: adding or changing a
// quantity happens right here, without leaving the listing.
//
// Product card — fix for Problem 1 (reference cards let price and stock collide,
// cut names off with "..." and hid pack size).
// Each piece of information has its own row:
//   category · full name (wraps, never truncated) · pack size/servings · price · stock line
// The price/stock block is pushed to the bottom with flexbox so cards in a row line up
// even when one name is much longer than the others.
export default function ProductCard({ product }) {
  const { id, name, category, packSize, servings, price, stock, dietary } = product
  const outOfStock = stock <= 0

  return (
    <article className={`product-card${outOfStock ? ' product-card--unavailable' : ''}`}>
      <Link to={`/products/${id}`} className="product-card__image-link" tabIndex={-1} aria-hidden="true">
        <ProductImage product={product} />
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{category}</p>

        <h3 className="product-card__name">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>

        <p className="product-card__meta">
          {packSize}
          {servings ? ` · ${servings} ${servings === 1 ? 'serving' : 'servings'}` : ''}
        </p>

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
          <p className="product-card__price">{formatPrice(price)}</p>
          <StockStatus stock={stock} />
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  )
}
