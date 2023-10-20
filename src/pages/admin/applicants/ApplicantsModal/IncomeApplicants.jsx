import React from "react"

const IncomeApplicants = ({ income, otherIncomes }) => {
  return (
    <div className="d-flex  flex-column  w-100 align-items-center">
      {income.map((item, index) => (
        <div className="w-100" key={index}>
          <h2 className="rentalText w-100 align-items-center">
            Income {index + 1}
          </h2>
          <div className="w-100">
            <form action="w-100">
              <input
                className="inputReset3"
                type="text"
                placeholder="EMPLOYED BY"
                value={item.employedBy}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="POSITION"
                value={item.position}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="DATES OF EMPLOYMENT (FROM..TO)"
                value={item.datesOfEmployment}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="MONTHLY INCOME"
                value={item.monthlyIncome}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="NAME OF SUPERVISOR"
                value={item.supervisorName}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="SUPERVISOR’S PHONE #"
                value={item.supervisorPhone}
              />
              <input
                className="inputReset3"
                type="text"
                placeholder="ADDRESS STREET, CITY, STATE, ZIP"
                value={item.address}
              />
            </form>
          </div>
        </div>
      ))}

      {otherIncomes.map((item, index) => (
        <div className="w-100 mt-5" key={index}>
          <h2 className="cA2">Other Income Sources</h2>
          <input
            className="inputReset3"
            type="text"
            placeholder="TYPE"
            value={item.type}
          />
          <input
            className="inputReset3"
            type="text"
            placeholder="MONTHLY INCOME"
            value={item.monthlyIncome}
          />
          <input
            className="inputReset3"
            type="text"
            placeholder="PROVIDER ADDRESS - STREET, CITY, STATE, ZIP"
            value={item.address}
          />
        </div>
      ))}
    </div>
  )
}

export default IncomeApplicants
