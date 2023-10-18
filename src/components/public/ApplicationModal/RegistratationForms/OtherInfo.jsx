import React, { useState } from "react"

const OtherInfo = () => {
  const [toggleOn, setToggleOn] = useState(false)
  const [toggleOn1, setToggleOn1] = useState(false)
  const [toggleOn2, setToggleOn2] = useState(false)
  const [toggleOn3, setToggleOn3] = useState(false)
  const [toggleOn4, setToggleOn4] = useState(false)
  const [toggleOn5, setToggleOn5] = useState(false)
  const handleClickToggle1 = () => {
    setToggleOn1(!toggleOn1)
  }

  const handleClickToggle2 = () => {
    setToggleOn2(!toggleOn2)
  }

  const handleClickToggle3 = () => {
    setToggleOn3(!toggleOn3)
  }
  const handleClickToggle4 = () => {
    setToggleOn4(!toggleOn4)
  }
  const handleClickToggle5 = () => {
    setToggleOn5(!toggleOn5)
  }

  return (
    <div className=" d-flex flex-column align-items-center ">
      <h2 className="mb-5 ">Other Information</h2>
      <div className="orderInfo d-flex align-items-center">
        <div className="leftBox d-flex align-items-start justify-content-center">
          <div className="leftSideInfo d-flex">
            <p className="infoP">Have You Ever Been Evicted?</p>
            <toogle />
          </div>
          <div className="inputInfoH">
            {toggleOn1 && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
              />
            )}
          </div>
          <div className="leftSideInfo d-flex">
            <p className="infoP">Have You Ever Been Convicted Of A Felony?</p>
            <toogle />
          </div>
          <div className="inputInfoH">
            {toggleOn2 && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
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
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Default switch checkbox input
              </label>
            </div>
          </div>
          <div className="inputInfoH">
            {toggleOn3 && (
              <input
                className="inputReset4"
                type="text"
                placeholder="WHEN & WHY"
              />
            )}
          </div>
        </div>
        <div className="rightBox d-flex align-items-start justify-content-center">
          <div className="rightSideInfo d-flex">
            <p className="infoP">Do You Currently Smoke?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Default switch checkbox input
              </label>
            </div>
          </div>
          <div className="leftSideInfo rs d-flex">
            <p className="infoP">Do You Have Any Pets?</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Default switch checkbox input
              </label>
            </div>
          </div>
          <div className="inputInfoH">
            {toggleOn5 && (
              <span className="pets">
                PLEASE LIST EACH TYPE, BREED & APPROX. WEIGHT
              </span>
            )}
            {toggleOn5 && (
              <input
                className="inputReset4 pet"
                type="text"
                placeholder="Cat, Persian, 3.6 Kg"
              />
            )}
          </div>
          <div className="inputR">
            <input
              className="inputReset4 rightF"
              type="text"
              placeholder="HOW DID YOU LEARN ABOUT US?"
            />
          </div>
        </div>
      </div>
      <button className="bgButton d-flex align-items-center justify-content-center">
        <span className="submitBtn">Submit</span>
      </button>
    </div>
  )
}

export default OtherInfo
