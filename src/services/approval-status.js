const approvalStatuses = Object.freeze({
  SCREENING_IN_PROCESS: 'Screening in Process',
  LEASE_AGREEMENT: 'Lease Agreement',
  LEASE_AGREEMENT_SIGNED: 'Lease Agreement Signed',
  APPROVED: 'Approved',
})

export const formatApprovalStatus = (approvalStatus) => approvalStatuses[approvalStatus]