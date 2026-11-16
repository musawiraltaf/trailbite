// Shared loading and error display for any page that needs the catalogue (FR14).
// Returns null when the catalogue is ready, so pages can write:
//   const statusView = <CatalogueStatus />;  if (status !== 'ready') return statusView
import { RotateCcw, WifiOff } from 'lucide-react'
import { useCatalogue } from '../app/CatalogueContext.jsx'

export default function CatalogueStatus() {
  const { status, error, retry } = useCatalogue()

  if (status === 'loading') {
    return (
      <div className="state-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading the TrailBite catalogue…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <WifiOff size={32} className="state-panel__icon" aria-hidden="true" />
        <h2>Catalogue unavailable</h2>
        <p>{error}</p>
        <button type="button" className="button button--primary" onClick={retry}>
          <RotateCcw size={18} aria-hidden="true" />
          Try again
        </button>
      </div>
    )
  }

  return null
}
