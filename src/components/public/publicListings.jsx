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
  const [inputValue, setInputValue] = useState("");
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
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    api
      .get(`/listing?isPublic=true&location=${inputValue}`)
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
            {inputValue.length ? (
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
        </div>
      )}
    </div>
  );
};

export default PublicListings;
