const spinnerStyle = {
  color: "#31af9a", // Set the text color
  borderTopColor: "#31af9a",
  borderBottomColor: "#31af9a",
  borderLeftColor: "#31af9a",
};
const Spinner = () => {
  return (
    <div
      className="spinner-border text-primary"
      role="status"
      style={spinnerStyle}
    ></div>
  );
};

export default Spinner;
