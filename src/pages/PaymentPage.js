import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage({ cart, products, onSuccess }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return { ...product, qty: item.qty };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    onSuccess(); // clear cart
    navigate("/payment-success");
  };

  return (
    <div className="card">
      <h2 className="page-title">Payment</h2>

      <h3>Total Payable: ₹{total.toLocaleString("en-IN")}</h3>

      <div className="form" style={{ marginTop: "1rem" }}>
        <label className="form-label">Choose Payment Method</label>

        <select
          className="form-input"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="">Select</option>
          <option value="UPI">UPI (Google Pay / PhonePe)</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="COD">Cash on Delivery</option>
          <option value="NetBanking">Net Banking</option>
        </select>

        <button
          className="button button-primary button-block"
          style={{ marginTop: "1rem" }}
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
