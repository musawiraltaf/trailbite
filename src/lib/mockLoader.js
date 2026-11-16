// Asynchronous mock loader (FR14). Simulates fetching the catalogue from a server
// so the app has real loading, error and retry states.
import { products } from '../data/products.js'

const DELAY_MS = 600

/**
 * @param {object} options
 * @param {boolean} options.fail  demo control: force a network-style failure
 * @param {AbortSignal} [options.signal] lets a component cancel the request on unmount
 * @returns {Promise<Array>} a copy of the product list
 */
export function loadProducts({ fail = false, signal } = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (fail) reject(new Error('We could not load the TrailBite catalogue. Check your connection and try again.'))
      else resolve(products.map((product) => ({ ...product })))
    }, DELAY_MS)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Request cancelled', 'AbortError'))
    })
  })
}
