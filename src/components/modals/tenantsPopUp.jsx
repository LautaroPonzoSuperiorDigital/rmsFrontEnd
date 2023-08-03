import "../../styles/PopUp.css";
import React, { useState, useEffect } from "react";
import closeListing2 from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import Eye from "../../assets/img/Eye.svg";
import Edit from "../../assets/img/EditPopUp.svg";
import EditHover from "../../assets/img/EditPopUpHover.svg";
import Delete from "../../assets/img/deletePopUp.svg";
import DeleteIconHover from "../../assets/img/deletePopUpHover.svg";
import AddDocs from "./addDocumentsModal";

const TenantModal = ({ tenant, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [activeSection, setActiveSection] = useState("DOCUMENTS");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHover = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered);
    setActiveSection(sectionName);
  };

  const handleAddDocsClick = () => {
    setIsModalOpen(true);
  };
  const renderSectionContent = (section) => {
    switch (section) {
      case "DOCUMENTS":
        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start ">
            <div className="boxInfo d-flex">
              <div className="boxInfoOrder">
                <p>Contract</p>
              </div>
            </div>
            <div className="boxInfo"></div>
            <div className="boxInfo"></div>
          </div>
        );
      case "PAYMENT HISTORY":
        return (
          <div>
            {/* Add your content for the "PAYMENT HISTORY" section here */}
          </div>
        );
      case "INSPECTION HISTORY":
        return (
          <div>
            {/* Add your content for the "INSPECTION HISTORY" section here */}
          </div>
        );
      case "APPLICATION FORM":
        return (
          <div>
            {/* Add your content for the "APPLICATION FORM" section here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="popUpContainer">
      <div className="popUp d-flex flex-column">
        <div className="onClose d-flex align-items-center justify-content-end mt-2">
          {!isHovered ? (
            <img
              className="closePopUp"
              src={closeListing2}
              onMouseEnter={() => setIsHovered(true)}
            />
          ) : (
            <img
              className="closePopUp"
              src={closeHover}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onClose}
            />
          )}
        </div>
        <div className="orderGlobalPopUp d-flex">
          <div className="tenantInfo d-flex flex-column">
            <div className="popUpOrderFirstCol FullLName d-flex">
              <p>FULL LEGAL NAME</p>
              <span>Maria Kramer</span>
            </div>
            <div className="popUpOrderFirstCol DriverLicense d-flex">
              <p>DRIVER LICENSE # / STATE</p>
              <span>A0002144, CA</span>
            </div>
            <div className="popUpOrderFirstCol BirthDay d-flex">
              <p>BIRTH DATE</p>
              <span>11/10/1986</span>
            </div>
            <div className="popUpOrderFirstCol pNo d-flex">
              <p>PHONE NO.</p>
              <span>530-521-7450</span>
            </div>
            <div className="popUpOrderFirstCol SSImg d-flex">
              <p>SOCIAL SECURITY</p>
              <span>
                *** <img src={Eye} alt="Eye" className="eyeIconPopUp" />
                <div className="buttonContainer"></div>
              </span>
            </div>
            <div className="popUpOrderFirstCol emailpopUp d-flex">
              <p>EMAIL</p>
              <span>mariakramer@gmail.com</span>
            </div>
            <div className="popUpOrderFirstCol contractDatesPopUp d-flex">
              <p>CONTRACT DATES</p>
              <span>Mar 12, 2022 - Mar 12, 2023</span>
            </div>
          </div>
          <div className="listingInfo d-flex">
            <div className="imgTestPopUp"></div>
            <div className="listingInfoOrder d-flex flex-column">
              <div className="popUpOrderListings">
                <div className="popUpOrderFirstCol idPopUp d-flex">
                  <p>ID</p>
                  <span>364675</span>
                </div>
                <div className="popUpOrderFirstCol locationPopUp d-flex">
                  <p>LOCATION</p>
                  <span>8148 Larga Ave, 67884, Atascadero, California</span>
                </div>
                <div className="popUpOrderFirstCol lotSizePopUp d-flex">
                  <p>LOT SIZE</p>
                  <span>13,545 Sq. Ft. Per County</span>
                </div>
                <div className="popUpOrderFirstCol hsPopUp d-flex">
                  <p>HOUSE SIZE</p>
                  <span>4,354 Sq. Ft. Per County</span>
                </div>
                <div className="popUpOrderFirstCol pricePopUp d-flex">
                  <p>PRICE</p>
                  <span>$ 4,000 / Mo</span>
                </div>
                <div className="popUpOrderFirstCol totalProf d-flex">
                  <div className="d-flex profit justify-content-start">
                    <p>TOTAL PROFIT</p>
                    <span>$ 364,675</span>
                  </div>
                  <div className="d-flex profit justify-content-end">
                    <p>TOTAL LOSS</p>
                    <span>$ 54,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="EditDeletebuttons d-flex flex-column align-items-end">
              <div className="EditButtonPopUpOrder d-flex">
                {isHoveredEdit ? (
                  <img
                    src={EditHover}
                    alt="Edit"
                    onMouseLeave={() => setIsHoveredEdit(false)}
                  />
                ) : (
                  <img
                    src={Edit}
                    alt="EditHover"
                    onMouseEnter={() => setIsHoveredEdit(true)}
                  />
                )}
                <span
                  onMouseLeave={() => setIsHoveredEdit(false)}
                  onMouseEnter={() => setIsHoveredEdit(true)}
                >
                  Edit Tenant
                </span>
              </div>
              <div className="DeleteButtonPopUpOrder d-flex">
                {isHoveredDelete ? (
                  <img
                    src={DeleteIconHover}
                    alt="DeleteIconHover"
                    className="DeleteButtonPopUp"
                    onMouseLeave={() => setIsHoveredDelete(false)}
                  />
                ) : (
                  <img
                    src={Delete}
                    alt="Delete"
                    className="DeleteButtonPopUp"
                    onMouseEnter={() => setIsHoveredDelete(true)}
                  />
                )}
                <span
                  onMouseLeave={() => setIsHoveredDelete(false)}
                  onMouseEnter={() => setIsHoveredDelete(true)}
                >
                  Delete Tenant
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Navegable */}

        <div className="navOrderPopUp">
          <div className="navOrderPopUpNav d-flex">
            <div className="navegableSect d-flex">
              <div
                onClick={() => handleHover(true, setActiveSection, "DOCUMENTS")}
              >
                <p> Documents</p>
              </div>
              <div
                onClick={() =>
                  handleHover(true, setActiveSection, "PAYMENT HISTORY")
                }
              >
                <p> Payment History</p>
              </div>
              <div
                onClick={() =>
                  handleHover(true, setActiveSection, "INSPECTION HISTORY")
                }
              >
                <p> Inspection History</p>
              </div>
              <div
                onClick={() =>
                  handleHover(true, setActiveSection, "APPLICATION FORM")
                }
              >
                <p>Application Form</p>
              </div>
            </div>
            <div className="docFile d-flex align-items-start justify-content-end">
              <button className="addDocBtnPopUp" onClick={handleAddDocsClick}>
                + Add Document
              </button>
            </div>
          </div>
          <div className="renderPopUpSection">
            {renderSectionContent(activeSection)}
          </div>
          ;{/* Navegable */}
        </div>
      </div>
      {isModalOpen && <AddDocs onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TenantModal;