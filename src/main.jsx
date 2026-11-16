import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.jsx'
import { CatalogueProvider } from './app/CatalogueContext.jsx'
import { CartProvider } from './app/CartContext.jsx'
import './styles/global.css'

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
