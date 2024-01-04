/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-case-declarations */
import "../../styles/PopUp.css";
import { useState, useEffect } from "react";
import closeListing2 from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import SendTemplateIcon from "../../assets/img/SendTemplateIconHover.svg";
import SendTemplateIconHover from "../../assets/img/SendTemplateIconHover.svg";
import AddDocs from "./addDocumentsModal";
import { api } from "../../services/api";
import jwtDecode from "jwt-decode";
import { ListingInspectionHistoryCard } from "../listing-inspection-history/styles";
import { formatDate } from "../../services/date";
import { DateTime } from "luxon";
import { createListingImage } from "../../services/listing";
import {
  ApplicationContainer,
  BoxDocuments,
  DateTextDocuments,
  ModalContainer,
  ModalOverlayTenant,
  TitleDocuments,
} from "./style";
import EmergencyContactaApplicant from "../../pages/admin/applicants/ApplicantsModal/EmergencyContactaApplicant";
import IncomeApplicants from "../../pages/admin/applicants/ApplicantsModal/IncomeApplicants";
import RentalHistoryApplicant from "../../pages/admin/applicants/ApplicantsModal/RentalHistory";
import RoommatesApplicant from "../../pages/admin/applicants/ApplicantsModal/RoommatesApplicant";
import VehiclesApplicant from "../../pages/admin/applicants/ApplicantsModal/VehiclesApplicant";
import OtherInformationApplicant from "../../pages/admin/applicants/OtherInformation Applicant";

