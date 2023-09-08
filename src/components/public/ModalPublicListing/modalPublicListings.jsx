import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import "../../../styles/publIcListings/publicListings.css";
import camera from "../../../assets/img/camera.svg";
import ApplicationModal from "../ApplicationModal";
import { api } from "../../../services/api";
import { createListingImage } from "../../../services/listing";
import ListingCarousel from "../ListingCarousel";
import {
  ModalListingContainer,
  ModalListingDescription,
  DescriptionContainer,
  PriceText,
  PriceSpan,
  SpectDescriptioContainer,
  FieldName,
  FieldValue,
  FieldValueLi,
} from "./style";

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
    <ModalListingContainer>
      <ListingCarousel
        images={images}
        handleBackToSearch={handleBackToSearch}
      />
      <ModalListingDescription>
        <DescriptionContainer>
          <PriceText>
            {myselectedListing.price}${" "}
            <PriceSpan className="xmonth"> per month</PriceSpan>
          </PriceText>
        </DescriptionContainer>
        <SpectDescriptioContainer>
          <div>
            <FieldName>City</FieldName>
            <FieldValue>{myselectedListing.location}</FieldValue>
          </div>
          <div>
            <FieldName>ID</FieldName>
            <FieldValue className="desc2 or2">
              {myselectedListing.id.toString().padStart(6, "0")}
            </FieldValue>
          </div>
        </SpectDescriptioContainer>
        <SpectDescriptioContainer>
          <div>
            <FieldName>House Size</FieldName>
            <FieldValue className="desc2">
              {myselectedListing.houseSize} Sq. Ft. Per County
            </FieldValue>
          </div>
          <div>
            <FieldName>LOT SIZE</FieldName>
            <FieldValue>{myselectedListing.lotSize}</FieldValue>
          </div>
        </SpectDescriptioContainer>
        <FieldName>Amenities</FieldName>

        <div style={{ display: "flex", gap: 150 }}>
          <div>
            <ul>
              <FieldValue>
                {myselectedListing && myselectedListing.bedrooms} Bedrooms
              </FieldValue>
              <FieldValue>
                {myselectedListing && myselectedListing.bathrooms} Bathrooms
              </FieldValue>
              {myselectedListing.Amenities &&
                myselectedListing.Amenities.slice(0, 3).map((amenity) => (
                  <FieldValueLi key={amenity.id}>{amenity.name}</FieldValueLi>
                ))}
            </ul>
          </div>
          <div>
            <ul>
              {myselectedListing.Amenities &&
                myselectedListing.Amenities.slice(3).map((amenity) => (
                  <FieldValueLi key={amenity.id}>{amenity.name}</FieldValueLi>
                ))}
            </ul>
          </div>
        </div>
        <FieldName>REQUIREMENTS</FieldName>
        <div>
          <ul>
            {myselectedListing.Requirements &&
              myselectedListing.Requirements.map((requirements) => (
                <FieldValue key={requirements.id}>
                  {requirements.name}
                </FieldValue>
              ))}
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="applyBtnPublic" onClick={handleApply}>
            Apply
          </button>
        </div>
      </ModalListingDescription>
      {showApplicationModal && (
        <ApplicationModal
          onClose={handleModalClose}
          myselectedListing={myselectedListing}
        />
      )}
    </ModalListingContainer>
  );
};

export default ModalPublicListings;

ModalPublicListings.propTypes = {
  selectedImage: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
  myselectedListing: PropTypes.object.isRequired,
};
