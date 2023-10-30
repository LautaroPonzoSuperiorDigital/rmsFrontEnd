import "./../../../../../styles/PopUp.css"
import React, { useState, useEffect } from "react"
import closeListing2 from "./../../../../../assets/img/close.svg"
import closeHover from "./../../../../../assets/img/closeHover.svg"
import SendTemplateIcon from "./../../../../../assets/img/SendTemplateIconHover.svg"
import SendTemplateIconHover from "./../../../../../assets/img/SendTemplateIconHover.svg"
import AddDocs from "./../../../../../components/modals/addDocumentsModal"
import jwtDecode from "jwt-decode"
import {
  ApplicationContainer,
  BoxDocuments,
  DateTextDocuments,
  ModalContainer,
  ModalOverlayTenant,
  TitleDocuments
} from "./../../../../../components/modals/style"
import { api } from "../../../../../services/api"
import { formatDate } from "../../../../../services/date"
import EmergencyContactaApplicant from "../EmergencyContactaApplicant"
import IncomeApplicants from "../IncomeApplicants"
import RentalHistoryApplicant from "../RentalHistory"
import RoommatesApplicant from "../RoommatesApplicant"
import VehiclesApplicant from "../VehiclesApplicant"
import OtherInformationApplicant from "../../OtherInformation Applicant"
import { createListingImage } from "../../../../../services/listing"

