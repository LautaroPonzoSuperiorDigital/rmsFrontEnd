/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { api } from "../../../services/api"

const TableSelect = ({
  approbalStatus,
  tenantId,
  setMoveToTenant,
  setApplicants
}) => {
  const [statusValue, setStatusValue] = useState(approbalStatus)

  const handleStatuChange = async (value) => {
    try {
      const response = await api.patch(`/tenant/${tenantId}`, {
        approvalStatus: value
      })
      console.log(response)
      setStatusValue(value)
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === tenantId
            ? { ...applicant, approvalStatus: value }
            : applicant
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <select
      className="form-select"
      aria-label="status selecet"
      value={statusValue}
      onChange={(e) => handleStatuChange(e.target.value)}
    >
      <option value="SCREENING_IN_PROCESS">Screening in progress</option>
      <option value="TENANT_APPLIED">Tenant applied</option>
      <option value="TENANT_APPROVED">Tenant approve</option>
      <option value="TENANT_REJECTED">Tenant rejected</option>
      <option value="LEASE_AGREEMENT">Lease agreement</option>
      <option value="LEASE_AGREEMENT_SIGNED">Agreement signed</option>
    </select>
  )
}

export default TableSelect
