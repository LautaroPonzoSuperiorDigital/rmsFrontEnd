/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchIcon from "../assets/img/SearchIcon.svg";
import SearchIconHover from "../assets/img/SearchIconHover.svg";
import "../styles/tenants.css";

function SearchListings({ applicants, setTableApplicants }) {
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase();
    setSearchValue(searchQuery);

    const filteredApplicants = applicants.filter(
      (applicant) =>
        applicant.User.email.toLowerCase().includes(searchQuery) ||
        applicant.User.name.toLowerCase().includes(searchQuery)
    );
    setTableApplicants(filteredApplicants);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="search-container searchListings d-flex align-items-center justify-content-end mt-4">
      <input
        type="text"
        className="form-control form-control-sm search-input search"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <button
        className="buttonListings custom-button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="SearchIconListings1"
          src={isHovered ? SearchIconHover : SearchIcon}
          alt="SearchIcon"
        />
      </button>
    </div>
  );
}

export default SearchListings;
