import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { api } from "../../services/api"
import { formatPrice } from "../../services/price"
import { formatDate } from "../../services/date"

import { Edit, Trash } from "../icons"

import { ListingPaymentHistoryTable } from "./styles"

export function ListingPaymentHistory({ listingId }) {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function loadPayments() {
      try {
        const { data } = await api.get(`/listing/${listingId}/payments`)

        setPayments(data)
      } catch (err) {
        alert('Error loading listing payments.')
      }
    }

    loadPayments()
  }, [listingId])

  return (
    <ListingPaymentHistoryTable cellSpacing={0}>
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td>Rent Payment</td>
            <td>{formatPrice(payment.amount)}</td>
            <td>{formatDate(payment.madeAt)}</td>
            <td>
              <button type="button">
                <Edit />
              </button>
              <button type="button">
                <Trash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </ListingPaymentHistoryTable>
  )
}

ListingPaymentHistory.propTypes = {
  listingId: PropTypes.number.isRequired
}