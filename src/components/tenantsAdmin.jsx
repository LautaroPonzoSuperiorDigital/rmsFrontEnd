// import React from "react";
import Nav from "./nav";
import { useState, useEffect } from "react";
import "../styles/tenants.css";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/delete.svg";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";
import CheckMark from "../assets/img/checkMark.svg";
import { EditButton, DeleteButton } from "./Buttons";
import EditModal from "./modals";
import CheckBoxLog from "./checkBox";
import Search from "./search";
import Pagination from "./paginations";
import "../styles/modal.css";
import TenantModal from "./modals/tenantsPopUp";
import { api } from "../services/api";
// import { useAuth } from "../hooks/useAuth";
import Footer from "./public/Footer";

const TenantsAdmin = () => {
  // const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTenant, setEditTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [showMissedPayment, setShowMissedPayment] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [editedTenant, setEditedTenant] = useState(null);
  // const [selectedListingId, setSelectedListingId] = useState(null);

  const PAGE_SIZE = 10;
  const totalTenants = tenants.length;
  const totalPages = Math.ceil(totalTenants / PAGE_SIZE);

  const filteredTenants = showMissedPayment
    ? tenants.filter(
        (tenant) =>
          tenant.approvalStatus &&
          tenant.approvalStatus.includes("Missed Payment")
      )
    : tenants;

  const countMissedPaymentTenants = () =>
    tenants.filter(
      (tenant) =>
        tenant.approvalStatus &&
        tenant.approvalStatus.includes("Missed Payment")
    ).length;

  const tenantsPerPage = filteredTenants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  /* popUp */
  const handleCellClick = (tenant, field, event) => {
    if (!event.currentTarget.classList.contains("buttonsNoMod")) {
      setSelectedTenant(tenant);
      setSelectedField(field);
    }
  };
  /* popUp */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteTenant = (tenantId) => {
    const updatedTenants = tenants.filter((tenant) => tenant.id !== tenantId);
    setTenants(updatedTenants);
    api
      .delete(`/tenant/${tenantId}`)
      .then((response) => {
        console.log("Tenant deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting tenant:", error);
        setTenants(tenants);
      });
  };

  const handleCheckBoxChange = (value) => {
    setShowMissedPayment(value);
  };

  const handleSearch = (searchResults) => {
    setTenants(searchResults);
  };

  const handleEditClick = (tenant) => {
    setEditedTenant(tenant);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setEditTenant(null);
  };

  const handleSaveModal = (updatedTenant) => {
    const updatedTenants = tenants.map((tenant) =>
      tenant.id === updatedTenant.id ? updatedTenant : tenant
    );
    setTenants(updatedTenants);
    setIsEditOpen(false);
    setEditedTenant(null);
  };

  useEffect(() => {
    api.get(`/listing`).then(({ data: listings }) => {
      listings.map((listing, index) => {
        console.log(listing, index);
        api.get(`/listing/${listing.id}/current-tenant`).then(({ data }) => {
          const tenantObj = {
            ...data["Tenant"],
            listingId: listing.id,
          };

          setTenants((prevTenants) => [...prevTenants, tenantObj]);
        });
      });
    });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Nav />
      <div className="container-fluid p-0">
        {selectedTenant && (
          <TenantModal
            isOpen={true}
            onClose={() => setSelectedTenant(null)}
            selectedTenant={selectedTenant}
            selectedField={selectedField}
          />
        )}
        <div className="d-flex w-100">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">tenants</h2>
              <div className="form-check ms-3 mb-1">
                <label className="d-flex align-items-center mb-0">
                  <CheckBoxLog
                    checked={showMissedPayment}
                    onChange={handleCheckBoxChange}
                  />
                  <p className="m-2 mb-0 tenantShow">
                    Show only tenants with missed payment{" "}
                    <span className="filterMissedPayment">
                      {showMissedPayment ? countMissedPaymentTenants() : 0}
                    </span>
                  </p>
                </label>
              </div>
            </div>
          </div>
          <Search onSearch={handleSearch} tenants={tenants} />
        </div>
        <div className="container-fluid d-flex justify-content-start p-0">
          <div className="row container-fluid">
            <div className="col table-container">
              <table className="table mt-4 w-100">
                <thead>
                  <tr>
                    <td>
                      <p
                        className="lead name td p1"
                        style={{ margin: 0, padding: 0 }}
                      >
                        NAME
                      </p>
                    </td>
                    <td>
                      <p className="lead listings1 td p1">LISTINGS</p>
                    </td>
                    <td>
                      <p className="lead status td p1">PAYMENT STATUS</p>
                    </td>
                    <td>
                      <p className="lead  td p1">EMAIL</p>
                    </td>
                    <td>
                      <p className="lead  td p1">PHONE</p>
                    </td>
                    <td>
                      <p className="leadtd p1">CONTRACT DATES</p>
                    </td>
                    <td>
                      <p className="lead td p1">BACKGROUND CHECK</p>
                    </td>
                    <td>
                      <p className="lead  td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {tenantsPerPage
                    .filter((tenant) => tenant.approvalStatus === "APPROVED")
                    .map((tenant) => {
                      if (
                        showMissedPayment &&
                        !tenant.approvalStatus.includes("Missed Payment")
                      ) {
                        return null;
                      }
                      return (
                        <tr key={`tenant-${tenant.id}`} className="tr-hover">
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "name", event)
                            }
                            className="p-0"
                            style={{ width: "150px !important", margin: 0 }}
                          >
                            <p className=" h">{tenant.User.name}</p>
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "listings", event)
                            }
                          >
                            {
                              <p className="p1 h">
                                {String(tenant.listingId).padStart(6, "0")}
                              </p>
                            }
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "status", event)
                            }
                          >
                            <p
                              className={`p1 h ${
                                tenant &&
                                tenant.approvalStatus &&
                                tenant.approvalStatus.includes("Missed Payment")
                                  ? "missed"
                                  : ""
                              }`}
                            >
                              {tenant && tenant.approvalStatus}
                            </p>
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "status", event)
                            }
                          >
                            <p className="p1 h">{tenant.User.email}</p>
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "status", event)
                            }
                          >
                            <p className="p1 h">{tenant.phoneNumber}</p>
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "status", event)
                            }
                          >
                            <p className="p1 h">{tenant.contract}</p>
                          </td>
                          <td
                            onClick={(event) =>
                              handleCellClick(tenant, "status", event)
                            }
                          >
                            {tenant.backgroundCheck === "check" ? (
                              <img
                                className="checkMark"
                                src={CheckMark}
                                alt="CheckMark"
                              />
                            ) : null}
                          </td>
                          <td className="buttonsNoMod">
                            <EditButton
                              defaultImage={<img src={Edit} alt="Edit" />}
                              hoverImage={
                                <img src={EditHover} alt="EditHover" />
                              }
                              onClick={() => handleEditClick(tenant)}
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
                              onClick={() => handleDeleteTenant(tenant.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {isEditOpen && (
        <EditModal
          tenant={editedTenant}
          onSave={handleSaveModal}
          onClose={handleCloseEditModal}
        />
      )}
      {!isEditOpen && !selectedTenant && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalEntries={totalTenants}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TenantsAdmin;
