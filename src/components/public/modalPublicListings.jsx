import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import "../../styles/publIcListings/publicListings.css";
import camera from "../../assets/img/camera.svg";
import ApplicationModal from "./ApplicationModal";
import { api } from "../../services/api";
import { createListingImage } from "../../services/listing";
import ListingCarousel from "./ListingCarousel";

const ModalPublicListings = ({
  selectedImage,
  onCloseModal,
  myselectedListing,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [images, setImage] = useState([]);

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

  useEffect(() => {
    const fetchImage = async () => {
      const response = await api.get(`/listing/${myselectedListing.id}/album`);
      const data = response.data;
      const allImages = [];
      if (data.Sections && Array.isArray(data.Sections)) {
        data.Sections.forEach((section) => {
          if (section.Images && Array.isArray(section.Images)) {
            allImages.push(...section.Images);
          }
        });
      }
      setImage(allImages);
    };
    fetchImage();
  }, []);

  return (
    <div className="publicModal1">
      <ListingCarousel images={images} />
      {/* <div className={imgCardContainerClass} style={containerStyle}>
        <button className="backToSearch" onClick={handleBackToSearch}>
          Back To Search Results
        </button>
        <button
          className="bottomLeftButton d-flex align-items-center justify-content-center"
          onClick={handleBackToSearch}
        >
          <img src={camera} alt="" /> <span className="camSpan">1/29</span>
        </button>
        {myselectedListing && (
          <img
            className="imgPublic1"
            src={createListingImage(myselectedListing)}
            onClick={onCloseModal}
          />
        )}
      </div> */}
      <div className="description1">
        <div className="publicPrice1 d-flex justify-content-start align-items-center">
          <p>
            {myselectedListing.price}${" "}
            <span className="xmonth"> per month</span>
          </p>
        </div>
        <div className="spectsModal d-flex justify-content-between">
          <div className="order">
            <p className="desc">City</p>
            <span className="desc2">{myselectedListing.location}</span>
            <p className="desc">House Size</p>

            <span className="desc2">{myselectedListing.houseSize}</span>

            <p className="desc1">Amenities</p>
          </div>
          <div className="order2">
            <p className="desc id2">ID</p>

            <span className="desc2 or2">
              {myselectedListing.id.toString().padStart(6, "0")}
            </span>

            <p className="desc id2">LOT SIZE</p>
            <span className="desc2 or2">{myselectedListing.lotSize}</span>
          </div>
        </div>
        <div className="PublicList d-flex justify-content-center align-items-center">
          <div className="col-md-6 listing">
            <ul>
              <li>
                {myselectedListing && myselectedListing.bedrooms} Bedrooms
              </li>
              <li>
                {myselectedListing && myselectedListing.bathrooms} Bathrooms
              </li>
              {myselectedListing.Amenities &&
                myselectedListing.Amenities.slice(0, 3).map((amenity) => (
                  <li key={amenity.id}>{amenity.name}</li>
                ))}
            </ul>
          </div>
          <div className="col-md-6 second">
            <ul>
              {myselectedListing.Amenities &&
                myselectedListing.Amenities.slice(3).map((amenity) => (
                  <li key={amenity.id}>{amenity.name}</li>
                ))}
            </ul>
          </div>
        </div>
        <p className="desc3">REQUIREMENTS</p>
        <div className="requirementsUl">
          <ul>
            {myselectedListing.Requirements &&
              myselectedListing.Requirements.map((requirements) => (
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
          myselectedListing={myselectedListing}
        />
      )}
    </div>
  );
};

export default ModalPublicListings;

ModalPublicListings.propTypes = {
  selectedImage: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
  myselectedListing: PropTypes.object.isRequired,
};
