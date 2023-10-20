import React from "react"

const OtherInformationApplicant = ({ otherInfo }) => {
  return (
    <div className=" d-flex flex-column align-items-center w-100 ">
      <h2 className="mb-5">Other Information</h2>
      {otherInfo.map((item, index) => (
        <div className="orderInfo " key={item.id}>
          <div className="formContainer " style={{ marginLeft: 0 }}>
            <div className="leftSideInfo d-flex">
              <p className="infoP">Evicted</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault1"
                  checked={item.isEvicted}
                />
              </div>
            </div>
            <div className="inputInfoH">
              {item.isEvicted && (
                <input
                  className="inputReset4"
                  type="text"
                  placeholder="WHEN & WHY"
                  value={item.evicted}
                />
              )}
            </div>
            <div className="leftSideInfo d-flex">
              <p className="infoP"> Felony</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault2"
                  checked={item.isConvicted}
                />
              </div>
            </div>
            <div className="inputInfoH">
              {item.isConvicted && (
                <input
                  className="inputReset4"
                  type="text"
                  placeholder="WHEN & WHY"
                  value={item.convicted}
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
                  checked={item.isBankrupt}
                />
              </div>
            </div>
            <div className="inputInfoH">
              {item.isBankrupt && (
                <input
                  className="inputReset4"
                  type="text"
                  placeholder="WHEN & WHY"
                  value={item.bankrupt}
                />
              )}
            </div>
          </div>
          {/* half */}
          <div className="smokeContainer ">
            <div className="rightSideInfo d-flex" style={{ marginTop: "90px" }}>
              <p className="infoP">Do You Currently Smoke?</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault4"
                  checked={item.isSmoken}
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
                  checked={item.isPets}
                />
              </div>
            </div>
            <div className="inputInfoH">
              {item.isPets && (
                <span className="">
                  PLEASE LIST EACH TYPE, BREED & APPROX. WEIGHT
                </span>
              )}
              {item.isPets && (
                <input
                  className="inputReset4 pet "
                  type="text"
                  placeholder="Cat, Persian, 3.6 Kg"
                  value={item.pets}
                />
              )}
            </div>
            <div className="inputR mt-5">
              <input
                className="howDidInput "
                type="text"
                placeholder="HOW DID YOU LEARN ABOUT US?"
                value={item.aboutUS}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OtherInformationApplicant
