import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../../styles/publIcListings/publicListings.css";
import camera from "../../../assets/img/camera.svg";
import { api } from "../../../services/api";
import { createListingImage } from "../../../services/listing";
import ListingCarousel from "../ListingCarousel";
import ApplicationModal from "../ApplicationModal/ApplicationModal";
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
  BlackOverlay,
  AmenitiesContainer,
  BtnApply,
  FieldContainer,
} from "./style";
import { ModalProvider } from "../../modal/context";
import { ListingAlbum1 } from "./ListingAlbum/ListingAlbum1";

const ModalPublicListings = ({
  selectedImage,
  onCloseModal,
  myselectedListing,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [images, setImage] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [section, setSection] = useState([]);

  const handleGoBack = () => {
    setShowAlbum(false);
  };

  const handleShowAlbum = () => {
    setShowAlbum(true);
  };

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
      const sectionsArray = data.Sections.map((section) => ({
        name: section.Images[0]?.AlbumSection.Section.name,
        Album: {
          Images: section.Images.map((image) => ({
            key: image.key,
          })),
        },
      }));
      console.log(sectionsArray);
      setSection(sectionsArray);
    };
    fetchImage();
  }, []);

  return (
    <ModalListingContainer>
      <ListingCarousel
        images={images}
        handleBackToSearch={handleBackToSearch}
        handleShowAlbum={handleShowAlbum}
      />

      <ModalListingDescription>
        <DescriptionContainer>
          <PriceText>
            {myselectedListing.price}${" "}
            <PriceSpan className="xmonth"> per month</PriceSpan>
          </PriceText>
        </DescriptionContainer>
        <SpectDescriptioContainer>
          <FieldContainer location={true}>
            <FieldName>CITY</FieldName>
            <FieldValue>{myselectedListing.location}</FieldValue>
          </FieldContainer>
          <FieldContainer>
            <FieldName>ID</FieldName>
            <FieldValue className="desc2 or2">
              #{myselectedListing.id.toString().padStart(6, "0")}
            </FieldValue>
          </FieldContainer>
        </SpectDescriptioContainer>
        <SpectDescriptioContainer>
          <FieldContainer>
            <FieldName>HOUSE SIZE</FieldName>
            <FieldValue className="desc2">
              {myselectedListing.houseSize} Sq. Ft. Per County
            </FieldValue>
          </FieldContainer>
          <FieldContainer>
            <FieldName>LOT SIZE</FieldName>
            <FieldValue>
              {myselectedListing.lotSize} Sq. Ft. Per County
            </FieldValue>
          </FieldContainer>
        </SpectDescriptioContainer>
        <FieldContainer amenities={true}>
          <FieldName>AMENITIES</FieldName>
          <AmenitiesContainer>
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
          </AmenitiesContainer>
        </FieldContainer>
        <FieldContainer>
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
        </FieldContainer>
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <BtnApply onClick={handleApply}>Apply</BtnApply>
        </div>
        {showAlbum && (
          <ModalProvider>
            <BlackOverlay>
              <ListingAlbum1
                handleGoBack={handleGoBack}
                listingSections={section}
              />
            </BlackOverlay>
          </ModalProvider>
        )}
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
