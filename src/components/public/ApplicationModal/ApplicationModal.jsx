/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import "../../../styles/publIcListings/application.css"
import Logo from "../../../assets/img/Logo.svg"
import { api } from "../../../services/api"
import { env } from "../../../config/env"
import { HeaderGoBack } from "../../icons/tenants"
import { useAuth } from "../../../hooks/useAuth"
import { createListingImage } from "../../../services/listing"
import {
  NavContainer,
  NavText,
  GoBackStyle,
  GoBackContainer,
  ApplicationContainer,
  SideBarDescriptionContainer,
  ImgSideBar,
  SideBarDescription,
  FieldText,
  PriceText,
  FieldValue,
  AmenitiesContainer,
  Ul,
  SideBarDescriptionPrice,
  Ulcontainers,
  Li,
  LogoImg,
  LogoContainer,
  NavTextContainer
} from "./styles.js"
import DescriptionMobileNav from "./DescriptionMobileNav"
import Roomates from "./RegistratationForms/Roomates"
import RentalHistory from "./RegistratationForms/RentalHistory"
import Income from "./RegistratationForms/Income"
import EmergencyContact from "./RegistratationForms/EmergencyContact"
import Vehicles from "./RegistratationForms/Vehicles"
import OtherInfo from "./RegistratationForms/OtherInfo"
import BackgroundScreening from "./RegistratationForms/BackgroundScreening"

