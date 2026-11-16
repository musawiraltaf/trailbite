import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'

export default function ShopPage() {
  const { products, status } = useCatalogue()

  return (
    <section>
      <h1>Shop</h1>
      {status !== 'ready' ? <CatalogueStatus /> : <p>{products.length} products loaded.</p>}
    </section>
  )
}
