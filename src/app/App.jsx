import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import HomePage from '../pages/HomePage.jsx'
import ShopPage from '../pages/ShopPage.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import CartPage from '../pages/CartPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import ConfirmationPage from '../pages/ConfirmationPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

// Route map (FR01, FR02). Every page renders inside <Layout>, which holds the
// header and footer and shows the current page through <Outlet />.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
