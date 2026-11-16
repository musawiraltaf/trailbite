import { Link, NavLink } from 'react-router-dom'

export default function SiteHeader() {
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
          </ul>
        </nav>
      </div>
    </header>
  )
}
