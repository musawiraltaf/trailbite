import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import CartToast from './CartToast.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top (React Router keeps the old scroll position).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="page">
        <Outlet />
      </main>
      <SiteFooter />
      <CartToast />
    </>
  )
}
