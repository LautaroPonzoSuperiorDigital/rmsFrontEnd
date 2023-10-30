import { useState } from "react"
import { api } from "../../../../services/api"
import { RedDot } from "../styles"

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
    console.log(addressData)
    if (addressData.name !== "") {
      const response = await api.post("/rental-history", addressData)
      console.log("Rental history submitted:", response.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postRentalHistory(currentAddress)
      if (previousAddress1.street !== "") {
        await postRentalHistory(previousAddress1)
      }
      if (previousAddress2.street !== "") {
        await postRentalHistory(previousAddress2)
      }

      setActiveSection("income")
    } catch (error) {
      console.error("Error submitting rental history:", error)
    }
  }

  return (
    <form className="rentalContainer align-items-center">
      <h2
        className="rentalText align-items-center"
        style={{
          fontFamily: "proxima-nova",
          fontWeight: "regular",
          fontSize: "35px"
        }}
      >
        Rental History
      </h2>
      <p
        className="rentalP"
        style={{ fontFamily: "proxima-nova", fontWeight: "regular" }}
      >
        Please list your three most recent addresses or from past five years.
      </p>
      <div className="rentalOrder d-flex ">
        <div className="leftRentalForm">
          <div action="" className="formRentalHistory">
            <h2
              className="cA"
              style={{ fontFamily: "proxima-nova", fontWeight: "regular" }}
            >
              Current Address
            </h2>
            <div className="position-relative d-flex">
              <input
                className="inputReset3 "
                type="text"
                placeholder="STREET ADDRESS / UNIT NO.                    123 Anywhere, Ave"
                value={currentAddress.street}
                required
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    street: e.target.value
                  })
                }
              />
              <RedDot style={{ color: "red" }}>*</RedDot>
            </div>
            <input
              className="inputReset3"
              type="text"
              placeholder="CITY, STATE, ZIP                                           Ca 12345"
              value={currentAddress.cityStateZip}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  city: e.target.value
                })
              }
            />
            <RedDot style={{ color: "red" }}>*</RedDot>
            <input
              className="inputReset3"
              type="text"
              placeholder="HOW LONG AT THIS ADDRESS                   Year"
              value={currentAddress.duration}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  duration: e.target.value
                })
              }
            />
            <RedDot style={{ color: "red" }}>*</RedDot>
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER NAME                         Jane Doe"
              value={currentAddress.managerOwnerName}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerName: e.target.value
                })
              }
            />
            <RedDot style={{ color: "red" }}>*</RedDot>
            <input
              className="inputReset3"
              type="text"
              placeholder="MANAGER/OWNER PHONE                       123-123-1234"
              value={currentAddress.managerPhone}
              required
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  managerPhone: e.target.value
                })
              }
            />
            <RedDot style={{ color: "red" }}>*</RedDot>
          </div>
          <div action="">
            <h2
              className="cA1"
              style={{ fontFamily: "proxima-nova", fontWeight: "regular" }}
            >
              Previous Address
            </h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="STREET ADDRESS / UNIT NO.                    123 Anywhere, Ave"
              value={previousAddress1.street}
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
              placeholder="CITY, STATE, ZIP                                           Ca 12345"
              value={previousAddress1.cityStateZip}
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
              placeholder="HOW LONG AT THIS ADDRESS                   Year"
              value={previousAddress1.duration}
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
              placeholder="MANAGER/OWNER NAME                         Jane Doe"
              value={previousAddress1.managerOwnerName}
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
              placeholder="MANAGER/OWNER PHONE                       123-123-1234"
              value={previousAddress1.managerPhone}
              onChange={(e) =>
                setPreviousAddress1({
                  ...previousAddress1,
                  managerPhone: e.target.value
                })
              }
            />
          </div>
        </div>
        <div className="rightRentalForm">
          <div action="">
            <h2
              className="cA"
              style={{ fontFamily: "proxima-nova", fontWeight: "regular" }}
            >
              Previous Address
            </h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="STREET ADDRESS / UNIT NO.                    123 Anywhere, Ave"
              value={previousAddress2.street}
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
              placeholder="CITY, STATE, ZIP                                           Ca 12345"
              value={previousAddress2.cityStateZip}
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
              placeholder="HOW LONG AT THIS ADDRESS                   Year"
              value={previousAddress2.duration}
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
              placeholder="MANAGER/OWNER NAME                         Jane Doe"
              value={previousAddress2.managerOwnerName}
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
              placeholder="MANAGER/OWNER PHONE                       123-123-1234"
              value={previousAddress2.managerPhone}
              onChange={(e) =>
                setPreviousAddress2({
                  ...previousAddress2,
                  managerPhone: e.target.value
                })
              }
            />
          </div>
        </div>
      </div>
      <div
        className="rentalSeparation"
        onClick={(e) => handleSubmit(e)}
        onKeyPress={handleKeyPress}
      >
        <button className="bgButton3 d-flex align-items-center justify-content-center">
          <span className="submitBtn3">Submit</span>
        </button>
      </div>
    </form>
  )
}

export default RentalHistory
