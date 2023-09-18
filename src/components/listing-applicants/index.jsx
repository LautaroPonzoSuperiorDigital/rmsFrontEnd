import { FiTrash2 } from "react-icons/fi"

import { useListingApplicants } from "../../hooks/useListingApplicants"
import { formatApprovalStatus } from "../../services/approval-status"

import {
  Applicant,
  ApplicantName,
  ApprovalStatus,
  ListingApplicantsContainer,
  RemoveApplicant,
} from "./styles"

export function ListingApplicants() {
  const { applicants, handleOpenRemoveApplicantModal } = useListingApplicants()

  return (
    <ListingApplicantsContainer>
      {applicants.map((applicant, applicantIndex) => (
        <Applicant key={applicant.id}>
          <ApplicantName>{applicant.User.name}</ApplicantName>

          <ApprovalStatus>{formatApprovalStatus(applicant.approvalStatus)}</ApprovalStatus>

          <RemoveApplicant onClick={handleOpenRemoveApplicantModal(applicantIndex)}>
            <FiTrash2 />
          </RemoveApplicant>
        </Applicant>
      ))}
    </ListingApplicantsContainer>
  )
}