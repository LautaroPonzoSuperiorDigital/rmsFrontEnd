import { useState } from "react"
import { api } from "../../../../services/api"

const RentalHistory = ({ tenantId, setActiveSection }) => {
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    duration: "",
    managerName: "",
    managerPhone: "",
    tenantId
  })

  const [previousAddress1, setPreviousAddress1] = useState({
    street: "",
    city: "",
    duration: "",
    managerName: "",
    managerPhone: "",
    tenantId
  })

  const [previousAddress2, setPreviousAddress2] = useState({
    street: "",
    city: "",
    duration: "",
    managerName: "",
    managerPhone: "",
    tenantId
  })
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit() // Call your submit function
    }
  }
  const postRentalHistory = async (addressData) => {
    if (addressData.name !== "") {
      const response = await api.post("/rental-history", addressData)
      console.log("Rental history submitted:", response.data)
    }
  }

  const handleSubmit = async () => {
    try {
      await postRentalHistory(currentAddress)
      if (previousAddress1.name !== "") {
        await postRentalHistory(previousAddress1)
      }
      if (previousAddress2.name !== "") {
        await postRentalHistory(previousAddress2)
      }

      setActiveSection("income")
    } catch (error) {
      console.error("Error submitting rental history:", error)
    }
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
              value={currentAddress.street}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  street: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                       Ca 32480"
              value={currentAddress.cityStateZip}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  city: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                                1 Year"
              value={currentAddress.duration}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  duration: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                     Janey Vianne"
              value={currentAddress.managerOwnerName}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                    530-521-7450"
              value={currentAddress.managerPhone}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerPhone: e.target.value
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
              value={previousAddress1.street}
              required
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  street: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                      Ca 33644"
              value={previousAddress1.cityStateZip}
              required
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  city: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                               2 Years"
              value={previousAddress1.duration}
              required
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  duration: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                      Becca Aleta"
              value={previousAddress1.managerOwnerName}
              required
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  managerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                    530-521-7450"
              value={previousAddress1.managerPhone}
              required
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  managerPhone: e.target.value
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
              value={previousAddress2.street}
              required
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  street: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                                                               Ca 32480"
              value={previousAddress2.cityStateZip}
              required
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  city: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                                                      5 Years"
              value={previousAddress2.duration}
              required
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  duration: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                                                          Kevan Kenyon"
              value={previousAddress2.managerOwnerName}
              required
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  managerName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                                                         530-521-7450"
              value={previousAddress2.managerPhone}
              required
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  managerPhone: e.target.value
                })
              }
            />
          </form>
        </div>
      </div>
      <div
        className="rentalSeparation"
        onClick={handleSubmit}
        onKeyPress={handleKeyPress}
      >
        <button className="bgButton3 d-flex align-items-center justify-content-center">
          <span className="submitBtn3">Submit</span>
        </button>
      </div>
    </div>
  )
}

export default RentalHistory
