import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { api } from "../../services/api";
import { isAxiosError } from "axios";
import { ListingInspectionHistoryCard } from "./styles";
import Edit from "../../assets/img/Edit.svg";
import EditHover from "../../assets/img/EditHover.svg";
import Delete from "../../assets/img/delete.svg";
import DeleteIconHover from "../../assets/img/deleteIconHover.svg";
import {
  DeleteInspectionButton,
  EditInspectionButton,
} from "../buttonInspections";
import { Modal } from "../modal";
import { InspectionForm } from "../inspection-form/index";
import { DeleteInspection } from "../delete-inspection/index";
// import { Edit, Trash } from '../icons'

const ListingInspectionHistoryWithRef = ({ listingId }, ref) => {
  const [inspections, setInspections] = useState([]);
  const [editingInspection, setEditingInspection] = useState(null);
  const [inspectionToDelete, setInspectionToDelete] = useState(null);

  const deleteInspectionModalRef = useRef(null);
  const inspectionFormModalRef = useRef(null);
  const inspectionFormRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openForm: handleOpenInspectionFormModal,
  }));

  const handleOpenInspectionFormModal = () => {
    inspectionFormModalRef.current?.open();
  };

  const handleCloseRemoveInspectionModal = () => {
    deleteInspectionModalRef.current.close();
    setInspectionToDelete(null);
  };

  const handleEditInspection = async (inspection) => {
    handleOpenInspectionFormModal();
    setEditingInspection(inspection);
  };

  const handleOpenRemoveInspectionModal = async (inspection) => {
    deleteInspectionModalRef.current?.open();
    setInspectionToDelete(inspection);
  };

  const handleDeleteInspection = async () => {
    if (!inspectionToDelete) return;

    try {
      await api.delete(
        `listing/${listingId}/inspection/${inspectionToDelete.id}`
      );

      onInspectionDeleted(inspectionToDelete.id);
      handleCloseRemoveInspectionModal();
    } catch (err) {
      alert("Error deleting inspection");
    }
  };

  const onInspectionDeleted = useCallback((inspectionId) => {
    setInspections((oldState) =>
      oldState.filter((inspection) => inspection.id !== inspectionId)
    );
  }, []);

  const onInspectionAdded = useCallback(
    (newInspection) => {
      const _inspections = [...inspections, newInspection];
      _inspections.sort((a, b) => new Date(b.date) - new Date(a.date));

      setInspections(_inspections);
    },
    [inspections]
  );

  const onInspectionChanged = useCallback(
    (updatedInspection) => {
      const _inspections = [...inspections];

      const inspectionIndex = _inspections.findIndex(
        (inspection) => inspection.id === updatedInspection.id
      );

      if (inspectionIndex === -1) return;

      _inspections.splice(inspectionIndex, 1, updatedInspection);
      _inspections.sort((a, b) => new Date(b.date) - new Date(a.date));

      setInspections(_inspections);
    },
    [inspections]
  );

  const handleCancelAddInspection = () => {
    inspectionFormModalRef.current?.close();
    setEditingInspection(false);
  };

  useImperativeHandle(ref, () => ({
    openForm: handleOpenInspectionFormModal,
  }));

  const handleSaveInspection = async () => {
    const inspectionData = inspectionFormRef.current?.getData();

    const needToFill = Object.keys(inspectionData).some(
      (key) => !inspectionData[key]
    );

    if (needToFill) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      if (editingInspection) {
        const { data: updatedInspection } = await api.patch(
          `/listing/${listingId}/inspection/${editingInspection.id}`,
          {
            name: inspectionData.name,
            date: inspectionData.date,
            type: inspectionData.type,
          }
        );

        onInspectionChanged(updatedInspection);
      } else {
        const { data: newInspection } = await api.post(
          `/listing/${listingId}/inspection`,
          {
            name: inspectionData.name,
            date: inspectionData.date,
            type: inspectionData.type,
          }
        );

        onInspectionAdded(newInspection);
      }

      inspectionFormModalRef.current.close();
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response.data.response?.response?.message) {
          const errorMessages = err.response.data.response.response.message;
          const alertMessage = errorMessages
            .map((message) =>
              Object.keys(message.constraints).map(
                (key) => message.constraints[key]
              )
            )
            .join(", ");

          alert(alertMessage);
          return;
        }
      }

      alert("Error saving inspection.");
    }
  };

  useEffect(() => {
    async function loadInspections() {
      try {
        const { data } = await api.get(`/listing/${listingId}/inspection`);
        setInspections(data);
      } catch (err) {
        alert("Error loading listing inspections.");
      }
    }

    loadInspections();
  }, [listingId]);

  return (
    <>
      {!editingInspection && (
        <ListingInspectionHistoryCard>
          <div className="inspection-card-container">
            {inspections.map((inspection) => (
              <div className="inspection-card" key={inspection.id}>
                <div className="inspectionContent ms-3 mt-2 me-3">
                  <div className="actionButtons">
                    <EditInspectionButton
                      key={`edit-listing${listingId}-inspection${inspection.id}`}
                      defaultImage={<img src={Edit} alt="Edit" />}
                      hoverImage={<img src={EditHover} alt="EditHover" />}
                      onClick={() => handleEditInspection(inspection)}
                    />
                    <DeleteInspectionButton
                      key={`delete-listing${listingId}-inspection${inspection.id}`}
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
                    {new Date(inspection.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ListingInspectionHistoryCard>
      )}
      <Modal.Root
        ref={inspectionFormModalRef}
        onModalClosed={() => setEditingInspection(null)}
      >
        <Modal.Body width="50%">
          <Modal.Header showCloseIcon />
          <Modal.Content>
            <InspectionForm
              ref={inspectionFormRef}
              inspection={editingInspection}
            />
          </Modal.Content>
          <Modal.Footer>
            <Modal.Action
              outline
              text="Cancel"
              action={handleCancelAddInspection}
            />
            <Modal.Action text="Save" action={handleSaveInspection} />
          </Modal.Footer>
        </Modal.Body>
      </Modal.Root>
      <Modal.Root
        ref={deleteInspectionModalRef}
        onModalClosed={() => setInspectionToDelete(null)}
      >
        <Modal.Body>
          <Modal.Header showCloseIcon />
          <Modal.Content>
            <DeleteInspection inspection={inspectionToDelete} />
          </Modal.Content>
          <Modal.Footer>
            <Modal.Action
              text="Cancel"
              action={handleCloseRemoveInspectionModal}
              outline
            />
            <Modal.Action
              text="Delete"
              action={handleDeleteInspection}
              danger
            />
          </Modal.Footer>
        </Modal.Body>
      </Modal.Root>
    </>
  );
};

ListingInspectionHistoryWithRef.propTypes = {
  listingId: PropTypes.number.isRequired,
};

export const ListingInspectionHistory = forwardRef(
  ListingInspectionHistoryWithRef
);
