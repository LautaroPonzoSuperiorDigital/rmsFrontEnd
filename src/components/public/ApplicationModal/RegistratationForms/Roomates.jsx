import { useState } from "react"
import { api } from "../../../../services/api"

const Roomates = ({ tenantId, setActiveSection }) => {
  const [roommates, setRoommates] = useState([
    { name: "", birthday: "", relationWithTenant: "" }
  ])
  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const updatedRoommates = [...roommates]
    updatedRoommates[index][name] = value
    setRoommates(updatedRoommates)
  }

  const addRoommate = () => {
    setRoommates([
      ...roommates,
      { name: "", birthday: "", relationWithTenant: "" }
    ])
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(roommates)
    try {
      const roomates = roommates.map(async (roommate) => {
        const response = await api.post("/roommate", {
          ...roommate,
          tenantId
        })
        return response.data
      })
      // Wait for all the promises to resolve
      const savedRoommates = await Promise.all(roomates)
      console.log(savedRoommates)
      setActiveSection("rentalHistory")
    } catch (error) {
      console.log(error)
    }
  }
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await handleSubmit() // Call your submit function
    }
  }

  return (
    <div className="roommatesContainer d-flex justify-content-center w-100">
      <div className="formRoommatesOrder d-flex flex-column justify-content-start align-items-center w-100">
        <h2 className="rmText d-flex justify-content-center mt-3">
          Roommates / Other Occupants
        </h2>
        <form
          className="resetForm2 w-100 align-items-center d-flex flex-column "
          action="submit"
          onSubmit={handleSubmit}
        >
          {/* <div className="d-flex align-items-center justify-content-between w-100 labelDateails">
            <p className="roomOrderName ">FULL NAME - FIRST, MIDDLE, LAST</p>
            <p className="roomOrderBirth">BIRTH DATE</p>
            <p className="roomOrderRela">RELATIONSHIP TO YOU</p>
          </div> */}
          {roommates.map((roommate, index) => (
            <div className="orderInputRoom d-flex w-100  " key={index}>
              <input
                className="inputReset2 roomName"
                type="text"
                placeholder="Full Name"
                name="name"
                value={roommate.name}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <input
                className="inputReset2 roomBirth"
                type="text"
                placeholder="Birth Date"
                name="birthday"
                value={roommate.birthday}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <input
                className="inputReset2 roomRela"
                type="text"
                placeholder="Relationship"
                name="relationWithTenant"
                value={roommate.relationWithTenant}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
          ))}
          <div className="d-flex w-100">
            <button className="addRoommate" type="button" onClick={addRoommate}>
              + Add Roommate / Other Occupant
            </button>
          </div>

          <button
            className="bgButton2 d-flex align-items-center justify-content-center"
            onKeyPress={handleKeyPress}
          >
            <span className="submitBtn2">Submit</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Roomates
