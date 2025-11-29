import React from "react";
import { Link } from "react-router-dom";

function CartPage({ cart, products, onRemove, onClear }) {
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return { ...product, qty: item.qty };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="card">
      <h2 className="page-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price * item.qty}</td>
                  <td>
                    <button
                      className="button button-danger"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: ₹{total.toLocaleString("en-IN")}</h3>

          <div style={{ marginTop: "1rem" }}>
            <button className="button button-secondary" onClick={onClear}>
              Clear Cart
            </button>

            <Link
              to="/payment"
              className="button button-primary"
              style={{ marginLeft: "1rem" }}
            >
              Proceed to Payment →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
