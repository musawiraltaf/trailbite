import { useState } from 'react'
import { CATEGORIES } from '../data/products.js'
import { DIET_OPTIONS, SORT_OPTIONS } from '../lib/catalogue.js'

// Search, filter and sort controls. The filter values are not stored here:
// they arrive as props and every change is reported through the onChange
// callback prop, so ShopPage stays the single place that updates them.
//
// The only local state is whether the extra filters are expanded on phones.
// On wide screens CSS keeps them open and hides the toggle.
export default function ShopFilters({ values, onChange, onClear }) {
  const { query, category, diet, inStockOnly, sort } = values
  const [expanded, setExpanded] = useState(false)

  const activeCount = [category, diet, inStockOnly, sort !== 'featured'].filter(Boolean).length

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

      <button
        type="button"
        className="filters__toggle button button--secondary"
        aria-expanded={expanded}
        aria-controls="shop-filter-options"
        onClick={() => setExpanded((open) => !open)}
      >
        {expanded ? 'Hide filters' : 'Filters & sort'}
        {activeCount > 0 && <span className="cart-badge">{activeCount}</span>}
      </button>

      <div id="shop-filter-options" className={`filters__options${expanded ? ' filters__options--open' : ''}`}>
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
      </div>
    </form>
  )
}
