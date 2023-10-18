import React, { useState } from "react"

const OtherInfo = () => {
  const [formData, setFormData] = useState({
    evicted: { checked: false, details: "" },
    convicted: { checked: false, details: "" },
    bankruptcy: { checked: false, details: "" },
    smoke: { checked: false },
    pets: { checked: false, petDetails: "" },
    learnAboutUs: ""
  })

  const handleCheckboxChange = (name, isChecked) => {
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        checked: isChecked
      }
    })
  }

  const handleDetailsChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        details: value
      }
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

  const handleSubmit = () => {
    // You can access the form data in the `formData` state object
    console.log(formData)
    // Perform any further actions, like sending the data to a server
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
                checked={formData.evicted.checked}
                onChange={(e) =>
                  handleCheckboxChange("evicted", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.evicted.checked && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.evicted.details}
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
                checked={formData.convicted.checked}
                onChange={(e) =>
                  handleCheckboxChange("convicted", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.convicted.checked && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.convicted.details}
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
                checked={formData.bankruptcy.checked}
                onChange={(e) =>
                  handleCheckboxChange("bankruptcy", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.bankruptcy.checked && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
                value={formData.bankruptcy.details}
                onChange={(e) =>
                  handleDetailsChange("bankruptcy", e.target.value)
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
                checked={formData.smoke.checked}
                onChange={(e) =>
                  handleCheckboxChange("smoke", e.target.checked)
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
                checked={formData.pets.checked}
                onChange={(e) => handleCheckboxChange("pets", e.target.checked)}
              />
            </div>
          </div>
          <div className="inputInfoH">
            {formData.pets.checked && (
              <span className="">
                PLEASE LIST EACH TYPE, BREED & APPROX. WEIGHT
              </span>
            )}
            {formData.pets.checked && (
              <input
                className="inputReset4 pet "
                type="text"
                placeholder="Cat, Persian, 3.6 Kg"
                value={formData.pets.petDetails}
                onChange={(e) => handlePetDetailsChange(e.target.value)}
              />
            )}
          </div>
          <div className="inputR mt-5">
            <input
              className="howDidInput "
              type="text"
              placeholder="HOW DID YOU LEARN ABOUT US?"
              value={formData.learnAboutUs}
              onChange={(e) => handleLearnAboutUsChange(e.target.value)}
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
