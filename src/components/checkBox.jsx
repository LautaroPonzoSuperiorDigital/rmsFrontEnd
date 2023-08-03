import React from "react";
import "../styles/tenants.css";

const CheckBoxLog = ({ checked, onChange, disabled }) => {
  const handleCheckBoxChange = () => {
    onChange?.(!checked);
  };

  return (
    <input
      type="checkbox"
      className="form-check-input mb-1 checkbox"
      checked={checked}
      onChange={handleCheckBoxChange}
      disabled={disabled}
    />
  );
};

export default CheckBoxLog;
