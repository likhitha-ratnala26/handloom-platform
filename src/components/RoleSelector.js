import React from "react";

function RoleSelector({ user }) {
  const roleLabel = user ? user.role : "Guest";
  const emailLabel = user ? user.email : "Not logged in";

  return (
    <aside className="role-selector-container">
      <div className="role-selector-title">Current user</div>
      <div className="role-current-role">{roleLabel}</div>
      <div className="role-current-email">{emailLabel}</div>
      <p className="role-helper-text">
        Use the login page to sign in as Admin, Artisan, Buyer, or Marketing
        Specialist. Dashboards are protected so that each role can only see its
        own workspace.
      </p>
    </aside>
  );
}

export default RoleSelector;
