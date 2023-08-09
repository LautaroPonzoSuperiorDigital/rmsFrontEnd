/* eslint-disable react/prop-types */
import { useState } from "react";
import { api } from "../../../services/api";

const TableSelect = ({ approbalStatus, tenantId, setMoveToTenant }) => {
  const [statusValue, setStatusValue] = useState(approbalStatus);

  const handleStatuChange = async (value) => {
    try {
      const response = await api.patch(`/tenant/${tenantId}`, {
        approvalStatus: value,
      });
      setStatusValue(value);
      value === "LEASE_AGREEMENT_SIGNED"
        ? setMoveToTenant(true)
        : setMoveToTenant(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <select
      className="form-select"
      aria-label="status selecet"
      value={statusValue}
      onChange={(e) => handleStatuChange(e.target.value)}
    >
      <option value="SCREENING_IN_PROCESS">Screening in progress</option>
      <option value="LEASE_AGREEMENT">Lease agreement</option>
      <option value="LEASE_AGREEMENT_SIGNED">Agreement signed</option>
    </select>
  );
};

export default TableSelect;
