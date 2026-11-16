// Milestone 1 placeholder: shows the business profile and confirms the catalogue
// loads. Routes, the shop and the cart are added in later milestones.
import { business } from '../data/business.js'
import { products, CATEGORIES } from '../data/products.js'
import { formatPrice } from '../lib/format.js'

export default function App() {
  return (
    <main className="setup-page">
      <h1>{business.name}</h1>
      <p className="tagline">{business.tagline}</p>

      <dl className="profile">
        <dt>Offering</dt>
        <dd>{business.offering}</dd>
        <dt>Audience</dt>
        <dd>{business.audience}</dd>
        <dt>Operating area</dt>
        <dd>{business.operatingArea}</dd>
        <dt>Main task</dt>
        <dd>{business.mainTask}</dd>
      </dl>

      <h2>
        Catalogue: {products.length} products in {CATEGORIES.length} categories
      </h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — {formatPrice(product.price)} — {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </li>
        ))}
      </ul>
    </main>
  )
}
