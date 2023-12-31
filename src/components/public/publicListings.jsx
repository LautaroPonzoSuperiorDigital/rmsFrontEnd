import "../../styles/publIcListings/publicListings.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listing from "./Listing/Listing";
import Logo from "../../assets/img/logomark.svg";
import SearchIconHover from "../../assets/img/SearchIconHover.svg";
import SearchIcon from "../../assets/img/SearchIcon.svg";
import chevronBackward from "../../assets/img/chevron.backward.svg";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { Close } from "../icons";
import {
  ContainerPublic,
  ListingPublic,
  ListingPublicContainer,
  LoginBtnMobile,
  NavButtonLogin,
} from "./styles";
import Footer from "./Footer";

const PublicListings = () => {
  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [isHouseSizeFilterOpen, setIsHouseSizeFilterOpen] = useState(false);
  const [isLotSizeFilterOpen, setIsLotSizeFilterOpen] = useState(false);
  const [IsAmenitiesFilterOpen, setIsAmenitiesFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minLotSize, setMinLotSize] = useState("");
  const [maxLotSize, setMaxLotSize] = useState("");
  const [minHouseSize, setMinHouseSize] = useState("");
  const [maxHouseSize, setMaxHouseSize] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [garages, setGarages] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const innerWidth = window.innerWidth;
  useEffect(() => {
    function updateModalWidth() {
      setIsMobile(window.outerWidth <= 768);
    }

    updateModalWidth();

    window.addEventListener("resize", updateModalWidth);

    return () => {
      window.removeEventListener("resize", updateModalWidth);
    };
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await api.get("/listing?isPublic=true");
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    // TODO: Update amenities list
    setAmenitiesList(["Pool", "Gate", "Pet-Friendly", "Air Conditioning"]);
    fetchListings();
  }, []);

  useEffect(() => {
    !isMobile && handleApplyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isMobile,
    minPrice,
    maxPrice,
    minHouseSize,
    maxHouseSize,
    minLotSize,
    maxLotSize,
    amenities,
    bedrooms,
    bathrooms,
    garages,
  ]);

  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? "hidden" : "auto";
  }, [isMobileFilterOpen]);

  const handleLogoClick = () => {
    navigate("/");
    setIsModalOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleImageClick = (id) => {
    navigate(`/listing/${id}`);
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

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleTogglePriceFilter = () => {
    setIsPriceFilterOpen(!isPriceFilterOpen);
  };

  const handleToggleHouseSizeFilter = () => {
    setIsHouseSizeFilterOpen(!isHouseSizeFilterOpen);
  };

  const handleToggleLotSizeFilter = () => {
    setIsLotSizeFilterOpen(!isLotSizeFilterOpen);
  };

  const handleToggleAmenitiesFilter = () => {
    setIsAmenitiesFilterOpen(!IsAmenitiesFilterOpen);
  };

  const handleOpenMobileFilter = () => {
    setIsMobileFilterOpen(true);
  };

  const handleCloseMobileFilter = () => {
    setIsMobileFilterOpen(false);
  };

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") return handleSearch();
  };

  const handleSearchChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearch = () => {
    api
      .get("/listing", {
        params: { isPublic: true, location: searchInputValue.trim() },
      })
      .then(({ data }) => setListings(data))
      .catch((error) => {
        console.error("Could not update listings");
        alert("Could not update listings");
        throw new Error(error);
      });

    if (isSearchOpen) handleCloseSearch();
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;

    setMinPrice(formatPriceInput(value));
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;

    setMaxPrice(formatPriceInput(value));
  };

  const handleMinLotSizeChange = (e) => {
    const value = e.target.value;

    setMinLotSize(formatNumberInput(value));
  };

  const handleMaxLotSizeChange = (e) => {
    const value = e.target.value;

    setMaxLotSize(formatNumberInput(value));
  };

  const handleMinHouseSizeChange = (e) => {
    const value = e.target.value;

    setMinHouseSize(formatNumberInput(value));
  };

  const handleMaxHouseSizeChange = (e) => {
    const value = e.target.value;

    setMaxHouseSize(formatNumberInput(value));
  };

  const handleAmenityChange = (e) => {
    const amenity = e.target.value;
    const isChecked = e.target.checked;

    isChecked
      ? setAmenities([...amenities, amenity])
      : setAmenities(amenities.filter((a) => a !== amenity));
  };

  const handleBedroomsChange = (e) => {
    const value = e.target.value;

    setBedrooms(formatNumberInput(value));
  };

  const handleBathroomsChange = (e) => {
    const value = e.target.value;

    setBathrooms(formatNumberInput(value));
  };

  const handleGaragesChange = (e) => {
    const value = e.target.value;

    setGarages(formatNumberInput(value));
  };

  const formatPriceInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    const formattedValue = `$${numericValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}`;

    return formattedValue.length === 1 ? `` : formattedValue;
  };

  const formatNumberInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    return `${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleApplyFilter = () => {
    isMobileFilterOpen && handleCloseMobileFilter();

    const removeNonDigits = (value) => value.replace(/\D/g, "");
    const filterParams = Object.fromEntries(
      Object.entries({
        minPrice: removeNonDigits(minPrice),
        maxPrice: removeNonDigits(maxPrice),
        minLotSize: removeNonDigits(minLotSize),
        maxLotSize: removeNonDigits(maxLotSize),
        minHouseSize: removeNonDigits(minHouseSize),
        maxHouseSize: removeNonDigits(maxHouseSize),
        bedrooms: removeNonDigits(bedrooms),
        bathrooms: removeNonDigits(bathrooms),
        garages: removeNonDigits(garages),
        amenities: amenities.join(","),
        // eslint-disable-next-line no-unused-vars
      }).filter(([_, value]) => value !== "")
    );

    return api
      .get("/listing", { params: { isPublic: true, ...filterParams } })
      .then(({ data }) => setListings(data))
      .catch((error) => {
        console.error("Could not update listings");
        alert("Could not update listings");
        throw new Error(error);
      });
  };

  return (
    <ContainerPublic>
      <div className={`position-sticky ${isModalOpen ? "modal-open" : ""}`}>
        {innerWidth < 768 && (
          <NavButtonLogin>
            <LoginBtnMobile onClick={handleLoginClick}>Log In</LoginBtnMobile>
          </NavButtonLogin>
        )}
        <div className={`filtersBar ${isSearchOpen ? "hideFiltersBar" : ""}`}>
          <img
            className="LogoPublic"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />

          <div className="container">
            <div
              className={`inputPublic ${isInputHovered ? "inputHovered" : ""}`}
            >
              <input
                type="text"
                placeholder="Keyword Or City"
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputLeave}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeydown}
              />
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
                onClick={handleSearch}
              />
            </div>
            <button className="open-search" onClick={handleOpenSearch} />
            <button
              className="filter-listings"
              onClick={handleOpenMobileFilter}
            />
            <div className="filters">
              <div className="filter">
                <button
                  id="priceFilterButton"
                  onClick={handleTogglePriceFilter}
                  style={
                    isPriceFilterOpen ? { border: "2px solid #31af9a" } : {}
                  }
                >
                  {"price"}
                </button>
                <img src={chevronBackward} onClick={handleTogglePriceFilter} />
                {isPriceFilterOpen && (
                  <div className="numericFilter">
                    <input
                      type="text"
                      value={minPrice}
                      placeholder="min"
                      onChange={handleMinPriceChange}
                    />
                    <input
                      type="text"
                      value={maxPrice}
                      placeholder="max"
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                )}
              </div>
              <div className="filter">
                <button
                  id="houseSizeFilterButton"
                  onClick={handleToggleHouseSizeFilter}
                  style={
                    isHouseSizeFilterOpen ? { border: "2px solid #31af9a" } : {}
                  }
                >
                  {"house size"}
                </button>
                <img
                  src={chevronBackward}
                  onClick={handleToggleHouseSizeFilter}
                />
                {isHouseSizeFilterOpen && (
                  <div className="numericFilter">
                    <input
                      type="text"
                      value={minHouseSize}
                      placeholder="min"
                      onChange={handleMinHouseSizeChange}
                    />
                    <input
                      type="text"
                      value={maxHouseSize}
                      placeholder="max"
                      onChange={handleMaxHouseSizeChange}
                    />
                  </div>
                )}
              </div>
              <div className="filter">
                <button
                  id="lotSizeFilterButton"
                  onClick={handleToggleLotSizeFilter}
                  style={
                    isLotSizeFilterOpen ? { border: "2px solid #31af9a" } : {}
                  }
                >
                  {"lot size"}
                </button>
                <img
                  src={chevronBackward}
                  onClick={handleToggleLotSizeFilter}
                />
                {isLotSizeFilterOpen && (
                  <div className="numericFilter">
                    <input
                      type="text"
                      value={minLotSize}
                      placeholder="min"
                      onChange={handleMinLotSizeChange}
                    />
                    <input
                      type="text"
                      value={maxLotSize}
                      placeholder="max"
                      onChange={handleMaxLotSizeChange}
                    />
                  </div>
                )}
              </div>
              <div className="filter">
                <button
                  id="amenitiesFilterButton"
                  onClick={handleToggleAmenitiesFilter}
                  style={
                    IsAmenitiesFilterOpen ? { border: "2px solid #31af9a" } : {}
                  }
                >
                  {"amenities"}
                </button>
                <img
                  src={chevronBackward}
                  onClick={handleToggleAmenitiesFilter}
                />
                {IsAmenitiesFilterOpen && (
                  <div className="checkboxFilter">
                    {amenitiesList.map((amenity, index) => (
                      <div key={index} className="amenityRow">
                        <input
                          type="checkbox"
                          id={`amenity-${index}`}
                          name="amenity"
                          value={amenity}
                          onChange={handleAmenityChange}
                          checked={amenities.includes(amenity)}
                        />
                        <label htmlFor={`amenity-${index}`}>{amenity}</label>
                      </div>
                    ))}
                    <div className="roomsFilter">
                      <div className="roomFilter">
                        <input
                          type="text"
                          value={bedrooms}
                          onChange={handleBedroomsChange}
                          placeholder={"# bedrooms"}
                        />
                      </div>
                      <div className="roomFilter">
                        <input
                          type="text"
                          value={bathrooms}
                          onChange={handleBathroomsChange}
                          placeholder={"# bathrooms"}
                        />
                      </div>
                      <div className="roomFilter">
                        <input
                          type="text"
                          value={garages}
                          onChange={handleGaragesChange}
                          placeholder={"# garages"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!user && (
            <div className="buttonContainer">
              <button className="logInBtn" onClick={handleLoginClick}>
                Log In
              </button>
            </div>
          )}
        </div>
        {isSearchOpen && (
          <div className="searchContainer">
            <img
              className="SearchIconListings"
              src={SearchIcon}
              alt="SearchIcon"
            />
            <input
              type="text"
              placeholder="Keyword Or City"
              onChange={handleSearchChange}
            />
            {searchInputValue.length ? (
              <button className="doSearch" onClick={handleSearch}>
                Search
              </button>
            ) : (
              <button className="cancelSearch" onClick={handleCloseSearch}>
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
      <ListingPublicContainer
        style={{
          filter: isSearchOpen && isMobile <= 768 ? "blur(5px)" : "none",
        }}
      >
        {listings.length ? (
          <ListingPublic>
            {listings.map((listing) => (
              <Listing
                listing={listing}
                handleImageClick={handleImageClick}
                key={listing.id}
              />
            ))}
          </ListingPublic>
        ) : (
          <p className="noListingMessage" data-testid="no-listing-message">
            {"No listing to show"}
          </p>
        )}
      </ListingPublicContainer>
      <Footer />
      {isMobileFilterOpen && (
        <>
          <div className="overlay" />
          <div className="filterContainer">
            <div className="filterHeader">
              <button onClick={handleCloseMobileFilter}>
                <Close />
              </button>
              <p>{"filter listings"}</p>
            </div>
            <div className="filterSectionMobile">
              <p className="filterSectionMobileText">{"price"}</p>
              <div className="filterMin">
                <p>min</p>
                <input
                  type="text"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </div>
              <div className="filterMax">
                <p>max</p>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="filterSectionMobile">
              <p className="filterSectionMobileText">{"lot size (sq. ft.)"}</p>
              <div className="filterMin">
                <p>min</p>
                <input
                  type="text"
                  value={minLotSize}
                  onChange={handleMinLotSizeChange}
                />
              </div>
              <div className="filterMax">
                <p>max</p>
                <input
                  type="text"
                  value={maxLotSize}
                  onChange={handleMaxLotSizeChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="filterSectionMobile">
              <p className="filterSectionMobileText">
                {"house size (sq. ft.)"}
              </p>
              <div className="filterMin">
                <p>min</p>
                <input
                  type="text"
                  value={minHouseSize}
                  onChange={handleMinHouseSizeChange}
                />
              </div>
              <div className="filterMax">
                <p>max</p>
                <input
                  type="text"
                  value={maxHouseSize}
                  onChange={handleMaxHouseSizeChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="amenitiesSection">
              <p>amenities</p>
              {amenitiesList.map((amenity, index) => (
                <div key={index} className="amenityCheckbox">
                  <input
                    type="checkbox"
                    id={`amenity-${index}`}
                    name="amenity"
                    value={amenity}
                    onChange={handleAmenityChange}
                    checked={amenities.includes(amenity)}
                  />
                  <label htmlFor={`amenity-${index}`}>{amenity}</label>
                </div>
              ))}
            </div>
            <div className="roomsSection">
              <div className="roomField">
                <p>{"bedrooms #"}</p>
                <input
                  type="text"
                  id="bedrooms-filter-input"
                  value={bedrooms}
                  onChange={handleBedroomsChange}
                />
              </div>
              <div className="roomField">
                <p>{"bathrooms #"}</p>
                <input
                  type="text"
                  id="bathrooms-filter-input"
                  value={bathrooms}
                  onChange={handleBathroomsChange}
                />
              </div>
              <div className="roomField">
                <p>{"garages #"}</p>
                <input
                  type="text"
                  id="garages-filter-input"
                  value={garages}
                  onChange={handleGaragesChange}
                />
              </div>
            </div>
            <button className="applyFilterButton" onClick={handleApplyFilter}>
              {"save"}
            </button>
          </div>
        </>
      )}
    </ContainerPublic>
  );
};

export default PublicListings;
