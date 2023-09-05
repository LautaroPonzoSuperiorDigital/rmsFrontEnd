import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal } from "../components/modal";
import { api } from "../services/api";
import { isAxiosError } from "axios";
import { useListingDetails } from "../hooks/useListingDetails";
import { InspectionForm } from "../components/inspection-form";
import { DeleteInspection } from "../components/delete-inspection";
import { SectionList } from "../components/inspection-form/styles";

export const ListingInspectionsContext = createContext(undefined);

export function ListingInspectionsProvider({ children }) {
  const [inspections, setInspections] = useState([]);
  const [sections, setSections] = useState([]);
  const [editingInspection, setEditingInspection] = useState(null);
  const [inspectionToDelete, setInspectionToDelete] = useState(null);

  const { listing } = useListingDetails();

  const deleteInspectionModalRef = useRef(null);
  const inspectionFormModalRef = useRef(null);
  const inspectionFormRef = useRef(null);

  const handleInspectionFormModalClosed = () => setEditingInspection(null);

  const handleCloseInpectionFormModal = () => {
    inspectionFormModalRef.current?.close();
  };

  const handleCloseRemoveInspectionModal = () => {
    deleteInspectionModalRef.current.close();
    setInspectionToDelete(null);
  };

  const handleOpenRemoveInspectionModal = useCallback((inspection) => {
    setInspectionToDelete(inspection);

    deleteInspectionModalRef.current?.open();
  }, []);

  const handleOpenInspectionFormModal = useCallback(() => {
    inspectionFormModalRef.current?.open();
  }, []);

  const handleEditInspection = useCallback(
    (inspection) => {
      setEditingInspection(inspection);
      handleOpenInspectionFormModal();
    },
    [handleOpenInspectionFormModal]
  );

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

  const handleDeleteInspection = async () => {
    if (!inspectionToDelete || !listing) return;

    try {
      await api.delete(
        `listing/${listing.id}/inspection/${inspectionToDelete.id}`
      );

      onInspectionDeleted(inspectionToDelete.id);
      handleCloseRemoveInspectionModal();
    } catch (err) {
      alert("Error deleting inspection");
    }
  };

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
          `/listing/${listing.id}/inspection/${editingInspection.id}`,
          {
            name: inspectionData.name,
            date: inspectionData.date,
            type: inspectionData.type,
          }
        );

        onInspectionChanged(updatedInspection);
      } else {
        const { data: newInspection } = await api.post(
          `/listing/${listing.id}/inspection`,
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

  const value = useMemo(
    () => ({
      inspections,
      sections,
      handleOpenInspectionFormModal,
      handleEditInspection,
      handleOpenRemoveInspectionModal,
    }),
    [
      inspections,
      sections,
      handleOpenInspectionFormModal,
      handleEditInspection,
      handleOpenRemoveInspectionModal,
    ]
  );

  useEffect(() => {
    async function loadInspections() {
      if (!listing) {
        return;
      }

      try {
        const { data } = await api.get(`/listing/${listing.id}/inspection`);
        setInspections(data);
      } catch (err) {
        console.log(err);
        alert("Error loading listing inspections.");
      }
    }

    loadInspections();
  }, [listing]);

  useEffect(() => {
    async function loadSections() {
      if (!listing) {
        return;
      }

      try {
        const { data } = await api.get(`/listing/${listing.id}/section`);
        setSections(data);
      } catch (err) {
        alert("Error loading listing sections.");
      }
    }

    loadSections();
  }, [listing]);

  return (
    <ListingInspectionsContext.Provider value={value}>
      {children}

      <Modal.Root
        ref={inspectionFormModalRef}
        onModalClosed={handleInspectionFormModalClosed}
      >
        <Modal.Body width="90%">
          <Modal.Header showCloseIcon />
          <Modal.Content>
            <div className="container-fluid">
              <div className="row">
                <div className="form-container w-50 col-sm-6 pt-8">
                  <InspectionForm
                    ref={inspectionFormRef}
                    inspection={editingInspection}
                  />
                </div>
                <div
                  className="section-container w-50 col-sm-6 pt-8"
                  style={{ paddingRight: "160px" }}
                >
                  <div
                    className="row row-cols-4 pr6-l"
                    style={{ display: "flex" }}
                  >
                    {sections.map((section) => (
                      <SectionList
                        className="section col-md-3"
                        key={section.id}
                      >
                        <p>{section.name}</p>
                      </SectionList>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Modal.Action
              outline
              text="Cancel"
              action={handleCloseInpectionFormModal}
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
    </ListingInspectionsContext.Provider>
  );
}

ListingInspectionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
