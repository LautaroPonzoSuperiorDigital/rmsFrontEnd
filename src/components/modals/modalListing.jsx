import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modal.css";
import testImg from "../../assets/img/testImg.jpg";
import bg from "../../assets/img/BG.svg";
import closeListing from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import ModalListingsImgs from "./modalListingsImgs";
import backendPort from "../../config";
import axios from "axios";

const EditModalListings = ({ renderSectionContent }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(true);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [amenities, setAmenities] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [listingData, setListingData] = useState({
    isPublic: false,
  });

  const inputRefs = useRef([]);

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };
  const handleRequirementsChange = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addNewAmenity = (index) => {
    if (amenities.length >= 10) return;

    const newAmenities = [...amenities];
    if (index === newAmenities.length - 1) {
      newAmenities.splice(index + 1, 0, "");
    } else {
      if (newAmenities.length < 5) {
        newAmenities.splice(index + 1, 0, "");
      } else {
        newAmenities.splice(index + 1, 0, "");
        newAmenities.splice(5, 1);
      }
    }
    setAmenities(newAmenities);
  };
  const addNewRequirements = (index) => {
    if (requirements.length >= 3) return;
    const newRequirements = [...requirements];
    if (index === newRequirements.length - 1) {
      newRequirements.splice(index + 1, 0, "");
    } else {
      newRequirements.splice(index + 1, 0, "");
      newRequirements.splice(6, 1);
    }
    setRequirements(newRequirements);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewAmenity(index);
    } else if (e.key === "Backspace" && amenities[index] === "") {
      e.preventDefault();
      deleteAmenity(index);
    }
  };
  const handleKeyDownRequirements = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewRequirements(index);
    } else if (e.key === "Backspace" && requirements[index] === "") {
      e.preventDefault();
      deleteRequirement(index);
    }
  };

  const deleteAmenity = (index) => {
    if (amenities.length === 1) return;

    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);

    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const deleteRequirement = (index) => {
    if (requirements.length === 1) return;

    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);

    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type !== "checkbox" ? value : checked ? true : false;

    setListingData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };
  const handleCloseModal = () => {
    closeModal();
    navigate("/listingsAdmin");
  };

  const addNewLine = () => {
    setListingData({
      ...listingData,
      amenities: listingData.amenities + "\n• ",
      requirements: listingData.requirements + "\n• ",
    });
  };

  const handleMouseEnter = () => {
    setIsCloseHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCloseHovered(false);
  };

  const handleImageMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
  };
  const handleCancel = () => {
    window.location.href = "/listingsAdmin";
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    setShowMainModal(false);
  };

  const closeModal = () => {
    setShowImageModal(false);
    setShowMainModal(true);
  };
  const handleSave = () => {
    const data = {
      ...listingData,
      adminId: 1,
      amenities: amenities,
      requirements: requirements,
      image: selectedImage,
    };

    axios
      .post(`http://localhost:${backendPort}/listing`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);

        // Eliminar las imágenes del localStorage y del estado
        localStorage.removeItem("images");
        setSelectedImage(null);

        // Recargar la página
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  let hasNoImages =
    !renderSectionContent || renderSectionContent.images.length === 0;
  /* IMAGES */
  const handleReceiveImage = (image) => {
    setSelectedImage(image);
    console.log(image);
    hasNoImages = false;
    /* IMAGES */
  };

  return (
    <div className="bg">
      <div className="modalWrapper2 container-fluid">
        <div className="modalContent2 d-flex">
          <div
            className="imgContainer d-flex justify-content-center align-items-start"
            onClick={handleImageClick}
          >
            {selectedImage == null ? (
              <img
                className="ModalImg"
                src={bg}
                alt="bg"
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
              />
            ) : (
              <img
                className="ModalImg"
                src={selectedImage}
                alt="testImg"
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
              />
            )}

            <div className={`imgOverlay ${isImageHovered ? "hovered" : ""}`}>
              {selectedImage == null ? (
                <span className="editText">+ Add Photos</span>
              ) : (
                <div className="editBar">
                  <span className="editText1">
                    Edit Album (
                    {JSON.parse(localStorage.getItem("images")).length})
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="formContainer">
            <div className="inputContainerListing">
              <input
                type="text"
                className="inputListing"
                placeholder="ID                                                                                                              000001"
                name="id"
                value={listingData.id}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="inputListing"
                placeholder="LOCATION                                   8148 Larga Ave, 67884, Atascadero, California"
                name="location"
                value={listingData.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="inputListing"
                placeholder="LOT SIZE                                                                         3,608 Sq. Ft. Per County"
                name="lotSize"
                value={listingData.lotSize}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="inputListing"
                placeholder="HOUSE SIZE                                                                    3,608 Sq. Ft. Per County"
                name="houseSize"
                value={listingData.houseSize}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="inputListing"
                placeholder="PRICE                                                                                               $ 4,000 / Mo"
                name="price"
                value={listingData.price}
                onChange={handleInputChange}
              />
              <div className="listingCheckbox">
                <div className="form-check">
                  <label htmlFor="publicCheckbox" className="checkboxLabel">
                    PUBLIC
                  </label>
                  <input
                    type="checkbox"
                    id="publicCheckbox"
                    className="checkboxListing"
                    name="isPublic"
                    checked={listingData.isPublic}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="secondFormContainer">
            <img
              className="closeListing2"
              src={isCloseHovered ? closeHover : closeListing}
              alt="close"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCancel}
            />
            <div className="inputListing2">
              <div className="inputContainerListing2">
                <div className="bedroomBathroom">
                  <input
                    type="text"
                    className="inputListing3"
                    placeholder="#BEDROOMS                                    2"
                    name="bedrooms"
                    value={listingData.bedrooms}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="inputListingBath"
                    placeholder="#BATHROOMS                                  3"
                    name="bathrooms"
                    value={listingData.bathrooms}
                    onChange={handleInputChange}
                  />
                  <div className="amenitiesLine d-flex row">
                    <p className="amenities1">AMENITIES</p>
                    <div className="list">
                      <ul>
                        {amenities.slice(0, 5).map((amenity, index) => (
                          <li key={index}>
                            <input
                              className="inputAmenities1"
                              type="text"
                              value={amenity}
                              onChange={(e) =>
                                handleAmenityChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="list">
                      <ul>
                        {amenities.slice(5).map((amenity, index) => (
                          <li key={index + 5}>
                            <input
                              className="inputAmenities1"
                              type="text"
                              value={amenity}
                              onChange={(e) =>
                                handleAmenityChange(index + 5, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(e, index + 5)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="requirement">
              <div className="orderRequirement">
                <p className="requirements1">REQUIREMENTS</p>
                <ul className="list1">
                  {requirements.map((requirement, index) => (
                    <li key={index}>
                      <input
                        className="inputAmenities1"
                        type="text"
                        value={requirement}
                        onChange={(e) =>
                          handleRequirementsChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDownRequirements(e, index)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="orderBtn">
            <div className="buttonContainer1 d-flex justify-content-end align-items-center flex-direction-row">
              <button
                type="button"
                className="modalButton cancelListing"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modalButton1 saveListing"
                onClick={() => {
                  handleSave();
                  handleCloseModal();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {showImageModal && (
          <>
            <ModalListingsImgs
              closeModal={closeModal}
              images={selectedImage}
              sendImageToParent={handleReceiveImage}
            />
            <style>{`.footer { display: none !important; }`}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModalListings;
