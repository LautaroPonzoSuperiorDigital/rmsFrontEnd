import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
// import { MessageContainer, MessageText, MessageTitle } from "../styles"

const ScrenningFinished = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const image = location.state?.image

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
  const contentBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // You can adjust the background color and opacity
    padding: "20px",
    width: "100%",
    maxWidth: "800px",
    borderRadius: "10px",
    textAlign: "center"
  }
  const titleStyle = {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "25px"
  }
  const textStyle = {
    color: "#000000",
    fontSize: "25px"
  }

  const buttonStyle = {
    backgroundColor: "#197572",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }

  const handleClick = () => {
    navigate("/")
  }
  return (
    <div style={backgroundStyle}>
      <div style={contentBoxStyle}>
        <div style={titleStyle}>Thank you for submitting your information</div>
        <div style={textStyle}>
          Your request is being reviewed. If you are contacted within the next
          10 business days, then at that time we will discuss further assessment
          and information needed as a tenant.
        </div>
        <button onClick={handleClick} style={buttonStyle}>
          HOME!
        </button>
      </div>
    </div>
  )
}

export default ScrenningFinished
