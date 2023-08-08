/* eslint-disable react/prop-types */
import { useState } from "react";
import { api } from "../../../services/api";

const TableSelect = ({ application }) => {
  const [statusValue, setStatusValue] = useState(application.status);

  const handleStatuChange = async (id, value) => {
    const applicationUpdate = {
      applicationScreeningId: id,
      status: value,
    };
    console.log(id, value);
    try {
      const response = await api.patch(
        "/application-screening",
        applicationUpdate
      );
      console.log(response);
      setStatusValue(value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <select
      className="form-select"
      aria-label="status selecet"
      value={statusValue}
      onChange={(e) => handleStatuChange(application.id, e.target.value)}
    >
      <option value="PENDING">PENDING</option>
      <option value="APPROVED">APPROVED</option>
      <option value="REJECTED">REJECTED</option>
    </select>
  );
};

export default TableSelect;
