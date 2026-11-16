import { Link } from 'react-router-dom'
import { business } from '../data/business.js'
import { CATEGORIES } from '../data/products.js'
import DemoPanel from './DemoPanel.jsx'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__brand">{business.name}</p>
          <p>{business.operatingArea}</p>
          <p className="site-footer__note">
            Fictional business for a university assignment. Orders are simulated: no payment is taken and nothing is
            delivered.
          </p>
        </div>

        <nav aria-labelledby="footer-shop">
          <h2 id="footer-shop">Shop</h2>
          <ul>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-help">
          <h2 id="footer-help">Explore</h2>
          <ul>
            <li>
              <Link to="/trails">Trail finder</Link>
            </li>
            <li>
              <Link to="/journal">Trail Journal</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="site-footer__demo">
        <DemoPanel />
      </div>
    </footer>
  )
}
