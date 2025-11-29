import React, { useState } from "react";

function Captcha({ onVerify }) {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const [input, setInput] = useState("");

  const verify = () => {
    if (input === code) {
      alert("CAPTCHA Verified");
      onVerify();
    } else {
      alert("Incorrect CAPTCHA");
    }
  };

  return (
    <div className="captcha-box">
      <div className="captcha-code">{code}</div>
      <input
        className="form-input"
        placeholder="Enter CAPTCHA"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button button-secondary" onClick={verify}>
        Verify
      </button>
    </div>
  );
}

export default Captcha;