const ApplicationModal = ({ myselectedListing, onClose }) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [userId, setUserId] = useState(null)
  // backgroundSreening
  const [activeSection, setActiveSection] = useState("income")
  const [formData, setFormData] = useState({})
  const [message, setMessage] = useState("")

  const [tenantId, setTenantId] = useState({})
  const { user } = useAuth()
  const innerWidth = window.innerWidth

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const src = await createListingImage(myselectedListing)
        setImageSrc(src)
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    fetchImage()
  }, [myselectedListing])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "phoneNumber") {
      const formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric characters
        .replace(/^(\d{3})(\d{1,3})?(\d{1,4})?/, "$1-$2-$3") // Insert hyphens
      setFormData({ ...formData, [name]: formattedValue })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }
  const submitRegistration = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/user/tenant", {
        ...formData,
        approvalStatus: "SCREENING_IN_PROCESS"
      })

      const userId = response.data.id
      setUserId(userId)
      const tenant = await api.get(`tenant/user/${userId}`)
      setTenantId(tenant.data.id)
      setMessage("Registration successful!")
      setActiveSection("roommates")
    } catch (err) {
      console.log(err.response)
      setMessage(err.response.data.message)
    }
  }

  const handleLogoClick = () => {
    onClose()
    window.location.href = "/"
  }

  return (
    <div className="bodyApplication">
      <div className=" d-flex align-items-start justify-content-center">
        <NavContainer>
          <LogoContainer>
            <div>
              <LogoImg src={Logo} alt="Logo" onClick={handleLogoClick} />
            </div>
            <NavText>Application</NavText>
          </LogoContainer>
          {innerWidth > 768 && (
            <nav className="navBar1 d-flex align-items-center w-100">
              <ul className="w-100 d-flex justify-content-between">
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`registration custom-item1 nav-item ${
                    activeSection === "registration" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("registration")}
                >
                  REGISTRATION
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`roommates custom-item1 nav-item ${
                    activeSection === "roommates" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("roommates")}
                >
                  ROOMMATES
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`rh custom-item1 nav-item ${
                    activeSection === "rentalHistory" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("rentalHistory")}
                >
                  RENTAL HISTORY
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`income custom-item1 nav-item ${
                    activeSection === "income" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("income")}
                >
                  INCOME
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`ec custom-item1 nav-item ${
                    activeSection === "emergencyContact" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("emergencyContact")}
                >
                  EMERGENCY CONTACT
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`vehicles custom-item1 nav-item ${
                    activeSection === "vehicles" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("vehicles")}
                >
                  VEHICLES
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`otherInfo custom-item1 nav-item ${
                    activeSection === "otherInfo" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("otherInfo")}
                >
                  OTHER INFO
                </li>
                <li
                  style={{
                    fontSize: "18px",
                    fontFamily: "proxima-nova",
                    fontWeight: "lighter"
                  }}
                  className={`otherInfo custom-item1 nav-item ${
                    activeSection === "otherInfo" ? "active" : ""
                  }`}
                  // onClick={() => handleSectionClick("otherInfo")}
                >
                  BACKGROUND SCREENING
                </li>
              </ul>
            </nav>
          )}
        </NavContainer>
      </div>

      <ApplicationContainer>
        {innerWidth < 768 ? (
          <DescriptionMobileNav
            myselectedListing={myselectedListing}
            imageSrc={imageSrc}
          />
        ) : (
          <SideBarDescriptionContainer>
            <ImgSideBar src={imageSrc} alt="" />

            <SideBarDescriptionPrice>
              <div style={{ marginTop: "15px" }}>
                <FieldText>ID</FieldText>

                {myselectedListing && (
                  <FieldValue>
                    {myselectedListing.id.toString().padStart(6, "0")}
                  </FieldValue>
                )}
              </div>
              <div style={{ marginTop: "15px" }}>
                <p
                  style={{
                    color: "#272727",
                    fontSize: "25px",
                    fontWeight: "bold"
                  }}
                >
                  ${" "}
                  {myselectedListing && myselectedListing.price
                    ? parseFloat(myselectedListing.price).toLocaleString(
                        "en",
                        {}
                      )
                    : ""}
                  /mo
                </p>
              </div>
            </SideBarDescriptionPrice>
            <SideBarDescription>
              <div>
                <FieldText>City</FieldText>
                {myselectedListing && (
                  <FieldValue>
                    {myselectedListing.location
                      .split(", ")
                      .slice(-2)
                      .join(", ")}
                  </FieldValue>
                )}
              </div>
            </SideBarDescription>
            <SideBarDescription>
              <div>
                <FieldText>HOUSE SIZE</FieldText>
                <FieldValue>
                  {myselectedListing && (
                    <span>
                      {" "}
                      {myselectedListing.houseSize
                        ? myselectedListing.houseSize.toLocaleString("EN", {
                            maximumFractionDigits: 0
                          })
                        : ""}
                      &nbsp;Sq. Ft. per county
                    </span>
                  )}
                </FieldValue>
              </div>
            </SideBarDescription>
            <SideBarDescription>
              <div>
                <FieldText>LOT SIZE</FieldText>
                {myselectedListing && (
                  <FieldValue className="desc2">
                    {myselectedListing.lotSize
                      ? myselectedListing.lotSize.toLocaleString("EN", {
                          maximumFractionDigits: 0
                        })
                      : ""}{" "}
                    &nbsp;Sq. Ft. per county
                  </FieldValue>
                )}
              </div>
            </SideBarDescription>
            <AmenitiesContainer>
              <FieldText>AMENITIES</FieldText>
              <Ulcontainers>
                <Ul>
                  <Li>
                    {myselectedListing && myselectedListing.bedrooms} Bedrooms
                  </Li>
                  <Li>
                    {myselectedListing && myselectedListing.bathrooms} Bathrooms
                  </Li>
                  {myselectedListing.Amenities &&
                    myselectedListing.Amenities.slice(0, 3).map((amenity) => (
                      <Li key={amenity.id}>{amenity.name}</Li>
                    ))}
                </Ul>
                <Ul>
                  {myselectedListing.Amenities &&
                    myselectedListing.Amenities.slice(3, 8).map((amenity) => (
                      <Li key={amenity.id}>{amenity.name}</Li>
                    ))}
                </Ul>
              </Ulcontainers>
            </AmenitiesContainer>

            <AmenitiesContainer>
              <FieldText>REQUIREMENTS</FieldText>
              <Ul>
                {myselectedListing.Requirements &&
                  myselectedListing.Requirements.map((requirement) => (
                    <Li key={requirement.id} style={{ marginLeft: "20px" }}>
                      <FieldValue>{requirement.name}</FieldValue>
                    </Li>
                  ))}
              </Ul>
            </AmenitiesContainer>
          </SideBarDescriptionContainer>
        )}
        <div className="forms redside d-flex align-items-center ">
          <div className="registrationContainer w-100 ">
            <div className=" d-flex justify-content-center  w-100">
              {!user && activeSection === "registration" && (
                <div className="w-50">
                  <h2
                    className="d-flex justify-content-center registrationText"
                    style={{
                      fontFamily: "proxima-nova",
                      fontWeight: "regular"
                    }}
                  >
                    Registration
                  </h2>
                  <form className="resetForm" onSubmit={submitRegistration}>
                    <input
                      className="form-control inputReset"
                      type="text"
                      placeholder="FULL LEGAL NAME"
                      name="name"
                      required
                      onChange={handleChange}
                    />
                    <input
                      className="form-control inputReset"
                      type="text"
                      placeholder="PHONE NO 123-456-7890 "
                      name="phoneNumber"
                      required
                      onChange={handleChange}
                      value={formData.phoneNumber || ""}
                    />
                    <input
                      className="form-control inputReset"
                      type="email"
                      placeholder="EMAIL"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                    <input
                      className="form-control inputReset"
                      type="password"
                      placeholder="PASSWORD"
                      name="password"
                      required
                      onChange={handleChange}
                    />

                    <button className="bgButton d-flex align-items-center justify-content-center w-100">
                      <span className="submitBtn">Submit</span>
                    </button>
                    <p style={{ color: "#31af9a" }}>{message}</p>
                  </form>
                </div>
              )}
              {/* {isStartScreening && (
                <div
                  style={{
                    height: "100%",
                    maxHeight: "45px",
                    width: "100%",
                    maxWidth: "580px"
                  }}
                >
                  <button
                    className=" bgButton  d-flex align-items-center justify-content-center w-100"
                    onClick={handleStartScreening}
                    style={{ margin: "0px" }}
                  >
                    <span className="submitBtn">Start Screening</span>
                  </button>
                  <p>{screeningMessage}</p>
                </div>
              )} */}
              {activeSection === "roommates" && (
                <Roomates
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "rentalHistory" && (
                <RentalHistory
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "income" && (
                <Income
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "emergencyContact" && (
                <EmergencyContact
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "vehicles" && (
                <Vehicles
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "otherInfo" && (
                <OtherInfo
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                />
              )}
              {activeSection === "backgroundSreening" && (
                <BackgroundScreening
                  tenantId={tenantId}
                  setActiveSection={setActiveSection}
                  myselectedListing={myselectedListing}
                  userId={userId}
                  formData={formData}
                  imageSrc={imageSrc}
                />
              )}
            </div>
          </div>
        </div>
      </ApplicationContainer>
    </div>
  )
}

export default ApplicationModal
