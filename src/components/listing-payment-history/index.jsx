import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { api } from "../../services/api"

import { ListingPaymentHistoryTable } from "./styles"
import { formatPrice } from "../../services/price"
import { formatDate } from "../../services/date"

export function ListingPaymentHistory({ listingId }) {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function loadPayments() {
      try {
        const { data } = await api.get(`/listing/${listingId}/payments`)

        setPayments(data)
        console.log('payments: ', data)
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
              <span>Edit</span>
              <span>Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </ListingPaymentHistoryTable>
  )
}

ListingPaymentHistory.propTypes = {
  listingId: PropTypes.string.isRequired
}