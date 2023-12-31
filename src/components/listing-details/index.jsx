import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'react-tabs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { formatPrice } from '../../services/price'
import { useListingDetails } from '../../hooks/useListingDetails'

import { ListingInspectionHistory } from '../listing-inspection-history'
import { ListingExpenseHistory } from '../listing-expense-history'
import { ListingPaymentHistory } from '../listing-payment-history'

import CheckBoxLog from '../checkBox'
import { Edit, Export, Trash } from '../icons'

import {
  DetailsBox,
  ExtraDetailsBox,
  ListingDetailsContainer,
  MainDetails,
  MainDetail,
  ExtraDetail,
  Amenities,
  Requirements,
  ProfitAndLossBox,
  ExtraDetailsTop,
  Action,
  HistoryTabs,
  HistoryTab,
  HistoryTabContent,
  ExpensesActionsBox,
  ExpenseAction,
  InspectionsActionsBox,
  InspectionAction,
  DocumentsActionsBox,
  DocumentAction,
  ExtraDetail2
} from './styles'
import { ListingAlbumPreview } from '../listing-album-preview'
import { useListingInspections } from '../../hooks/useListingInspections'
import { ListingDetailsTabs } from '../../context/listingDetailsContext'
import { ListingApplicants } from '../listing-applicants'
import { ListingTenants } from '../listing-tenants'
import { ListingDocuments } from '../listing-documents'
import { api } from '../../services/api'

export function ListingDetails({ setUpdateListing }) {
  const expensesRef = useRef(null)

  const {
    activeTab,
    listing,
    isLoadingPNL,
    handleOpenEditListingModal,
    handleOpenDeleteListingModal
  } = useListingDetails()
  const { handleOpenInspectionFormModal } = useListingInspections()

  const showInspectionActions =
    activeTab.value === ListingDetailsTabs.INSPECTION_HISTORY

  const showExpensesActions =
    activeTab.value === ListingDetailsTabs.EXPENSE_HISTORY

  const showDocumentsActions =
    activeTab.value === ListingDetailsTabs.DOCUMENT_HISTORY

  const openExpenseForm = () => expensesRef.current?.openForm()

  const handleIsPublic = async () => {
    try {
      await api.patch(`listing/${listing.id}`, {
        isPublic: !listing.isPublic
      })
      setUpdateListing(true)
    } catch (err) {
      console.log(err)
    }
  }

  console.log({ listing })

  return (
    <ListingDetailsContainer>
      <DetailsBox>
        <ListingAlbumPreview
          editable={false}
          listingId={listing?.id}
          // listingSections={listing.Sections}
        />

        <MainDetails>
          <MainDetail>
            <span>ID</span>
            <span>{listing.id}</span>
          </MainDetail>

          <MainDetail>
            <span>LOCATION</span>
            <span>{listing.location}</span>
          </MainDetail>

          <MainDetail>
            <span>LOT SIZE</span>
            <span>{listing.lotSize}</span>
          </MainDetail>

          <MainDetail>
            <span>HOUSE SIZE</span>
            <span>{listing.houseSize}</span>
          </MainDetail>

          <MainDetail>
            <span>PRICE</span>
            <span>{formatPrice(listing.price)}</span>
          </MainDetail>

          <ProfitAndLossBox>
            <MainDetail style={{ padding: '10px' }}>
              <span>TOTAL PROFIT</span>
              {isLoadingPNL ? (
                <Skeleton height='1rem' width={100} />
              ) : (
                <span>{listing.totalProfit}</span>
              )}
            </MainDetail>

            <MainDetail style={{ padding: '10px' }}>
              <span>TOTAL LOSS</span>
              {isLoadingPNL ? (
                <Skeleton height='1rem' width={100} />
              ) : (
                <span>{listing.totalLoss}</span>
              )}
            </MainDetail>
          </ProfitAndLossBox>
        </MainDetails>

        <ExtraDetailsBox>
          <ExtraDetailsTop>
            <ExtraDetail>
              <span>PUBLIC</span>
              <CheckBoxLog
                defaultChecked={listing.isPublic}
                onChange={handleIsPublic}
              />
            </ExtraDetail>

            <Action type='button' onClick={handleOpenEditListingModal}>
              <Edit />
              <span>Edit Listing Details</span>
            </Action>

            <Action type='button' onClick={handleOpenDeleteListingModal}>
              <Trash />
              <span>Delete Listing</span>
            </Action>
          </ExtraDetailsTop>

          <ExtraDetail2>
            <span># BEEDROOMS</span>
            <span>{listing.bedrooms}</span>
          </ExtraDetail2>

          <ExtraDetail2>
            <span># BATHROOMS</span>
            <span>{listing.bathrooms}</span>
          </ExtraDetail2>

          <ExtraDetail2>
            <span># GARAGES</span>
            <span>{listing.garages}</span>
          </ExtraDetail2>

          <ExtraDetail2>
            <span>AMENITIES</span>
            <Amenities>
              {listing.Amenities?.map((amenity, index) => (
                <li key={index}>{amenity.name}</li>
              ))}
            </Amenities>
          </ExtraDetail2>

          <ExtraDetail2>
            <span>REQUIREMENTS</span>
            <Requirements>
              {listing.Requirements?.map((requirement, index) => (
                <li key={index}>{requirement.name}</li>
              ))}
            </Requirements>
          </ExtraDetail2>
        </ExtraDetailsBox>
      </DetailsBox>

      <Tabs
        selectedTabClassName='active'
        selectedTabPanelClassName='active'
        tabIndex={activeTab.value}
        onSelect={activeTab.set}
      >
        <HistoryTabs>
          <HistoryTab>Tenant History</HistoryTab>
          <HistoryTab>Inspection History</HistoryTab>
          <HistoryTab>Document History</HistoryTab>
          <HistoryTab>Payment History</HistoryTab>
          <HistoryTab>Expense History</HistoryTab>
          <HistoryTab>Applicants</HistoryTab>

          {showInspectionActions && (
            <InspectionsActionsBox>
              <InspectionAction
                type='button'
                onClick={handleOpenInspectionFormModal}
              >
                + Add Inspection
              </InspectionAction>
            </InspectionsActionsBox>
          )}

          {showExpensesActions && (
            <ExpensesActionsBox>
              <ExpenseAction type='button' onClick={openExpenseForm}>
                + Add Expense
              </ExpenseAction>

              <ExpenseAction type='button'>
                <Export />
                Export
              </ExpenseAction>
            </ExpensesActionsBox>
          )}

          {showDocumentsActions && (
            <DocumentsActionsBox>
              {/* <DocumentAction type="button">+ Add Document</DocumentAction> */}
            </DocumentsActionsBox>
          )}
        </HistoryTabs>

        <HistoryTabContent>
          <ListingTenants />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingInspectionHistory />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingDocuments />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingPaymentHistory listingId={listing.id} />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingExpenseHistory ref={expensesRef} listingId={listing.id} />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingApplicants />
        </HistoryTabContent>
      </Tabs>
    </ListingDetailsContainer>
  )
}

ListingDetails.propTypes = {
  setUpdateListing: PropTypes.func.isRequired
}
