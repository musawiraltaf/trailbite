import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ShopFilters from '../components/ShopFilters.jsx'
import { filterProducts, sortProducts } from '../lib/catalogue.js'

// The filters live in the URL (?q=&category=&diet=&stock=&sort=) instead of
// component state. Benefits: Back/Forward restore earlier filters, returning
// from a product page keeps the customer's place, and a filtered view can be shared.
export default function ShopPage() {
  const { products, status } = useCatalogue()
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    query: searchParams.get('q') ?? '',
    category: searchParams.get('category') ?? '',
    diet: searchParams.get('diet') ?? '',
    inStockOnly: searchParams.get('stock') === 'in',
    sort: searchParams.get('sort') ?? 'featured',
  }
  const { query, category, diet, inStockOnly, sort } = filters

  // Derived value: recalculated only when the products or a filter changes.
  const results = useMemo(
    () => sortProducts(filterProducts(products, { query, category, diet, inStockOnly }), sort),
    [products, query, category, diet, inStockOnly, sort],
  )

  function updateParam(key, value) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      // Typing in the search box replaces the history entry, so Back does not
      // step through every letter. Other filter changes add a history entry.
      { replace: key === 'q' },
    )
  }

  function clearFilters() {
    setSearchParams({})
  }

  // Filters other than the search box (used to offer "search all products").
  const narrowedByFilters = Boolean(category || diet || inStockOnly)

  return (
    <section aria-labelledby="shop-heading">
      <h1 id="shop-heading">{category || 'Shop trail food'}</h1>

      <ShopFilters values={filters} onChange={updateParam} onClear={clearFilters} />

      {status !== 'ready' ? (
        <CatalogueStatus />
      ) : products.length === 0 ? (
        // Empty dataset: nothing in the catalogue at all (different from "no matches").
        <div className="state-panel">
          <h2>The shelves are empty right now</h2>
          <p>We are restocking for the season. Check back soon, or read how delivery works in the meantime.</p>
          <Link to="/" className="button button--secondary">
            Back to home
          </Link>
        </div>
      ) : (
        <>
          <p className="results-count" role="status">
            {results.length} of {products.length} products
            {query && <> matching “{query}”</>}
          </p>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <NoMatches
              query={query}
              category={category}
              narrowedByFilters={narrowedByFilters}
              onClear={clearFilters}
              onSearchAll={() => setSearchParams({ q: query })}
            />
          )}
        </>
      )}
    </section>
  )
}

// No-results state: says what was searched and offers a way forward (FR15).
function NoMatches({ query, category, narrowedByFilters, onClear, onSearchAll }) {
  return (
    <div className="state-panel">
      <h2>No products match {query ? `“${query}”` : 'these filters'}</h2>
      <p>
        {category ? `Nothing in ${category} fits. ` : ''}
        {narrowedByFilters
          ? 'Your filters may be hiding it: search everything, or clear the filters.'
          : 'Check the spelling or try a shorter word, such as “rice”, “vegan” or “tea”.'}
      </p>
      <div className="button-row">
        {query && narrowedByFilters && (
          <button type="button" className="button button--primary" onClick={onSearchAll}>
            Search all products for “{query}”
          </button>
        )}
        <button type="button" className="button button--secondary" onClick={onClear}>
          Clear all filters
        </button>
      </div>
    </div>
  )
}
