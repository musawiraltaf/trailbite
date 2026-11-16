// Search, filter and sort helpers for the shop page (FR04, FR05).
// Pure functions: they never change the array they receive, they return new ones.

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export const DIET_OPTIONS = [
  { value: '', label: 'Any diet' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'gluten-free', label: 'Gluten-free' },
]

/** True when the product's name, category, description or dietary tags contain every search word. */
function matchesSearch(product, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true

  const { name, category, description = '', dietary } = product
  const haystack = [name, category, description, ...dietary].join(' ').toLowerCase()
  return words.every((word) => haystack.includes(word))
}

export function filterProducts(products, { query = '', category = '', diet = '', inStockOnly = false }) {
  return products.filter(
    (product) =>
      matchesSearch(product, query) &&
      (!category || product.category === category) &&
      (!diet || product.dietary.includes(diet)) &&
      (!inStockOnly || product.stock > 0),
  )
}

export function sortProducts(products, sort) {
  const copy = [...products] // sort() mutates, so sort a copy
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return copy // 'featured' keeps catalogue order
  }
}
