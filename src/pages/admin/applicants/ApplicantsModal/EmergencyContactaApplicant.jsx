import React from "react"

const EmergencyContactaApplicant = ({ contact }) => {
  return (
    <>
      {contact.map((item) => (
        <div className=" " key={item.id}>
          <div className="">
            <h2
              className="d-flex justify-content-center  ECText"
              style={{ margin: 25 }}
            >
              Emergency Contact Information
            </h2>
            <form className="resetForm" action="submit">
              <input
                className="form-control inputReset"
                type="text"
                placeholder="NAME"
                value={item.name}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="PHONE #"
                value={item.phone}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="RELATIONSHIP"
                value={item.relationship}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="ADDRESS - STREET, CITY, STATE, ZIP"
                value={item.address}
              />
            </form>
          </div>
        </div>
      ))}
    </>
  )
}

export default EmergencyContactaApplicant
