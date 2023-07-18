import { useState } from "react";
import "../styles/Responsive/tenantsMobile.css";
import Profile from "../assets/img/Profile.svg";
import ProfileHover from "../assets/img/ProfileHover.svg";
import DocumentIcon from "../assets/img/DocumentIcon.svg";
import DocumentIconHover from "../assets/img/DocumentIconHover.svg";
import CreditCardIcon from "../assets/img/CreditCardIcon.svg";
import CreditCardIconHover from "../assets/img/CreditCardIconHover.svg";
import BubbleChatIcon from "../assets/img/BubbleChatIcon.svg";
import BubbleChatIconHover from "../assets/img/BubbleChatIconHover.svg";
import PaymentMethod from "./TenantPaymentMethod";
import TenantsRepairTicket from "./TenantsRepairTicket";
import TenantComplaintTicket from "./TenantComplaintTicket";

const Tenants = () => {
  /* Hovers */
  const [isProfileHovered, setProfileHovered] = useState(false);
  const [isBubbleChatIconHovered, setBubbleChatIconHovered] = useState(false);
  const [isDocumentIconHovered, setDocumentIconHovered] = useState(false);
  const [isCreditCardIconHovered, setCreditCardIconHovered] = useState(false);
  /* Hovers */
  /* Screens */
  const [isPaymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [isModalTicketRepair, setModalTicketRepair] = useState(false);
  const [isModalTicketComplaint, setModalTicketComplaint] = useState(false);

  /* Screens */
  /* Functions */
  const handleCloseModal = () => {
    setPaymentMethodOpen(false);
  };
  const handleCloseTicketRepair = () => {
    setModalTicketRepair(false);
  };
  const handleCloseTicketComplaint = () => {
    setModalTicketComplaint(false);
  };
  /* Functions */
  return (
    /* TENANTS MOBILE */

    <div className="bgTenants">
      {isPaymentMethodOpen && <PaymentMethod onCloseModal={handleCloseModal} />}
      {isModalTicketRepair && (
        <TenantsRepairTicket onCloseModal={handleCloseTicketRepair} />
      )}
      {isModalTicketComplaint && (
        <TenantComplaintTicket onCloseModal={handleCloseTicketComplaint} />
      )}
      <div className="d-flex align-items-center justify-content-between profileBarMobile">
        <h1>CONTACT US</h1>
        <button>
          <img
            src={isProfileHovered ? ProfileHover : Profile}
            alt="ProfileImg"
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          />
        </button>
      </div>
      <div className="tenantsContainerMobileButtons d-flex align-items-center justify-content-center">
        <div className="divisionButtonContainer">
          <div
            className="d-flex align-items-center justify-content-center w-100"
            onClick={() => setModalTicketRepair(true)}
          >
            <p className="pOrderMobile m-2">Create A Repair Ticket</p>
          </div>
        </div>
        <div className="divisionButtonContainer">
          <div className="d-flex align-items-center justify-content-center w-100">
            <p
              className="pOrderMobile m-2"
              onClick={() => setModalTicketComplaint(true)}
            >
              Create A Complaint Ticket
            </p>
          </div>
        </div>
        <div className="divisionButtonContainer">
          <div className="d-flex align-items-center justify-content-center w-100">
            <p className="pOrderMobile m-2">Chat With The Manager</p>
          </div>
        </div>
      </div>
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
    </div>
    /* TENANTS MOBILE */
  );
};

export default Tenants;
