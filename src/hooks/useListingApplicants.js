import { useContext } from "react"
import { ListingApplicantsContext } from "../context/listingApplicantsContext"

export function useListingApplicants() {
  const context = useContext(ListingApplicantsContext)

  if(!context) {
    throw new Error('ListingApplicantsProvider not found.')
  }

  return context
}