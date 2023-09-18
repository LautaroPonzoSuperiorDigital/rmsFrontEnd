import PropTypes from "prop-types";

import "../styles/tenants.css";

const CheckBoxLog = ({ checked, defaultChecked, onChange, disabled, name }) => {
  const handleCheckBoxChange = () => {
    onChange?.(!checked);
  };

  return (
    <input
      type="checkbox"
      className="form-check-input checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={handleCheckBoxChange}
      disabled={disabled}
      name={name}
    />
  );
};

CheckBoxLog.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default CheckBoxLog;
