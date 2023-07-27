import { useState } from "react";
import Profile from "../assets/img/Profile.svg";
import ProfileHover from "../assets/img/ProfileHover.svg";
import QuitArrowTenants from "../assets/img/QuitArrowTenants.svg";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const TenantNavBar = ({ title, onCloseModal, redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileHovered, setProfileHovered] = useState(false);
  const isTenantProfilePage = location.pathname === "/tenants/profile";
  return (
    <div className="d-flex align-items-center justify-content-between w-100 mb-2">
      <div>
        <button
          className="quitArrow"
          onClick={() => (onCloseModal ? onCloseModal() : navigate(redirect))}
        >
          <img src={QuitArrowTenants} alt="ProfileImg" />
        </button>
      </div>
      <div>
        <p className="m-0 d-flex align-items-center w-100">{title}</p>
      </div>
      <div>
        <img
          onClick={() => navigate("/tenants/profile")}
          src={isProfileHovered || isTenantProfilePage ? ProfileHover : Profile}
          alt="ProfileImg"
          onMouseEnter={() => setProfileHovered(true)}
          onMouseLeave={() => setProfileHovered(false)}
        />
      </div>
    </div>
  );
};
TenantNavBar.propTypes = {
  title: PropTypes.string,
  onCloseModal: PropTypes.func,
  redirect: PropTypes.string,
};

export default TenantNavBar;