const ApplicantModal = ({ selectedTenant, onClose }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredEdit, setIsHoveredEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredDocuments, setHoveredDocuments] = useState({})
  const [hoveredDocumentIndex, setHoveredDocumentIndex] = useState(null)
  const [adminData, setAdminData] = useState({})
  const [tenantData, setTenantData] = useState({})
  const [inspections, setInspections] = useState([])
  const [listingData, setListingData] = useState(null)
  const [token, setToken] = useState("")
  const [decodedToken, setDecodedToken] = useState(null)
  const [documentsData, setDocumentsData] = useState([])
  const [activeSection, setActiveSection] = useState("DOCUMENTS")
  const [imageSrc, setImageSrc] = useState(null)
  const [openApplicantForm, setApplicatonForm] = useState(false)

  const handleHover = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered)
    setActiveSection(sectionName)
  }
  const handleApplicationForm = (isHovered, setIsHovered, sectionName) => {
    setIsHovered(isHovered)
    setActiveSection(sectionName)
    setApplicatonForm(true)
  }
  const handleCloseApplicantModal = () => {
    setApplicatonForm(false)
  }
  const handleDocumentHover = (documentId, isHovered) => {
    setHoveredDocuments((prevHoveredDocuments) => ({
      ...prevHoveredDocuments,
      [documentId]: isHovered
    }))
  }

  function getTokenFromLocalStorage() {
    const v = localStorage.getItem("certifymyrent.token")
    if (!v) throw new Error("Could not get token")
    setToken(v)
    setDecodedToken(jwtDecode(v))
  }

  const handleAddDocsClick = () => {
    setIsModalOpen(true)
  }

  async function getAdminData() {
    await api
      .get(`/admin/user/${decodedToken.sub}`)
      .then((request) => {
        setAdminData(request.data)
        return request.data
      })
      .catch((e) => {
        console.error(e)
      })
  }

  async function getTenantData() {
    await api
      .get(`/tenant/${selectedTenant.id}`)
      .then((response) => {
        setTenantData(response.data)

        return response.data
      })

      .catch((e) => {
        console.error(e)
      })
  }

  async function handleSendPandadocClick(
    documentId,
    isHovered,
    localAdminData
  ) {
    let responseDocumentId
    let name_split = String(localAdminData.name).split(" ")
    let f_name = name_split[0]
    let l_name = name_split.slice(1).join(" ")
    let requestCreateData = {
      templateUuid: documentId,
      name: `California S. R. L. Agreement - ${localAdminData.name} and ${tenantData.User.name}`,
      recipients: [
        {
          email: localAdminData.email,
          first_name: f_name,
          last_name: l_name,
          role: "ADMIN"
        },
        {
          email: tenantData.User.email,
          first_name: String(tenantData.User.name).split(" ")[0],
          last_name: String(tenantData.User.name).split(" ")[1] || null,
          role: "TENANT"
        }
      ],
      tags: ["rms-frontend"]
    }
    if (!requestCreateData.recipients[0].email) {
      throw new Error("Bad Admin Data.")
    }

    await api
      .post(
        `/tenant/${selectedTenant.id}/document-template/create-document`,
        requestCreateData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document")
        responseDocumentId = response.data.id
      })
      .catch((e) => {
        throw new Error(e)
      })

    // don't delete this timing line, it's for pandadoc API send template
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const requestSendData = {
      subject: "Listing document sign",
      message: "You were invited to sign the following document:",
      silent: false
    }
    await api
      .post(
        `/tenant/${selectedTenant.id}/document/${responseDocumentId}/send`,
        requestSendData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document")
      })
      .catch((e) => {
        throw new Error(e)
      })
  }

  async function loadDocuments() {
    try {
      const { data } = await api.get(
        `/tenant/${selectedTenant.id}/document-template`
      )
      if (!data) {
        throw new Error("Network data was not ok")
      }
      setDocumentsData(data.results)
    } catch (err) {
      alert("Error fetching documents data:", err)
    }
  }

  const fetchListings = async () => {
    try {
      const response = await api.get(
        `/listing/${selectedTenant.User.ApplicationScreening[0].Listing.id}`
      )
      console.log("response", response)
      const listingData = response.data
      setListingData(listingData)
    } catch (error) {
      console.error("Error fetching listing data:", error)
    }
  }

  useEffect(() => {
    if (!decodedToken) getTokenFromLocalStorage()
    if (decodedToken) {
      getAdminData()
      getTenantData()
      fetchListings()
      loadDocuments()
      // loadInspections()
    }
  }, [decodedToken])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const src = await createListingImage(listingData)
        setImageSrc(src)
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    fetchImage()
  }, [listingData])

  const renderSectionContent = (section) => {
    switch (section) {
      case "DOCUMENTS":
        function chunkArray(array, chunkSize) {
          const chunks = []
          if (array.length < 1) return chunks
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
          }
          return chunks
        }

        const documentChunks = chunkArray(documentsData, 4)

        return (
          <div className="renderBoxsOrder d-flex align-items-start justify-content-start gap-5">
            {documentChunks.map((documentSubset, index) => (
              <div
                key={`boxInfoOrderCreate_${index}`}
                className="boxInfoOrderCreate"
              >
                {documentSubset.map((document, documentIndex) => (
                  <div className=" d-flex" key={document.id}>
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
                      <div className="d-flex justify-content-end">
                        {hoveredDocumentIndex === documentIndex ? (
                          <img
                            src={SendTemplateIconHover}
                            alt="SendTemplateIconHover"
                            className="imgBtnDocs delBox"
                            onMouseLeave={() => handleDocumentHover(null)}
                            onClick={() =>
                              handleSendPandadocClick(
                                document.id,
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
                              handleDocumentHover(documentIndex)
                            }
                            onClick={() =>
                              handleSendPandadocClick(
                                document.id,
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
        )

      case "APPLICATION FORM":
        return (
          <ApplicationContainer>
            <EmergencyContactaApplicant
              contact={selectedTenant.EmergencyContacts}
            />
            <IncomeApplicants
              income={selectedTenant.Incomes}
              otherIncomes={selectedTenant.OtherIncomes}
            />
            <RentalHistoryApplicant
              rentalHistory={selectedTenant.OtherAddresses}
            />
            <RoommatesApplicant roommates={selectedTenant.RoomMates} />
            <VehiclesApplicant vehicles={selectedTenant.Vehicles} />
            <OtherInformationApplicant
              otherInfo={selectedTenant.AdditionalInfos}
            />
          </ApplicationContainer>
        )
      default:
        return null
    }
  }

  return (
    <ModalOverlayTenant>
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
                    aspectRatio: "1 / 1"
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
            </div>

            <div className="listingInfoOrder d-flex flex-column">
              <div className="popUpOrderListings">
                <div className="popUpOrderFirstCol idPopUp d-flex">
                  <p>ID</p>
                  <span>
                    {String(
                      selectedTenant.User.ApplicationScreening[0].Listing.id
                    ).padStart(6, "0")}
                  </span>
                </div>
                <div className="popUpOrderFirstCol locationPopUp d-flex">
                  <p>LOCATION</p>
                  <span>
                    {
                      selectedTenant.User.ApplicationScreening[0].Listing
                        .location
                    }
                  </span>
                </div>
                <div className="popUpOrderFirstCol lotSizePopUp d-flex">
                  <p>LOT SIZE</p>
                  <span>
                    {
                      selectedTenant.User.ApplicationScreening[0].Listing
                        .lotSize
                    }{" "}
                    Sq. Ft. Per County
                  </span>
                </div>
                <div className="popUpOrderFirstCol hsPopUp d-flex">
                  <p>HOUSE SIZE</p>
                  <span>
                    {
                      selectedTenant.User.ApplicationScreening[0].Listing
                        .houseSize
                    }{" "}
                    Sq. Ft. Per County
                  </span>
                </div>
                <div className="popUpOrderFirstCol pricePopUp d-flex">
                  <p>PRICE</p>
                  <span>
                    ${" "}
                    {selectedTenant.User.ApplicationScreening[0].Listing.price}{" "}
                    / Mo
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
                  onClick={() =>
                    handleHover(true, setActiveSection, "DOCUMENTS")
                  }
                >
                  <p> Documents</p>
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
              <div className="docFile d-flex align-items-start justify-content-end">
                <button className="addDocBtnPopUp" onClick={handleAddDocsClick}>
                  + Add Document
                </button>
              </div>
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
  )
}

export default ApplicantModal
