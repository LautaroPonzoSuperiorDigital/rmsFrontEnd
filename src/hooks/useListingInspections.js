import { useContext } from "react"
import { ListingInspectionsContext } from "../context/listingInspectionsContext"

export function useListingInspections() {
  const context = useContext(ListingInspectionsContext)

  if(!context) {
    throw new Error('ListingInspectionsProvider not found.')
  }

  return context
}