import { CATEGORIES } from '../data/products.js'
import { DIET_OPTIONS, SORT_OPTIONS } from '../lib/catalogue.js'

// Search, filter and sort controls. This component does not own any state:
// it receives the current values as props and reports changes through the
// onChange callback prop, so ShopPage stays the single place that updates them.
export default function ShopFilters({ values, onChange, onClear }) {
  const { query, category, diet, inStockOnly, sort } = values

  return (
    <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="field field--search">
        <label htmlFor="shop-search">Search</label>
        <input
          id="shop-search"
          type="search"
          value={query}
          placeholder="e.g. karahi, vegan, tea"
          onChange={(event) => onChange('q', event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="shop-category">Category</label>
        <select id="shop-category" value={category} onChange={(event) => onChange('category', event.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="shop-diet">Diet</label>
        <select id="shop-diet" value={diet} onChange={(event) => onChange('diet', event.target.value)}>
          {DIET_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="shop-sort">Sort by</label>
        <select id="shop-sort" value={sort} onChange={(event) => onChange('sort', event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field field--checkbox">
        <input
          id="shop-stock"
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onChange('stock', event.target.checked ? 'in' : '')}
        />
        <label htmlFor="shop-stock">In stock only</label>
      </div>

      <button type="button" className="button button--secondary filters__clear" onClick={onClear}>
        Clear filters
      </button>
    </form>
  )
}
