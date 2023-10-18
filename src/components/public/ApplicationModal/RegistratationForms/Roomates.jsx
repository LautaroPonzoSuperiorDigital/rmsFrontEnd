import React, { useState } from "react"

const Roomates = () => {
  const [roommates, setRoommates] = useState([
    { name: "", birthDate: "", relationship: "" }
  ])
  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const updatedRoommates = [...roommates]
    updatedRoommates[index][name] = value
    setRoommates(updatedRoommates)
  }

  const addRoommate = () => {
    setRoommates([...roommates, { name: "", birthDate: "", relationship: "" }])
  }
  const handleSubmit = (event) => {
    event.preventDefault() // Prevent the default form submission behavior
    // Here, you can handle the form submission, e.g., send data to a server or perform validation.
    // You can access the form data from the 'roommates' state.
    console.log(roommates) // You can replace this with your submission logic.
  }

  return (
    <div className="roommatesContainer d-flex justify-content-center w-100">
      <div className="formRoommatesOrder d-flex flex-column justify-content-start align-items-center w-100">
        <h2 className="rmText d-flex justify-content-center mt-3">
          Roommates / Other Occupants
        </h2>
        <form
          className="resetForm2 w-100 align-items-center "
          action="submit"
          onSubmit={handleSubmit}
        >
          {/* <div className="d-flex align-items-center justify-content-between w-100 labelDateails">
            <p className="roomOrderName ">FULL NAME - FIRST, MIDDLE, LAST</p>
            <p className="roomOrderBirth">BIRTH DATE</p>
            <p className="roomOrderRela">RELATIONSHIP TO YOU</p>
          </div> */}
          {roommates.map((roommate, index) => (
            <div className="orderInputRoom d-flex " key={index}>
              <input
                className="inputReset2 roomName"
                type="text"
                placeholder="Full Name"
                name="name"
                value={roommate.name}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                className="inputReset2 roomBirth"
                type="text"
                placeholder="Birth Date"
                name="birthDate"
                value={roommate.birthDate}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                className="inputReset2 roomRela"
                type="text"
                placeholder="Relationship"
                name="relationship"
                value={roommate.relationship}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
          <button className="addRoommate" type="button" onClick={addRoommate}>
            + Add Roommate / Other Occupant
          </button>
        </form>
        <button className="bgButton2 d-flex align-items-center justify-content-center">
          <span className="submitBtn2">Submit</span>
        </button>
      </div>
    </div>
  )
}

export default Roomates
