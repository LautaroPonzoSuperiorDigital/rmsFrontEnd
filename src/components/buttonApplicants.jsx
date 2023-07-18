import React, { useState } from "react";
import "../styles/tenants.css";

export const DeleteButton = ({ defaultImage, hoverImage, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeletingHovered, setIsDeletingHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDeletingHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDeletingHovered(false);
  };

  return (
    <button
      className="hoverableButton deleteButton"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="imageContainer">
        {isHovered ? hoverImage : defaultImage}
      </span>
      {isDeletingHovered && (
        <div className="confirmationBox">Delete This Applicant</div>
      )}
    </button>
  );
};
