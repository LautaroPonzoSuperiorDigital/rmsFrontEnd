import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/publicListings.css";
import camera from "../../assets/img/camera.svg";
import publicListingsData from "./publicListingsData";
import ApplicationModal from "./ApplicationModal";
import backendPort from "../../config";
import picture1 from "../../assets/img/picture.jpg";
import axios from "axios";

const ModalPublicListings = ({ selectedImage, onCloseModal, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [Amenities, setAmenities] = useState([""]);
  const [Requirements, setRequirements] = useState([""]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [listingId, setListingId] = useState(null); // Add the 'id' state variable
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const navigate = useNavigate();

  const imgCardContainerClass = `imgCardContainer ${
    selectedImage ? "showImage" : ""
  }`;

  const containerStyle = {
    backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
  };

  const handleBackToSearch = () => {
    window.location.href = window.location.href;
    onCloseModal();
  };

  /* Modal Application */
  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  /* Modal Application */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.certifymyrent.com/listing`
        );
        const listingsWithId = response.data.map((listing) => ({
          ...listing,
          key: `https://rms-staging.s3.us-west-1.amazonaws.com/${listing.key.replace(/\\/g, "%5C")}`,
        }));
        const selectedListingData = listingsWithId.find((listing) => listing.id === id);
        setSelectedListing(selectedListingData);
        setAmenities(selectedListingData?.Amenities || []);
        setRequirements(selectedListingData?.Requirements || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    if (selectedListing) {
      setListingId(selectedListing.id);
      setAmenities(selectedListing.Amenities);
      setRequirements(selectedListing.Requirements);
      console.log(selectedListing);
    }
  }, [selectedListing]);

  useEffect(() => {
    setCurrentImage(selectedImage);
  }, [selectedImage]);
  return (
    <div className="publicModal1">
      <div className={imgCardContainerClass} style={containerStyle}>
        <button className="backToSearch" onClick={handleBackToSearch}>
          Back To Search Results
        </button>
        <button
          className="bottomLeftButton d-flex align-items-center justify-content-center"
          onClick={handleBackToSearch}
        >
          <img src={camera} alt="" /> <span className="camSpan">1/29</span>
        </button>
        {selectedListing && (
          <img
            className="imgPublic1"
            src={selectedListing.key}
            onClick={onCloseModal}
          />
        )}
      </div>
      <div className="description1">
        <div className="publicPrice1 d-flex justify-content-start align-items-center">
          <p>
            ${" "}
            {selectedListing && selectedListing.price
              ? parseFloat(selectedListing.price).toLocaleString("en", {
                  useGrouping: true,
                })
              : ""}
            <span className="xmonth"> per month</span>
          </p>
        </div>
        <div className="spectsModal d-flex justify-content-between">
          <div className="order">
            <p className="desc">City</p>
            {selectedListing && (
              <span className="desc2">
                {selectedListing.location.split(", ").slice(-2).join(", ")}
              </span>
            )}
            <p className="desc">House Size</p>
            {selectedListing && (
              <span className="desc2">
                {" "}
                {selectedListing.houseSize
                  ? selectedListing.houseSize.toLocaleString("EN", {
                      maximumFractionDigits: 0,
                    })
                  : ""}
                &nbsp;Sq. Ft. per county
              </span>
            )}
            <p className="desc1">Amenities</p>
          </div>
          <div className="order2">
            <p className="desc id2">ID</p>
            {selectedListing && (
              <span className="desc2 or2">
                {selectedListing.id.toString().padStart(6, "0")}
              </span>
            )}
            <p className="desc id2">LOT SIZE</p>
            {selectedListing && (
              <span className="desc2 or2">
                {selectedListing.lotSize
                  ? selectedListing.lotSize.toLocaleString("EN", {
                      maximumFractionDigits: 0,
                    })
                  : ""}{" "}
                &nbsp;Sq. Ft. per county
              </span>
            )}
          </div>
        </div>
        <div className="PublicList d-flex justify-content-center align-items-center">
          <div className="col-md-6 listing">
            <ul>
              <li>{selectedListing && selectedListing.bedrooms} Bedrooms</li>
              <li>{selectedListing && selectedListing.bathrooms} Bathrooms</li>
              {Amenities &&
                Amenities.slice(0, 3).map((amenity) => (
                  <li key={amenity.id}>{amenity.name}</li>
                ))}
            </ul>
          </div>
          <div className="col-md-6 second">
            <ul>
              {Amenities &&
                Amenities.slice(3).map((amenity) => (
                  <li key={amenity.id}>{amenity.name}</li>
                ))}
            </ul>
          </div>
        </div>
        <p className="desc3">REQUIREMENTS</p>
        <div className="requirementsUl">
          <ul>
            {Requirements &&
              Requirements.map((requirements) => (
                <li key={requirements.id}>{requirements.name}</li>
              ))}
          </ul>
        </div>
        <div className="containerD d-flex align-items-center justify-content-center">
          <button className="applyBtnPublic" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
      {showApplicationModal && (
        <ApplicationModal
          onClose={handleModalClose}
          selectedImage={selectedListing.key}
          id={listingId}
          selectedListing={selectedListing}
          Amenities={Amenities}
        />
      )}
    </div>
  );
};

export default ModalPublicListings;
