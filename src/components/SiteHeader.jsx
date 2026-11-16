import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../app/CartContext.jsx'

export default function SiteHeader() {
  const { summary } = useCart()
  const count = summary.itemCount

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="TrailBite home">
          <span className="brand__mark" aria-hidden="true">
            ▲
          </span>
          <span>
            Trail<span className="brand__accent">Bite</span>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="main-nav">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
                Cart
                <span className={`cart-badge${count === 0 ? ' cart-badge--empty' : ''}`} aria-hidden="true">
                  {count}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
