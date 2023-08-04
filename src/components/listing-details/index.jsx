import { useRef, useState } from 'react'
import { Tabs } from 'react-tabs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { formatPrice } from '../../services/price'
import { useListingDetails } from '../../hooks/useListingDetails'

import { ListingExpenseHistory } from '../listing-expense-history'
import CheckBoxLog from "../checkBox"
import { Edit, Export, Trash } from "../icons"
import { ListingPaymentHistory } from '../listing-payment-history'

import {
  Album,
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
} from "./styles"

const ListingDetailsTabs = Object.freeze({
  TENANT_HISTORY: 0,
  INSPECTION_HISTORY: 1,
  DOCUMENT_HISTORY: 2,
  PAYMENT_HISTORY: 3,
  EXPENSE_HISTORY: 4,
  APPLICANTS: 5,
})

export function ListingDetails() {
  const [activeTab, setActiveTab] = useState(ListingDetailsTabs.TENANT_HISTORY)

  const expensesRef = useRef(null)

  const { listing, isLoadingPNL } = useListingDetails()

  const showExpensesActions = activeTab === ListingDetailsTabs.EXPENSE_HISTORY

  const openExpenseForm = () => expensesRef.current?.openForm()

  return (
    <ListingDetailsContainer>
      <DetailsBox>
        <Album>
          Album
        </Album>

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
            <MainDetail>
              <span>TOTAL PROFIT</span>
              {isLoadingPNL ? (
                <Skeleton height="1rem" width={100} />
              ) : (
                <span>{listing.totalProfit}</span>
              )}
            </MainDetail>

            <MainDetail>
              <span>TOTAL LOSS</span>
              {isLoadingPNL ? (
                <Skeleton height="1rem" width={100} />
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
                checked={listing.isPublic}
              />
            </ExtraDetail>

            <Action>
              <Edit />
              <span>Edit Listing Details</span>
            </Action>

            <Action>
              <Trash />
              <span>Delete Listing</span>
            </Action>
          </ExtraDetailsTop>

          <ExtraDetail>
            <span># BEEDROOMS</span>
            <span>{listing.bedrooms}</span>
          </ExtraDetail>

          <ExtraDetail>
            <span># BATHROOMS</span>
            <span>{listing.bathrooms}</span>
          </ExtraDetail>

          <ExtraDetail>
            <span>AMENITIES</span>
            <Amenities>
            {listing.Amenities?.map(amenity => (
              <li key={amenity.id}>{amenity.name}</li>
            ))}
            </Amenities>
          </ExtraDetail>

          <ExtraDetail>
            <span>REQUIREMENTS</span>
            <Requirements>
            {listing.Requirements?.map(requirement => (
              <li key={requirement.id}>{requirement.name}</li>
            ))}
            </Requirements>
          </ExtraDetail>
        </ExtraDetailsBox>
      </DetailsBox>

      <Tabs
        selectedTabClassName="active"
        selectedTabPanelClassName="active"
        tabIndex={activeTab}
        onSelect={setActiveTab}
      >
        <HistoryTabs>
          <HistoryTab>Tenant History</HistoryTab>
          <HistoryTab>Inspection History</HistoryTab>
          <HistoryTab>Document History</HistoryTab>
          <HistoryTab>Payment History</HistoryTab>
          <HistoryTab>Expense History</HistoryTab>
          <HistoryTab>Applicants</HistoryTab>

          {showExpensesActions && (
            <ExpensesActionsBox>
              <ExpenseAction type="button" onClick={openExpenseForm}>
                + Add Expense
              </ExpenseAction>

              <ExpenseAction type="button">
                <Export />
                Export
              </ExpenseAction>
            </ExpensesActionsBox>
          )}
        </HistoryTabs>

        <HistoryTabContent>Tenant History Not Implemented Yet 😬</HistoryTabContent>
        <HistoryTabContent>Inspection History Not Implemented Yet 😬</HistoryTabContent>
        <HistoryTabContent>Document History Not Implemented Yet 😬</HistoryTabContent>

        <HistoryTabContent>
          <ListingPaymentHistory listingId={listing.id} />
        </HistoryTabContent>

        <HistoryTabContent>
          <ListingExpenseHistory
            ref={expensesRef}
            listingId={listing.id}
          />
        </HistoryTabContent>

        <HistoryTabContent>Applicants Not Implemented Yet 😬</HistoryTabContent>
      </Tabs>
    </ListingDetailsContainer>
  )
}