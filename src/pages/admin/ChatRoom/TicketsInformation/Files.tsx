import React from "react";

const dateStyle = {
  color: "#848484",
  fontSize: "14px",
  fontWeight: 100,
};
const Files = ({ file }) => {
  return (
    <div className="w-100 d-flex   " style={{ padding: "10px" }}>
      <div style={{ width: "100%", maxWidth: "210px" }}>{file.name}</div>
      <div style={dateStyle}>{file.date}</div>
    </div>
  );
};

export default Files;
