import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  return (
    <ul className="product-grid">
      {products.map((product, index) => (
        // product.id is stable, so React keeps each card's state when the list is filtered or sorted.
        // --i staggers the one-time entrance animation (shop.css).
        <li key={product.id} style={{ '--i': index }}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
