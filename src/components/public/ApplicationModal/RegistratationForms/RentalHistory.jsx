import { useState } from "react"

const RentalHistory = () => {
  const [currentAddress, setCurrentAddress] = useState({
    streetAddress: "",
    cityStateZip: "",
    howLongAtAddress: "",
    managerOwnerName: "",
    managerOwnerPhone: ""
  })

  const [previousAddress1, setPreviousAddress1] = useState({
    streetAddress: "",
    cityStateZip: "",
    howLongAtAddress: "",
    managerOwnerName: "",
    managerOwnerPhone: ""
  })

  const [previousAddress2, setPreviousAddress2] = useState({
    streetAddress: "",
    cityStateZip: "",
    howLongAtAddress: "",
    managerOwnerName: "",
    managerOwnerPhone: ""
  })

  const handleSubmit = () => {
    // You can access the form data from the state variables
    console.log("Current Address:", currentAddress)
    console.log("Previous Address 1:", previousAddress1)
    console.log("Previous Address 2:", previousAddress2)
    // Add your logic here to handle the form data (e.g., send it to a server)
  }
  return (
    <div className="rentalContainer align-items-center">
      <h2 className="rentalText align-items-center">Rental History</h2>
      <p className="rentalP">
        Please list your three most recent addresses or from past five years.
      </p>
      <div className="rentalOrder d-flex ">
        <div className="leftRentalForm">
          <form action="" className="formRentalHistory">
            <h2 className="cA">Current Address</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="STREET ADDRESS / UNIT NO.                                                 206 Alexa Ct, Paso Robles"
              value={currentAddress.streetAddress}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  streetAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                       Ca 32480"
              value={currentAddress.cityStateZip}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  cityStateZip: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                                1 Year"
              value={currentAddress.howLongAtAddress}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  howLongAtAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                     Janey Vianne"
              value={currentAddress.managerOwnerName}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerOwnerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                    530-521-7450"
              value={currentAddress.managerOwnerPhone}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerOwnerPhone: e.target.value
                })
              }
            />
          </form>
          <form action="">
            <h2 className="cA1">Previous Address</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="STREET ADDRESS / UNIT NO.                                                1236 Post Farm Road"
              value={previousAddress1.streetAddress}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  streetAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                      Ca 33644"
              value={previousAddress1.cityStateZip}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  cityStateZip: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                               2 Years"
              value={previousAddress1.howLongAtAddress}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  howLongAtAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                      Becca Aleta"
              value={previousAddress1.managerOwnerName}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  managerOwnerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                    530-521-7450"
              value={previousAddress1.managerOwnerPhone}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  managerOwnerPhone: e.target.value
                })
              }
            />
          </form>
        </div>
        <div className="rightRentalForm">
          <form action="">
            <h2 className="cA">Previous Address</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="STREET ADDRESS / UNIT NO.                                                          4478 Euclid Avenue"
              value={previousAddress2.streetAddress}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  streetAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                               Ca 32480"
              value={previousAddress2.cityStateZip}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  cityStateZip: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                                      5 Years"
              value={previousAddress2.howLongAtAddress}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  howLongAtAddress: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                          Kevan Kenyon"
              value={previousAddress2.managerOwnerName}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  managerOwnerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                         530-521-7450"
              value={previousAddress2.managerOwnerPhone}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  managerOwnerPhone: e.target.value
                })
              }
            />
          </form>
        </div>
      </div>

      <div className="rentalSeparation">
        <button className="bgButton3 d-flex align-items-center justify-content-center">
          <span className="submitBtn3" onClick={handleSubmit}>
            Submit
          </span>
        </button>
      </div>
    </div>
  )
}

export default RentalHistory
