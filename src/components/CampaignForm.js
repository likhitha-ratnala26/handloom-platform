import React, { useState } from "react";

function CampaignForm({ onSubmit, disabled }) {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [focusRegion, setFocusRegion] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Campaign name is required";
    } else if (name.trim().length < 3) {
      nextErrors.name = "Campaign name must be at least 3 characters";
    }
    if (!focusRegion.trim()) {
      nextErrors.focusRegion = "Focus region is required";
    }
    const budgetNumber = Number(budget);
    if (!budget) {
      nextErrors.budget = "Budget is required";
    } else if (isNaN(budgetNumber) || budgetNumber <= 0) {
      nextErrors.budget = "Enter a valid budget greater than 0";
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({
      name: name.trim(),
      platform,
      focusRegion: focusRegion.trim(),
      budget: Number(budget),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Campaign name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Example: Summer Handloom Sale"
          disabled={disabled}
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-row">
        <label className="form-label">Platform</label>
        <select
          className="form-select"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          disabled={disabled}
        >
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="YouTube">YouTube</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <div className="form-row">
        <label className="form-label">Focus region</label>
        <input
          className="form-input"
          value={focusRegion}
          onChange={(e) => setFocusRegion(e.target.value)}
          placeholder="Example: South India, Europe"
          disabled={disabled}
        />
        {errors.focusRegion && (
          <div className="form-error">{errors.focusRegion}</div>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Budget (₹)</label>
        <input
          type="number"
          className="form-input"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          disabled={disabled}
        />
        {errors.budget && (
          <div className="form-error">{errors.budget}</div>
        )}
      </div>
      <button
        className="button button-primary button-block"
        type="submit"
        disabled={disabled}
      >
        {disabled ? "Saving..." : "Create Campaign"}
      </button>
    </form>
  );
}

export default CampaignForm;
