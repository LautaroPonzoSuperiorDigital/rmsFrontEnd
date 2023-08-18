import React, { useState, useEffect } from "react";
import "../../styles/Documents/documents.css";
import Close from "../../assets/img/close.svg";
import CloseHover from "../../assets/img/closeHover.svg";
import { api } from "../../services/api";

const AddDocs = ({ listingsData, onClose }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [base64File, setBase64File] = useState('');
  const [listingId, setListingId] = useState('');


  /* pdf */
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectedFile(file);
        setBase64File(reader.result);
      };
    }
  };
  /* pdf */
  /* sendDoc */
  const handleSaveClick = async () => {
    if (!selectedFile || !documentName || !listingId) {
      return;
    }

    const normalizedDocumentName = documentName.endsWith('.pdf')
      ? documentName
      : `${documentName}.pdf`;


    try {
      const cleanedBase64 = base64File.replace(/^data:.+;base64,/, '');

      const response = await api.post(`/tenant/${listingId}/document`, JSON.stringify({
        name: normalizedDocumentName,
        file: cleanedBase64,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };
  /* sendDoc */

  const handleListingIdChange = (event) => {
    setListingId(event.target.value);
  };

  const handleNameChange = (event) => {
    setDocumentName(event.target.value);
  };
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
            <input
              type="file"
              id="fileInput"
              name="pdf"
              onChange={handleFileChange}
            />
          </div>

          <input
            className="inputDoc"
            placeholder="NAME"
            value={documentName}
            onChange={handleNameChange}
          />
          <input
            className="inputDoc"
            placeholder="LISTING ID                                                                        000001"
            value={listingId}
            onChange={handleListingIdChange}
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
              <button
                type="button"
                className="modalButton1 save save1"
                onClick={handleSaveClick}
              >
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
