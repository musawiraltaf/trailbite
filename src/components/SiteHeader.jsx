import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../app/CartContext.jsx'
import BrandMark from './BrandMark.jsx'

export default function SiteHeader() {
  const { summary } = useCart()
  const count = summary.itemCount

  // Briefly "bump" the badge when the count changes, as feedback that the add worked.
  const [bump, setBump] = useState(false)
  const previousCount = useRef(count)
  useEffect(() => {
    if (count === previousCount.current) return
    previousCount.current = count
    setBump(true)
    const timer = setTimeout(() => setBump(false), 340)
    return () => clearTimeout(timer)
  }, [count])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="TrailBite home">
          <BrandMark className="brand__mark" />
          <span>
            Trail<span className="brand__accent">Bite</span>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="main-nav">
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/trails">Trails</NavLink>
            </li>
            <li>
              <NavLink to="/journal">Journal</NavLink>
            </li>
            <li>
              <NavLink to="/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
                <ShoppingBag size={18} className="icon" aria-hidden="true" />
                <span className="nav-label--optional">Cart</span>
                <span
                  className={`cart-badge${count === 0 ? ' cart-badge--empty' : ''}${bump ? ' cart-badge--bump' : ''}`}
                  aria-hidden="true"
                >
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
