// Loads the product catalogue once and shares it with every page (FR03, FR14).
//
// status: 'loading' | 'error' | 'ready'
// Pages read the catalogue with useCatalogue() instead of loading it themselves,
// so the listing, details page and cart always see the same product data.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { loadProducts } from '../lib/mockLoader.js'

const CatalogueContext = createContext(null)

export function CatalogueProvider({ children }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  // Bumping this number re-runs the loading effect (used by Retry).
  const [attempt, setAttempt] = useState(0)
  // Demo control: when true, the next load fails so the error state can be shown.
  const [failNextLoad, setFailNextLoad] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError('')

    loadProducts({ fail: failNextLoad, signal: controller.signal })
      .then((list) => {
        setProducts(list)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return // component unmounted or a newer load started
        setError(err.message)
        setStatus('error')
      })

    // Cleanup: cancel the pending timer if this effect re-runs or the app unmounts.
    return () => controller.abort()
  }, [attempt, failNextLoad])

  const retry = useCallback(() => {
    setFailNextLoad(false)
    setAttempt((n) => n + 1)
  }, [])

  const value = { products, status, error, retry, failNextLoad, setFailNextLoad }
  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>
}

export function useCatalogue() {
  const context = useContext(CatalogueContext)
  if (!context) throw new Error('useCatalogue must be used inside <CatalogueProvider>')
  return context
}
