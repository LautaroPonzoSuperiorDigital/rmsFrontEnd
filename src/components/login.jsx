import { useCallback, useEffect, useRef, useState } from "react";
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

  const { isAuthenticated, user, onSignedIn } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef(null)

  const windowWidth = window.innerWidth;

  const navigateUser = useCallback(
    (userRole) => {
      switch (userRole) {
        case "ADMIN":
          navigate("/admin/listings");
          break;
        case "TENANT":
          if (windowWidth > 900) {
            console.log(windowWidth);
            navigate("/tenants/public-listings");
          } else {
            navigate("/tenants");
          }
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/auth/local/signin", {
        email,
        password,
      });

      onSignedIn({ loggedUser: data.user, accessToken: data.accessToken });

      navigateUser(data.user.role);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login.",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateUser(user.role);
    }
  }, [isAuthenticated, user, navigateUser]);

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <div className="loginBgContainer">
      <div className="LoginContainer">
        <img className="logo" src={Logo} alt="Logo" />
        <form className="form" onSubmit={handleLogin}>
          <input
            ref={emailRef}
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
          <button className="button" type="submit">
            Log In
          </button>
        </form>
      </div>
      {/* Responsive */}
      <div className="responsiveOrderLogin d-flex align-items-center justify-content-center">
        <div className="responsiveLoginForm d-flex">
          <form
            className="responsiveForm d-flex justify-content-center align-items-center"
            action="submit"
            onSubmit={handleLogin}
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
              type="password"
            />
            <div className="d-flex w-100 justify-content-end">
              <p className="fpResponsive ">Forgot Password?</p>
            </div>
            <div className="responsiveLoginBtnContainer d-flex align-items-center justify-content-center">
              <button className="loginBtnTextResponsive" type="submit">
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
