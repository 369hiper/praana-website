import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PaymentRefundPolicy from './pages/PaymentRefundPolicy';
import WarrantyClaims from './pages/WarrantyClaims';
import PrivacyPolicy from './pages/PrivacyPolicy';
import EULA from './pages/EULA';
import ShippingPolicy from './pages/ShippingPolicy';
import ProductPolicy from './pages/ProductPolicy';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import MiniVortexPage from './pages/MiniVortexPage';
import CoreVortexPage from './pages/CoreVortexPage';
import ProVortexPage from './pages/ProVortexPage';
import { PageRoute } from './types';
import { CartProvider } from './context/CartContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-praana-dark text-slate-100 font-sans selection:bg-praana-accent selection:text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path={PageRoute.HOME} element={<Home />} />
              <Route path={PageRoute.BLOG} element={<Blog />} />
              <Route path={PageRoute.BLOG_POST} element={<BlogPost />} />
              <Route path={PageRoute.PAYMENT_REFUND_POLICY} element={<PaymentRefundPolicy />} />
              <Route path={PageRoute.WARRANTY_CLAIMS} element={<WarrantyClaims />} />
              <Route path={PageRoute.PRODUCT_DETAIL} element={<ProductDetailPage />} />
              <Route path={PageRoute.MINI_VORTEX} element={<MiniVortexPage />} />
              <Route path={PageRoute.CORE_VORTEX} element={<CoreVortexPage />} />
              <Route path={PageRoute.PRO_VORTEX} element={<ProVortexPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path={PageRoute.SHIPPING_POLICY} element={<ShippingPolicy />} />
              <Route path={PageRoute.PRODUCT_POLICY} element={<ProductPolicy />} />
              <Route path={PageRoute.PRIVACY_POLICY} element={<PrivacyPolicy />} />
              <Route path={PageRoute.EULA} element={<EULA />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;