import React, { useState } from "react"
import { api } from "../../../../services/api"

const OtherInfo = ({ tenantId, setActiveSection }) => {
  const [formData, setFormData] = useState({
    isEvicted: false,
    evicted: "",
    isConvicted: false,
    convicted: "",
    isBankrupt: false,
    bankrupt: "",
    isSmoken: false,
    isPets: false,
    pets: "",
    aboutUS: ""
  })

  const handleCheckboxChange = (name, isChecked) => {
    setFormData({
      ...formData,
      [name]: isChecked
    })
  }

  const handleDetailsChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePetDetailsChange = (value) => {
    setFormData({
      ...formData,
      pets: {
        ...formData.pets,
        petDetails: value
      }
    })
  }

  const handleLearnAboutUsChange = (value) => {
    setFormData({
      ...formData,
      learnAboutUs: value
    })
  }

  const handleSubmit = async () => {
    try {
      const reponse = await api.post("/other-info", {
        ...formData,
        tenantId
      })
      console.log(reponse.data)
      setActiveSection("backgroundSreening")
    } catch (error) {
      console.error("Error submitting emergency contact:", error)
    }
  }

  return (
    <div className=" d-flex flex-column align-items-center w-100 ">
      <h2 className="mb-5">Other Information</h2>
      <div className="orderInfo ">
        <div className="formContainer " style={{ marginLeft: 0 }}>
          <div className="leftSideInfo d-flex">
            <p className="infoP">Have You Ever Been Evicted?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault1"
                checked={formData.isEvicted}
                onChange={(e) =>
                  handleCheckboxChange("isEvicted", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.isEvicted && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.evicted}
                onChange={(e) => handleDetailsChange("evicted", e.target.value)}
              />
            )}
          </div>
          <div className="leftSideInfo d-flex">
            <p className="infoP">Have You Ever Been Convicted Of A Felony?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault2"
                checked={formData.isConvicted}
                onChange={(e) =>
                  handleCheckboxChange("isConvicted", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.isConvicted && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.convicted}
                onChange={(e) =>
                  handleDetailsChange("convicted", e.target.value)
                }
              />
            )}
          </div>

          <div className="leftSideInfo d-flex">
            <p className="infoP">Have You Ever Filed For Bankruptcy?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault3"
                checked={formData.isBankrupt}
                onChange={(e) =>
                  handleCheckboxChange("isBankrupt", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.isBankrupt && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.bankrupt}
                onChange={(e) =>
                  handleDetailsChange("bankrupt", e.target.value)
                }
              />
            )}
          </div>
        </div>
        {/* half */}
        <div className="smokeContainer d-flex align-items-start justify-content-center">
          <div className="rightSideInfo d-flex">
            <p className="infoP">Do You Currently Smoke?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault4"
                checked={formData.isSmoken}
                onChange={(e) =>
                  handleCheckboxChange("isSmoken", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="leftSideInfo rs d-flex">
            <p className="infoP">Do You Have Any Pets?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault5"
                checked={formData.isPets}
                onChange={(e) =>
                  handleCheckboxChange("isPets", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.isPets && (
              <span className="">
                PLEASE LIST EACH TYPE, BREED & APPROX. WEIGHT
              </span>
            )}
            {formData.isPets && (
              <input
                className="inputReset4 pet "
                type="text"
                placeholder="Cat, Persian, 3.6 Kg"
                value={formData.pets}
                onChange={(e) => handleDetailsChange("pets", e.target.value)}
              />
            )}
          </div>
          <div className="inputR mt-5">
            <input
              className="howDidInput "
              type="text"
              placeholder="HOW DID YOU LEARN ABOUT US?"
              value={formData.aboutUS}
              onChange={(e) => handleDetailsChange("aboutUS", e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="submitOther d-flex align-items-center justify-content-center"
        onClick={handleSubmit}
      >
        <span className="submitBtn">Submit</span>
      </button>
    </div>
  )
}

export default OtherInfo
