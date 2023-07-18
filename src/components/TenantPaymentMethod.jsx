import React, { useState } from "react";
import "../styles/Responsive/tenantsMobile.css";
import Profile from "../assets/img/Profile.svg";
import ProfileHover from "../assets/img/ProfileHover.svg";
import DocumentIcon from "../assets/img/DocumentIcon.svg";
import DocumentIconHover from "../assets/img/DocumentIconHover.svg";
import CreditCardIcon from "../assets/img/CreditCardIcon.svg";
import CreditCardIconHover from "../assets/img/CreditCardIconHover.svg";
import BubbleChatIcon from "../assets/img/BubbleChatIcon.svg";
import BubbleChatIconHover from "../assets/img/BubbleChatIconHover.svg";
import QuitArrowTenants from "../assets/img/QuitArrowTenants.svg";
import CreditCardOption from "../assets/img/CreditCardOption.svg";
import AddPaymentMethod from "./AddPaymentMethod";

const PaymentMethod = ({ onCloseModal }) => {
  const [isProfileHovered, setProfileHovered] = useState(false);
  const [isBubbleChatIconHovered, setBubbleChatIconHovered] = useState(false);
  const [isDocumentIconHovered, setDocumentIconHovered] = useState(false);
  const [isCreditCardIconHovered, setCreditCardIconHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isModalTicketRepar, setModalTicketRepar] = useState(false);

  const handleCloseModal = () => {
    onCloseModal();
  };
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    /* TENANTS MOBILE */

    <div className={`paymentMethodOverlay ${isModalOpen ? "" : "hidden"}`}>
      <div className="d-flex align-items-center justify-content-between profileBarMobile2">
        <button className="quitArrow" onClick={handleCloseModal}>
          <img src={QuitArrowTenants} alt="ProfileImg" />
        </button>

        <h1>PAYMENTS</h1>
        <button className="ProfileImgPaymentMethod">
          <img
            src={isProfileHovered ? ProfileHover : Profile}
            alt="ProfileImg"
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          />
        </button>
      </div>
      <div className="addCards d-flex align-items-center justify-content-between flex-direction-row">
        <p className="PaymentMethodText m-0">Payment Methods</p>
        <button className="btnAddResponsive" onClick={handleOpenAddModal}>
          <p className="m-0">+ ADD</p>
        </button>
      </div>
      <div className="creditCardOptions d-flex">
        <div className="creditCardInput d-flex align-items-center justify-content-between">
          <p className="m-0 ms-2 mt-1">Visa ****3564</p>
          <img src={CreditCardOption} alt="" className="arrowOption" />
        </div>
        <div className="creditCardInput d-flex align-items-center justify-content-between">
          <p className="m-0 ms-2 mt-1">Mastercard ****7558</p>
          <img src={CreditCardOption} alt="" className="arrowOption" />
        </div>
      </div>
      <div className="RentPaymentDueOptions d-flex flex-column">
        <p className="d-flex align-items-start justify-content-start mb-0 dueText">
          Rent Payment Due
        </p>
        <p className="dueDate mb-2">Mar 1, 2023 | $4,500.00</p>
        <button className="MakeAPaymentMobileBtn d-flex align-items-center justify-content-center">
          <span className="MakeAPaymentMobileText d-flex align-items-center justify-content-center">
            Make A Payment
          </span>
        </button>
      </div>
      <div className="paymentHistoryMobile d-flex align-items-start mt-3">
        <p className="dueText mb-0">Payment History</p>
        <div className="tablePaymentMobile d-flex">
          <div className="PaymentTdMobile">
            <p className="dateHistory mb-0">Feb 1, 2023 | $4,500.00</p>
            <p className="dateHistoryP">
              **** 3564 <span>ON TIME</span>
            </p>
          </div>
          <div className="PaymentTdMobile">
            <p className="dateHistory mb-0">Feb 1, 2023 | $4,500.00</p>
            <p className="dateHistoryP">
              **** 3564 <span>ON TIME</span>
            </p>
          </div>
          <div className="PaymentTdMobile">
            <p className="dateHistory mb-0">Feb 1, 2023 | $4,500.00</p>
            <p className="dateHistoryP">
              **** 3564 <span>ON TIME</span>
            </p>
          </div>
          <div className="PaymentTdMobile">
            <p className="dateHistory mb-0">Feb 1, 2023 | $4,500.00</p>
            <p className="dateHistoryP d-flex">
              **** 3564 <span className="ms-1 LatePayment">LATE</span>
              <p className="ms-1">FINE $150.00</p>
            </p>
          </div>
          <div className="PaymentTdMobile">
            <p className="dateHistory mb-0">Feb 1, 2023 | $4,500.00</p>
            <p className="dateHistoryP">
              **** 3564 <span>ON TIME</span>
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mobileFooterMainMenu d-flex align-items-center justify-content-between">
        <button className="iconOrderMobile d-flex justify-items-center align-items-center ChatIcon">
          <img
            src={isBubbleChatIconHovered ? BubbleChatIconHover : BubbleChatIcon}
            alt="ChatIcon"
            onMouseEnter={() => setBubbleChatIconHovered(true)}
            onMouseLeave={() => setBubbleChatIconHovered(false)}
          />
          <p>Contact Us</p>
        </button>

        <button className="iconOrderMobile d-flex justify-items-center align-items-center">
          <img
            src={isDocumentIconHovered ? DocumentIconHover : DocumentIcon}
            alt="ChatIcon"
            className="DocumentIcon"
            onMouseEnter={() => setDocumentIconHovered(true)}
            onMouseLeave={() => setDocumentIconHovered(false)}
          />
          <p>Documents</p>
        </button>

        <button className="iconOrderMobile d-flex justify-items-center align-items-center CreditCard">
          <img
            src={isCreditCardIconHovered ? CreditCardIconHover : CreditCardIcon}
            alt="CreditCard"
            className={`CreditCardIcon ${
              isCreditCardIconHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setCreditCardIconHovered(true)}
            onMouseLeave={() => setCreditCardIconHovered(false)}
            onClick={() => setPaymentMethodOpen(true)}
          />
          <p>Payments</p>
        </button>
      </div>
      {isAddModalOpen && (
        <AddPaymentMethod onCloseModal={handleCloseAddModal} />
      )}
    </div>
    /* TENANTS MOBILE */
  );
};

export default PaymentMethod;
