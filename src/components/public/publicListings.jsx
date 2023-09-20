import "../../styles/publIcListings/publicListings.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListingPublic, ListingPublicContainer } from "./styles";
import Logo from "../../assets/img/logomark.svg";
import SearchIconHover from "../../assets/img/SearchIconHover.svg";
import SearchIcon from "../../assets/img/SearchIcon.svg";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import Listing from "./Listing/Listing";
import { Close } from "../icons";

const PublicListings = () => {
  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minLotSize, setMinLotSize] = useState("");
  const [maxLotSize, setMaxLotSize] = useState("");
  const [minHouseSize, setMinHouseSize] = useState("");
  const [maxHouseSize, setMaxHouseSize] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await api.get("/listing?isPublic=true");
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    isFilterOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    // TODO: update amenities list
    setAmenities(["Pool", "Gated", "Pond", "Lorem Ipsum", "Dolor Sit Amet"]);
    fetchListings();
  }, [isFilterOpen]);

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

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleOpenSearch = (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenFilter = (e) => {
    e.preventDefault();
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearch = () => {
    api
      .get(`/listing?isPublic=true&location=${searchInputValue}`)
      .then(({ data: listingsData }) => {
        setListings(listingsData);
      })
      .catch((error) => {
        console.error("Could not update listings");
        alert("Could not update listings");
        throw new Error(error);
      });

    handleCloseSearch();
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(formatPriceInput(value));
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(formatPriceInput(value));
  };

  const formatPriceInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    const formattedValue = `$${numericValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}`;

    return formattedValue.length === 1 ? `` : formattedValue;
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

  const formatNumberInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    return `${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleAmenityChange = (e) => {
    const amenity = e.target.value;
    const isChecked = e.target.checked;

    isChecked
      ? setSelectedAmenities([...selectedAmenities, amenity])
      : setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
  };

  const handleBedroomsChange = (e) => {
    const value = e.target.value;
    setBedrooms(formatNumberInput(value));
  };

  const handleBathroomsChange = (e) => {
    const value = e.target.value;
    setBathrooms(formatNumberInput(value));
  };

  const handleApplyFilter = () => {
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
        amenities: selectedAmenities.join(","),
      }).filter(([_, value]) => value !== "")
    );

    api
      .get("/listing", { params: { isPublic: true, ...filterParams } })
      .then(({ data }) => {
        setListings(data);
      })
      .catch((error) => {
        console.error("Could not update listings");
        alert("Could not update listings");
        throw new Error(error);
      });

    setIsFilterOpen(false);
  };

  return (
    <div className="containerPublic">
      <div className={`position-sticky ${isModalOpen ? "modal-open" : ""}`}>
        <div className={`filtersBar ${isSearchOpen ? "hideFiltersBar" : ""}`}>
          <img
            className="LogoPublic"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <form method="GET" className="container">
            <div
              className={`inputPublic${isInputHovered ? " inputHovered" : ""}`}
            >
              <input
                type="text"
                placeholder="Keyword Or City"
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputLeave}
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
              />
            </div>
            <button className="open-search" onClick={handleOpenSearch} />
            <button className="filter-listings" onClick={handleOpenFilter} />
            <select className="dropdownMenu">
              <option className="opt" value="price">
                &nbsp;&nbsp;Price
              </option>
            </select>
            <select className="dropdownMenu">
              <option className="opt" value="house_size">
                &nbsp;&nbsp;House Size
              </option>
            </select>
            <select className="dropdownMenu">
              <option className="opt" value="lot_size">
                &nbsp;&nbsp;Lot Size
              </option>
            </select>
            <select className="dropdownMenu">
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
        style={{ filter: isSearchOpen ? "blur(5px)" : "none" }}
      >
        {!!listings.length ? (
          <ListingPublic>
            {listings.map((listing) => {
              return (
                <Listing
                  listing={listing}
                  handleImageClick={handleImageClick}
                  key={listing.id}
                />
              );
            })}
          </ListingPublic>
        ) : (
          <p>{"No listing to show"}</p>
        )}
      </ListingPublicContainer>
      {isFilterOpen && (
        <>
          <div className="overlay" />
          <div className="filterContainer">
            <div className="filterHeader">
              <button onClick={handleCloseFilter}>
                <Close />
              </button>
              <text>{"filter listings"}</text>
            </div>
            <div className="filterSection">
              <text className="filterSectionText">{"price"}</text>
              <div className="filterMin">
                <text>min</text>
                <input
                  type="text"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </div>
              <div className="filterMax">
                <text>max</text>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="filterSection">
              <text className="filterSectionText">{"lot size (sq. ft.)"}</text>
              <div className="filterMin">
                <text>min</text>
                <input
                  type="text"
                  value={minLotSize}
                  onChange={handleMinLotSizeChange}
                />
              </div>
              <div className="filterMax">
                <text>max</text>
                <input
                  type="text"
                  value={maxLotSize}
                  onChange={handleMaxLotSizeChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="filterSection">
              <text className="filterSectionText">
                {"house size (sq. ft.)"}
              </text>
              <div className="filterMin">
                <text>min</text>
                <input
                  type="text"
                  value={minHouseSize}
                  onChange={handleMinHouseSizeChange}
                />
              </div>
              <div className="filterMax">
                <text>max</text>
                <input
                  type="text"
                  value={maxHouseSize}
                  onChange={handleMaxHouseSizeChange}
                />
              </div>
            </div>
            <div className="line" />
            <div className="amenitiesSection">
              <text>amenities</text>
              {amenities.map((amenity, index) => (
                <div key={index} className="amenityCheckbox">
                  <input
                    type="checkbox"
                    id={`amenity-${index}`}
                    name="amenity"
                    value={amenity}
                    onChange={handleAmenityChange}
                    checked={selectedAmenities.includes(amenity)}
                  />
                  <label htmlFor={`amenity-${index}`}>{amenity}</label>
                </div>
              ))}
            </div>
            <div className="roomsSection">
              <div className="roomField">
                <text>{"bedrooms #"}</text>
                <input
                  type="text"
                  id="bedrooms-filter-input"
                  value={bedrooms}
                  onChange={handleBedroomsChange}
                />
              </div>
              <div className="roomField">
                <text>{"bathrooms #"}</text>
                <input
                  type="text"
                  id="bathrooms-filter-input"
                  value={bathrooms}
                  onChange={handleBathroomsChange}
                />
              </div>
            </div>

            <button className="applyFilterButton" onClick={handleApplyFilter}>
              {"save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicListings;
