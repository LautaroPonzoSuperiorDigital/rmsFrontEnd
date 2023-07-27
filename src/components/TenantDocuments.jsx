/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth"
;
import TenantNavBar from "./TenantNavBar";

const TenantDocuments = ({ onCloseModal }) => {
  const { user } = useAuth()

  const isApplicant = user.approvalStatus === "Pending";

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
