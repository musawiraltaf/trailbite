import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import CartToast from './CartToast.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  // On every route change: scroll to the top and move keyboard focus to the new
  // page's content, so screen-reader and keyboard users start at the right place.
  // Skipped on the very first load so the skip link stays first in tab order.
  useEffect(() => {
    window.scrollTo(0, 0)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
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
      <main id="main" ref={mainRef} tabIndex={-1} className={`page${bleed ? ' page--bleed' : ''}`}>
        <Outlet />
      </main>
      <SiteFooter />
      <CartToast />
    </>
  )
}
