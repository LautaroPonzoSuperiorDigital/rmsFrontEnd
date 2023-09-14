import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Logo from "../../../assets/img/Logo.svg";

import { api } from "../../../services/api";

import "../../../app.css";
import "../../../styles/login.css";
import styled from "styled-components";

const ResponsiveTexthide = styled.p`
  color: white;
  font-weight: 600;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoback = () => {
    navigate("/login");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/local/reset-password/${id}`, {
        password,
      });
      console.log(response.data);
      setPassword("");
      setMessage("Password changed successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginBgContainer">
      <div className="LoginContainer">
        <img className="logo" src={Logo} alt="Logo" />
        <form className="form" onSubmit={handleResetPassword}>
          <input
            className="inputs"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Reset my Password
          </button>
          <button className="button mt-3" type="button" onClick={handleGoback}>
            Go Back
          </button>
          <p>{message}</p>
        </form>
      </div>
      {/* Responsive */}
      <div className="responsiveOrderLogin d-flex align-items-center justify-content-center">
        <div className="responsiveLoginForm d-flex">
          <form
            className="responsiveForm d-flex justify-content-center align-items-center"
            action="submit"
            onSubmit={handleResetPassword}
          >
            <div className="containerLogoResponsive">
              <img className="logoResponsive" src={Logo} alt="Logo" />
            </div>

            <input
              className="responsiveInputLogin mb-5"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <div className="responsiveLoginBtnContainer d-flex align-items-center justify-content-center">
              <button className="loginBtnTextResponsive" type="submit">
                Reset my Password
              </button>
            </div>
            <div className="responsiveLoginBtnContainer d-flex align-items-center justify-content-center mt-2">
              <button
                className="loginBtnTextResponsive "
                type="button"
                onClick={handleGoback}
              >
                Go Back
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

export default ResetPassword;
