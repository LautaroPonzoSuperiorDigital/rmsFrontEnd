import TenantNavBar from "./TenantNavBar";
import "../styles/Responsive/tenantsMobile.css";
import logOut from "./../assets/img/logOutTentant.svg";
import { AppContext } from "../context/userContext";
import { useContext } from "react";

const inputStyle = {
  border: "none",
  borderBottom: "1px solid #ccc",
  color: "#272727",
  fontSize: "20px",
};

const TenantsProfile = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <div className="containerTicketRepair p-2">
      <TenantNavBar title="Profile" redirect="/tenants" />
      <form className="d-flex flex-column h-100 justify-content-between w-100  ">
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
              placeholder={currentUser.name}
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
              placeholder={currentUser.email}
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
              placeholder={currentUser.phoneNumber}
              style={inputStyle}
              required
            />
          </div>
          <div className="form-group d-flex justify-content-between align-items-center">
            <label
              htmlFor="cnn"
              style={{ color: "#000000A5", fontSize: "15px" }}
            >
              CNN
            </label>
            <input
              className="form-control  w-75 border-bottom"
              id="cnn"
              name="cnn"
              placeholder="***"
              style={inputStyle}
              required
            />
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              style={{ fontSize: "16px", fontWeight: "600" }}
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
      </form>
    </div>
  );
};

export default TenantsProfile;
