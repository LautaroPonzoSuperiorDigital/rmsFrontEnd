import { useState, useEffect, useMemo } from "react"

import CheckMarkListing from "../../../assets/img/checkMark.svg"
import Edit from "../../../assets/img/Edit.svg"
import EditHover from "../../../assets/img/EditHover.svg"
import Delete from "../../../assets/img/delete.svg"
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg"

import { api } from "../../../services/api"

import Nav from "../../../components/nav"
import CheckBoxLog from "../../../components/checkBox"
import SearchListings from "../../../components/searchListings"
import { EditButton, DeleteButton } from "../../../components/buttonListings"
import Pagination from "../../../components/paginations"
import AddListings from "../../../components/addListing"
import EditModalListings from "../../../components/modals/modalListing"

const PAGE_SIZE = 10

export default function AdminListings() {
  const [listings, setListings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showOnlyPublicListings, setShowOnlyPublicListings] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchId, setSearchId] = useState("")
  const [searchResults, setSearchResults] = useState([])
  
  const totalListings = listings.length
  const totalPages = Math.ceil(totalListings / PAGE_SIZE)

  const filteredListings = useMemo(() => {
    if (searchId) {
      return searchResults
    }

    if (showOnlyPublicListings) {
      return listings.filter(listing => listing.isPublic)
    }

    return listings
  }, [searchId, searchResults, listings, showOnlyPublicListings])

  const handleSearch = (searchValue) => {
    setSearchId(searchValue)

    if (searchValue === "") {
      setSearchResults([])
      return
    }

    const filteredListings = listings.filter((listing) => {
      const paddedId = listing.id.toString().padStart(6, "0")
      return (
        paddedId === searchValue ||
        listing.location.toLowerCase().includes(searchValue.toLowerCase())
      )
    })

    setSearchResults(filteredListings)
  }

  const handleAddListing = () => {
    setShowCreateModal(true)
  }

  const handleModalClose = () => {
    setShowCreateModal(false)
  }
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleDeleteListing = async (listingId) => {
    const shouldRemove = confirm('Are you sure you want to remove this listing? This action cannot be undone.')
    
    if (!shouldRemove) {
      return
    }

    try {
      await api.delete(`/listing/${listingId}`)

      const updatedListing = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListing)
    }catch(err) {
      alert('Failed to delete listing')
    }
  }

  const handleCheckBoxChange = () => {
    setShowOnlyPublicListings(!showOnlyPublicListings)
  }

  useEffect(() => {
    async function loadListings() {
      try {
        const { data } = await api.get('/listing')

        setListings(data.map(listing => {
          if (!listing.key) {
            return listing
          }

          const encodedKey = listing.key.replace(/\\/g, "%5C")

          return {
            ...listing,
            key: `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`
          }
        }))
      } catch (err) {
        alert('Error loading listings: ', err)
      }
    }

    loadListings()
  }, [])

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
                  {filteredListings.map((listing) => (
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
                          &nbspSq. Ft. Per County
                        </p>
                      </td>
                      <td className="h p1 td td2">
                        <p className="alignText d-flex align-items-center">
                          {listing.houseSize
                            ? listing.houseSize.toLocaleString("EN", {
                                maximumFractionDigits: 0,
                              })
                            : ""}
                          &nbspSq. Ft. Per County
                        </p>
                      </td>
                      <td className="h p1 td td2">
                        <p className="alignText d-flex align-items-center">
                          $&nbsp
                          {listing.price
                            ? parseFloat(listing.price).toLocaleString("en", {
                                useGrouping: true,
                              })
                            : ""}
                          &nbsp / mo
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
                        />
                        <DeleteButton
                          className="delete"
                          onClick={() => handleDeleteListing(listing.id)}
                          defaultImage={<img src={Delete} alt="Delete" />}
                          hoverImage={<img src={DeleteIconHover} alt="DeleteIconHover" />}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showCreateModal && (
        <EditModalListings onClose={handleModalClose}></EditModalListings>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={totalListings}
        onPageChange={handlePageChange}
      />
    </>
  )
}
