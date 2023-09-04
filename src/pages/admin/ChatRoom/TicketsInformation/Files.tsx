import React from "react";

const dateStyle = {
  color: "#848484",
  fontSize: "14px",
  fontWeight: 100,
};
const Files = ({ file }) => {
  const isoDate = file.Document.updatedAt;
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = new Date(isoDate).toLocaleDateString("en-US", options);
  return (
    <div
      className="w-100 d-flex   "
      style={{ padding: "10px", border: "1px solid #00000026" }}
    >
      <div style={{ width: "100%", maxWidth: "245px" }}>
        {file.Document.name}
      </div>
      <div style={dateStyle}>{formattedDate}</div>
    </div>
  );
};

export default Files;
