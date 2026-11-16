import { FlaskConical } from 'lucide-react'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import { SUPPLIER_UPDATE } from '../lib/demoScenarios.js'

// Clearly labelled controls for the assignment's edge-case demos (Task 6.1).
// Each switch reloads the catalogue through the async mock loader.
export default function DemoPanel() {
  const { demo, setDemoOption, resetDemo, status } = useCatalogue()
  const active = demo.failNextLoad || demo.emptyCatalogue || demo.supplierUpdate

  return (
    <details className="demo-panel" open={active}>
      <summary>
        <FlaskConical size={18} aria-hidden="true" />
        Assignment demo controls
        {active && <span className="demo-panel__on">Scenario active</span>}
      </summary>

      <div className="demo-panel__body">
        <p>
          These switches simulate situations for testing. They change only this browser tab’s copy of the catalogue and
          last until the tab is closed. Catalogue status: <strong>{status}</strong>.
        </p>

        <div className="demo-panel__options">
          <label className="field--checkbox">
            <input
              type="checkbox"
              checked={demo.failNextLoad}
              onChange={(event) => setDemoOption('failNextLoad', event.target.checked)}
            />
            <span>
              <strong>Loading failure.</strong> The catalogue request fails; “Try again” succeeds.
            </span>
          </label>

          <label className="field--checkbox">
            <input
              type="checkbox"
              checked={demo.emptyCatalogue}
              onChange={(event) => setDemoOption('emptyCatalogue', event.target.checked)}
            />
            <span>
              <strong>Empty catalogue.</strong> The loader returns no products (different from a search with no matches).
            </span>
          </label>

          <label className="field--checkbox">
            <input
              type="checkbox"
              checked={demo.supplierUpdate}
              onChange={(event) => setDemoOption('supplierUpdate', event.target.checked)}
            />
            <span>
              <strong>Supplier stock update.</strong> Daal Chawal drops to {SUPPLIER_UPDATE.stock['tb-daal-chawal']}{' '}
              left, Chicken Biryani sells out and the Ridge Patch is discontinued. Add those to your cart first to see
              the cart conflicts.
            </span>
          </label>
        </div>

        <button type="button" className="button button--secondary" onClick={resetDemo} disabled={!active}>
          Reset to normal data
        </button>
      </div>
    </details>
  )
}
