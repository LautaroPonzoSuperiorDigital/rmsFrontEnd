import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../services/api";
import { ListingInspectionHistoryCard } from "./styles";
import InspectionFormModal from "../inspection-form";
import Edit from "../../assets/img/Edit.svg";
import EditHover from "../../assets/img/EditHover.svg";
import Delete from "../../assets/img/delete.svg";
import DeleteIconHover from "../../assets/img/deleteIconHover.svg";
import {
  DeleteInspectionButton,
  EditInspectionButton,
} from "../buttonInspections";

const ListingInspectionHistoryWithRef = ({ listingId }) => {
  const [inspections, setInspections] = useState([]);
  const [isInspectionModalOpen, setInspectionModalOpen] = useState(false);

  const handleUpdateInspection = (listingId, inspectionId) => {
    console.log({ clicked: true });
    openModal();

    return (
      <InspectionFormModal
        key={`listing$${listingId}-inspection-${inspectionId}`}
        isOpen={isInspectionModalOpen}
        onClose={closeModal}
        listingId={listingId}
        inspectionId={inspectionId}
      />
    );
  };

  const handleDeleteInspection = async (listingId, inspectionId) => {
    if (!(listingId && inspectionId)) return;

    try {
      await api.delete(`listing/${listingId}/inspection/${inspectionId}`);

      onInspectionDeleted(inspectionId);
    } catch (err) {
      alert("Error deleting expense");
    }
  };

  const onInspectionDeleted = useCallback((inspectionId) => {
    setInspections((oldState) =>
      oldState.filter((inspection) => inspection.id !== inspectionId)
    );
  }, []);

  const openModal = () => {
    setInspectionModalOpen(true);
  };

  const closeModal = () => {
    setInspectionModalOpen(false);
  };

  useEffect(() => {
    async function loadInspections() {
      try {
        const { data } = await api.get(`/listing/${listingId}/inspection`);
        setInspections(data);
      } catch (err) {
        alert("Error loading listing expenses.");
      }
    }

    loadInspections();
  }, [listingId, inspections]);

  return (
    <ListingInspectionHistoryCard>
      <div className="inspection-card-container">
        {inspections.map((inspection) => (
          <div
            className="inspection-card"
            key={inspection.id}
            onClick={() => handleUpdateInspection(listingId, inspection.id)}
          >
            <div className="inspectionContent ms-3 mt-2 me-3">
              <div className="actionButtons">
                <EditInspectionButton
                  defaultImage={<img src={Edit} alt="Edit" />}
                  hoverImage={<img src={EditHover} alt="EditHover" />}
                  onClick={() =>
                    handleUpdateInspection(listingId, inspection.id)
                  }
                />
                <DeleteInspectionButton
                  className="delete"
                  defaultImage={<img src={Delete} alt="Delete" />}
                  hoverImage={
                    <img src={DeleteIconHover} alt="DeleteIconHover" />
                  }
                  onClick={() =>
                    handleDeleteInspection(listingId, inspection.id)
                  }
                />
              </div>
              <p>{inspection.name}</p>
              <span>
                {new Date(inspection.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ListingInspectionHistoryCard>
  );
};

ListingInspectionHistoryWithRef.propTypes = {
  listingId: PropTypes.number.isRequired,
};

export const ListingInspectionHistory = ListingInspectionHistoryWithRef;
