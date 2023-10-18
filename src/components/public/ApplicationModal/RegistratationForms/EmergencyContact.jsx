import { useState } from "react"

const EmergencyContact = () => {
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
    address: ""
  })

  const handleSubmit = () => {
    // You can access the form data from the state variable
    console.log("Emergency Contact Information:", emergencyContact)
    // Add your logic here to handle the form data (e.g., send it to a server)
  }

  return (
    <div className="registrationContainer d-flex justify-content-center">
      <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
        <h2 className="d-flex justify-content-center mt-3 ECText">
          Emergency Contact Information
        </h2>
        <form className="resetForm" action="submit">
          <input
            className="form-control inputReset"
            type="text"
            placeholder="NAME"
            value={emergencyContact.name}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                name: e.target.value
              })
            }
          />
          <input
            className="form-control inputReset"
            type="text"
            placeholder="PHONE #"
            value={emergencyContact.phone}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                phone: e.target.value
              })
            }
          />
          <input
            className="form-control inputReset"
            type="text"
            placeholder="RELATIONSHIP"
            value={emergencyContact.relationship}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                relationship: e.target.value
              })
            }
          />
          <input
            className="form-control inputReset"
            type="text"
            placeholder="ADDRESS - STREET, CITY, STATE, ZIP"
            value={emergencyContact.address}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                address: e.target.value
              })
            }
          />
        </form>
        <button
          className="bgButton4 d-flex align-items-center justify-content-center"
          onClick={handleSubmit}
        >
          <span className="submitBtn4">Submit</span>
        </button>
      </div>
    </div>
  )
}

export default EmergencyContact
