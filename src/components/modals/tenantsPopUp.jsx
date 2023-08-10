import "../../styles/PopUp.css";
import React, { useState, useEffect } from "react";
import closeListing2 from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import Eye from "../../assets/img/Eye.svg";
import Edit from "../../assets/img/EditPopUp.svg";
import EditHover from "../../assets/img/EditPopUpHover.svg";
import SendTemplateIcon from "../../assets/img/SendTemplateIconHover.svg";
import SendTemplateIconHover from "../../assets/img/SendTemplateIconHover.svg";
import testImg from "../../assets/img/testImg.jpg";
import AddDocs from "./addDocumentsModal";
import { api } from "../../services/api";
import jwtDecode from "jwt-decode";

const TenantModal = ({ selectedTenant, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredDocuments, setHoveredDocuments] = useState({});

  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [tenantData, setTenantData] = useState({});

  const [documentsData, setDocumentsData] = useState([]);
  const [activeSection, setActiveSection] = useState("DOCUMENTS");

  const handleHover = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered);
    setActiveSection(sectionName);
  };
  const handleDocumentHover = (documentIndex) => {
    setHoveredDocumentIndex(documentIndex);
  };

  const handleAddDocsClick = () => {
    setIsModalOpen(true);
  };

  const handleSendPandadocClick = async (documentId) => {
    try {
      const createDocument = await api.post(
        "/tenant/1/pandadoc/template/create-document",
        {
          templateUuid: documentId,
          name: `California S. R. L. Agreement - ${adminData.name} and ${tenantData.User.name}`,
          recipients: [
            {
              email: adminData.email,
              first_name: String(adminData.name).split(" ")[0],
              last_name: String(tenantData.name).split(" ")[1] || null,
              role: "ADMIN",
            },
            {
              email: tenantData.User.email,
              first_name: String(tenantData.User.name).split(" ")[0],
              last_name: String(tenantData.User.name).split(" ")[1] || null,
              role: "TENANT",
            },
          ],
          tags: ["rms-api"],
        }
      );

      if (createDocument.status > 201) {
        throw new Error("Could not create document");
      }

      // The document creation process may take some time => https://developers.pandadoc.com/reference/new-document
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const sendDocument = await api.post(
        `/tenant/1/pandadoc/document/${createDocument.data.id}/send`,
        {
          subject: "Listing document sign",
          message: "You were invited to sign the following document:",
          silent: false,
        }
      );

      if (sendDocument.status > 201) {
        throw new Error("Could not create document");
      }
    } catch (error) {
      console.error("Error fetching documents data:", error);
    }
  };

  useEffect(() => {
    async function loadDocuments() {
      try {
        const { data } = await api.get(
          `/tenant/${tenantData.id}/pandadoc/template`
        );
        if (!data || !data.results) {
          throw new Error("Network data was not ok");
        }
        console.log("API Response:", data.results);
        setDocumentsData(data.results);
      } catch (err) {
        console.error("Error fetching documents data:", err);
      }
    }

    async function getTokenFromLocalStorage() {
      try {
        const storedToken = localStorage.getItem("certifymyrent.token");

        if (!storedToken) throw new Error("Could not get token");

        setToken(storedToken);
        setDecodedToken(jwtDecode(storedToken));
      } catch (error) {
        console.error(error);
      }
    }

    async function getAdminData() {
      try {
        const { data } = await api.get(`/user/${decodedToken.sub}`);

        setAdminData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getTenantData() {
      try {
        const { data } = await api.get(`/tenant/${selectedTenant.id}`);
        setTenantData(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDocuments();
    getTokenFromLocalStorage();
    getAdminData();
    getTenantData();
  }, []);

  const renderSectionContent = (section) => {
    switch (section) {
      case "DOCUMENTS":
        function chunkArray(array, chunkSize) {
          const chunks = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
          }
          return chunks;
        }

        const documentChunks = chunkArray(documentsData, 4);

        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start">
            {documentChunks.map((documentSubset, index) => (
              <div
                key={`boxInfoOrderCreate_${index}`}
                className="boxInfoOrderCreate"
              >
                {documentSubset.map((document) => (
                  <div className="boxInfo d-flex" key={document.id}>
                    <div className="boxInfoOrder d-flex">
                      <div className="firstBoxDoc">
                        <p className="ms-3 mt-2 mb-0">{document.name}</p>
                        <span>
                          {new Date(document.dateCreated).toDateString()}
                        </span>
                      </div>
                      <div className="secondBoxDoc d-flex justify-content-end">
                        {hoveredDocuments[document.id] ? (
                          <img
                            src={SendTemplateIconHover}
                            alt="DeleteIconHover"
                            className="imgBtnDocs delBox"
                            onMouseLeave={() =>
                              setHoveredDocuments({
                                ...hoveredDocuments,
                                [document.id]: false,
                              })
                            }
                            onClick={() => handleSendPandadocClick(document.id)}
                          />
                        ) : (
                          <img
                            src={SendTemplateIcon}
                            alt="Delete"
                            className="imgBtnDocs delBox"
                            onMouseEnter={() =>
                              setHoveredDocuments({
                                ...hoveredDocuments,
                                [document.id]: true,
                              })
                            }
                            onClick={() => handleSendPandadocClick(document.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case "PAYMENT HISTORY":
        return <div></div>;
      case "INSPECTION HISTORY":
        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start "></div>
        );
      case "APPLICATION FORM":
        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start "></div>
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
              <span>
                {selectedTenant.User.name} {selectedTenant.last_name}
              </span>
            </div>
            <div className="popUpOrderFirstCol pNo d-flex">
              <p>PHONE NO.</p>
              <span>{selectedTenant.phoneNumber}</span>
            </div>

            <div className="popUpOrderFirstCol emailpopUp d-flex">
              <p>EMAIL</p>
              <span>{selectedTenant.email}</span>
            </div>
            <div className="popUpOrderFirstCol contractDatesPopUp d-flex">
              <p>CONTRACT DATES</p>
              <span>{selectedTenant.contract}</span>
            </div>
          </div>
          <div className="listingInfo d-flex">
            <div className="imgTestPopUp">
              {" "}
              <img className="imgTestPopUpInsert" src={testImg} alt="" />
            </div>
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
          ;{/* Navigable */}
        </div>
      </div>
      {isModalOpen && <AddDocs onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TenantModal;
