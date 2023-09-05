import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/publicListings.css";
import Logo from "../../assets/img/Logo.svg";
import bath from "../../assets/img/bath.svg";
import bed from "../../assets/img/bed.svg";
import SearchIconHover from "../../assets/img/SearchIconHover.svg";
import SearchIcon from "../../assets/img/SearchIcon.svg";
import ModalPublicListings from "./modalPublicListings";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { createListingImage } from "../../services/listing";

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
        const { data } = await api.get("/listing");
        setListing(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" containerPublic w-100">
      <div
        className={`position-sticky w-100 ${isModalOpen ? "modal-open" : ""}`}
      >
        <div className="filtersBar d-flex align-items-center">
          <img
            className="LogoPublic justify-content-start ms-4"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <form method="GET">
            <input
              className={`inputPublic ms-5 ${
                isInputHovered ? "inputHovered" : ""
              }`}
              type="text"
              placeholder="     Keyword Or City"
              required
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputLeave}
            />
            <button type="submit">
              <img
                className={`SearchIconListings justify-content-start ${
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
            <button className="logInBtn" onClick={handleLoginClick}>
              Log In
            </button>
          )}
        </div>
      </div>
      <div className="containerImgs">
        {listing.map((listing) => {
          if (listing.isPublic) {
            return (
              <div
                className="item1"
                key={listing.id.toString().padStart(6, "0")}
              >
                <img
                  className="imgPublic"
                  src={createListingImage(listing)}
                  onClick={() => handleImageClick(listing.id)}
                />
                <div className="description d-flex col">
                  <div className="spects d-flex flex-column justify-content-center align-items-start">
                    <p className="publicPrice price">
                      $&nbsp;
                      {listing.price
                        ? parseFloat(listing.price).toLocaleString("en", {
                            useGrouping: true,
                          })
                        : ""}
                      &nbsp;
                      <span className="strong"> per month</span>
                    </p>
                    <p className="spect house_size">
                      HOUSE{" "}
                      <span className="strong">
                        {listing.houseSize
                          ? listing.houseSize.toLocaleString("EN", {
                              maximumFractionDigits: 0,
                            })
                          : ""}
                        &nbsp;SQ. FT.
                      </span>
                    </p>

                    <p className="spect lot_size">
                      LOT{" "}
                      <span className="strong">
                        {listing.lotSize
                          ? listing.lotSize.toLocaleString("EN", {
                              maximumFractionDigits: 0,
                            })
                          : ""}{" "}
                        &nbsp;SQ. FT.
                      </span>
                    </p>
                  </div>
                  <div className="spects2">
                    <p className="spectText d-flex justify-content-end location mt-3">
                      {listing.location.split(",")[2].trim()},{" "}
                      {listing.location
                        .split(",")[3]
                        .trim()
                        .substring(0, 1)
                        .toUpperCase()}
                      {listing.location
                        .split(",")[3]
                        .trim()
                        .substring(1, 2)
                        .toLowerCase()}
                    </p>
                    <div className="icons1 d-flex justify-content-end">
                      <span className="nbedbath">{listing.bedrooms}</span>
                      <img className="bed bedrooms" src={bed} />
                      <span className="nbedbath bathrooms">
                        {listing.bathrooms}
                      </span>
                      <img className="bath" src={bath} />
                    </div>
                    <p className="listingNumber d-flex justify-content-end mt-2 id">
                      # {listing.id.toString().padStart(6, "0")}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
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
