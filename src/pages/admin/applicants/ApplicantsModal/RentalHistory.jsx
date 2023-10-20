import React from "react"

const RentalHistoryApplicant = ({ rentalHistory }) => {
  console.log(rentalHistory)
  return (
    <div className="w-100">
      <h2 className="rentalText align-items-center mb-5">Rental History</h2>

      <div className=" d-flex ">
        <div className="w-100">
          {rentalHistory.map((item, index) => (
            <form action="" className="formRentalHistory w-100" key={item.id}>
              <h2 className="cA">Address {index + 1}</h2>
              <input
                className="inputReset3 w-100"
                type="text"
                placeholder="STREET ADDRESS / UNIT NO.                                                 206 Alexa Ct, Paso Robles"
                value={item.street}
              />
              <input
                className="inputReset3  w-100"
                type="text"
                placeholder="CITY, STATE, ZIP                                                                       Ca 32480"
                value={item.city}
              />
              <input
                className="inputReset3  w-100"
                type="text"
                placeholder="HOW LONG AT THIS ADDRESS                                                1 Year"
                value={item.duration}
              />
              <input
                className="inputReset3  w-100"
                type="text"
                placeholder="MANAGER/OWNER NAME                                                     Janey Vianne"
                value={item.managerName}
              />
              <input
                className="inputReset3  w-100"
                type="text"
                placeholder="MANAGER/OWNER PHONE                                                    530-521-7450"
                value={item.managerPhone}
              />
            </form>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RentalHistoryApplicant
