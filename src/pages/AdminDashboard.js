import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";

function AdminDashboard({
  products,
  campaigns,
  onToggleApproval,
  onDeleteProduct,
  onDeleteCampaign,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleToggle = async (id) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await onToggleApproval(id);
      setMessage("Product approval status updated.");
    } catch (e) {
      setError("Could not update approval status.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProductClick = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await onDeleteProduct(id);
      setMessage("Product deleted successfully.");
    } catch (e) {
      setError("Could not delete product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaignClick = async (id) => {
    if (!window.confirm("Delete this campaign permanently?")) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await onDeleteCampaign(id);
      setMessage("Campaign deleted successfully.");
    } catch (e) {
      setError("Could not delete campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Admin Dashboard</h2>
      <p className="page-subtitle">
        Oversee platform operations, approve artisan products, and manage
        campaigns.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <section className="section">
        <div className="section-title">Review Products</div>
        {products.length === 0 ? (
          <p>No products submitted yet.</p>
        ) : (
          <ProductGrid
            products={products}
            showStatus
            actionLabel={loading ? "Updating..." : "Toggle Approval"}
            onAction={handleToggle}
            secondaryActionLabel={loading ? "Please wait..." : "Delete"}
            onSecondaryAction={handleDeleteProductClick}
            disabled={loading}
          />
        )}
      </section>

      <section className="section">
        <div className="section-title">Marketing Campaigns Overview</div>
        {campaigns.length === 0 ? (
          <p>No campaigns created yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Platform</th>
                <th>Focus Region</th>
                <th>Budget (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.platform}</td>
                  <td>{c.focusRegion}</td>
                  <td>
                    ₹{Number(c.budget).toLocaleString("en-IN")}
                  </td>
                  <td>
                    <button
                      className="button button-secondary"
                      onClick={() => handleDeleteCampaignClick(c.id)}
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
