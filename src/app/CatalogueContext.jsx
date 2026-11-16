// Loads the product catalogue once and shares it with every page (FR03, FR14).
//
// status: 'loading' | 'error' | 'ready'
// Pages read the catalogue with useCatalogue() instead of loading it themselves,
// so the listing, details page and cart always see the same product data.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { loadProducts } from '../lib/mockLoader.js'
import { DEFAULT_DEMO, readDemo, saveDemo } from '../lib/demoScenarios.js'

const CatalogueContext = createContext(null)

export function CatalogueProvider({ children }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  // Bumping this number re-runs the loading effect (Retry and demo changes).
  const [attempt, setAttempt] = useState(0)
  // Assignment demo controls (DemoPanel). Read once from sessionStorage.
  const [demo, setDemo] = useState(readDemo)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError('')

    loadProducts({ demo, signal: controller.signal })
      .then((list) => {
        setProducts(list)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return // a newer load started or the app unmounted
        setError(err.message)
        setStatus('error')
      })

    // Cleanup: cancel the pending timer if this effect re-runs or the app unmounts.
    return () => controller.abort()
  }, [attempt, demo])

  // Keep the demo settings for this browser session (survives refresh).
  useEffect(() => {
    saveDemo(demo)
  }, [demo])

  // Retry clears the simulated failure, so the second attempt succeeds.
  const retry = useCallback(() => {
    setDemo((current) => ({ ...current, failNextLoad: false }))
    setAttempt((n) => n + 1)
  }, [])

  /** Changes one demo setting and reloads the catalogue with it. */
  const setDemoOption = useCallback((key, value) => {
    setDemo((current) => ({ ...current, [key]: value }))
  }, [])

  const resetDemo = useCallback(() => setDemo({ ...DEFAULT_DEMO }), [])

  const value = { products, status, error, retry, demo, setDemoOption, resetDemo }
  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>
}

export function useCatalogue() {
  const context = useContext(CatalogueContext)
  if (!context) throw new Error('useCatalogue must be used inside <CatalogueProvider>')
  return context
}
