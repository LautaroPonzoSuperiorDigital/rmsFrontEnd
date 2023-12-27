import { useEffect, useState } from "react";
import "../../../styles/publIcListings/publicListings.css";
import { api } from "../../../services/api";
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
  SpinnerContainer,
  ModalListingContainer2,
} from "./style";
import { ModalProvider } from "../../modal/context";
import ChevronLeft from "../../../assets/img/chevron.left (1).svg";
import { ListingAlbum1 } from "./ListingAlbum/ListingAlbum1";
import { useNavigate, useParams } from "react-router-dom";
import DefaultImage from "../../../assets/img/defaultImage.png";
import Spinner from "../../spinner/Spinner";
import { BtnBackToSearch } from "../ListingCarousel/styles";
import Footer from "../Footer";

const ModalPublicListings = () => {
  // const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [images, setImage] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [section, setSection] = useState([]);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToSearch = () => {
    navigate(-1);
  };

  const handleGoBack = () => {
    setShowAlbum(false);
  };

  const handleShowAlbum = () => {
    setShowAlbum(true);
  };

  /* Modal Application */
  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleModalClose = () => {
    // setShowModal(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const listing = await api.get(`/listing/${id}`);
        setListing(listing.data);
        const response = await api.get(`/listing/${id}/album`);
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
        console.log("iamges", allImages);
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
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [id]);

  return (
    <ModalListingContainer2>
      <ModalListingContainer>
        {!loading ? (
          <SpinnerContainer maxHeight="290px">
            <Spinner />
          </SpinnerContainer>
        ) : (
          <>
            {images.length > 0 ? (
              <ListingCarousel
                images={images}
                handleBackToSearch={handleBackToSearch}
                handleShowAlbum={handleShowAlbum}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                <BtnBackToSearch onClick={handleBackToSearch}>
                  <img
                    src={ChevronLeft}
                    alt="ChevronLeft"
                    style={{ width: "8px", marginRight: "9px" }}
                  />
                  Back To Search Results
                </BtnBackToSearch>
                <img
                  src={DefaultImage}
                  alt="Default"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
          </>
        )}
        <ModalListingDescription>
          <DescriptionContainer>
            <PriceText>
              {listing.price}${" "}
              <PriceSpan className="xmonth"> per month</PriceSpan>
            </PriceText>
          </DescriptionContainer>
          <SpectDescriptioContainer>
            <FieldContainer location={true}>
              <FieldName>CITY</FieldName>
              <FieldValue>{listing.location}</FieldValue>
            </FieldContainer>
            <FieldContainer>
              <FieldName>ID</FieldName>
              <FieldValue className="desc2 or2">#{listing.id}</FieldValue>
            </FieldContainer>
          </SpectDescriptioContainer>
          <SpectDescriptioContainer>
            <FieldContainer>
              <FieldName>HOUSE SIZE</FieldName>
              <FieldValue className="desc2">
                {listing.houseSize} Sq. Ft. Per County
              </FieldValue>
            </FieldContainer>
            <FieldContainer>
              <FieldName>LOT SIZE</FieldName>
              <FieldValue>{listing.lotSize} Sq. Ft. Per County</FieldValue>
            </FieldContainer>
          </SpectDescriptioContainer>
          <FieldContainer amenities={true}>
            <FieldName>AMENITIES</FieldName>
            <AmenitiesContainer>
              <div>
                <ul style={{ padding: 0 }}>
                  <FieldValue>
                    {listing && listing.bedrooms} Bedrooms
                  </FieldValue>
                  <FieldValue>
                    {listing && listing.bathrooms} Bathrooms
                  </FieldValue>
                  <FieldValue>{listing && listing.garages} Garages</FieldValue>
                  {listing.Amenities &&
                    listing.Amenities.slice(0, 3).map((amenity) => (
                      <FieldValueLi
                        key={amenity.id}
                        style={{ marginLeft: "23px" }}
                      >
                        {amenity.name}
                      </FieldValueLi>
                    ))}
                </ul>
              </div>
              <div>
                <ul style={{ padding: 0 }}>
                  {listing.Amenities &&
                    listing.Amenities.slice(3).map((amenity) => (
                      <FieldValueLi
                        key={amenity.id}
                        style={{ marginLeft: "23px" }}
                      >
                        {amenity.name}
                      </FieldValueLi>
                    ))}
                </ul>
              </div>
            </AmenitiesContainer>
          </FieldContainer>
          <FieldContainer>
            <FieldName>REQUIREMENTS</FieldName>
            <div>
              <ul>
                {listing.Requirements &&
                  listing.Requirements.map((requirements) => (
                    <FieldValueLi key={requirements.id}>
                      {requirements.name}
                    </FieldValueLi>
                  ))}
              </ul>
            </div>
          </FieldContainer>
          <div
            className="d-flex align-items-center justify-content-center h-100 "
            style={{ width: "100%" }}
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
            myselectedListing={listing}
          />
        )}
      </ModalListingContainer>

      <Footer />
    </ModalListingContainer2>
  );
};

export default ModalPublicListings;
