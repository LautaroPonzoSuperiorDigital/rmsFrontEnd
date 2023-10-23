import React, { useState, useEffect } from "react"
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody
} from "./styles"
import "../../../../styles/publIcListings/application.css"
import EmergencyContactaApplicant from "./EmergencyContactaApplicant"
import IncomeApplicants from "./IncomeApplicants"
import RentalHistoryApplicant from "./RentalHistory"
import RoommatesApplicant from "./RoommatesApplicant"
import VehiclesApplicant from "./VehiclesApplicant"
import OtherInformationApplicant from "../OtherInformation Applicant"

const ApplicantsModal = ({
  isOpen,
  onClose,
  applicant,
  selectedId,
  title = "Applicants"
}) => {
  console.log(applicant)
  if (!isOpen) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{title} Information</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>

        <ModalBody>
          <EmergencyContactaApplicant contact={applicant.EmergencyContacts} />
          <IncomeApplicants
            income={applicant.Incomes}
            otherIncomes={applicant.OtherIncomes}
          />
          <RentalHistoryApplicant rentalHistory={applicant.OtherAddresses} />
          <RoommatesApplicant roommates={applicant.RoomMates} />
          <VehiclesApplicant vehicles={applicant.Vehicles} />
          <OtherInformationApplicant otherInfo={applicant.AdditionalInfos} />
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ApplicantsModal
