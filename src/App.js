import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleSelector from "./components/RoleSelector";

import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import MarketingDashboard from "./pages/MarketingDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";

import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";

import { initialProducts, initialCampaigns } from "./data/mockData";
import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("hf_user")) || null
  );

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("hf_products")) || initialProducts
  );

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("hf_orders")) || []
  );

  const [campaigns, setCampaigns] = useState(
    JSON.parse(localStorage.getItem("hf_campaigns")) || initialCampaigns
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("hf_cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("hf_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("hf_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("hf_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("hf_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem("hf_cart", JSON.stringify(cart));
  }, [cart]);

  const fakeDelay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async (logged) => {
    setUser(logged);
    return logged;
  };

  const handleLogout = () => setUser(null);

  const handleAddProduct = async (product) => {
    await fakeDelay();
    setProducts([...products, { ...product, id: Date.now(), approved: false }]);
  };

  const handleToggleApproval = async (id) => {
    await fakeDelay();
    setProducts(products.map((p) => (p.id === id ? { ...p, approved: !p.approved } : p)));
  };

  const handleDeleteProduct = async (id) => {
    await fakeDelay();
    setProducts(products.filter((p) => p.id !== id));
  };

  const handlePlaceOrder = async (productId) => {
    await fakeDelay();
    setOrders([...orders, { id: Date.now(), productId, buyer: user.email }]);
  };

  const handleCancelOrder = async (orderId) => {
    await fakeDelay();
    setOrders(orders.filter((o) => o.id !== orderId));
  };

  // CART HANDLERS
  const handleAddToCart = async (productId) => {
    await fakeDelay();

    const exists = cart.find((c) => c.id === productId);

    if (exists) {
      setCart(
        cart.map((c) =>
          c.id === productId ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { id: productId, qty: 1 }]);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    await fakeDelay();
    setCart(cart.filter((c) => c.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  const handleAddCampaign = async (campaign) => {
    await fakeDelay();
    setCampaigns([...campaigns, { ...campaign, id: Date.now() }]);
  };

  const handleDeleteCampaign = async (id) => {
    await fakeDelay();
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <>
      <Navbar currentRole={user?.role || "Guest"} user={user} onLogout={handleLogout} />

      <div className="app-layout">
        <RoleSelector user={user} />

        <div className="app-main">
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products} campaigns={campaigns} />}
            />

            <Route
              path="/login/:role"
              element={<LoginPage onLogin={handleLogin} user={user} />}
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute user={user} allowedRole="Buyer">
                  <ProductDetails products={products} onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user} allowedRole="Buyer">
                  <CartPage
                    cart={cart}
                    products={products}
                    onRemove={handleRemoveFromCart}
                    onClear={handleClearCart}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payment"
              element={
                <ProtectedRoute user={user} allowedRole="Buyer">
                  <PaymentPage
                    cart={cart}
                    products={products}
                    onSuccess={handleClearCart}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payment-success"
              element={<PaymentSuccess />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user} allowedRole="Admin">
                  <AdminDashboard
                    products={products}
                    campaigns={campaigns}
                    onToggleApproval={handleToggleApproval}
                    onDeleteProduct={handleDeleteProduct}
                    onDeleteCampaign={handleDeleteCampaign}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artisan"
              element={
                <ProtectedRoute user={user} allowedRole="Artisan">
                  <ArtisanDashboard
                    products={products}
                    onAddProduct={handleAddProduct}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/buyer"
              element={
                <ProtectedRoute user={user} allowedRole="Buyer">
                  <BuyerDashboard
                    products={products}
                    orders={orders}
                    onPlaceOrder={handlePlaceOrder}
                    onCancelOrder={handleCancelOrder}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/marketing"
              element={
                <ProtectedRoute user={user} allowedRole="Marketing Specialist">
                  <MarketingDashboard
                    campaigns={campaigns}
                    onAddCampaign={handleAddCampaign}
                    onDeleteCampaign={handleDeleteCampaign}
                    products={products}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
