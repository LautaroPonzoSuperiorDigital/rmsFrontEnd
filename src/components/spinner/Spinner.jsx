const spinnerStyle = {
  color: "#31af9a", // Set the text color
  borderTopColor: "#31af9a",
  borderBottomColor: "#31af9a",
  borderLeftColor: "#31af9a",
};

const parentDivStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const Spinner = () => {
  return (
    <div style={parentDivStyle}>
      <div
        className="spinner-border text-primary"
        role="status"
        style={spinnerStyle}
      ></div>
    </div>
  );
};

export default Spinner;
