/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../../styles/publIcListings/application.css";
import Logo from "../../../assets/img/Logo.svg";
import { api } from "../../../services/api";
import { env } from "../../../config/env";
import { HeaderGoBack } from "../../icons/tenants";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { createListingImage } from "../../../services/listing";
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
} from "./styles.js";

const ApplicationModal = ({ myselectedListing, onClose }) => {
  const [activeSection, setActiveSection] = useState("registration");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [isStartScreening, setIsStartScreening] = useState(false);
  const [screeningMessage, setScreeningMessage] = useState("");
  const [userId, setUserId] = useState({});
  const { user } = useAuth();
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric characters
        .replace(/^(\d{3})(\d{1,3})?(\d{1,4})?/, "$1-$2-$3"); // Insert hyphens
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const submitRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/tenant", {
        ...formData,
        approvalStatus: "SCREENING_IN_PROCESS",
      });
      console.log(response);
      setUserId(response.data.id);
      setMessage("Registration successful!");
      setIsStartScreening(true);
    } catch (err) {
      console.log(err.response);
      setMessage(err.response.data.message);
    }
  };
  const handleStartScreening = async () => {
    let data;

    if (user) {
      data = {
        userId: user.id,
        listingId: myselectedListing.id,
        location: myselectedListing.location,
        status: "PENDING",
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
    } else {
      data = {
        userId: userId,
        listingId: myselectedListing.id,
        status: "PENDING",
        location: myselectedListing.location,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };
    }

    try {
      const response = await api.post("/application-screening", data);
      window.open(env.rentSpreeLink, "_blank");
      setIsStartScreening(false);
      setScreeningMessage("Screening its gonna start soon");
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleLogoClick = () => {
    onClose();
    window.location.href = "/";
  };

  const handleGoBack = () => {
    onClose();
    if (user) {
      window.location.href = "/tenants/public-listings";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="bodyApplication">
      <div className=" d-flex align-items-start justify-content-center">
        <NavContainer>
          <div className="d-flex align-items-center">
            <div>
              <img
                src={Logo}
                alt="Logo"
                onClick={handleLogoClick}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <NavText className="Application">Application</NavText>
          </div>

          <GoBackContainer onClick={handleGoBack}>
            <HeaderGoBack />
            <GoBackStyle>GO BACK</GoBackStyle>
          </GoBackContainer>
        </NavContainer>
      </div>
      <ApplicationContainer>
        <SideBarDescriptionContainer>
          <ImgSideBar src={createListingImage(myselectedListing)} alt="" />

          <SideBarDescriptionPrice>
            <div>
              <FieldText>ID</FieldText>

              {myselectedListing && (
                <FieldValue>
                  {myselectedListing.id.toString().padStart(6, "0")}
                </FieldValue>
              )}
            </div>
            <div>
              <p
                style={{
                  color: "#272727",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                ${" "}
                {myselectedListing && myselectedListing.price
                  ? parseFloat(myselectedListing.price).toLocaleString("en", {})
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
                  {myselectedListing.location.split(", ").slice(-2).join(", ")}
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
                          maximumFractionDigits: 0,
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
                        maximumFractionDigits: 0,
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
                  <li key={requirement.id}>
                    <FieldValue>{requirement.name}</FieldValue>
                  </li>
                ))}
            </Ul>
          </AmenitiesContainer>
        </SideBarDescriptionContainer>
        <div className="forms redside d-flex justify-content-center align-items-center">
          {activeSection === "registration" && (
            <div className="registrationContainer d-flex justify-content-center">
              <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
                {!user && (
                  <>
                    <h2 className="d-flex justify-content-center mt-3 registrationText">
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

                      <button className="bgButton d-flex align-items-center justify-content-center">
                        <span className="submitBtn">Submit</span>
                      </button>
                      <p style={{ color: "#31af9a" }}>{message}</p>
                    </form>
                  </>
                )}
                {isStartScreening ? (
                  <button
                    className="bgButton d-flex align-items-center justify-content-center"
                    onClick={handleStartScreening}
                  >
                    <span className="submitBtn">Start Screening</span>
                  </button>
                ) : (
                  <p>{screeningMessage}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </ApplicationContainer>
    </div>
  );
};

export default ApplicationModal;