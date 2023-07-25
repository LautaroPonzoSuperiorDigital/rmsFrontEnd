import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.svg";
import "../app.css";
import "../styles/login.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AppContext } from "../context/userContext";

const Login = () => {
  const { setCurrentUser, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://api.certifymyrent.com/auth/local/signin`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { role } = response.data;
        setCurrentUser(response.data);

        if (role === "ADMIN") {
          setLoggedIn(true);
          navigate("/listingsAdmin");
        }

        if (role === "TENANT") {
          setLoggedIn(true);
          navigate("/listingsAdmin");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login.",
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
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
