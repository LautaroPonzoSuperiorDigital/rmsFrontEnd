import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Documents/documents.css";
import Close from "../../assets/img/close.svg";
import CloseHover from "../../assets/img/closeHover.svg";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const AddDocs = ({ onClose }) => {
  const { user } = useAuth();
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [listingId, setListingId] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectedFile(file);
      };
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!selectedFile || !documentName || !listingId) return;

      const [listing, userData] = await Promise.all([
        api.get(`listing/${listingId}`).then((response) => response.data),
        api.get(`admin/user/${user.id}`).then((response) => response.data),
      ]);

      if (listing.adminId !== userData.Admin.id) {
        alert(`You are not allowed to attach a file to Listing #${listingId}`);
        throw new Error(`Not authorized`);
      }

      const formData = new FormData();

      formData.append("name", documentName);
      formData.append("file", selectedFile);

      await api.post(`/listing/${listingId}/document/form-data`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

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

AddDocs.propTypes = {
  listingsData: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddDocs;
