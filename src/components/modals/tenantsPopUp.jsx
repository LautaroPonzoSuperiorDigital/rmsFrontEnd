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
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredDocuments, setHoveredDocuments] = useState({});
  const [hoveredDocumentIndex, setHoveredDocumentIndex] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [tenantData, setTenantData] = useState({});

  const [listingData, setListingData] = useState(null);

  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  const [documentsData, setDocumentsData] = useState([]);
  const [activeSection, setActiveSection] = useState("DOCUMENTS");

  const handleHover = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered);
    setActiveSection(sectionName);
  };

  const handleDocumentHover = (documentId, isHovered) => {
    setHoveredDocuments(prevHoveredDocuments => ({
      ...prevHoveredDocuments,
      [documentId]: isHovered
    }));
  };

  function getTokenFromLocalStorage() {
    const v = localStorage.getItem("certifymyrent.token")
    if (!v) throw new Error("Could not get token");
    setToken(v);
    setDecodedToken(jwtDecode(v));
  }

  const handleAddDocsClick = () => {
    setIsModalOpen(true);
  };

  async function getAdminData() {
    console.log(decodedToken)
    await api.get(`/user/${decodedToken.sub}`)
      .then(request => {
        setAdminData(request.data);
        return request.data
      })
      .catch(e => {
        console.error(e)
      });
  }

  async function getTenantData() {
    await api.get(`/tenant/${selectedTenant.id}`)
      .then(response => {
        setTenantData(response.data);
        return response.data
      })
      .catch(e => {
        console.error(e)
      });
  }

  async function handleSendPandadocClick(documentId, isHovered, localAdminData) {
    let responseDocumentId;
    let name_split = String(localAdminData.name).split(" ");
    let f_name = name_split[0];
    let l_name = name_split.slice(1).join(" ");
    let requestCreateData = {
      templateUuid: documentId,
      name: `California S. R. L. Agreement - ${localAdminData.name} and ${tenantData.User.name}`,
      recipients: [
        {
          email: localAdminData.email,
          first_name: f_name,
          last_name: l_name,
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
    };
    if (!requestCreateData.recipients[0].email) {
      console.log(requestCreateData);
      throw new Error("Bad Admin Data.");
    }

    await api
      .post(
        `/tenant/${selectedTenant.id}/pandadoc/template/create-document`,
        requestCreateData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
        responseDocumentId = response.data.id;
      })
      .catch((e) => {
        throw new Error(e);
      });

    // don't delete this timing line, it's for pandadoc API send template
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const requestSendData = {
      subject: "Listing document sign",
      message: "You were invited to sign the following document:",
      silent: false,
    };
    await api
      .post(
        `/tenant/${selectedTenant.id}/pandadoc/document/${responseDocumentId}/send`,
        requestSendData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  async function loadDocuments() {
    try {
      const { data } = await api.get(
        `/tenant/${selectedTenant.id}/pandadoc/template`
      );
      if (!data) {
        throw new Error("Network data was not ok");
      }
      setDocumentsData(data.results);
    } catch (err) {
      alert("Error fetching documents data:", err);
    }
  };

  const fetchListings = async () => {
    try {
      const response = await api.get(`/listing/${selectedTenant.Listings[0].id}`);
      const listingData = response.data;
      console.log("Listing Data:", listingData);
      setListingData(listingData);
    } catch (error) {
      console.error('Error fetching listing data:', error);
    }
  };

  useEffect(() => {
    if (!decodedToken)
      getTokenFromLocalStorage();
    if (decodedToken) {
      getAdminData();
      getTenantData();
      loadDocuments();
      fetchListings();
    }
  }, [decodedToken]);

  const renderSectionContent = (section) => {
    switch (section) {
      case "DOCUMENTS":
        function chunkArray(array, chunkSize) {
          const chunks = [];
          if (array.length < 1) return chunks;
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
                {documentSubset.map((document, documentIndex) => (
                  <div className="boxInfo d-flex" key={document.id}>
                    <div className="boxInfoOrder d-flex">
                      <div className="firstBoxDoc">
                        <p className="ms-3 mt-2 mb-0">{document.name}</p>
                        <span>
                          {new Date(document.dateCreated).toDateString()}
                        </span>
                      </div>
                      <div className="secondBoxDoc d-flex justify-content-end">
                        {hoveredDocumentIndex === documentIndex ? (
                          <img
                            src={SendTemplateIconHover}
                            alt="SendTemplateIconHover"
                            className="imgBtnDocs delBox"
                            onMouseLeave={() => handleDocumentHover(null)}
                            onClick={() => handleSendPandadocClick(document.id, false, adminData)}
                          />
                        ) : (
                          <img
                            src={SendTemplateIcon}
                            alt="SendTemplateIcon"
                            className="imgBtnDocs delBox"
                            onMouseEnter={() => handleDocumentHover(documentIndex)}
                            onClick={() => handleSendPandadocClick(document.id, true, adminData)}
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
                {selectedTenant.User.name}
              </span>
            </div>
            <div className="popUpOrderFirstCol pNo d-flex">
              <p>PHONE NO.</p>
              <span>{selectedTenant.phoneNumber}</span>
            </div>

            <div className="popUpOrderFirstCol emailpopUp d-flex">
              <p>EMAIL</p>
              <span>{selectedTenant.User.email}</span>
            </div>
            <div className="popUpOrderFirstCol contractDatesPopUp d-flex">
              <p>CONTRACT DATES</p>
              <span>{selectedTenant.contract}</span>
            </div>
          </div>
          <div className="listingInfo d-flex">
            <div className="imgTestPopUp">
              {" "}

              <img className="imgTestPopUpInsert" src={`https://rms-staging.s3.us-west-1.amazonaws.com/${listingData?.key}`} alt="" />

            </div>
            <div className="listingInfoOrder d-flex flex-column">
              <div className="popUpOrderListings">
                <div className="popUpOrderFirstCol idPopUp d-flex">
                  <p>ID</p>
                  {selectedTenant.Listings.length > 0 && (
                    <span>
                      {String(selectedTenant.Listings[0].id).padStart(6, '0')}
                    </span>)}
                </div>
                <div className="popUpOrderFirstCol locationPopUp d-flex">
                  <p>LOCATION</p>
                  <span>{listingData && listingData.location}</span>
                </div>
                <div className="popUpOrderFirstCol lotSizePopUp d-flex">
                  <p>LOT SIZE</p>
                  <span>{listingData && listingData.lotSize} Sq. Ft. Per County</span>
                </div>
                <div className="popUpOrderFirstCol hsPopUp d-flex">
                  <p>HOUSE SIZE</p>
                  <span>{listingData && listingData.houseSize} Sq. Ft. Per County</span>
                </div>
                <div className="popUpOrderFirstCol pricePopUp d-flex">
                  <p>PRICE</p>
                  <span>$ {listingData && listingData.price} / Mo</span>
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
          </div>
          <div className="renderPopUpSection">
            {renderSectionContent(activeSection)}
          </div>
          ;{/* Navigable */}
        </div>
      </div>
    </div>
  );
};

export default TenantModal;
