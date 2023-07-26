import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Logo from "../assets/img/Logo.svg";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

import "../app.css";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onSignedIn } = useAuth()

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/local/signin', {
        email,
        password
      })

      onSignedIn({ loggedUser: data.user, accessToken: data.accessToken })
      
      switch (data.user.role) {
        case 'ADMIN':
          navigate('/listingsAdmin')
          break
        case 'TENANT':
          navigate('/tenants')
          break
        default:
          break
      }

      if (data.user.role === "ADMIN") {
        navigate("/listingsAdmin")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login.",
      });
    }
  };

  return (
    <div className="loginBgContainer">
      <div className="LoginContainer">
        <img className="logo" src={Logo} alt="Logo" />
        <div className="form">
          <input
            className="inputs"
            type="email"
            name="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputs"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="forgotPassword" className="forgot">
            Forgot password?
          </a>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log In
          </button>
        </div>
      </div>
      {/* Responsive */}
      <div className="responsiveOrderLogin d-flex align-items-center justify-content-center">
        <div className="responsiveLoginForm d-flex">
          <form
            className="responsiveForm d-flex justify-content-center align-items-center"
            action="submit"
          >
            <div className="containerLogoResponsive">
              <img className="logoResponsive" src={Logo} alt="Logo" />
            </div>
            <input
              className="responsiveInputLogin"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <input
              className="responsiveInputLogin"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />
            <div className="d-flex w-100 justify-content-end">
              <p className="fpResponsive ">Forgot Password?</p>
            </div>
            <div className="responsiveLoginBtnContainer d-flex align-items-center justify-content-center">
              <button
                className="loginBtnTextResponsive"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Responsive */}
    </div>
  );
};

export default Login;
