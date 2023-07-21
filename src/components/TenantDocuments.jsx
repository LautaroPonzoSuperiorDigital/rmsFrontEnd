import React, { useContext } from "react";
import TenantNavBar from "./TenantNavBar";
import { AppContext } from "../context/userContext";

const TenantDocuments = ({ onCloseModal }) => {
  const { currentUser } = useContext(AppContext);
  const isApplicant = currentUser.approvalStatus === "Pending";
  return (
    <div className="containerTicketRepair p-2">
      {/* nav */}
      <TenantNavBar
        title={isApplicant ? "Applicant Documents" : "Tenant Documents"}
        onCloseModal={onCloseModal}
      />
      <div>
        {/* create documents */}
        DOCUMENTS
      </div>
    </div>
  );
};

export default TenantDocuments;
