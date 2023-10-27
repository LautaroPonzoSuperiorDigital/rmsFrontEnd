/* eslint-disable react/prop-types */
import { ScreeningText } from "../styles"

import { api } from "../../../../services/api"
import { env } from "../../../../config/env"
import { useNavigate } from "react-router-dom"

const BackgroundScreening = ({
  myselectedListing,
  formData,
  userId,
  imageSrc
}) => {
  const navigate = useNavigate()

  const handleStartScreening = async () => {
    let data = {
      userId: userId,
      listingId: myselectedListing.id,
      status: "PENDING",
      location: myselectedListing.location,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber
    }
    console.log("fetch", userId)

    try {
      console.log(data)
      const response = await api.post("/application-screening", data)
      window.open(env.rentSpreeLink, "_blank")
      navigate("/screeningFinished", { state: { image: imageSrc } })
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div
      className="h-100 d-flex flex-column justify-content-center "
      style={{ marginTop: "160px" }}
    >
      <ScreeningText>Background Screening</ScreeningText>
      <div
        style={{
          height: "100%",
          maxHeight: "45px",
          width: "100%",
          maxWidth: "580px"
        }}
        className="mt-5"
      >
        <button
          className=" bgButton  d-flex align-items-center justify-content-center w-100"
          onClick={handleStartScreening}
          style={{ margin: "0px" }}
        >
          <span className="submitBtn">Start Screening</span>
        </button>
      </div>
    </div>
  )
}

export default BackgroundScreening
