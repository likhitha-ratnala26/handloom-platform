import React, { useState } from "react";

function ProductForm({ onSubmit, disabled }) {
  const [name, setName] = useState("");
  const [artisan, setArtisan] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Product name is required";
    }
    if (!artisan.trim()) {
      nextErrors.artisan = "Artisan name is required";
    }
    if (!region.trim()) {
      nextErrors.region = "Region is required";
    }
    const priceNumber = Number(price);
    if (!price) {
      nextErrors.price = "Price is required";
    } else if (isNaN(priceNumber) || priceNumber <= 0) {
      nextErrors.price = "Enter a valid price greater than 0";
    }
    const stockNumber = Number(stock);
    if (stock === "") {
      nextErrors.stock = "Stock is required";
    } else if (
      isNaN(stockNumber) ||
      stockNumber < 0 ||
      !Number.isInteger(stockNumber)
    ) {
      nextErrors.stock = "Stock must be a non-negative whole number";
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({
      name: name.trim(),
      artisan: artisan.trim(),
      region: region.trim(),
      price: Number(price),
      stock: Number(stock),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Product name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Example: Kancheepuram Silk Saree"
          disabled={disabled}
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-row">
        <label className="form-label">Artisan name</label>
        <input
          className="form-input"
          value={artisan}
          onChange={(e) => setArtisan(e.target.value)}
          placeholder="Your name"
          disabled={disabled}
        />
        {errors.artisan && (
          <div className="form-error">{errors.artisan}</div>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Region</label>
        <input
          className="form-input"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Example: Tamil Nadu, India"
          disabled={disabled}
        />
        {errors.region && (
          <div className="form-error">{errors.region}</div>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={disabled}
        />
        {errors.price && <div className="form-error">{errors.price}</div>}
      </div>
      <div className="form-row">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-input"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          disabled={disabled}
        />
        {errors.stock && <div className="form-error">{errors.stock}</div>}
      </div>
      <button
        className="button button-primary button-block"
        type="submit"
        disabled={disabled}
      >
        {disabled ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
