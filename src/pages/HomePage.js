import React from "react";
import ProductGrid from "../components/ProductGrid";

function HomePage({ products, campaigns }) {
  const approvedProducts = products.filter((p) => p.approved);

  return (
    <div className="card">
      <div className="hero">
        <div className="hero-title">Discover Authentic Indian Handloom</div>
        <div className="hero-text">
          Explore sarees, dupattas, stoles, and fabrics handwoven by artisans
          across India. This platform connects Indian handloom clusters to
          buyers around the world.
        </div>
      </div>

      <section className="section">
        <div className="section-title">Featured Handloom Products</div>
        {approvedProducts.length === 0 ? (
          <p>No approved products yet.</p>
        ) : (
          <ProductGrid products={approvedProducts} showStatus={false} />
        )}
      </section>

      <section className="section">
        <div className="section-title">Active Marketing Campaigns</div>
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Platform</th>
                <th>Focus Region</th>
                <th>Budget (₹)</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default HomePage;
