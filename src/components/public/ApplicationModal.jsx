import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/application.css";
import Logo from "../../assets/img/Logo.svg";
import img1 from "../../assets/img/1.jpg";
import axios from "axios";
import ToggleYes from "../../assets/img/ToggleYes.svg";
import ToggleNo from "../../assets/img/ToggleNo.svg";

const ApplicationModal = ({ selectedImage, onClose, id }) => {
  const [activeSection, setActiveSection] = useState("registration");
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [listingId, setListingId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null); // Define selectedListing state variable
  const [Amenities, setAmenities] = useState([""]);
  const [Requirements, setRequirements] = useState([""]);
  const [toggleOn, setToggleOn] = useState(false);
  const [toggleOn1, setToggleOn1] = useState(false);
  const [toggleOn2, setToggleOn2] = useState(false);
  const [toggleOn3, setToggleOn3] = useState(false);
  const [toggleOn4, setToggleOn4] = useState(false);
  const [toggleOn5, setToggleOn5] = useState(false);

  const handleClickToggle1 = () => {
    setToggleOn1(!toggleOn1);
  };

  const handleClickToggle2 = () => {
    setToggleOn2(!toggleOn2);
  };

  const handleClickToggle3 = () => {
    setToggleOn3(!toggleOn3);
  };
  const handleClickToggle4 = () => {
    setToggleOn4(!toggleOn4);
  };
  const handleClickToggle5 = () => {
    setToggleOn5(!toggleOn5);
  };
  const handleClickToggle6 = () => {
    setToggleOn6(!toggleOn6);
  };
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    onClose();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.certifymyrent.com/listing`
        );
        const listingsWithId = response.data.map((listing) => ({
          ...listing,
        }));
        const selectedListingData = listingsWithId.find(
          (listing) => listing.id === id
        );
        setSelectedListing(selectedListingData);
        setAmenities(selectedListingData?.Amenities || []);
        setRequirements(selectedListingData?.Requirements || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (selectedListing) {
      setListingId(selectedListing.id);
      setAmenities(selectedListing.Amenities);
      setRequirements(selectedListing.Requirements);
      console.log(selectedListing);
    }
  }, [selectedListing]);

  useEffect(() => {
    setCurrentImage(selectedImage);
  }, [selectedImage]);

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
        <div className="ApplicationNavBar d-flex align-items-center">
          <img
            className="LogoPublic1 justify-content-start ms-4"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <h2 className="Application">Application</h2>
          <nav className="navBar1 d-flex align-items-center">
            <ul>
              <li
                className={`registration custom-item1 nav-item ${
                  activeSection === "registration" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("registration")}
              >
                REGISTRATION
              </li>
              <li
                className={`roommates custom-item1 nav-item ${
                  activeSection === "roommates" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("roommates")}
              >
                ROOMMATES
              </li>
              <li
                className={`rh custom-item1 nav-item ${
                  activeSection === "rentalHistory" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("rentalHistory")}
              >
                RENTAL HISTORY
              </li>
              <li
                className={`income custom-item1 nav-item ${
                  activeSection === "income" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("income")}
              >
                INCOME
              </li>
              <li
                className={`ec custom-item1 nav-item ${
                  activeSection === "emergencyContact" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("emergencyContact")}
              >
                EMERGENCY CONTACT
              </li>
              <li
                className={`vehicles custom-item1 nav-item ${
                  activeSection === "vehicles" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("vehicles")}
              >
                VEHICLES
              </li>
              <li
                className={`otherInfo custom-item1 nav-item ${
                  activeSection === "otherInfo" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("otherInfo")}
              >
                OTHER INFO
              </li>
              <li
                className={`agreement custom-item1 nav-item ${
                  activeSection === "agreement" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("agreement")}
              >
                AGREEMENT & CONSENT TO BACKGROUND CHECK
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="d-flex containerApplications">
        <div className="sidePropertyDescription d-flex justify-content-start align-items-center flex-column">
          <img className="fakeImg" src={selectedImage} alt="" />
          <div className="idPrice d-flex justify-items-center align-items-center">
            <div className="d-flex flex-column align-items-start justify-content-center ID1">
              <p>ID</p>
              {selectedListing && (
                <span className="desc2 or2">
                  {selectedListing.id.toString().padStart(6, "0")}
                </span>
              )}
            </div>
            <h2 className="d-flex justify-content-center price1">
              ${" "}
              {selectedListing && selectedListing.price
                ? parseFloat(selectedListing.price).toLocaleString("en", {
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
                {selectedListing && (
                  <span className="desc2">
                    {selectedListing.location.split(", ").slice(-2).join(", ")}
                  </span>
                )}
              </div>
              <div className="div1">
                <p>HOUSE SIZE</p>
                {selectedListing && (
                  <span className="desc2">
                    {" "}
                    {selectedListing.houseSize
                      ? selectedListing.houseSize.toLocaleString("EN", {
                          maximumFractionDigits: 0,
                        })
                      : ""}
                    &nbsp;Sq. Ft. per county
                  </span>
                )}
              </div>
              <div className="div1">
                <p>LOT SIZE</p>
                {selectedListing && (
                  <span className="desc2">
                    {selectedListing.lotSize
                      ? selectedListing.lotSize.toLocaleString("EN", {
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
                <li>{selectedListing && selectedListing.bedrooms} Bedrooms</li>
                <li>
                  {selectedListing && selectedListing.bathrooms} Bathrooms
                </li>
                {Amenities &&
                  Amenities.map((amenity) => (
                    <li key={amenity.id}>{amenity.name}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="requirements d-flex flex-column">
            <div className="orderReq">
              <p className="requirementsText">REQUIREMENTS</p>
              <ul>
                {Requirements &&
                  Requirements.map((requirement) => (
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
                <h2 className="d-flex justify-content-center mt-3 registrationText">
                  Registration
                </h2>
                <form className="resetForm" action="submit">
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="FULL LEGAL NAME                                                                               Maria Kramer"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="DRIVER LICENSE # / STATE                                                                A0002144, Ca"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="BIRTH DATE                                                                                                 11/10/1986"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="PHONE NO.                                                                                           530-521-7450"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="SOCIAL SECURITY                                                                                                235"
                  />
                  <input
                    className="form-control inputReset"
                    type="email"
                    placeholder="EMAIL                                                                                  mariakramer@gmail.com"
                  />
                </form>
                <button className="bgButton d-flex align-items-center justify-content-center">
                  <span className="submitBtn">Submit</span>
                </button>
              </div>
            </div>
          )}
          {/* REGISTER END */}

          {activeSection === "roommates" && (
            <div className="roommatesContainer d-flex justify-content-center">
              <div className="formRoommatesOrder d-flex flex-column justify-content-start align-items-center">
                <h2 className="rmText d-flex justify-content-center mt-3">
                  Roommates / Other Occupants
                </h2>
                <form
                  className="resetForm2 w-100 align-items-center"
                  action="submit"
                >
                  <div className="lineRoom d-flex align-items-center justify-content-between w-100">
                    <p className="roomOrderName">
                      FULL NAME - FIRST, MIDDLE, LAST
                    </p>
                    <p className="roomOrderBirth">BIRTH DATE</p>
                    <p className="roomOrderRela">RELATIONSHIP TO YOU</p>
                  </div>
                  <div className="orderInputRoom d-flex">
                    <input
                      className="inputReset2 roomName"
                      type="text"
                      placeholder="Leonardo Kramer"
                    />
                    <input
                      className="inputReset2 roomBirth"
                      type="text"
                      placeholder="2/15/1984"
                    />
                    <input
                      className="inputReset2 roomRela"
                      type="text"
                      placeholder="Husband"
                    />
                  </div>
                  <p className="addRoommate">+ Add Roommate / Other Occupant</p>
                </form>
                <button className="bgButton2 d-flex align-items-center justify-content-center">
                  <span className="submitBtn2">Submit</span>
                </button>
              </div>
            </div>
          )}
          {/* ROOMMATES END */}

          {activeSection === "rentalHistory" && (
            <div className="rentalContainer align-items-center">
              <h2 className="rentalText align-items-center">Rental History</h2>
              <p className="rentalP">
                Please list your three most recent addresses or from past five
                years.
              </p>
              <div className="rentalOrder d-flex">
                <div className="leftRentalForm">
                  <form action="">
                    <h2 className="cA">Current Address</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="STREET ADDRESS / UNIT NO.                                                               206 Alexa Ct, Paso Robles"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="CITY, STATE, ZIP                                                                                                                  Ca 32480"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="HOW LONG AT THIS ADDRESS                                                                                                1 Year"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER NAME                                                                                           Janey Vianne"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER PHONE                                                                                        530-521-7450"
                    />
                  </form>
                  <form action="">
                    <h2 className="cA1">Previous Address</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="STREET ADDRESS / UNIT NO.                                                                        1236 Post Farm Road"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="CITY, STATE, ZIP                                                                                                                  Ca 33644"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="HOW LONG AT THIS ADDRESS                                                                                             2 Years"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER NAME                                                                                              Becca Aleta"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER PHONE                                                                                        530-521-7450"
                    />
                  </form>
                </div>
                <div className="rightRentalForm">
                  <form action="">
                    <h2 className="cA">Previous Address</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="STREET ADDRESS / UNIT NO.                                                                         4478 Euclid Avenue"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="CITY, STATE, ZIP                                                                                                                 Ca 32480"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="HOW LONG AT THIS ADDRESS                                                                                            5 Years"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER NAME                                                                                         Kevan Kenyon"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MANAGER/OWNER PHONE                                                                                        530-521-7450"
                    />
                  </form>
                </div>
              </div>

              <div className="rentalSeparation">
                <button className="bgButton3 d-flex align-items-center justify-content-center">
                  <span className="submitBtn3">Submit</span>
                </button>
              </div>
            </div>
          )}
          {/* RENTAL HISTORY ENDS */}

          {activeSection === "income" && (
            <div className="incomeContainer align-items-center">
              <h2 className="rentalText align-items-center">Income</h2>
              <p className="rentalP">
                Please list employment from past five years & other sources of
                income.
              </p>
              <div className="incomeOrder d-flex">
                <div className="leftRentalForm">
                  <form action="">
                    <h2 className="cA">Current Employer</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="EMPLOYED BY                                                                                                                Acorn Crafts"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="POSITION                                                                                                       Chief marketing officer"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="DATES OF EMPLOYMENT (FROM..TO)                                                              12/10/2019 - current"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MONTHLY INCOME                                                                                                              $197,900"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="NAME OF SUPERVISOR                                                                                               Janey Vianne"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="SUPERVISOR’S PHONE #                                                                                            530-521-7450"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="ADDRESS STREET, CITY, STATE, ZIP                       1800 El Camino Real, Atascadero, Ca 93422"
                    />
                  </form>
                  <form action="">
                    <h2 className="cA1">Previous Address</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="EMPLOYED BY                                                                                                                Acorn Crafts"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="POSITION                                                                                                       Chief marketing officer"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="DATES OF EMPLOYMENT (FROM..TO)                                                              12/10/2019 - current"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MONTHLY INCOME                                                                                                             $197,900"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="NAME OF SUPERVISOR                                                                                               Janey Vianne"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="SUPERVISOR’S PHONE #                                                                                            530-521-7450"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="ADDRESS STREET, CITY, STATE, ZIP                       1800 El Camino Real, Atascadero, Ca 93422"
                    />
                  </form>
                </div>
                <div className="rightRentalForm">
                  <form action="">
                    <h2 className="cA">Previous Employer</h2>
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="EMPLOYED BY                                                                                                                Acorn Crafts"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="POSITION                                                                                                       Chief marketing officer"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="DATES OF EMPLOYMENT (FROM..TO)                                                              12/10/2019 - current"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="MONTHLY INCOME                                                                                                              $197,900"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="NAME OF SUPERVISOR                                                                                               Janey Vianne"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="SUPERVISOR’S PHONE #                                                                                            530-521-7450"
                    />
                    <input
                      className="inputReset3"
                      type="text"
                      placeholder="ADDRESS STREET, CITY, STATE, ZIP                       1800 El Camino Real, Atascadero, Ca 93422"
                    />
                    <form action="">
                      <h2 className="cA1">Other Income Sources</h2>
                      <input
                        className="inputReset3"
                        type="text"
                        placeholder="TYPE"
                      />
                      <input
                        className="inputReset3"
                        type="text"
                        placeholder="MONTHLY INCOME"
                      />
                      <input
                        className="inputReset3"
                        type="text"
                        placeholder="PROVIDER ADRESS-STREET, CITY, STATE, ZIP"
                      />
                      <input
                        className="inputReset3"
                        type="text"
                        placeholder="PROVIDER ADRESS-STREET, CITY, STATE, ZIP"
                      />
                    </form>
                  </form>
                </div>
              </div>
              <div className="incomeSeparation">
                <button className="bgButton3 d-flex align-items-center justify-content-center">
                  <span className="submitBtn3">Submit</span>
                </button>
              </div>
            </div>
          )}
          {/* INCOME ENDS */}
          {/* EMERGENCY CONTACT START */}
          {activeSection === "emergencyContact" && (
            <div className="registrationContainer d-flex justify-content-center">
              <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
                <h2 className="d-flex justify-content-center mt-3 ECText">
                  Emergency Contact Information
                </h2>
                <form className="resetForm" action="submit">
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="NAME                                                                                                     Maria Kramer"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="PHONE #                                                                                               530-521-7450"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="RELATIONSHIP                                                                                              Husband"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="ADDRESS - STREET, CITY, STATE, ZIP      180 Niblick Rd, Paso Robles, Ca 93446"
                  />
                </form>
                <button className="bgButton4 d-flex align-items-center justify-content-center">
                  <span className="submitBtn4">Submit</span>
                </button>
              </div>
            </div>
          )}
          {/* EMERGENCY CONTACT START */}
          {activeSection === "vehicles" && (
            <div className="registrationContainer d-flex justify-content-center">
              <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
                <h2 className="d-flex justify-content-center mt-3 VehicleText">
                  Vehicles
                </h2>
                <form className="resetForm" action="submit">
                  <h3 className="Vtext">Vehicle 1</h3>
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="MAKE & MODEL                                                                                             Audi Q3"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="YEAR                                                                                                                     2019"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="COLOR                                                                                                                 Black"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="PLATE #                                                                                                         Abc-1234"
                  />
                  <input
                    className="form-control inputReset"
                    type="text"
                    placeholder="STATE                                                                                                            California"
                  />
                  <p className="addVehicle">+ Add Vehicle</p>
                </form>
                <button className="bgButton d-flex align-items-center justify-content-center">
                  <span className="submitBtn">Submit</span>
                </button>
              </div>
            </div>
          )}
          {activeSection === "otherInfo" && (
            <div className="orderInfoPrimary d-flex align-items-center">
              <h2 className=" ">Other Information</h2>
              <div className="orderInfo d-flex align-items-center">
                <div className="leftBox d-flex align-items-start justify-content-center">
                  <div className="leftSideInfo d-flex">
                    <p className="infoP">Have You Ever Been Evicted?</p>
                    <img
                      src={toggleOn1 ? ToggleYes : ToggleNo}
                      alt=""
                      className={`toggle ${toggleOn1 ? "active" : "inactive"}`}
                      onClick={handleClickToggle1}
                    />
                  </div>
                  <div className="inputInfoH">
                    {toggleOn1 && (
                      <input
                        className="inputReset4"
                        type="text"
                        placeholder="WHEN & WHY"
                      />
                    )}
                  </div>
                  <div className="leftSideInfo d-flex">
                    <p className="infoP">
                      Have You Ever Been Convicted Of A Felony?
                    </p>
                    <img
                      src={toggleOn2 ? ToggleYes : ToggleNo}
                      alt=""
                      className={`toggle ${toggleOn2 ? "active" : "inactive"}`}
                      onClick={handleClickToggle2}
                    />
                  </div>
                  <div className="inputInfoH">
                    {toggleOn2 && (
                      <input
                        className="inputReset4"
                        type="text"
                        placeholder="WHEN & WHY"
                      />
                    )}
                  </div>
                  <div className="leftSideInfo d-flex">
                    <p className="infoP">Have You Ever Filed For Bankruptcy?</p>
                    <img
                      src={toggleOn3 ? ToggleYes : ToggleNo}
                      alt=""
                      className={`toggle ${toggleOn3 ? "active" : "inactive"}`}
                      onClick={handleClickToggle3}
                    />
                  </div>
                  <div className="inputInfoH">
                    {toggleOn3 && (
                      <input
                        className="inputReset4"
                        type="text"
                        placeholder="WHEN & WHY"
                      />
                    )}
                  </div>
                </div>
                <div className="rightBox d-flex align-items-start justify-content-center">
                  <div className="rightSideInfo d-flex">
                    <p className="infoP">Do You Currently Smoke?</p>
                    <img
                      src={toggleOn4 ? ToggleYes : ToggleNo}
                      alt=""
                      className={`toggle ${toggleOn4 ? "active" : "inactive"}`}
                      onClick={handleClickToggle4}
                    />
                  </div>
                  <div className="leftSideInfo rs d-flex">
                    <p className="infoP">Do You Have Any Pets?</p>
                    <img
                      src={toggleOn5 ? ToggleYes : ToggleNo}
                      alt=""
                      className={`toggle ${toggleOn5 ? "active" : "inactive"}`}
                      onClick={handleClickToggle5}
                    />
                  </div>
                  <div className="inputInfoH">
                    {toggleOn5 && (
                      <span className="pets">
                        PLEASE LIST EACH TYPE, BREED & APPROX. WEIGHT
                      </span>
                    )}
                    {toggleOn5 && (
                      <input
                        className="inputReset4 pet"
                        type="text"
                        placeholder="Cat, Persian, 3.6 Kg"
                      />
                    )}
                  </div>
                  <div className="inputR">
                    <input
                      className="inputReset4 rightF"
                      type="text"
                      placeholder="HOW DID YOU LEARN ABOUT US?"
                    />
                  </div>
                </div>
              </div>
              <button className="bgButton d-flex align-items-center justify-content-center">
                <span className="submitBtn">Submit</span>
              </button>
            </div>
          )}
          {activeSection === "agreement" && (
            <div className="AGContainer d-flex align-items-center">
              <h2 className="AGTitle mt-5">
                Agreement & Consent to Background Check
              </h2>
              <p className="AGText">
                I believe that the statements I have made are true and correct.
                I hereby authorize the verification of information I provided,
                communication with any and all names listed on this application
                and for the issuer of this form to conduct a background check to
                obtain additional information on credit history, criminal
                history and all Unlawful Detainers. I understand that any
                discrepancy or lack of information may result in the rejection
                of this application. I understand that this is an application
                for a home or apartment and does not constitute a rental or
                lease agreement in whole or in part. I further understand that
                there is a non-refundable fee to cover the cost of processing my
                application and I am not entitled to a refund.
              </p>
              <div className="AGOrder1 d-flex">
                <p className="signatureText align-items-start">
                  SIGNATURE
                  <span className="signatureSpan">+ Add A Signature</span>
                </p>
                <input
                  className="input4"
                  type="text"
                  placeholder="DATE                                                                                                               15/02/2023"
                />
              </div>
              <div className="AGOrder2 d-flex justify-content-start">
                <h3>Co-Signer</h3>
                <p>
                  By signing this form, Co-signer authorizes the landlord to
                  perform a credit check or background check, if necessary.
                  Co-signer forms are accepted at the landlord’s discretion, and
                  a co-signer form does not in any way guarantee an applicant a
                  rental unit. Failure to fully complete a requested co-signer
                  form may result in the landlord refusing a rental application.
                </p>
                <div className="AGInputContainer d-flex">
                  <div className="AGInputOrder d-flex">
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="FULL LEGAL NAME                                                                              Leonardo Kramer"
                    />
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="DRIVER LICENSE # / STATE                                                                     A0003664, Ca"
                    />
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="BIRTH DATE                                                                                                       7/14/1980"
                    />
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="CURRENT EMPLOYER NAME / PHONE #               Aabc Corporation / 530-521-7450"
                    />
                  </div>
                  <div className="AGInputOrder2 d-flex">
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="PHONE NO.                                                                                                530-521-7450                                                                                      Leonardo Kramer"
                    />
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="SOCIAL SECURITY                                                                                                      492"
                    />
                    <input
                      className="inputReset5"
                      type="text"
                      placeholder="EMAIL                                                                                         joshuasmith@gmail.com"
                    />
                  </div>
                </div>
                <div className="AGOrder3">
                  <h3>Co-Signing for</h3>
                  <div className="divAGOrder">
                    <input
                      className="inputReset5 inputAG1"
                      type="text"
                      placeholder="FULL NAME                                                                                              MARIA KRAMER"
                    />
                    <input
                      className="inputReset5 inputAG2"
                      type="text"
                      placeholder="UNIT APPLIED FOR                                                                                                  46780"
                    />
                  </div>
                </div>
                <p>
                  It is hereby agreed that the aforementioned Co-signer will
                  assume any and all responsibilities and/or obligations of the
                  Leaseholder’s share of expenses if the Leaseholder cannot or
                  will not oblige. This Co-signer Agreement will remain in force
                  throughout the entire term of the Leaseholder’s tenancy, even
                  if the tenancy is extended and/or changed in its terms.
                </p>
                <div className="AGOrder1end d-flex">
                  <p className="signatureTextAg align-items-start">
                    SIGNATURE
                    <span className="signatureSpan">+ Add A Signature</span>
                  </p>
                  <input
                    className="input4 iag"
                    type="text"
                    placeholder="DATE                                                                                                               15/02/2023"
                  />
                </div>
              </div>
              <button className="bgButton3 agBtn d-flex align-items-center justify-content-center">
                  <span className="submitBtn3 agBtn">Submit</span>
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
