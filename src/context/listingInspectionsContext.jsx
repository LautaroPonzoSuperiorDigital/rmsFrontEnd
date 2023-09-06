import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Modal } from "../components/modal"
import { api } from "../services/api"
import { isAxiosError } from "axios"
import { useListingDetails } from "../hooks/useListingDetails"
import { InspectionForm } from "../components/inspection-form"
import { DeleteInspection } from "../components/delete-inspection"
import { ListingInspectionSection } from "../components/listing-inspection-section"
import { ListingDetailsTabs } from "./listingDetailsContext"
import { ListingInspectionSectionCategoryImages } from "../components/listing-inspection-section-category-images"
import { SectionList, SectoinListTitle, Tooltip } from "../components/inspection-form/styles"
import NoteIcon from "../assets/img/note.svg";
import AddImageIcon from "../assets/img/add-image.svg";

export const ListingInspectionsContext = createContext(undefined);

export function ListingInspectionsProvider({ children }) {
  const [inspections, setInspections] = useState([])
  const [sections, setSections] = useState([])
  const [editingInspection, setEditingInspection] = useState(null)
  const [inspectionToDelete, setInspectionToDelete] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { listing, activeTab } = useListingDetails()

  const deleteInspectionModalRef = useRef(null)
  const inspectionFormModalRef = useRef(null)
  const inspectionFormRef = useRef(null)
  const sectionModalRef = useRef(null)
  const categoryImagesModalRef = useRef(null)

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

  const handleOpenSectionModal = useCallback((section) => {
    setSelectedSection(section)
    sectionModalRef.current?.open()
  }, [])

  const handleOpenCategoryImagesModal = useCallback((category) => {
    setSelectedCategory(category)
    categoryImagesModalRef.current?.open()
  }, [])

  const handleEditInspection = useCallback((inspection) => {
    setEditingInspection(inspection)
    handleOpenInspectionFormModal()
  }, [handleOpenInspectionFormModal])

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

  const onSectionChanged = useCallback(
    (updatedSection) => {
      const _sections = [...sections]

      const sectionIndex = _sections.findIndex(
        (section) => section.id === updatedSection.id
      )

      if (sectionIndex === -1) return

      _sections.splice(sectionIndex, 1, updatedSection)

      setSections(_sections)
    },
    [sections]
  )

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
      editingInspection,
      handleOpenInspectionFormModal,
      handleEditInspection,
      handleOpenRemoveInspectionModal,
      handleOpenCategoryImagesModal,
      onSectionChanged,
    }),
    [
      inspections,
      sections,
      editingInspection,
      handleOpenInspectionFormModal,
      handleEditInspection,
      handleOpenRemoveInspectionModal,
      handleOpenCategoryImagesModal,
      onSectionChanged,
    ]
  );

  useEffect(() => {
    async function loadInspections() {
      if (!listing) return;

      try {
        const { data } = await api.get(`/listing/${listing.id}/inspection`);
        setInspections(data);
      } catch (err) {
        alert("Error loading listing inspections.")
      }
    }

    if (activeTab.value === ListingDetailsTabs.INSPECTION_HISTORY) {
      loadInspections();
    }
  }, [listing, activeTab])

  useEffect(() => {
    async function loadSections() {
      if (!listing) return;

      try {
        const { data } = await api.get(`/listing/${listing.id}/section`);
        setSections(data);
      } catch (err) {
        alert("Error loading listing sections.");
      }
    }

    if (activeTab.value === ListingDetailsTabs.INSPECTION_HISTORY) {
      loadSections();
    }
  }, [activeTab, listing]);

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
                <div className="form-container m-0 p-0 w-50 col-sm-6 pt-8">
                  <InspectionForm
                    ref={inspectionFormRef}
                    inspection={editingInspection}
                  />
                </div>
                <div
                  className="section-container w-50 col-sm-6 pt-8 m-0"
                  style={{ paddingRight: "10rem", paddingLeft: 0 }}
                >
                  <SectoinListTitle>
                    <h1 className="mt-5 mb-4">Spaces</h1>
                  </SectoinListTitle>
                  <div className="row row-cols-3 pr6-l">
                    {sections.map((section) => (
                      <SectionList
                        className="section col-md-4 d-flex align-items-stretch"
                        key={section.id}
                      >
                        <p className="flex-fill">
                          {section.name}
                          {section?.note && (
                            <Tooltip tooltipText={section?.note}>
                              <img src={NoteIcon} alt="Note" />
                            </Tooltip>
                          )}
                          <Tooltip tooltipText={"Add Image"} onClick={() => handleOpenSectionModal(section)}>
                            <img src={AddImageIcon} alt="Add Image" />
                          </Tooltip>
                        </p>
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

      <Modal.Root ref={sectionModalRef}>
        <Modal.Body width="90%">
          <Modal.Header showCloseIcon />
          <Modal.Content>
            {selectedSection && (
              <ListingInspectionSection section={selectedSection} />
            )}
          </Modal.Content>
        </Modal.Body>
      </Modal.Root>

      <Modal.Root
        ref={categoryImagesModalRef}
        onModalClosed={() => setSelectedCategory(null)}
      >
        <Modal.Body width="90%">
          <Modal.Header showCloseIcon />
          <Modal.Content>
            {selectedCategory && (
              <ListingInspectionSectionCategoryImages category={selectedCategory} />
            )}
          </Modal.Content>
        </Modal.Body>
      </Modal.Root>
    </ListingInspectionsContext.Provider>
  );
}

ListingInspectionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
