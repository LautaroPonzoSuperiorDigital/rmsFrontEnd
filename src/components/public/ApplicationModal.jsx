/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../styles/publIcListings/application.css";
import Logo from "../../assets/img/Logo.svg";
import { api } from "../../services/api";
import { env } from "../../config/env";
import { HeaderGoBack } from "../icons/tenants";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { createListingImage } from "../../services/listing";

const goBackStyle = {
  margin: 0,
  fontSize: "22px",
  marginLeft: "15px",
  marginRight: "15px",
  cursor: "pointer",
};

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
      // window.open(env.rentSpreeLink, "_blank");
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
      <div className="bgApplicants d-flex align-items-start">
        <style>
          {`
          .position-sticky {
            display: none;
          }
        `}
        </style>
        <div className="ApplicationNavBar d-flex align-items-center justify-content-between">
          <img
            className="LogoPublic1 justify-content-start ms-4"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <h2 className="Application">Application</h2>

          <div className="d-flex align-items-center" onClick={handleGoBack}>
            <HeaderGoBack />
            <p style={goBackStyle}>GO BACK</p>
          </div>
        </div>
      </div>
      <div className="d-flex containerApplications">
        <div className="sidePropertyDescription d-flex justify-content-start align-items-center flex-column">
          <img
            className="fakeImg"
            src={createListingImage(myselectedListing)}
            alt=""
          />
          <div className="idPrice d-flex justify-items-center align-items-center">
            <div className="d-flex flex-column align-items-start justify-content-center ID1">
              <p>ID</p>
              {myselectedListing && (
                <span className="desc2 or2">
                  {myselectedListing.id.toString().padStart(6, "0")}
                </span>
              )}
            </div>
            <h2 className="d-flex justify-content-center price1">
              ${" "}
              {myselectedListing && myselectedListing.price
                ? parseFloat(myselectedListing.price).toLocaleString("en", {
                    useGrouping: true,
                  })
                : ""}
              /mo
            </h2>
          </div>
          <div className="city-hs-ls d-flex flex-column">
            <div className="orderApp">
              <div className="div1">
                <p>CITY</p>
                {myselectedListing && (
                  <span className="desc2">
                    {myselectedListing.location
                      .split(", ")
                      .slice(-2)
                      .join(", ")}
                  </span>
                )}
              </div>
              <div className="div1">
                <p>HOUSE SIZE</p>
                {myselectedListing && (
                  <span className="desc2">
                    {" "}
                    {myselectedListing.houseSize
                      ? myselectedListing.houseSize.toLocaleString("EN", {
                          maximumFractionDigits: 0,
                        })
                      : ""}
                    &nbsp;Sq. Ft. per county
                  </span>
                )}
              </div>
              <div className="div1">
                <p>LOT SIZE</p>
                {myselectedListing && (
                  <span className="desc2">
                    {myselectedListing.lotSize
                      ? myselectedListing.lotSize.toLocaleString("EN", {
                          maximumFractionDigits: 0,
                        })
                      : ""}{" "}
                    &nbsp;Sq. Ft. per county
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="amenities d-flex flex-column justify-content-center">
            <div className="orderApp">
              <p>AMENITIES</p>
              <ul>
                <li>
                  {myselectedListing && myselectedListing.bedrooms} Bedrooms
                </li>
                <li>
                  {myselectedListing && myselectedListing.bathrooms} Bathrooms
                </li>
                {myselectedListing.Amenities &&
                  myselectedListing.Amenities.map((amenity) => (
                    <li key={amenity.id}>{amenity.name}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="requirements d-flex flex-column">
            <div className="orderReq">
              <p className="requirementsText">REQUIREMENTS</p>
              <ul>
                {myselectedListing.Requirements &&
                  myselectedListing.Requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default ApplicationModal;
