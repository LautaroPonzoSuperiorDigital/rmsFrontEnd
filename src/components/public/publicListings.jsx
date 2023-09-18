import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListingPublic, ListingPublicContainer } from "./styles";
import "../../styles/publIcListings/publicListings.css";
import Logo from "../../assets/img/logomark.svg";
import SearchIconHover from "../../assets/img/SearchIconHover.svg";
import SearchIcon from "../../assets/img/SearchIcon.svg";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import Listing from "./Listing/Listing";
import ModalPublicListings from "./ModalPublicListing/modalPublicListings";

const PublicListings = () => {
  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [listing, setListing] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    setIsModalOpen(false);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleImageClick = (id) => {
    setIsModalOpen(true);
    const selectedListing = listing.find((item) => item.id === id);
    setSelectedListing(selectedListing);
  };

  const handleSearchIconHover = () => {
    setIsSearchIconHovered(true);
  };

  const handleSearchIconLeave = () => {
    setIsSearchIconHovered(false);
  };

  const handleInputHover = () => {
    setIsInputHovered(true);
  };

  const handleInputLeave = () => {
    setIsInputHovered(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/listing?isPublic=true");
        setListing(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" containerPublic">
      <div className={`position-sticky ${isModalOpen ? "modal-open" : ""}`}>
        <div className="filtersBar">
          <img
            className="LogoPublic"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <form method="GET" className="container">
            <input
              className={`inputPublic ${isInputHovered ? " inputHovered" : ""}`}
              type="text"
              placeholder="Keyword Or City"
              required
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputLeave}
            />
            <button type="submit">
              <img
                className={`SearchIconListings ${
                  isInputHovered || isSearchIconHovered ? "SearchIconHover" : ""
                }`}
                src={
                  isInputHovered || isSearchIconHovered
                    ? SearchIconHover
                    : SearchIcon
                }
                alt="SearchIcon"
                onMouseEnter={handleSearchIconHover}
                onMouseLeave={handleSearchIconLeave}
              />
            </button>
            <button className="open-search" />
            <button className="filter-listings" />
            <select className="dropdownMenu">
              <option className="opt" value="price">
                &nbsp;&nbsp;Price
              </option>
            </select>
            <select className="dropdownMenu">
              <option className="opt" value="sqft">
                &nbsp;&nbsp;Sq. Ft
              </option>
            </select>
            <select className="dropdownMenu largeArrow">
              <option className="opt" value="Amenities">
                &nbsp;&nbsp;Amenities
              </option>
            </select>
          </form>
          {!user && (
            <div className="buttonContainer">
              <button className="logInBtn" onClick={handleLoginClick}>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
      <ListingPublicContainer>
        <ListingPublic>
          {listing.map((listing) => {
            return (
              <Listing
                listing={listing}
                handleImageClick={handleImageClick}
                key={listing.div}
              />
            );
          })}
        </ListingPublic>
      </ListingPublicContainer>
      {isModalOpen && (
        <ModalPublicListings
          myselectedListing={selectedListing}
          handleCloseModal={handleCloseModal}
          id={selectedListing.id}
          Amenities={listing.Amenities}
        />
      )}
    </div>
  );
};

export default PublicListings;
