import React, { useState } from "react";
import "../styles/modal.css";
import Close from "../assets/img/close.svg";
import CloseHover from "../assets/img/closeHover.svg";
import { api } from "../services/api";

const EditModal = ({ onSave, onClose, tenant }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [name, setName] = useState(tenant && tenant.User && tenant.User.name ? tenant.User.name : "");
  const [email, setEmail] = useState(tenant && tenant.User && tenant.User.email ? tenant.User.email : "");
  const [phone, setPhone] = useState(tenant && tenant.phoneNumber ? tenant.phoneNumber : "");

  const handleMouseEnterClose = () => {
    setIsCloseHovered(true);
  };

  const handleMouseLeaveClose = () => {
    setIsCloseHovered(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedTenant = {
      ...tenant,
      User: {
        ...tenant.User,
        name: name,
        email: email,
      },
      phoneNumber: phone,
    };
    onSave(updatedTenant);
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSave = () => {
    const updatedData = {
      name: name,
      email: email,
      phoneNumber: phone,
    };

    api
      .patch(`tenant/${tenant.id}`, updatedData)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update tenant data");
        }

        console.log("API response:", response);
        
        const updatedTenant = {
          ...tenant,
          User: {
            ...tenant.User,
            name: name,
            email: email,
          },
        };

        onSave(updatedTenant);
      })
      .catch(error => {
        console.error("Error updating tenant data:", error);
        console.error("Error response data:", error.response.data);
      });
  };

  return (
    <div className="modalWrapper">
      <div className="modalContent">
        <form
          className="editForm d-flex flex-column align-items-center"
          onSubmit={handleFormSubmit}
        >
          <img
            src={isCloseHovered ? CloseHover : Close}
            alt="Close"
            className="close"
            onClick={handleCloseClick}
            onMouseEnter={handleMouseEnterClose}
            onMouseLeave={handleMouseLeaveClose}
          />
          <h2 className="tenant">Edit Tenant</h2>
          <input
            type="text"
            className="modalForm mt-5"
            id="name"
            placeholder={`LEGAL NAME                                                    ${tenant.User.name}`}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="modalForm"
            id="email"
            placeholder={`EMAIL                                                   ${tenant.User.email}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="modalForm"
            id="phone"
            placeholder={`PHONE                                                            ${tenant.phoneNumber}`}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="buttonContainer">
            <button
              type="button"
              onClick={handleCancelClick}
              className="modalButton cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modalButton save"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
