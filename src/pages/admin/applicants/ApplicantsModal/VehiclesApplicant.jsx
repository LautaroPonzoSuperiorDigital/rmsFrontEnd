import React from "react"

const VehiclesApplicant = ({ vehicles }) => {
  return (
    <div className="mt-5">
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
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="YEAR"
                value={vehicle.year}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="COLOR"
                value={vehicle.color}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="PLATE #"
                value={vehicle.plate}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="STATE"
                value={vehicle.state}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default VehiclesApplicant
