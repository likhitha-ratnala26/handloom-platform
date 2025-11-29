import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductGrid from "../components/ProductGrid";

function ArtisanDashboard({ products, onAddProduct }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleProductSubmit = async (product) => {
    setLoading(true);
    setStatus("");
    setError("");
    try {
      await onAddProduct(product);
      setStatus(
        "Product submitted successfully. Waiting for admin approval."
      );
    } catch (e) {
      setError("Could not add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Artisan Workspace</h2>
      <p className="page-subtitle">
        List handloom products, manage inventory, and view approval status
        from the admin.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {status && <div className="alert alert-success">{status}</div>}

      <section className="section">
        <div className="section-title">Add New Product</div>
        <ProductForm onSubmit={handleProductSubmit} disabled={loading} />
      </section>

      <section className="section">
        <div className="section-title">Your Products</div>
        {products.length === 0 ? (
          <p>No products yet. Add your first product using the form above.</p>
        ) : (
          <ProductGrid products={products} showStatus />
        )}
      </section>
    </div>
  );
}

export default ArtisanDashboard;
