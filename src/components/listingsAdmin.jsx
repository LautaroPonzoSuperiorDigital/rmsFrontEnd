import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import CheckBoxLog from "./checkBox";
import SearchListings from "./searchListings";
import testImg from "../assets/img/testImg.jpg";
import CheckMarkListing from "../assets/img/checkMark.svg";
import "../styles/tenants.css";
import { EditButton, DeleteButton } from "./buttonListings";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/delete.svg";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";
import Pagination from "./paginations";
import AddListings from "./addListing";
import EditModalListings from "./modals/modalListing";

const ListingsAdmin = () => {
  const [listing, setListing] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyPublicListings, setShowOnlyPublicListings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchId(searchValue);

    if (searchValue === "") {
      setSearchResults([]);
      return;
    }

    const filteredListings = listing.filter((listing) => {
      const paddedId = listing.id.toString().padStart(6, "0");
      return (
        paddedId === searchValue ||
        listing.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setSearchResults(filteredListings);
  };
  const handleAddListing = () => {
    const newItem = {
      id: totalListings + 1,
    };

    setListing((prevListing) => [...prevListing, newItem]);
    setCurrentId((prevId) => prevId + 1);

    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const PAGE_SIZE = 10;
  const totalListings = listing.length;
  const totalPages = Math.ceil(totalListings / PAGE_SIZE);

  const listingsPerPage = listing.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };
  const handleEdit = (index) => {
    console.log("Edit listing:", index);
  };

  useEffect(() => {
    axios
    .get(`https://api.certifymyrent.com/listing`)
      .then((response) => {
        const modifiedListings = response.data.map((item) => {
          const encodedKey = item.key.replace(/\\/g, "%5C");
          const imageUrl = `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`;
          return {
            ...item,
            key: imageUrl,
          };
        });
        setListing(modifiedListings);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  const deleteListing = (listingId) => {
    const updatedListing = listing.filter(
      (listing) => listing.id !== listingId
    );
    setListing(updatedListing);
    

    setListing(updatedListing);
    axios
      .delete(`https://api.certifymyrent.com/listing/${listingId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete listing");
        }
        return response.data;
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckBoxChange = () => {
    setShowOnlyPublicListings(!showOnlyPublicListings);
  };

  const filteredListings = showOnlyPublicListings
    ? listing.filter((listing) => listing.isPublic)
    : listing;

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="d-flex w-100 mb-3">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">Listings</h2>
              <div className="form-check ms-3 mb-1">
                <label className="d-flex align-items-center mb-0">
                  <CheckBoxLog
                    checked={showOnlyPublicListings}
                    onChange={handleCheckBoxChange}
                  />
                  <p className="m-2 mb-0 publicShow">
                    Show only public listings{" "}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="container-fluid ListingContainer d-flex justify-content-end bttonContainer">
            <SearchListings onSearch={handleSearch} />
            <AddListings onClick={handleAddListing} />
          </div>
        </div>
        <div className="container-fluid">
          <div className="ListingContainer">
            <div className="listingsContainer">
              <table className="table table-responsive-lg">
                <thead>
                  <tr>
                    <td>
                      <p className="ID td p1">ID</p>
                    </td>
                    <td>
                      <p className="location td p1">LOCATION</p>
                    </td>
                    <td>
                      <p className="lotSize td p1">LOT SIZE</p>
                    </td>
                    <td>
                      <p className="houseSize td p1">HOUSE SIZE</p>
                    </td>
                    <td>
                      <p className="price td p1">PRICE</p>
                    </td>
                    <td></td>
                    <td>
                      <p className="public td p1">PUBLIC</p>
                    </td>
                    <td>
                      <p className="actions td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(searchId !== "" ? searchResults : filteredListings).map(
                    (listing, index) => (
                      <tr key={listing.id} className="tr-hover">
                        <td className="imgId">
                          <p className="alignText d-flex align-items-center h p1">
                            <img
                              className="testImg"
                              src={listing.key}
                              alt="Imagen de Amazon S3"
                            />
                            {listing.id.toString().padStart(6, "0")}
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.location}
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.lotSize
                              ? listing.lotSize.toLocaleString("EN", {
                                  maximumFractionDigits: 0,
                                })
                              : ""}
                            &nbsp;Sq. Ft. Per County
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.houseSize
                              ? listing.houseSize.toLocaleString("EN", {
                                  maximumFractionDigits: 0,
                                })
                              : ""}
                            &nbsp;Sq. Ft. Per County
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            $&nbsp;
                            {listing.price
                              ? parseFloat(listing.price).toLocaleString("en", {
                                  useGrouping: true,
                                })
                              : ""}
                            &nbsp; / mo
                          </p>
                        </td>
                        <td className="h p1 td td2"></td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.isPublic && (
                              <img
                                className="checkMarkListing"
                                src={CheckMarkListing}
                                alt="CheckMark"
                              />
                            )}
                          </p>
                        </td>
                        <td>
                          <EditButton
                            defaultImage={<img src={Edit} alt="Edit" />}
                            hoverImage={<img src={EditHover} alt="EditHover" />}
                            onClick={() => handleEdit(index)}
                          />
                          <DeleteButton
                            className="delete"
                            defaultImage={<img src={Delete} alt="Delete" />}
                            hoverImage={
                              <img
                                src={DeleteIconHover}
                                alt="DeleteIconHover"
                              />
                            }
                            onClick={() => deleteListing(listing.id)}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditModalListings onClose={handleModalClose}></EditModalListings>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={totalListings}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ListingsAdmin;
