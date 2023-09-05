import { ListingInspectionHistoryCard } from "./styles";
import Edit from "../../assets/img/Edit.svg";
import EditHover from "../../assets/img/EditHover.svg";
import Delete from "../../assets/img/delete.svg";
import DeleteIconHover from "../../assets/img/deleteIconHover.svg";
import {
  DeleteInspectionButton,
  EditInspectionButton,
} from "../buttonInspections";
import { useListingInspections } from "../../hooks/useListingInspections";
import { formatDate } from "../../services/date";
import { DateTime } from "luxon";

export const ListingInspectionHistory = () => {
  const { inspections, handleEditInspection, handleOpenRemoveInspectionModal } = useListingInspections()

  return (
    <ListingInspectionHistoryCard>
      <div className="inspection-card-container">
        {inspections.map((inspection) => (
          <div className="inspection-card" key={inspection.id}>
            <div className="inspectionContent ms-3 mt-2 me-3">
              <div className="actionButtons">
                <EditInspectionButton
                  defaultImage={<img src={Edit} alt="Edit" />}
                  hoverImage={<img src={EditHover} alt="EditHover" />}
                  onClick={() => handleEditInspection(inspection)}
                />

                <DeleteInspectionButton
                  className="delete"
                  defaultImage={<img src={Delete} alt="Delete" />}
                  hoverImage={
                    <img src={DeleteIconHover} alt="DeleteIconHover" />
                  }
                  onClick={() =>
                    handleOpenRemoveInspectionModal(inspection)
                  }
                />
              </div>
              <p>{inspection.name}</p>
              <span>
                {formatDate({ date: inspection.date, formatOptions: DateTime.DATE_MED })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ListingInspectionHistoryCard>
  )
}
