// Shared loading and error display for any page that needs the catalogue (FR14).
// Returns null when the catalogue is ready, so pages can write:
//   const statusView = <CatalogueStatus />;  if (status !== 'ready') return statusView
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
        <h2>Catalogue unavailable</h2>
        <p>{error}</p>
        <button type="button" className="button button--primary" onClick={retry}>
          Try again
        </button>
      </div>
    )
  }

  return null
}
