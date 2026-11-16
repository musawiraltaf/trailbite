import { useState } from 'react'

// Illustration used when a product has no photo, or its photo fails to load
// (edge case: missing image). Each category gets its own icon and colour.
const CATEGORY_ART = {
  'Trail meals': { icon: '🍲', tone: 'meal' },
  Breakfast: { icon: '🥣', tone: 'breakfast' },
  Snacks: { icon: '🥜', tone: 'snack' },
  Drinks: { icon: '🫖', tone: 'drink' },
  'Camp essentials': { icon: '🏕️', tone: 'gear' },
}

export default function ProductImage({ product, size = 'card' }) {
  const [failed, setFailed] = useState(false)
  const art = CATEGORY_ART[product.category] ?? { icon: '📦', tone: 'gear' }

  if (product.image && !failed) {
    return (
      <img
        className={`product-image product-image--${size}`}
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      className={`product-image product-image--${size} product-image--fallback tone-${art.tone}`}
      role="img"
      aria-label={`${product.category} illustration for ${product.name}`}
    >
      <span aria-hidden="true">{art.icon}</span>
    </div>
  )
}
