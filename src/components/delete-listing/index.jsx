import { useListingDetails } from "../../hooks/useListingDetails";
import { ConfirmText } from "./styles";

export function DeleteListing() {
  const { listing } = useListingDetails()

  return (
    <ConfirmText>Are you sure you want to delete the Listing <b>{listing.id.toString().padStart(6, '0')}</b>?</ConfirmText>
  )
}