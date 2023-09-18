import { useListingApplicants } from "../../hooks/useListingApplicants";
import { useListingDetails } from "../../hooks/useListingDetails";
import { RemoveApplicantFromListingContainer } from "./styles";

export function RemoveApplicantFromListing() {
  const { listing } = useListingDetails()
  const { removingApplicant } = useListingApplicants()

  const applicantName = removingApplicant.User.name
  const listingId = listing.id.toString().padStart(6, "0")

  return (
    <RemoveApplicantFromListingContainer>
      <span>
        Are you sure you want to remove the applicant
        {" "}
        <b>{applicantName}</b>
        {" "}
        from listing
        {" "}
        <b>{listingId}</b>?
      </span>
    </RemoveApplicantFromListingContainer>
  )
}