import React, { useState } from "react";
import CampaignForm from "../components/CampaignForm";

function MarketingDashboard({ campaigns, onAddCampaign, products, onDeleteCampaign }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const approvedProducts = products.filter((p) => p.approved);

  const handleCreateCampaign = async (campaign) => {
    setLoading(true);
    setStatus("");
    setError("");
    try {
      await onAddCampaign(campaign);
      setStatus("Campaign created successfully.");
    } catch (e) {
      setError("Could not create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaignClick = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    setLoading(true);
    setStatus("");
    setError("");
    try {
      await onDeleteCampaign(id);
      setStatus("Campaign deleted.");
    } catch (e) {
      setError("Could not delete campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Marketing Specialist Console</h2>
      <p className="page-subtitle">
        Plan campaigns, select focus products, and promote Indian handloom to
        global audiences.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {status && <div className="alert alert-success">{status}</div>}

      <section className="section">
        <div className="section-title">Create Campaign</div>
        <CampaignForm
          onSubmit={handleCreateCampaign}
          disabled={loading}
        />
      </section>

      <section className="section">
        <div className="section-title">Existing Campaigns</div>
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

      <section className="section">
        <div className="section-title">Suggested Focus Products</div>
        {approvedProducts.length === 0 ? (
          <p>No approved products available to promote.</p>
        ) : (
          <div>
            {approvedProducts.map((p) => (
              <span key={p.id} className="chip">
                {p.name}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MarketingDashboard;
