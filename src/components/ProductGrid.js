import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  showStatus,
  actionLabel,
  onAction,
  disableUnapprovedPurchase,
  secondaryActionLabel,
  onSecondaryAction,
  disabled,
}) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          showStatus={showStatus}
          actionLabel={actionLabel}
          onAction={onAction}
          secondaryActionLabel={secondaryActionLabel}
          onSecondaryAction={onSecondaryAction}
          disabled={
            disabled || (disableUnapprovedPurchase && !p.approved)
          }
        />
      ))}
    </div>
  );
}

export default ProductGrid;
