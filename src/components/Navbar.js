import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ currentRole, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="navbar-links">
          <NavLink className="navbar-link" to="/">
            Home
          </NavLink>

          <NavLink className="navbar-link" to="/login/admin">
            Admin
          </NavLink>

          <NavLink className="navbar-link" to="/login/artisan">
            Artisan
          </NavLink>

          <NavLink className="navbar-link" to="/login/buyer">
            Buyer
          </NavLink>

          <NavLink className="navbar-link" to="/login/marketing">
            Marketing
          </NavLink>

          <span className="navbar-role-link">
            Role: {user ? user.role : "Guest"}
          </span>
        </nav>

        <div className="navbar-auth">
          {user ? (
            <button className="button-nav" onClick={onLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
