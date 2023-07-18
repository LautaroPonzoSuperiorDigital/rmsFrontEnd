import "../../styles/Documents/documents.css";
import Close from "../../assets/img/close.svg";
import CloseHover from "../../assets/img/closeHover.svg";
import React, { useState, useEffect } from "react";

const AddDocs = ({ onClose }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const handleMouseEnterClose = () => {
    setIsCloseHovered(true);
  };

  const handleMouseLeaveClose = () => {
    setIsCloseHovered(false);
  };
  const handleCloseClick = () => {
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };
  return (
    <div className="modalWrapper">
      <div className="modalContent4">
        <form className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-end closeContainer">
            <img
              src={isCloseHovered ? CloseHover : Close}
              alt="Close"
              className="close22"
              onClick={handleCloseClick}
              onMouseEnter={handleMouseEnterClose}
              onMouseLeave={handleMouseLeaveClose}
            />
          </div>
          <div className="ContainerButton d-flex align-items-center justify-content-center">
            <label
              className="option1 d-flex align-items-center justify-content-center"
              htmlFor="fileInput"
            >
              <p className="UploadAFile">Upload A File</p>
            </label>
            <input type="file" id="fileInput" name="image" />
          </div>

          <input
            className="inputDoc"
            placeholder="NAME                                                                            364675"
          />

          <div className="buttonContainer4 d-flex justify-content-center align-items-center">
            <div className="orderContainerBtn">
              <button
                type="button"
                onClick={handleCancelClick}
                className="modalButton1 cancel cancel1"
              >
                Cancel
              </button>
              <button type="button" className="modalButton1 save save1">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocs;
