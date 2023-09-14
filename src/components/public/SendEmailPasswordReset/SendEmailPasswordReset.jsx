import { useState } from "react";
import Logo from "../../../assets/img/Logo.svg";
import "../../../app.css";
import "../../../styles/login.css";
import { api } from "../../../services/api";
import styled from "styled-components";

const ResponsiveTexthide = styled.p`
  color: white;
  font-weight: 600;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const SendEmailPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/auth/local/send-password-notification`,
        { email }
      );
      console.log(response.data);
      setEmail("");
      setMessage("Email sent successfully, please check you mailbox");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="loginBgContainer">
      <div className="LoginContainer">
        <img className="logo" src={Logo} alt="Logo" />
        <form className="form" onSubmit={handleRecoverPassword}>
          <input
            className="inputs"
            type="email"
            name="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="button" type="submit">
            Recover Password
          </button>
          <p style={{ color: "#08695E", fontWeight: 600 }}>{message}</p>
        </form>
      </div>
      {/* Responsive */}
      <div className="responsiveOrderLogin d-flex align-items-center justify-content-center">
        <div className="responsiveLoginForm d-flex">
          <form
            className="responsiveForm d-flex justify-content-center align-items-center"
            action="submit"
            onSubmit={handleRecoverPassword}
          >
            <div className="containerLogoResponsive">
              <img className="logoResponsive" src={Logo} alt="Logo" />
            </div>
            <input
              className="responsiveInputLogin mb-5"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <div className="responsiveLoginBtnContainer d-flex align-items-center justify-content-center">
              <button className="loginBtnTextResponsive" type="submit">
                Recover Password
              </button>
            </div>
            <ResponsiveTexthide>{message}</ResponsiveTexthide>
          </form>
        </div>
      </div>
      {/* Responsive */}
    </div>
  );
};
