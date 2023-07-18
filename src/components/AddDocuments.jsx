import React, { useState } from "react";

const AddDocuments = ({ onClick }) => {
  return (
    <button className="add-listing mt-4 ms-4 mr-5" onClick={onClick}>
      <span>+</span> Add Documents
    </button>
  );
};

export default AddDocuments;