import React from "react"

const RoommatesApplicant = ({ roommates }) => {
  return (
    <div>
      <h1>Roommates</h1>
      {roommates.map((item, index) => (
        <div className="d-flex" key={item.id}>
          <input
            className="inputReset2 roomName"
            type="text"
            placeholder="Full Name"
            name="name"
            value={item.name}
          />
          <input
            className="inputReset2 roomName"
            type="text"
            placeholder="Last Name"
            name="name"
            value={item.birthday}
          />
          <input
            className="inputReset2 roomName"
            type="text"
            placeholder="Relationship"
            name="name"
            value={item.relationWithTenant}
          />
        </div>
      ))}
    </div>
  )
}

export default RoommatesApplicant
