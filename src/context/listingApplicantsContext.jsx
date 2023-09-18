import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "../components/modal";
import { RemoveApplicantFromListing } from "../components/remove-applicant-from-listing";
import { api } from "../services/api";
import { useListingDetails } from "../hooks/useListingDetails";
import { ListingDetailsTabs } from "./listingDetailsContext";

export const ListingApplicantsContext = createContext(undefined);

export function ListingApplicantsProvider({ children }) {
  const [applicants, setApplicants] = useState([])
  const [removingApplicantIndex, setRemovingApplicantIndex] = useState(null)
  const [isRemoving, setIsRemoving] = useState(false)

  const removeApplicantModalRef = useRef(null)

  const { listing, activeTab } = useListingDetails()

  const removingApplicant = useMemo(
    () => applicants[removingApplicantIndex],
    [applicants, removingApplicantIndex]
  )

  const openRemoveApplicantModal = () => removeApplicantModalRef.current?.open()

  const closeRemoveApplicantModal = () => removeApplicantModalRef.current?.close()

  const handleOpenRemoveApplicantModal = useCallback((applicantIndex) => 
    () => {
      setRemovingApplicantIndex(applicantIndex)
  
      openRemoveApplicantModal()
    }, [])

  const handleCloseRemoveApplicantModal = () => closeRemoveApplicantModal

  const handleRemoveApplicant = () =>
  async () => {
    setIsRemoving(true)

    try {
      await api.delete(`/listing/${listing.id}/applicants/${removingApplicant.User.id}`)

      setApplicants(oldState => oldState.filter((_, applicantIndex) => applicantIndex !== removingApplicantIndex))
      setRemovingApplicantIndex(null)
      closeRemoveApplicantModal()
    } catch (err) {
      alert('Error removing applicant')
    }

    setIsRemoving(false)
  }

  useEffect(() => {
    async function loadApplicants() {
      try {
        const { data } = await api.get(`/listing/${listing.id}/applicants`)

        setApplicants(data)
      } catch (err) {
        alert('Error loading applicants')
      }
    }

    if (listing && activeTab.value === ListingDetailsTabs.APPLICANTS) {
      loadApplicants()
    }
  }, [listing, activeTab])

  const value = useMemo(
    () => ({
      applicants,
      removingApplicant,
      handleOpenRemoveApplicantModal
    }),
    [
      applicants,
      removingApplicant,
      handleOpenRemoveApplicantModal,
    ]
  )

  return (
    <ListingApplicantsContext.Provider value={value}>
      {children}

      <Modal.Root ref={removeApplicantModalRef} onModalClosed={() => setRemovingApplicantIndex(null)}>
        <Modal.Body width="50%">
          <Modal.Header showCloseIcon={!isRemoving}>
            <Modal.Title title="Remove Applicant" />
          </Modal.Header>

          <Modal.Content>
            {removingApplicant && (
              <RemoveApplicantFromListing />
            )}
          </Modal.Content>

          <Modal.Footer>
            <Modal.Action
              text="Cancel"
              outline
              disabled={isRemoving}
              action={handleCloseRemoveApplicantModal()}
            />
            <Modal.Action
              text={isRemoving ? "Removing..." : "Remove"}
              danger
              disabled={isRemoving}
              action={handleRemoveApplicant()}
            />
          </Modal.Footer>
        </Modal.Body>
      </Modal.Root>
    </ListingApplicantsContext.Provider>
  )
}

ListingApplicantsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};