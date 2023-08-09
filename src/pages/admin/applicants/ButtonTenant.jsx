import { useEffect, useRef } from "react";
import { api } from "../../../services/api";

const ButtonTenant = ({ moveToTenant, tenantId, setNewTanant }) => {
  const animationContainerRef = useRef(null);

  const handleMoveToTenant = async () => {
    try {
      const tenant = await api.patch(`/tenant/${tenantId}`, {
        approvalStatus: "APPROVED",
      });
      console.log(tenant);
      setNewTanant(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [moveToTenant]);

  return (
    <div className="mb-1 ">
      {moveToTenant ? (
        <button className="mttContainer" onClick={handleMoveToTenant}>
          Move To Tenants
        </button>
      ) : (
        <div className="animation-container" ref={animationContainerRef}></div>
      )}
    </div>
  );
};

export default ButtonTenant;