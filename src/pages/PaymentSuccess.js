import React from "react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2 className="page-title">Payment Successful ✔</h2>
      <p className="page-subtitle">
        Thank you for your purchase! Your order has been placed.
      </p>

      <Link to="/buyer" className="button button-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default PaymentSuccess;
