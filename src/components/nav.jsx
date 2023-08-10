import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.svg";
import Logout from "../assets/img/Logout.svg";
import SearchIcon from "../assets/img/SearchIcon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/nav.css";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const navigate = useNavigate()
  const { user, onSignedOut } = useAuth()

  const handleSignOut = () => [
    onSignedOut()
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          onClick={() => navigate("/admin/listings")}
        >
          <img className="logoNav" src={Logo} alt="Logo" />
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link custom-item"
                to="/admin/listings"
              >
                LISTINGS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link custom-item"
                to="/admin/tenants"
              >
                TENANTS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link custom-item"
                to="/admin/applicants"
              >
                APPLICANTS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link custom-item"
                to="/admin/documents"
              >
                DOCUMENTS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link custom-item"
                to="/admin/sub-admins"
              >
                SUB ADMINS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link chat"
                to="/admin/chats"
              >
                CHATS
                <img className="Search" src={SearchIcon} alt="Search" />
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-auto username">
          <li className="nav-item d-flex align-items-center">
            <NavLink className="nav-link user" to="/profile">
              <span className="username-text">{user?.name}</span>
            </NavLink>
            <button className="nav-link logout" onClick={handleSignOut}>
              <img className="Logout" src={Logout} alt="Logout" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
