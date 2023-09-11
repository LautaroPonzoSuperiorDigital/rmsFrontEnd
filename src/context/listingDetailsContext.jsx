import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { formatPrice } from "../services/price"
import { api } from "../services/api"
import { ListingInspectionsProvider } from "./listingInspectionsContext"
import { ListingApplicantsProvider } from "./listingApplicantsContext"
import TenantModal from "../components/modals/tenantsPopUp"
import { Modal } from "../components/modal"
import { ListingForm } from "../components/listing-form"

export const ListingDetailsContext = createContext(undefined)

export const ListingDetailsTabs = Object.freeze({
  TENANT_HISTORY: 0,
  INSPECTION_HISTORY: 1,
  DOCUMENT_HISTORY: 2,
  PAYMENT_HISTORY: 3,
  EXPENSE_HISTORY: 4,
  APPLICANTS: 5,
});
export function ListingDetailsProvider({ listing, setListingDetails, children }) {
  const [activeTab, setActiveTab] = useState(ListingDetailsTabs.TENANT_HISTORY);
  const [isLoadingPNL, setIsLoadingPNL] = useState(true)
  const [profit, setProfit] = useState(formatPrice(0))
  const [loss, setLoss] = useState(formatPrice(0))
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [isSavingListing, setIsSavingListing] = useState(false)

  const listingFormModalRef = useRef(null)
  const listingFormRef = useRef(null)

  const loadProfitAndLoss = useCallback(async () => {
    if (!listing) {
      return
    }

    setIsLoadingPNL(true)

    try {
      const { data } = await api.get(`/listing/${listing.id}/profit-and-loss`)

      setProfit(formatPrice(data.profit))
      setLoss(formatPrice(data.loss))
    } catch (err) {
      alert('Error loading listing Profit and Loss.')
    }

    setIsLoadingPNL(false)
  }, [listing])

  const handleOpenEditListingModal = useCallback(() => {
    listingFormModalRef.current?.open()
  }, [])

  const handleOpenTenantModal = useCallback((tenant) => () => {
    setSelectedTenant(tenant)
  }, [])

  const onListingSaved = useCallback((savedListing) => {
    setListingDetails(savedListing)
  }, [setListingDetails])

  useEffect(() => {
    if (!listing) {
      return
    }

    loadProfitAndLoss()
  }, [listing, loadProfitAndLoss])

  const listingValue = useMemo(
    () => listing ? ({ ...listing, totalProfit: profit, totalLoss: loss}) : null,
    [listing, profit, loss]
  )

  const activeTabValue = useMemo(
    () => ({ value: activeTab, set: setActiveTab }),
    [activeTab, setActiveTab]
  )

  const value = useMemo(
    () => ({
      activeTab: activeTabValue,
      listing: listingValue,
      isLoadingPNL,
      loadProfitAndLoss,
      handleOpenEditListingModal,
      handleOpenTenantModal,
    }),
    [
      activeTabValue,
      listingValue,
      isLoadingPNL,
      loadProfitAndLoss,
      handleOpenEditListingModal,
      handleOpenTenantModal,
    ]
  )

  return (
    <ListingDetailsContext.Provider value={value}>
      <ListingInspectionsProvider>
        <ListingApplicantsProvider>
          {children}
        </ListingApplicantsProvider>
      </ListingInspectionsProvider>

      <Modal.Root ref={listingFormModalRef}>
        <Modal.Body width="90%">
          <Modal.Header showCloseIcon />

          <Modal.Content>
            <ListingForm
              ref={listingFormRef}
              listing={listingValue}
              onListingSaved={onListingSaved}
              onSavingStatusChange={setIsSavingListing}
            />
          </Modal.Content>

          <Modal.Footer style={{ justifyContent: "flex-end" }}>
            <Modal.Action
              disabled={isSavingListing}
              outline
              text="Cancel"
              action={() => listingFormModalRef.current.close()}
            />

            <Modal.Action
              disabled={isSavingListing}
              text={isSavingListing ? "Saving..." : "Save"}
              action={() => listingFormRef.current?.submit()}
            />
          </Modal.Footer>
        </Modal.Body>
      </Modal.Root>

      {selectedTenant && (
        <TenantModal
          selectedTenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </ListingDetailsContext.Provider>
  )
}

ListingDetailsProvider.propTypes = {
  listing: PropTypes.object,
  setListingDetails: PropTypes.func,
  children: PropTypes.node.isRequired,
}