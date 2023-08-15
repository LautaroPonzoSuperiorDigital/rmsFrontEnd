import React from "react";
import Nav from "./nav";
import { useState, useEffect } from "react";
import "../styles/tenants.css";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/delete.svg";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";
import CheckMark from "../assets/img/checkMark.svg";
import tenantsData from "./tenantsData";
import { EditButton, DeleteButton } from "./Buttons";
import EditModal from "./modals";
import CheckBoxLog from "./checkBox";
import Search from "./search";
import Pagination from "./paginations";
import "../styles/modal.css";
import TenantModal from "./modals/tenantsPopUp";
import { api } from "../services/api";

const TenantsAdmin = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTenant, setEditTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [showMissedPayment, setShowMissedPayment] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const PAGE_SIZE = 10;
  const totalTenants = tenants.length;
  const totalPages = Math.ceil(totalTenants / PAGE_SIZE);

  const filteredTenants = showMissedPayment
    ? tenants.filter((tenant) => tenant.status.includes("Missed Payment"))
    : tenants;

  const countMissedPaymentTenants = () =>
    tenants.filter((tenant) => tenant.status.includes("Missed Payment")).length;

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
    const updatedTenants = tenants.filter(tenant => tenant.id !== tenantId);
    setTenants(updatedTenants);
    api.delete(`/tenant/${tenantId}`)
      .then(response => {
        console.log('Tenant deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting tenant:', error);
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
    console.log("Editing Tenant:", tenant);
    setEditTenant(tenant);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setEditTenant(null);
  };

  const handleSave = (updatedTenant) => {
    setTenants((prevTenants) => {
      const updatedTenants = prevTenants.map((tenant) => {
        if (tenant.listings === updatedTenant.listings) {
          return updatedTenant;
        }
        return tenant;
      });
      return updatedTenants;
    });
    setIsEditOpen(false);
    setEditTenant(null);
  };

  const handleSaveModal = (updatedTenant) => {
    const updatedTenants = tenants.map((tenant) => {
      if (tenant.listings === updatedTenant.listings) {
        return updatedTenant;
      }
      return tenant;
    });
    setTenants(updatedTenants);
    handleSaveTenant(updatedTenant);
  };

  useEffect(() => {
    api.get('/tenant')
      .then(response => {
        console.log('Fetched tenant data:', response.data);
        setTenants(response.data);
      })
      .catch(error => {
        console.error('Error fetching tenant data:', error);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="container-fluid">
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
                      {" "}
                      {showMissedPayment ? countMissedPaymentTenants() : 0}
                    </span>
                  </p>
                </label>
              </div>
            </div>
          </div>
          <Search onSearch={handleSearch} tenants={tenants} />
        </div>
        <div className="container-fluid d-flex justify-content-start">
          <div className="row container-fluid">
            <div className="col table-container">
              <table className="table mt-4 w-100">
                <thead>
                  <tr>
                    <td>
                      <p className="lead name td p1">NAME</p>
                    </td>
                    <td>
                      <p className="lead listings1 td p1">LISTINGS</p>
                    </td>
                    <td>
                      <p className="lead status td p1">PAYMENT STATUS</p>
                    </td>
                    <td>
                      <p className="lead email td p1">EMAIL</p>
                    </td>
                    <td>
                      <p className="lead phone td p1">PHONE</p>
                    </td>
                    <td>
                      <p className="lead contract td p1">CONTRACT DATES</p>
                    </td>
                    <td>
                      <p className="lead bgcheck td p1">BACKGROUND CHECK</p>
                    </td>
                    <td>
                      <p className="lead actions td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {tenantsPerPage.map((tenant) => {
                    if (
                      showMissedPayment &&
                      !tenant.status.includes("Missed Payment")
                    ) {
                      return null;
                    }
                    return (
                      <tr key={tenant.id} className="tr-hover">
                        <td
                          onClick={(event) =>
                            handleCellClick(tenant, "name", event)
                          }
                        >
                          <p className="p1 h">{tenant.User.name}</p>
                        </td>
                        <td
                          onClick={(event) =>
                            handleCellClick(tenant, "listings", event)
                          }
                        >
                          <p className="p1 h">{tenant.listings}</p>
                        </td>
                        <td
                          onClick={(event) =>
                            handleCellClick(tenant, "status", event)
                          }
                        >
                          <p
                            className={`p1 h ${tenant && tenant.status && tenant.status.includes("Missed Payment")
                              ? "missed"
                              : ""
                              }`}
                          >
                            {tenant && tenant.status}
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
                            hoverImage={<img src={EditHover} alt="EditHover" />}
                            onClick={() => handleEditClick(tenant)}
                          />
                          <DeleteButton
                            className="delete"
                            defaultImage={<img src={Delete} alt="Delete" />}
                            hoverImage={<img src={DeleteIconHover} alt="DeleteIconHover" />}
                            onClick={() => handleDeleteTenant(tenant.id)} // Pass the tenant's ID
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
      {isEditOpen && (
        <EditModal
          tenant={editTenant}
          onSave={handleSave}
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
    </>
  );
};

export default TenantsAdmin;
