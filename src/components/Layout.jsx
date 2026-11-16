import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import CartToast from './CartToast.jsx'
import CartIssues from './CartIssues.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const previousPath = useRef(pathname)

  // On every route change: scroll to the top and move keyboard focus to the new
  // page's content, so screen-reader and keyboard users start at the right place.
  // Comparing with the previous path (instead of a "first render" flag) means a
  // fresh page load never steals focus, even when StrictMode runs effects twice,
  // so the skip link stays first in the tab order.
  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  // The landing page runs edge to edge; every other page sits in the content column.
  const bleed = pathname === '/'

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      {/* Cart and checkout show the full list; every other page gets a short alert */}
      {pathname !== '/cart' && pathname !== '/checkout' && <CartIssues variant="banner" />}
      <main id="main" ref={mainRef} tabIndex={-1} className={`page${bleed ? ' page--bleed' : ''}`}>
        <Outlet />
      </main>
      <SiteFooter />
      <CartToast />
    </>
  )
}
