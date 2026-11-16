import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.jsx'
import { CatalogueProvider } from './app/CatalogueContext.jsx'
import { CartProvider } from './app/CartContext.jsx'
// Self-hosted variable fonts (no request to Google at runtime)
import '@fontsource-variable/fraunces'
import '@fontsource-variable/manrope'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogueProvider>
        {/* CartProvider sits inside CatalogueProvider because it needs product data */}
        <CartProvider>
          <App />
        </CartProvider>
      </CatalogueProvider>
    </BrowserRouter>
  </StrictMode>,
)
