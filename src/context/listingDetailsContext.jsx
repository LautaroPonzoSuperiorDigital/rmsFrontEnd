import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { formatPrice } from "../services/price"
import { api } from "../services/api"
import { ListingInspectionsProvider } from "./listingInspectionsContext"
import { ListingApplicantsProvider } from "./listingApplicantsContext"

export const ListingDetailsContext = createContext(undefined)

export const ListingDetailsTabs = Object.freeze({
  TENANT_HISTORY: 0,
  INSPECTION_HISTORY: 1,
  DOCUMENT_HISTORY: 2,
  PAYMENT_HISTORY: 3,
  EXPENSE_HISTORY: 4,
  APPLICANTS: 5,
});
export function ListingDetailsProvider({ listing, children }) {
  const [activeTab, setActiveTab] = useState(ListingDetailsTabs.TENANT_HISTORY);
  const [isLoadingPNL, setIsLoadingPNL] = useState(true)
  const [profit, setProfit] = useState(formatPrice(0))
  const [loss, setLoss] = useState(formatPrice(0))

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
    }),
    [
      activeTabValue,
      listingValue,
      isLoadingPNL,
      loadProfitAndLoss,
    ]
  )

  return (
    <ListingDetailsContext.Provider value={value}>
      <ListingInspectionsProvider>
        <ListingApplicantsProvider>
          {children}
        </ListingApplicantsProvider>
      </ListingInspectionsProvider>
    </ListingDetailsContext.Provider>
  )
}

ListingDetailsProvider.propTypes = {
  listing: PropTypes.object,
  children: PropTypes.node.isRequired,
}