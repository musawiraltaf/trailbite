import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        // product.id is stable, so React keeps each card's state when the list is filtered or sorted
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
