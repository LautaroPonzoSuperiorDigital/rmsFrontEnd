import { useState } from "react"
import { api } from "../../../../services/api"

const Income = ({ tenantId, setActiveSection }) => {
  const [currentEmployer, setCurrentEmployer] = useState({
    employedBy: "",
    position: "",
    datesOfEmployment: "",
    monthlyIncome: "",
    supervisorName: "",
    supervisorPhone: "",
    address: "",
    tenantId
  })
  const [previousEmployer1, setPreviousEmployer1] = useState({
    employedBy: "",
    position: "",
    datesOfEmployment: "",
    monthlyIncome: "",
    supervisorName: "",
    supervisorPhone: "",
    address: "",
    tenantId
  })

  const [previousEmployer, setPreviousEmployer] = useState({
    employedBy: "",
    position: "",
    datesOfEmployment: "",
    monthlyIncome: "",
    supervisorName: "",
    supervisorPhone: "",
    address: "",
    tenantId
  })

  const [otherIncome, setOtherIncome] = useState({
    type: "",
    monthlyIncome: "",
    address: "",
    tenantId
  })

  const postIncome = async (currentEmployer) => {
    if (currentEmployer.name !== "") {
      const response = await api.post("/tenant-income", currentEmployer)
      console.log("Employee submitted:", response.data)
    }
  }
  const postOtherIncome = async (otherIncome) => {
    if (otherIncome.name !== "") {
      const response = await api.post(
        "/tenant-income/additional-income",
        otherIncome
      )
      console.log("Employee submitted:", response.data)
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit() // Call your submit function
    }
  }

  const handleSubmit = async () => {
    try {
      await postIncome(currentEmployer)
      if (previousEmployer.employedBy !== "") {
        await postIncome(previousEmployer)
      }
      if (previousEmployer1.employedBy !== "") {
        await postIncome(previousEmployer1)
      }
      if (otherIncome.type !== "") {
        await postOtherIncome(otherIncome)
      }

      setActiveSection("emergencyContact")
    } catch (error) {
      console.error("Error submitting rental history:", error)
    }
  }

  return (
    <div className="incomeContainer align-items-center">
      <h2 className="rentalText align-items-center">Income</h2>
      <p className="rentalP">
        Please list employment from the past five years & other sources of
        income.
      </p>
      <div className="incomeOrder  ">
        <div className="leftRentalForm">
          <form action="">
            <h2 className="cA">Current Employer</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="EMPLOYED BY"
              value={currentEmployer.employedBy}
              required
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  employedBy: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="POSITION"
              value={currentEmployer.position}
              required
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  position: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="DATES OF EMPLOYMENT (FROM..TO)"
              value={currentEmployer.datesOfEmployment}
              required
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  datesOfEmployment: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MONTHLY INCOME"
              value={currentEmployer.monthlyIncome}
              required
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  monthlyIncome: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="NAME OF SUPERVISOR"
              value={currentEmployer.supervisorName}
              required
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  supervisorName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="SUPERVISOR’S PHONE #"
              required
              value={currentEmployer.supervisorPhone}
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  supervisorPhone: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="ADDRESS STREET, CITY, STATE, ZIP"
              value={currentEmployer.address}
              onChange={(e) =>
                setCurrentEmployer({
                  ...currentEmployer,
                  address: e.target.value
                })
              }
            />
          </form>
          <form action="">
            <h2 className="cA">Previous Employer</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="EMPLOYED BY"
              value={previousEmployer1.employedBy}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  employedBy: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="POSITION"
              value={previousEmployer1.position}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  position: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="DATES OF EMPLOYMENT (FROM..TO)"
              value={previousEmployer1.datesOfEmployment}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  datesOfEmployment: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MONTHLY INCOME"
              value={previousEmployer1.monthlyIncome}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  monthlyIncome: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="NAME OF SUPERVISOR"
              value={previousEmployer1.supervisorName}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  supervisorName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="SUPERVISOR’S PHONE #"
              value={previousEmployer1.supervisorPhone}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  supervisorPhone: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="ADDRESS STREET, CITY, STATE, ZIP"
              value={previousEmployer1.address}
              onChange={(e) =>
                setPreviousEmployer1({
                  ...previousEmployer1,
                  address: e.target.value
                })
              }
            />
          </form>
        </div>
        <div className="rightRentalForm">
          <form action="">
            <h2 className="cA1">Previous Employer</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="EMPLOYED BY"
              value={previousEmployer.employedBy}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  employedBy: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="POSITION"
              value={previousEmployer.position}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  position: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="DATES OF EMPLOYMENT (FROM..TO)"
              value={previousEmployer.datesOfEmployment}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  datesOfEmployment: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MONTHLY INCOME"
              value={previousEmployer.monthlyIncome}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  monthlyIncome: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="NAME OF SUPERVISOR"
              value={previousEmployer.supervisorName}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  supervisorName: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="SUPERVISOR’S PHONE #"
              value={previousEmployer.supervisorPhone}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  supervisorPhone: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="ADDRESS STREET, CITY, STATE, ZIP"
              value={previousEmployer.address}
              onChange={(e) =>
                setPreviousEmployer({
                  ...previousEmployer,
                  address: e.target.value
                })
              }
            />
          </form>

          <form action="">
            <h2 className="cA2">Other Income Sources</h2>
            <input
              className="inputReset3"
              type="text"
              placeholder="TYPE"
              value={otherIncome.type}
              onChange={(e) =>
                setOtherIncome({
                  ...otherIncome,
                  type: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="MONTHLY INCOME"
              value={otherIncome.monthlyIncome}
              onChange={(e) =>
                setOtherIncome({
                  ...otherIncome,
                  monthlyIncome: e.target.value
                })
              }
            />
            <input
              className="inputReset3"
              type="text"
              placeholder="PROVIDER ADDRESS - STREET, CITY, STATE, ZIP"
              value={otherIncome.address}
              onChange={(e) =>
                setOtherIncome({
                  ...otherIncome,
                  address: e.target.value
                })
              }
            />
          </form>
        </div>
      </div>
      <div className="incomeSeparation">
        <button
          className="bgButton3 d-flex align-items-center justify-content-center"
          onClick={handleSubmit}
          onKeyPress={handleKeyPress}
        >
          <span className="submitBtn3">Submit</span>
        </button>
      </div>
    </div>
  )
}

export default Income
