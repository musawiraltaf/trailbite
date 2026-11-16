import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Info, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import CatalogueStatus from '../components/CatalogueStatus.jsx'
import ProductArt from '../components/ProductArt.jsx'
import StockStatus from '../components/StockStatus.jsx'
import AddToCart from '../components/AddToCart.jsx'
import { PrepSteps, PrepSummary } from '../components/PreparationInfo.jsx'
import { formatPrice } from '../lib/format.js'
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  MAX_PER_PRODUCT,
  MIN_AGE,
  SERVICE_CITIES,
  getMaxQuantity,
} from '../rules/businessRules.js'

// Product details route: /products/:id (FR02, FR06).
export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { products, status } = useCatalogue()

  if (status !== 'ready') return <CatalogueStatus />

  const product = products.find((item) => item.id === id)
  if (!product) return <ProductNotFound id={id} />

  const { name, category, packSize, servings, calories, price, stock, preparation, ageRestricted } = product
  const maxQuantity = getMaxQuantity(product)
  const sections = buildSections(product)

  return (
    <article className="product-detail">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>
          </li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <div className="product-detail__top">
        <ProductArt product={product} size="detail" />

        <div className="product-detail__summary">
          <p className="product-card__category">{category}</p>
          <h1>{name}</h1>
          <p className="product-card__meta">
            {packSize}
            {servings ? ` · ${servings} ${servings === 1 ? 'serving' : 'servings'}` : ''}
            {calories ? ` · ${calories} kcal` : ''}
          </p>

          <p className="product-detail__price">{formatPrice(price)}</p>
          <StockStatus stock={stock} />

          {/* Conditions are shown before the customer decides, not at checkout. */}
          <ul className="conditions">
            {maxQuantity > 0 && (
              <li>
                <PackageCheck size={18} className="icon" aria-hidden="true" />
                <span>
                  Order up to <strong>{maxQuantity}</strong>
                  {maxQuantity < MAX_PER_PRODUCT ? ' (limited by stock)' : ' per order'}.
                </span>
              </li>
            )}
            {ageRestricted && (
              <li className="conditions__warning">
                <ShieldCheck size={18} className="icon" aria-hidden="true" />
                <span>
                  <strong>{MIN_AGE}+ only.</strong> You will be asked for your date of birth at checkout.
                </span>
              </li>
            )}
            <li>
              <Truck size={18} className="icon" aria-hidden="true" />
              <span>
                Delivery in {SERVICE_CITIES.join(' and ')}: {formatPrice(DELIVERY_FEE)}, free from{' '}
                {formatPrice(FREE_DELIVERY_THRESHOLD)}.
              </span>
            </li>
          </ul>

          <PrepSummary preparation={preparation} />

          <div className="product-detail__buy">
            <AddToCart product={product} size="large" />
          </div>

          <div className="button-row">
            {/* Back keeps the shop's filters; a direct visit (no history) goes to the shop. */}
            <button
              type="button"
              className="button button--secondary"
              onClick={() => (location.key === 'default' ? navigate('/shop') : navigate(-1))}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Only sections that have content are listed and rendered (fix for Problem 3). */}
      {sections.length > 1 && (
        <nav aria-label="On this page" className="section-nav">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="detail-section" aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          {section.content}
        </section>
      ))}
    </article>
  )
}

// Builds the list of sections from the product's data. A section is added only
// when there is something to show; missing food instructions get an explicit
// message instead of an empty panel.
function buildSections(product) {
  const { description, preparation, dietary } = product
  const list = [
    {
      id: 'about',
      title: 'About',
      content: description ? (
        <p>{description}</p>
      ) : (
        <div className="notice notice--info">
          <Info size={18} className="icon" aria-hidden="true" />
          <p>The supplier has not sent a full description yet. Pack size, price and preparation are listed on this page.</p>
        </div>
      ),
    },
  ]

  // preparation === null means "not food" (e.g. a gas canister): no section at all.
  // preparation === undefined means "food, but instructions are missing": show a notice.
  if (preparation) {
    list.push({ id: 'preparation', title: 'Preparation', content: <PrepSteps preparation={preparation} /> })
  } else if (preparation === undefined) {
    list.push({
      id: 'preparation',
      title: 'Preparation',
      content: (
        <div className="notice">
          <Info size={18} className="icon" aria-hidden="true" />
          <p>Preparation instructions for this item are not available yet. Most of our breakfasts need about 200 ml of hot water and 5 minutes.</p>
        </div>
      ),
    })
  }

  if (dietary.length > 0) {
    list.push({
      id: 'dietary',
      title: 'Dietary information',
      content: (
        <ul className="tag-list">
          {dietary.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      ),
    })
  }

  return list
}

// Invalid or outdated product ID (FR02): explain and offer next steps.
function ProductNotFound({ id }) {
  // 'tb-chicken-tikka' -> 'chicken': one word is more likely to find a near match
  const firstWord = id.replace(/^tb-/, '').split('-')[0]

  return (
    <section className="state-panel">
      <h1>Product not found</h1>
      <p>
        There is no product with the ID “{id}”. It may have been removed from the catalogue, or the link may be
        mistyped.
      </p>
      <div className="button-row">
        <Link to="/shop" className="button button--primary">
          Browse all products
        </Link>
        <Link to={`/shop?q=${encodeURIComponent(firstWord)}`} className="button button--secondary">
          Search for similar items
        </Link>
      </div>
    </section>
  )
}
