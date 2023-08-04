import { useContext } from "react"
import { ListingDetailsContext } from "../context/listingDetailsContext"

export function useListingDetails() {
  const context = useContext(ListingDetailsContext)

  if(!context) {
    throw new Error('ListingDetailsProvider not found.')
  }

  return context
}