import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ROLE_PATHS = {
  Admin: "/admin",
  Artisan: "/artisan",
  Buyer: "/buyer",
  "Marketing Specialist": "/marketing",
};

function LoginPage({ onLogin, user }) {
  const { role } = useParams();
  const navigate = useNavigate();

  const roleMap = {
    admin: "Admin",
    artisan: "Artisan",
    buyer: "Buyer",
    marketing: "Marketing Specialist",
  };

  const activeRole = roleMap[role];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email required";
    if (!password.trim()) next.password = "Password required";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const val = validate();
    if (Object.keys(val).length > 0) {
      setErrors(val);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const loggedIn = await onLogin({
        email,
        password,
        role: activeRole,
      });

      setFormSuccess("Login successful!");

      navigate(ROLE_PATHS[loggedIn.role], { replace: true });
    } catch (err) {
      setFormError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!activeRole) {
    return (
      <div className="card auth-card">
        <h2 className="page-title">Invalid role URL</h2>
        <p className="page-subtitle">Try /login/admin or /login/buyer etc.</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="page-title">{activeRole} Login</h2>
        <p className="page-subtitle">
          This login page is strictly for {activeRole} accounts.
        </p>

        {formError && <div className="alert alert-error">{formError}</div>}
        {formSuccess && (
          <div className="alert alert-success">{formSuccess}</div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`example@handloom.in`}
              disabled={loading}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-row">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              disabled={loading}
            />
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          <button
            className="button button-primary button-block"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="auth-helper">
          Demo credentials:
          <div className="auth-helper-roles">
            Admin: admin@handloom.in / admin123 <br />
            Artisan: artisan@handloom.in / artisan123 <br />
            Buyer: buyer@handloom.in / buyer123 <br />
            Marketing: marketing@handloom.in / marketing123
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
