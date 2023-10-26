import React from "react"

const VehiclesApplicant = ({ vehicles }) => {
  return (
    <div className="mt-5 w-100">
      <div className="">
        <form className="resetForm">
          {vehicles?.map((vehicle, index) => (
            <div key={index}>
              <h3 className="Vtext">Vehicle {index + 1}</h3>
              <input
                className="form-control inputReset"
                type="text"
                placeholder="MAKE & MODEL"
                value={vehicle.MakeAndModel}
                style={{ maxWidth: "500px" }}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="YEAR"
                value={vehicle.year}
                style={{ maxWidth: "500px" }}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="COLOR"
                value={vehicle.color}
                style={{ maxWidth: "500px" }}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="PLATE #"
                value={vehicle.plate}
                style={{ maxWidth: "500px" }}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="STATE"
                value={vehicle.state}
                style={{ maxWidth: "500px" }}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default VehiclesApplicant
