import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function BuyerDashboard({ products, onPlaceOrder, orders }) {
  const approvedProducts = products.filter((p) => p.approved);

  return (
    <div>
      <h2 className="page-title">Available Products</h2>
      <p className="page-subtitle">Explore authentic Indian handloom items.</p>

      <Link to="/cart" className="button button-secondary" style={{ marginBottom: "1rem" }}>
        View Cart
      </Link>

      <div className="product-grid">
        {approvedProducts.map((product) => (
          <div key={product.id} style={{ position: "relative" }}>
            <ProductCard
              product={product}
              showStatus={false}
              actionLabel="Buy"
              onAction={onPlaceOrder}
            />

            <Link
              to={`/product/${product.id}`}
              className="button button-secondary button-block"
              style={{ marginTop: "0.4rem" }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerDashboard;
