import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../services/api";
import { ListingInspectionHistoryCard } from "./styles";
import InspectionFormModal from "../inspection-form";
import { EditButton, DeleteButton } from "../../components/buttonListings";
import Edit from "../../assets/img/Edit.svg";
import EditHover from "../../assets/img/EditHover.svg";
import Delete from "../../assets/img/delete.svg";
import DeleteIconHover from "../../assets/img/deleteIconHover.svg";

const ListingInspectionHistoryWithRef = ({ listingId }) => {
  const [inspections, setInspections] = useState([]);

  async function handleMouseClick(inspection) {
    return <InspectionFormModal key={inspection.id} id={inspection.id} />;
  }

  async function handleUpdateInspection(listingId, inspectionId) {
    console.log({ listingId, inspectionId });
    return inspectionId;
  }

  async function handleDeleteInspection(listingId, inspectionId) {
    if (!(listingId && inspectionId)) return;

    try {
      await api.delete(`listing/${listingId}/inspection/${inspectionId}`)

      onInspectionDeleted(inspectionId)
    } catch (err) {
      alert('Error deleting expense')
    }
  }

  const onInspectionDeleted = useCallback((inspectionId) => {
    setInspections(oldState => oldState.filter(inspection => inspection.id !== inspectionId))
  }, [])

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
            onClick={() => handleMouseClick(inspection)}
          >
            <div className="inspectionContent ms-3 mt-2 me-3">
              <div className="actionButtons">
                <EditButton
                  defaultImage={<img src={Edit} alt="Edit" />}
                  hoverImage={<img src={EditHover} alt="EditHover" />}
                  onClick={() =>
                    handleUpdateInspection(listingId, inspection.id)
                  }
                />
                <DeleteButton
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
