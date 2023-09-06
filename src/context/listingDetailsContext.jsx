import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { formatPrice } from "../services/price"
import { api } from "../services/api"
import { Modal } from "../components/modal"
import { ListingDetails } from "../components/listing-details"
import { ListingInspectionsProvider } from "./listingInspectionsContext"

export const ListingDetailsContext = createContext(undefined)

export function ListingDetailsProvider({ listing, setListingDetails }) {
  const [isLoadingPNL, setIsLoadingPNL] = useState(true)
  const [profit, setProfit] = useState(formatPrice(0))
  const [loss, setLoss] = useState(formatPrice(0))

  const listingDetailsModalRef = useRef(null)

  const handleListingDetailsClosed = () => setListingDetails(null)

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

  useEffect(() => {
    if (!listing) {
      return
    }

    loadProfitAndLoss()
    listingDetailsModalRef.current.open()
  }, [listing, loadProfitAndLoss])

  const listingValue = useMemo(
    () => listing ? ({ ...listing, totalProfit: profit, totalLoss: loss}) : null,
    [listing, profit, loss]
  )

  const value = useMemo(
    () => ({
      listing: listingValue,
      isLoadingPNL,
      loadProfitAndLoss,
    }),
    [
      listingValue,
      isLoadingPNL,
      loadProfitAndLoss,
    ]
  )

  return (
    <ListingDetailsContext.Provider value={value}>
      <ListingInspectionsProvider>
        <Modal.Root
          ref={listingDetailsModalRef}
          onModalClosed={handleListingDetailsClosed}
        >
          <Modal.Body width="90%">
            <Modal.Header showCloseIcon />
            <Modal.Content>
              {listing && (
                <ListingDetails />
              )}
            </Modal.Content>
          </Modal.Body>
        </Modal.Root>
      </ListingInspectionsProvider>
    </ListingDetailsContext.Provider>
  )
}

ListingDetailsProvider.propTypes = {
  listing: PropTypes.object.isRequired,
  setListingDetails: PropTypes.func.isRequired,
}