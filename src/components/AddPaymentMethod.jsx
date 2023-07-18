import React, { useState } from "react";
import "../styles/Responsive/tenantsMobile.css";
import QuitArrowTenants from "../assets/img/QuitArrowTenants.svg";
import Profile from "../assets/img/Profile.svg";
import ProfileHover from "../assets/img/ProfileHover.svg";

const AddPaymentMethod = ({ onCloseModal }) => {
  const [isProfileHovered, setProfileHovered] = useState(false);
  const [inputValueCardNumber, setInputValueCardNumber] = useState("");
  const [inputValueName, setInputValueName] = useState("");

  const handleInputChange = (event) => {
    setInputValueCardNumber(event.target.value);
  };
  const handleInputChangeName = (event) => {
    setInputValueName(event.target.value);
  };

  return (
    <div className="AddPaymentMethodBg d-flex align-items-start">
      <div className="d-flex align-items-center justify-content-between profileBarMobile2">
        <button className="quitArrow" onClick={onCloseModal}>
          <img src={QuitArrowTenants} alt="ProfileImg" />
        </button>
        <h1>ADD PAYMENT METHOD</h1>
        <button className="ProfileImgPaymentMethod">
          <img
            src={isProfileHovered ? ProfileHover : Profile}
            alt="ProfileImg"
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          />
        </button>
      </div>
      <div className="placeHolderDivOrder d-flex flex-column">
        <div className="placeHolderTextOrder d-flex">
          <input
            className="inputAddCard"
            type="text"
            placeholder="CARD NO"
            value={inputValueCardNumber}
            onChange={handleInputChange}
          />
          {inputValueCardNumber.length === 0 && <p>5673 9303 3034 3564</p>}
        </div>
        <div className="placeHolderTextOrder d-flex">
          <input
            className="inputAddCard"
            type="text"
            placeholder="CARD HOLDER NAME"
            value={inputValueName}
            onChange={handleInputChangeName}
          />
          {inputValueName.length === 0 && <p>Maria Kramer</p>}
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
