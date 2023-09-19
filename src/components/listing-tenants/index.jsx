import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

import { useListingDetails } from "../../hooks/useListingDetails"
import { api } from "../../services/api"
import { formatDate } from "../../services/date"

import {
  Tenant,
  TenantName,
  Period,
  ListingTenantsContainer,
  TenantAction,
} from "./styles"

export function ListingTenants() {
  const [tenants, setTenants] = useState([])

  const { listing, handleOpenTenantModal } = useListingDetails()

  useEffect(() => {
    async function loadApplicants() {
      try {
        const { data } = await api.get(`/listing/${listing.id}/tenants`)

        setTenants(data.map(tenant => {
          const tenantListing = tenant.Listings[0]

          if (tenantListing) {
            return {
              ...tenant,
              joinDate: formatDate({
                date: tenantListing.joinDate,
                formatOptions: DateTime.DATE_MED,
              }),
              leaveDate: tenantListing.leaveDate && formatDate({
                date: tenantListing.leaveDate,
                formatOptions: DateTime.DATE_MED,
              }),
            }
          }

          return tenant
        }))
      } catch (err) {
        alert('Error loading tenants')
      }
    }

    if (listing) {
      loadApplicants()
    }
  }, [listing])

  return (
    <ListingTenantsContainer>
      {tenants.map((tenant) => (
        <Tenant key={tenant.id} onClick={handleOpenTenantModal(tenant)}>
          <TenantName>{tenant.User.name}</TenantName>

          <Period>{tenant.joinDate} - {tenant.leaveDate || 'Current'}</Period>

          <TenantAction>
            <FiEdit2 />
          </TenantAction>

          <TenantAction>
            <FiTrash2 />
          </TenantAction>
        </Tenant>
      ))}
    </ListingTenantsContainer>
  )
}