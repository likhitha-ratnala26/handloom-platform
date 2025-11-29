import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="card">
      <h2 className="page-title">Page not found</h2>
      <p className="page-subtitle">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="button button-secondary">
        Go back home
      </Link>
    </div>
  );
}

export default NotFoundPage;