const TenantModal = ({ selectedTenant, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredDocuments, setHoveredDocuments] = useState({});
  const [hoveredDocumentIndex, setHoveredDocumentIndex] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [tenantData, setTenantData] = useState({});
  const [inspections, setInspections] = useState([]);
  const [listingData, setListingData] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [templatesData, setTemplatesData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [activeSection, setActiveSection] = useState("TEMPLATES");
  const [imageSrc, setImageSrc] = useState(null);
  const [openApplicantForm, setApplicatonForm] = useState(false);

  const handleHover = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered);
    setActiveSection(sectionName);
  };

  const handleApplicationForm = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered);
    setActiveSection(sectionName);
    setApplicatonForm(true);
  };

  // const handleCloseApplicantModal = () => {
  //   setApplicatonForm(false);
  // };

  const handleDocumentHover = (documentId, isHovered) => {
    setHoveredDocuments((prevHoveredDocuments) => ({
      ...prevHoveredDocuments,
      [documentId]: isHovered,
    }));
  };

  function getTokenFromLocalStorage() {
    const v = localStorage.getItem("certifymyrent.token");
    if (!v) throw new Error("Could not get token");
    setDecodedToken(jwtDecode(v));
  }

  // const handleAddDocsClick = () => {
  //   setIsModalOpen(true);
  // };

  const downloadDocument = (documentId) => {
    api
      .get(`/tenant/${selectedTenant.id}/document/${documentId}/download`, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);
        link.download = `document_${documentId}.pdf`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => console.error({ error }));
  };

  async function getAdminData() {
    await api
      .get(`/admin/user/${decodedToken.sub}`)
      .then((request) => {
        setAdminData(request.data);
        return request.data;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async function getTenantData() {
    await api
      .get(`/tenant/${selectedTenant.id}`)
      .then((response) => {
        setTenantData(response.data);

        return response.data;
      })

      .catch((e) => {
        console.error(e);
      });
  }

  async function handleSendPandadocClick(
    documentId,
    isHovered,
    localAdminData
  ) {
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
      tags: ["rms-frontend"],
    };
    if (!requestCreateData.recipients[0].email) {
      throw new Error("Bad Admin Data.");
    }

    await api
      .post(
        `/tenant/${selectedTenant.id}/document-template/create-document`,
        requestCreateData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
        responseDocumentId = response.data.id;
      })
      .catch((e) => {
        throw new Error(e);
      });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const requestSendData = {
      subject: "Listing document sign",
      message: "You were invited to sign the following document:",
      silent: false,
    };

    await api
      .post(
        `/tenant/${selectedTenant.id}/document/${responseDocumentId}/send`,
        requestSendData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  async function loadTemplates() {
    try {
      const { data } = await api.get(
        `/tenant/${selectedTenant.id}/document-template`
      );

      if (!data) throw new Error("Network data was not ok");

      setTemplatesData(data.results);
    } catch (err) {
      alert("Error fetching documents data:", err);
    }
  }

  async function loadDocuments() {
    try {
      const { data } = await api.get(`/tenant/${selectedTenant.id}/document`);

      if (!data) throw new Error("Network data was not ok");

      setDocumentsData(data.results);
    } catch (err) {
      alert("Error fetching documents data:", err);
    }
  }

  async function loadInspections() {
    try {
      const response = api.get(
        `/listing/${selectedTenant.listingId}/inspection`
      );

      setInspections((await response).data);
    } catch (err) {
      alert("Error fetching inspections", err);
    }
  }

  const fetchListings = async () => {
    try {
      const response = await api.get(`/listing/${selectedTenant.listingId}`);
      const listingData = response.data;
      setListingData(listingData);
    } catch (error) {
      console.error("Error fetching listing data:", error);
    }
  };

  useEffect(() => {
    if (!decodedToken) return getTokenFromLocalStorage();

    getAdminData();
    getTenantData();
    fetchListings();
    loadTemplates();
    loadDocuments();
    loadInspections();
  }, [decodedToken]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const src = await createListingImage(listingData);
        setImageSrc(src);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [listingData]);

  const renderSectionContent = (section) => {
    switch (section) {
      case "TEMPLATES": {
        function chunkArray(array, chunkSize) {
          const chunks = [];
          if (array.length < 1) return chunks;
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
          }
          return chunks;
        }

        const templateChunks = chunkArray(templatesData, 4);

        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start gap-5">
            {templateChunks.map((templateSubset, index) => (
              <div
                key={`boxInfoOrderCreate_${index}`}
                className="boxInfoOrderCreate"
              >
                {templateSubset.map((template, templateIndex) => (
                  <div className=" d-flex" key={template.id}>
                    <BoxDocuments>
                      <div
                        className="flex flex-column"
                        style={{ width: "100%" }}
                      >
                        <TitleDocuments className="">
                          {template.name}
                        </TitleDocuments>
                        <DateTextDocuments>
                          {new Date(template.dateCreated).toDateString()}
                        </DateTextDocuments>
                      </div>
                      <div className="d-flex justify-content-end">
                        {hoveredDocumentIndex === templateIndex ? (
                          <img
                            src={SendTemplateIconHover}
                            alt="SendTemplateIconHover"
                            className="imgBtnDocs delBox"
                            onMouseLeave={() => handleDocumentHover(null)}
                            onClick={() =>
                              handleSendPandadocClick(
                                template.id,
                                false,
                                adminData
                              )
                            }
                          />
                        ) : (
                          <img
                            src={SendTemplateIcon}
                            alt="SendTemplateIcon"
                            className="imgBtnDocs delBox"
                            onMouseEnter={() =>
                              handleDocumentHover(templateIndex)
                            }
                            onClick={() =>
                              handleSendPandadocClick(
                                template.id,
                                true,
                                adminData
                              )
                            }
                          />
                        )}
                      </div>
                    </BoxDocuments>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      }

      case "DOCUMENTS": {
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
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start gap-5">
            {documentChunks.map((documentSubset, index) => (
              <div
                key={`boxInfoOrderCreate_${index}`}
                className="boxInfoOrderCreate"
              >
                {documentSubset.map((document) => (
                  <div
                    className="d-flex"
                    key={document.id}
                    onClick={() => downloadDocument(document.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <BoxDocuments>
                      <div
                        className="flex flex-column"
                        style={{ width: "100%" }}
                      >
                        <TitleDocuments className="">
                          {document.name}
                        </TitleDocuments>
                        <DateTextDocuments>
                          {new Date(document.dateCreated).toDateString()}
                        </DateTextDocuments>
                      </div>
                    </BoxDocuments>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      }

      case "PAYMENT HISTORY":
        return <></>;
      case "INSPECTION HISTORY":
        return (
          <ListingInspectionHistoryCard className="mx-5 my-4">
            <div className="inspection-card-container">
              {inspections.map((inspection) => (
                <div className="inspection-card" key={inspection.id}>
                  <div className="inspectionContent">
                    <p>{inspection.name}</p>
                    <span>
                      {formatDate({
                        date: inspection.date,
                        formatOptions: DateTime.DATE_MED,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ListingInspectionHistoryCard>
        );
      case "APPLICATION FORM":
        return (
          <ApplicationContainer>
            <EmergencyContactaApplicant
              contact={tenantData.EmergencyContacts}
            />
            <IncomeApplicants
              income={tenantData.Incomes}
              otherIncomes={tenantData.OtherIncomes}
            />
            <RentalHistoryApplicant rentalHistory={tenantData.OtherAddresses} />
            <RoommatesApplicant roommates={tenantData.RoomMates} />
            <VehiclesApplicant vehicles={tenantData.Vehicles} />
            <OtherInformationApplicant otherInfo={tenantData.AdditionalInfos} />
          </ApplicationContainer>
        );
      default:
        return null;
    }
  };

  return (
    <ModalOverlayTenant>
      {/* <ApplicantsModal
        applicant={tenantData}
        isOpen={openApplicantForm}
        onClose={() => setApplicatonForm(false)}
        title={"Tanant"}
      /> */}
      <ModalContainer>
        <div
          className="popUp d-flex flex-column "
          style={{ width: "90%", borderRadius: "4px" }}
        >
          <div className="onClose d-flex align-items-center justify-content-end mt-2 flex-">
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
          <div
            className="orderGlobalPopUp d-flex p-5"
            style={{ height: "100%", maxHeight: "300px" }}
          >
            <div className="listingInfo ">
              <div style={{ height: "120px", width: "120px" }}>
                <img
                  src={imageSrc}
                  alt="listing"
                  className="listingImage"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                  }}
                />
              </div>
            </div>
            <div className="tenantInfo d-flex flex-column">
              <div className="popUpOrderFirstCol FullLName d-flex">
                <p>FULL LEGAL NAME</p>
                <span>{selectedTenant.User.name}</span>
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

            <div className="listingInfoOrder d-flex flex-column">
              <div className="popUpOrderListings">
                <div className="popUpOrderFirstCol idPopUp d-flex">
                  <p>ID</p>
                  <span>
                    {String(selectedTenant.listingId).padStart(6, "0")}
                  </span>
                </div>
                <div className="popUpOrderFirstCol locationPopUp d-flex">
                  <p>LOCATION</p>
                  <span>{listingData && listingData.location}</span>
                </div>
                <div className="popUpOrderFirstCol lotSizePopUp d-flex">
                  <p>LOT SIZE</p>
                  <span>
                    {listingData && listingData.lotSize} Sq. Ft. Per County
                  </span>
                </div>
                <div className="popUpOrderFirstCol hsPopUp d-flex">
                  <p>HOUSE SIZE</p>
                  <span>
                    {listingData && listingData.houseSize} Sq. Ft. Per County
                  </span>
                </div>
                <div className="popUpOrderFirstCol pricePopUp d-flex">
                  <p>PRICE</p>
                  <span>$ {listingData && listingData.price} / Mo</span>
                </div>
                {/* <div className="popUpOrderFirstCol totalProf d-flex">
                  <div className="d-flex profit justify-content-start">
                    <p>TOTAL PROFIT</p>
                    <span>$ 364,675</span>
                  </div>
                  <div className="d-flex profit justify-content-end">
                    <p>TOTAL LOSS</p>
                    <span>$ 54,000</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Navegable */}

          <div className="navOrderPopUp">
            <div className="navOrderPopUpNav d-flex">
              <div className="navegableSect d-flex">
                <div
                  onClick={() =>
                    handleHover(true, setActiveSection, "TEMPLATES")
                  }
                >
                  <p> Templates</p>
                </div>
                <div
                  onClick={() =>
                    handleHover(true, setActiveSection, "DOCUMENTS")
                  }
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
                    handleApplicationForm(
                      true,
                      setActiveSection,
                      "APPLICATION FORM"
                    )
                  }
                >
                  <p>Application Form</p>
                </div>
              </div>
              {/* <div className="docFile d-flex align-items-start justify-content-end">
                <button className="addDocBtnPopUp" onClick={handleAddDocsClick}>
                  + Add Document
                </button>
              </div> */}
            </div>
            <div className="renderPopUpSection">
              {renderSectionContent(activeSection)}
            </div>
            {/* Navigable */}
          </div>
        </div>
      </ModalContainer>
      {isModalOpen && <AddDocs onClose={() => setIsModalOpen(false)} />}
    </ModalOverlayTenant>
  );
};

export default TenantModal;
