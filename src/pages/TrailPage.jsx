import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Car, Clock, Droplet, MapPin, Mountain, PackagePlus, Route, Sun } from 'lucide-react'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import { useCart } from '../app/CartContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import DifficultyBadge from '../components/DifficultyBadge.jsx'
import ElevationProfile from '../components/ElevationProfile.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { formatHours, trails } from '../data/trails.js'
import { posts } from '../data/journal.js'
import { formatDrive } from '../lib/trailSearch.js'
import { formatPrice } from '../lib/format.js'

// Trail page (/trails/:id): details plus a pack list that links the trail to the shop.
export default function TrailPage() {
  const { id } = useParams()
  const { products, status } = useCatalogue()
  const { getQuantity, setQuantity } = useCart()
  const [kitMessage, setKitMessage] = useState('')

  const trail = trails.find((item) => item.id === id)

  if (!trail) {
    return (
      <section className="state-panel">
        <h1>Trail not found</h1>
        <p>There is no trail with the ID “{id}”. It may have been renamed.</p>
        <Link to="/trails" className="button button--primary">
          See all trails
        </Link>
      </section>
    )
  }

  const { name, area, start, end, distanceKm, climbM, hours, difficulty, season, driveMinutes, water } = trail

  // Join the pack list with current product data (skip IDs no longer in the catalogue).
  const kit = trail.packList
    .map(({ id: productId, quantity }) => ({ product: products.find((p) => p.id === productId), quantity }))
    .filter((item) => item.product)
  const kitTotal = kit.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  const relatedPosts = posts.filter((post) => post.trailIds.includes(trail.id))

  // Adds every kit item at its suggested quantity (never lowering what is already in
  // the cart). Each item still goes through Rule 1, so sold-out items are skipped.
  function addWholeKit() {
    const added = []
    const skipped = []
    for (const { product, quantity } of kit) {
      const target = Math.max(getQuantity(product.id), quantity)
      if (target === getQuantity(product.id)) continue // already enough in the cart
      const result = setQuantity(product, target)
      if (result.ok) added.push(product.name)
      else skipped.push(`${product.name} (${result.message.replace(/\.$/, '').toLowerCase()})`)
    }

    const parts = []
    if (added.length) parts.push(`Added ${added.length} ${added.length === 1 ? 'product' : 'products'} to your cart.`)
    if (!added.length && !skipped.length) parts.push('Everything in this kit is already in your cart.')
    if (skipped.length) parts.push(`Skipped: ${skipped.join(', ')}.`)
    setKitMessage(parts.join(' '))
  }

  return (
    <article className="trail-detail">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/trails">Trails</Link>
          </li>
          <li>
            <Link to={`/trails?area=${encodeURIComponent(area)}`}>{area}</Link>
          </li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <header className="trail-detail__header">
        <div className="trail-detail__title">
          <DifficultyBadge difficulty={difficulty} />
          <h1>{name}</h1>
          <p className="trail-detail__summary">{trail.summary}</p>
        </div>
        <ElevationProfile trail={trail} size="large" />
      </header>

      <dl className="trail-stats trail-stats--large">
        <div>
          <dt>
            <Route size={16} aria-hidden="true" /> Distance
          </dt>
          <dd>{distanceKm} km</dd>
        </div>
        <div>
          <dt>
            <Mountain size={16} aria-hidden="true" /> Climb
          </dt>
          <dd>{climbM} m</dd>
        </div>
        <div>
          <dt>
            <Clock size={16} aria-hidden="true" /> Time
          </dt>
          <dd>{formatHours(hours)}</dd>
        </div>
        <div>
          <dt>
            <Car size={16} aria-hidden="true" /> From Islamabad
          </dt>
          <dd>{formatDrive(driveMinutes)}</dd>
        </div>
      </dl>

      <div className="trail-detail__body">
        <section aria-labelledby="about-trail">
          <h2 id="about-trail">About the trail</h2>
          <p>{trail.description}</p>
          <ul className="highlight-list">
            {trail.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <aside className="trail-facts" aria-labelledby="trail-facts-heading">
          <h2 id="trail-facts-heading">Before you go</h2>
          <ul>
            <li>
              <MapPin size={18} className="icon" aria-hidden="true" />
              <span>
                <strong>Start:</strong> {start}
                <br />
                <strong>Turn-round point:</strong> {end}
              </span>
            </li>
            <li>
              <Sun size={18} className="icon" aria-hidden="true" />
              <span>
                <strong>Best season:</strong> {season}
              </span>
            </li>
            <li>
              <Droplet size={18} className="icon" aria-hidden="true" />
              <span>
                <strong>Water:</strong> {water}
              </span>
            </li>
          </ul>
        </aside>
      </div>

      <section className="section" aria-labelledby="kit-heading">
        <div className="kit-header">
          <div>
            <h2 id="kit-heading">Pack for {name}</h2>
            <p>
              What we would carry for this route. Suggested kit: <strong>{formatPrice(kitTotal)}</strong>.
            </p>
          </div>
          <button
            type="button"
            className="button button--primary"
            onClick={addWholeKit}
            disabled={status !== 'ready'}
          >
            <PackagePlus size={18} aria-hidden="true" />
            Add the whole kit
          </button>
        </div>
        <p className="kit-message" role="status">
          {kitMessage}
        </p>

        {status !== 'ready' ? <CatalogueStatus /> : <ProductGrid products={kit.map(({ product }) => product)} />}
      </section>

      {relatedPosts.length > 0 && (
        <section className="section" aria-labelledby="trail-reading">
          <h2 id="trail-reading">From the Trail Journal</h2>
          <ul className="related-posts">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                <span>{post.readMinutes} min read</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
