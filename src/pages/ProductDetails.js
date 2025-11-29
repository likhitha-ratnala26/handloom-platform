import React from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const priceDisplay = `₹${Number(product.price).toLocaleString("en-IN")}`;

  return (
    <div className="details-container">
      <Link to="/buyer" className="back-button">← Back</Link>

      <div className="details-box">
        
        <div className="details-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />
        </div>

        <div className="details-info-section">
          <h2 className="details-title">{product.name}</h2>

          <div className="details-meta"><strong>Price:</strong> {priceDisplay}</div>
          <div className="details-meta"><strong>Artisan:</strong> {product.artisan}</div>
          <div className="details-meta"><strong>Region:</strong> {product.region}</div>
          <div className="details-meta"><strong>Stock:</strong> {product.stock}</div>

          <p className="details-description">
            This premium handcrafted item showcases authentic Indian weaving
            traditions. Each piece is made with care and reflects local
            cultural heritage.
          </p>

          <button
            className="button button-primary"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
