import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Captcha from "../components/Captcha";

function PaymentPage({ cart, products, onSuccess }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [bank, setBank] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [processing, setProcessing] = useState(false);

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return { ...product, qty: item.qty };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePayment = () => {
    if (!paymentMethod) return alert("Please select a payment method");
    if (!captchaVerified) return alert("CAPTCHA verification failed");

    if (paymentMethod === "UPI" && !upiId.trim()) {
      return alert("Enter valid UPI ID");
    }
    if (paymentMethod === "Card") {
      if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        return alert("Enter complete card details");
      }
      if (cardNumber.length !== 16) return alert("Card number must be 16 digits");
      if (cvv.length !== 3) return alert("CVV must be 3 digits");
    }
    if (paymentMethod === "NetBanking" && !bank.trim()) {
      return alert("Select your bank");
    }

    setProcessing(true);

    setTimeout(() => {
      onSuccess();
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="card">
      <h2 className="page-title">Payment</h2>
      <h3>Total Payable: ₹{total.toLocaleString("en-IN")}</h3>

      <hr style={{ margin: "1rem 0" }} />

      <label className="form-label">Choose Payment Method</label>
      <select
        className="form-input"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Select</option>
        <option value="UPI">UPI (Google Pay / PhonePe)</option>
        <option value="Card">Credit/Debit Card</option>
        <option value="NetBanking">Net Banking</option>
        <option value="COD">Cash on Delivery</option>
      </select>

      {/* UPI PAYMENT */}
      {paymentMethod === "UPI" && (
        <div className="payment-box">
          <label className="form-label">Enter UPI ID</label>
          <input
            className="form-input"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}

      {/* CARD PAYMENT */}
      {paymentMethod === "Card" && (
        <div className="payment-box">
          <label className="form-label">Cardholder Name</label>
          <input
            className="form-input"
            placeholder="Name on card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <label className="form-label">Card Number</label>
          <input
            className="form-input"
            placeholder="1234 5678 9876 5432"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          />

          <div className="payment-row">
            <div className="half">
              <label className="form-label">Expiry</label>
              <input
                className="form-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>

            <div className="half">
              <label className="form-label">CVV</label>
              <input
                className="form-input"
                maxLength="3"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCVV(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
        </div>
      )}

      {/* NET BANKING */}
      {paymentMethod === "NetBanking" && (
        <div className="payment-box">
          <label className="form-label">Select Bank</label>
          <select
            className="form-input"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">Choose Bank</option>
            <option value="SBI">State Bank of India</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="ICICI">ICICI Bank</option>
            <option value="Axis">Axis Bank</option>
            <option value="Kotak">Kotak Mahindra Bank</option>
          </select>
        </div>
      )}

      {/* CASH ON DELIVERY */}
      {paymentMethod === "COD" && (
        <div className="payment-box">
          <p>No online details required. Pay when item arrives.</p>
        </div>
      )}

      {/* CAPTCHA */}
      <Captcha onVerify={() => setCaptchaVerified(true)} />

      <button
        className="button button-primary button-block"
        onClick={handlePayment}
        disabled={processing}
      >
        {processing ? "Processing Payment..." : "Pay Now"}
      </button>
    </div>
  );
}

export default PaymentPage;
