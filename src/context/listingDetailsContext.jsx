import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { formatPrice } from "../services/price"
import { api } from "../services/api"

export const ListingDetailsContext = createContext(undefined)

export function ListingDetailsProvider({ listing, children }) {
  const [isLoadingPNL, setIsLoadingPNL] = useState(true)
  const [profit, setProfit] = useState(formatPrice(0))
  const [loss, setLoss] = useState(formatPrice(0))

  const loadProfitAndLoss = useCallback(async () => {
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
    loadProfitAndLoss()
  }, [loadProfitAndLoss])

  const listingValue = useMemo(
    () => ({ ...listing, totalProfit: profit, totalLoss: loss}),
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
      {children}
    </ListingDetailsContext.Provider>
  )
}

ListingDetailsProvider.propTypes = {
  listing: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}