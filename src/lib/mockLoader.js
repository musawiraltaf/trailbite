// Asynchronous mock loader (FR14). Simulates fetching the catalogue from a server
// so the app has real loading, error and retry states.
import { products } from '../data/products.js'
import { applyScenario, DEFAULT_DEMO } from './demoScenarios.js'

const DELAY_MS = 600

/**
 * @param {object} options
 * @param {object} [options.demo]   active demo scenario (see demoScenarios.js)
 * @param {AbortSignal} [options.signal] lets a component cancel the request on unmount
 * @returns {Promise<Array>} a fresh copy of the product list
 */
export function loadProducts({ demo = DEFAULT_DEMO, signal } = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (demo.failNextLoad) {
        reject(new Error('We could not load the TrailBite catalogue. Check your connection and try again.'))
        return
      }
      const copy = products.map((product) => ({ ...product }))
      resolve(applyScenario(copy, demo))
    }, DELAY_MS)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Request cancelled', 'AbortError'))
    })
  })
}
