import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/publicListings.css";
import camera from "../../assets/img/camera.svg";
import ApplicationModal from "./ApplicationModal";
import { api } from "../../services/api";
import { createListingImage } from "../../services/listing";

const ModalPublicListings = ({
  selectedImage,
  onCloseModal,
  id,
  myselectedListing,
}) => {
  console.log("aca", myselectedListing);
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
        const response = await api.get("/listing");
        const listingsWithId = response.data.map((listing) => ({
          ...listing,
          key: `https://rms-staging.s3.us-west-1.amazonaws.com/${listing.key.replace(
            /\\/g,
            "%5C"
          )}`,
        }));
        const selectedListingData = listingsWithId.find(
          (listing) => listing.id === id
        );
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
        {myselectedListing && (
          <img
            className="imgPublic1"
            src={createListingImage(myselectedListing)}
            onClick={onCloseModal}
          />
        )}
      </div>
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
