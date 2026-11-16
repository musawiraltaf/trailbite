import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function ShopPage() {
  const { products, status } = useCatalogue()

  return (
    <section aria-labelledby="shop-heading">
      <h1 id="shop-heading">Shop trail food</h1>
      {status !== 'ready' ? <CatalogueStatus /> : <ProductGrid products={products} />}
    </section>
  )
}
