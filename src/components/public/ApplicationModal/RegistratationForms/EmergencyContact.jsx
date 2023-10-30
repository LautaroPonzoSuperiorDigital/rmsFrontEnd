import React, { useState } from "react"
import { api } from "../../../../services/api"
import { RedDot } from "../styles"

const EmergencyContact = ({ tenantId, setActiveSection }) => {
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
    address: "",
    tenantId
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/emergency-contact", emergencyContact)
      console.log(response.data)
      setActiveSection("vehicles")
    } catch (error) {
      console.error("Error submitting emergency contact:", error)
    }
  }

  return (
    <div className="registrationContainer d-flex justify-content-center">
      <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
        <h2
          className="d-flex justify-content-center mt-3 ECText"
          style={{ fontFamily: "proxima-nova", fontWeight: "regular" }}
        >
          Emergency Contact Information
        </h2>
        <form
          className="resetForm"
          action="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="d-flex">
            <input
              className="form-control inputReset"
              type="text"
              placeholder="NAME"
              value={emergencyContact.name}
              required
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  name: e.target.value
                })
              }
            />
            <RedDot marginTop="5px" style={{ color: "red" }}>
              *
            </RedDot>
          </div>
          <div className="d-flex">
            <input
              className="form-control inputReset"
              type="text"
              placeholder="PHONE #"
              value={emergencyContact.phone}
              required
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  phone: e.target.value
                })
              }
            />
            <RedDot marginTop="5px" style={{ color: "red" }}>
              *
            </RedDot>
          </div>
          <div className="d-flex">
            <input
              className="form-control inputReset"
              type="text"
              placeholder="RELATIONSHIP"
              value={emergencyContact.relationship}
              required
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  relationship: e.target.value
                })
              }
            />
            <RedDot marginTop="5px" style={{ color: "red" }}>
              *
            </RedDot>
          </div>
          <div className="d-flex">
            <input
              className="form-control inputReset"
              type="text"
              placeholder="ADDRESS - STREET, CITY, STATE, ZIP"
              required
              value={emergencyContact.address}
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  address: e.target.value
                })
              }
            />
            <RedDot marginTop="5px" style={{ color: "red" }}>
              *
            </RedDot>
          </div>
          <button className="bgButton4 d-flex align-items-center justify-content-center">
            <span className="submitBtn4">Submit</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmergencyContact
