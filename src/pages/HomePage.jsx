import { Link } from 'react-router-dom'
import { ArrowRight, Compass, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import HeroLandscape from '../components/HeroLandscape.jsx'
import TrailJourney from '../components/TrailJourney.jsx'
import TrailCard from '../components/TrailCard.jsx'
import ProductArt from '../components/ProductArt.jsx'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import { CATEGORIES } from '../data/products.js'
import { trails } from '../data/trails.js'
import { posts } from '../data/journal.js'
import { formatPrice } from '../lib/format.js'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, MAX_PER_PRODUCT, MIN_AGE } from '../rules/businessRules.js'

const CATEGORY_LINES = {
  'Trail meals': 'Biryani, daal chawal and ramen that need only boiling water.',
  Breakfast: 'Oats and granola for the trailhead.',
  'Snacks & fuel': 'Trail mix, jerky, chikki and nut butter for every hour on the move.',
  Drinks: 'Electrolytes for the climb, doodh patti for the top.',
  'Camp kitchen': 'Gas, a pot and a spork: everything a hot meal needs.',
  'Trail gear': 'Filters, headlamps and poles for longer days.',
  Merch: 'Caps, mugs and patches with the TrailBite ridge.',
}

// Landing page (/): an immersive introduction that leads to the store and the trail finder.
export default function HomePage() {
  const { products, status } = useCatalogue()
  const trending = [...trails].sort((a, b) => b.trending - a.trending).slice(0, 3)
  const latestPost = [...posts].sort((a, b) => a.trending - b.trending)[0]

  return (
    <>
      {/* 1. Hero: enters once on load (home.css) */}
      <section className="hero" aria-labelledby="hero-heading">
        <HeroLandscape />
        <div className="hero__content wrap">
          <h1 id="hero-heading" className="hero__title">
            Trail food for the Margallas and beyond
          </h1>
          <p className="hero__lead">
            Hot meals that need only boiling water, snacks that survive a rucksack, and the kit to cook them. Delivered
            across Islamabad and Rawalpindi, free from {formatPrice(FREE_DELIVERY_THRESHOLD)}.
          </p>
          <div className="button-row hero__actions">
            <Link to="/shop" className="button button--primary button--large">
              <ShoppingBag size={20} aria-hidden="true" />
              Take me to the store
            </Link>
            <Link to="/trails" className="button button--secondary button--large hero__secondary">
              <Compass size={20} aria-hidden="true" />
              Find a trail
            </Link>
          </div>
        </div>
      </section>

      {/* 2. The scroll moment */}
      <TrailJourney />

      {/* 3. Categories as rows, each with a few real products from that category */}
      <section className="home-section wrap" aria-labelledby="range-heading">
        <h2 id="range-heading">Everything for the day, in one bag</h2>
        <ul className="range-list">
          {CATEGORIES.map((category) => {
            const inCategory = products.filter((product) => product.category === category)
            const from = inCategory.length ? Math.min(...inCategory.map((product) => product.price)) : null
            return (
              <li key={category}>
                <Link to={`/shop?category=${encodeURIComponent(category)}`} className="range-row">
                  <span className="range-row__text">
                    <span className="range-row__name">{category}</span>
                    <span className="range-row__line">{CATEGORY_LINES[category]}</span>
                  </span>
                  <span className="range-row__art" aria-hidden="true">
                    {status === 'ready' &&
                      inCategory.slice(0, 3).map((product) => <ProductArt key={product.id} product={product} size="thumb" />)}
                  </span>
                  <span className="range-row__price">
                    {from !== null && <>from {formatPrice(from)}</>}
                    <ArrowRight size={20} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 4. Trending trails */}
      <section className="home-section wrap" aria-labelledby="trending-home-heading">
        <div className="home-section__head">
          <h2 id="trending-home-heading">Trending trails this month</h2>
          <Link to="/trails" className="text-link">
            All {trails.length} trails <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="trail-grid">
          {trending.map((trail) => (
            <li key={trail.id}>
              <TrailCard trail={trail} />
            </li>
          ))}
        </ul>
      </section>

      {/* 5. The three operating rules, said plainly before anyone shops */}
      <section className="home-section wrap" aria-labelledby="rules-heading">
        <h2 id="rules-heading">How ordering works</h2>
        <dl className="rules-band">
          <div>
            <dt>
              <Truck size={22} aria-hidden="true" /> Delivery
            </dt>
            <dd>
              {formatPrice(DELIVERY_FEE)} across Islamabad and Rawalpindi, free on orders of{' '}
              {formatPrice(FREE_DELIVERY_THRESHOLD)} or more.
            </dd>
          </div>
          <div>
            <dt>
              <ShoppingBag size={22} aria-hidden="true" /> Fair limits
            </dt>
            <dd>Up to {MAX_PER_PRODUCT} of each item per order, so popular meals stay in stock for every group.</dd>
          </div>
          <div>
            <dt>
              <ShieldCheck size={22} aria-hidden="true" /> Fuel and blades
            </dt>
            <dd>Gas canisters and knives are sold to customers aged {MIN_AGE} or over only.</dd>
          </div>
        </dl>
      </section>

      {/* 6. Journal teaser and closing action */}
      <section className="home-close" aria-labelledby="close-heading">
        <div className="wrap home-close__inner">
          {latestPost && (
            <p className="home-close__post">
              From the Trail Journal: <Link to={`/journal/${latestPost.slug}`}>{latestPost.title}</Link>
            </p>
          )}
          <h2 id="close-heading">Pack tonight, hike at sunrise</h2>
          <Link to="/shop" className="button button--primary button--large">
            Take me to the store
          </Link>
        </div>
      </section>
    </>
  )
}
