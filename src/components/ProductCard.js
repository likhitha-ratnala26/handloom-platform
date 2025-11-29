import React from "react";

function ProductCard({
  product,
  showStatus,
  actionLabel,
  onAction,
  disabled,
  secondaryActionLabel,
  onSecondaryAction,
}) {
  const approved = product.approved;

  const priceDisplay = `₹${Number(product.price).toLocaleString("en-IN")}`;

  return (
    <div className="product-card">
      
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      )}

      <div className="product-name">{product.name}</div>
      <div className="product-meta">Artisan: {product.artisan}</div>
      <div className="product-meta">Region: {product.region}</div>
      <div className="product-meta">Stock: {product.stock}</div>
      <div className="product-price">{priceDisplay}</div>

      {showStatus && (
        <div
          className={
            "status-badge " +
            (approved ? "status-approved" : "status-pending")
          }
        >
          {approved ? "Approved" : "Pending"}
        </div>
      )}

      {actionLabel && (
        <button
          className="button button-primary button-block"
          onClick={() => onAction(product.id)}
          disabled={disabled}
        >
          {actionLabel}
        </button>
      )}

      {secondaryActionLabel && (
        <button
          className="button button-secondary button-block"
          onClick={() => onSecondaryAction(product.id)}
          disabled={disabled}
        >
          {secondaryActionLabel}
        </button>
      )}
    </div>
  );
}

export default ProductCard;
