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
  const [listing, setListing] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSearch = (e) => {
    e.preventDefault(); // prevent submmit behavior
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenFilter = (e) => {
    e.preventDefault(); // prevent submmit behavior
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
        setListing(listingsData);
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

    return (formattedValue.length === 1) ? `` : formattedValue;
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
        <ListingPublic>
          {listing.map((listing) => {
            if (listing.isPublic) {
              return (
                <Listing
                  listing={listing}
                  handleImageClick={handleImageClick}
                  key={listing.id}
                />
              );
            }
            return null;
          })}
        </ListingPublic>
      </ListingPublicContainer>
      {isFilterOpen && (
        <div className="filterContainer">
          <div className="filterHeader">
            <button onClick={handleCloseFilter}>
              <Close />
            </button>
            <text>{"filter listings"}</text>
          </div>
          <div className="priceFilter">
            <text className="priceFilterText">{"price"}</text>
            <div className="priceFilterMin">
              <text>min</text>
              <input
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="priceFilterMax">
              <text>max</text>
              <input
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
          <div className="line" />
        </div>
      )}
    </div>
  );
};

export default PublicListings;
