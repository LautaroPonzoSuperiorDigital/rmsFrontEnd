import "../styles/Responsive/tenantsMobile.css";
import logOut from "./../assets/img/logOutTentant.svg";
import { useAuth } from "../hooks/useAuth";
import { styled } from "styled-components";
import { useEffect } from "react";
import { useTenantsLayout } from "../layouts/tenants/context";

const inputStyle = {
  border: "none",
  borderBottom: "1px solid #ccc",
  color: "#272727",
  fontSize: "20px",
};

const TenantsProfileContainer = styled.form`
  height: 100%;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TenantsProfile = () => {
  const { user, onSignedOut } = useAuth();
  const { hideNavbar, showNavbar } = useTenantsLayout();

  const handleSignOut = () => {
    onSignedOut();
  };
  useEffect(() => {
    hideNavbar();

    return showNavbar;
  }, [hideNavbar, showNavbar]);

  return (
    <TenantsProfileContainer>
      <div>
        <div className="form-group d-flex justify-content-between align-items-center">
          <label
            htmlFor="legalName"
            style={{ color: "#000000A5", fontSize: "15px" }}
          >
            Legal Name
          </label>
          <input
            className="form-control  w-75 border-bottom"
            id="legalName"
            name="legalName"
            placeholder={user.name}
            style={inputStyle}
            required
          />
        </div>
        <div className="form-group d-flex justify-content-between align-items-center">
          <label
            htmlFor="email"
            style={{ color: "#000000A5", fontSize: "15px" }}
          >
            Email
          </label>
          <input
            className="form-control  w-75 border-bottom"
            id="email"
            name="email"
            placeholder={user.email}
            style={inputStyle}
            required
          />
        </div>
        <div className="form-group d-flex justify-content-between align-items-center">
          <label
            htmlFor="password"
            style={{ color: "#000000A5", fontSize: "15px" }}
          >
            Password
          </label>
          <input
            className="form-control  w-75 border-bottom"
            id="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            required
          />
        </div>
        <div className="form-group d-flex justify-content-between align-items-center">
          <label
            htmlFor="phone"
            style={{ color: "#000000A5", fontSize: "15px" }}
          >
            PHONE
          </label>
          <input
            className="form-control  w-75 border-bottom"
            id="phone"
            name="phone"
            placeholder={user.phoneNumber}
            style={inputStyle}
            required
          />
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-outline-danger w-100"
            style={{ fontSize: "16px", fontWeight: "600" }}
            onClick={handleSignOut}
          >
            <img src={logOut} alt="logOut" />
            Log Out
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="w-50 d-flex justify-content-center"
          style={{
            color: " #000000A5",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <button>Cancel</button>
        </div>
        <div className="w-50 d-flex justify-content-center">
          <button
            style={{
              color: " #197572",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </TenantsProfileContainer>
  );
};

export default TenantsProfile;
