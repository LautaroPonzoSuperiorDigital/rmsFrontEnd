import { DateTime } from "luxon"
import PropTypes from "prop-types"
import { useMemo } from "react"

import { api } from "../../../services/api"
import { formatDate } from "../../../services/date"
import { formatPrice } from "../../../services/price"

import { ChevronRight } from "../../icons/tenants"

import {
  Label,
  MakePaymentButton,
  PaymentDetails,
  PaymentDueContainer,
  LatePaymentsLink,
  NoPaymentDueLabel,
} from "./styles"

export function PaymentDue({ paymentDues }) {
  const latePayments = useMemo(() => {
    const currentDate = DateTime.now()

    return paymentDues.filter(paymentDue => paymentDue.dueDate < currentDate)
  }, [paymentDues])

  const currentPaymentDue = useMemo(() => {
    const currentDate = DateTime.now()

    return paymentDues.find(paymentDue => paymentDue.dueDate > currentDate)
  }, [paymentDues])

  const handleMakePayment = async () => {
    if (!currentPaymentDue) {
      return
    }

    try {
      await api.post(`/payments/${currentPaymentDue.id}/process`)
    } catch (err) {
      alert('Error while processing payment')
    }
  }

  return (
    <PaymentDueContainer>
      <Label>Rent Payment Due</Label>

      {latePayments.length > 0 && (
        <LatePaymentsLink to="/payments/late">
          <span>
            You have {latePayments.length} late {latePayments.length === 1 ? 'payment' : 'payments'}
          </span>

          <ChevronRight filled color="#FF0000"/>
        </LatePaymentsLink>
      )}
      
      {currentPaymentDue ? (
        <>
          <PaymentDetails>
            {formatDate(currentPaymentDue.dueDate, null, DateTime.DATE_MED)} | {formatPrice(currentPaymentDue.totalAmount)}
          </PaymentDetails>

          <MakePaymentButton
            type="button"
            onClick={handleMakePayment}
          >
            Make A Payment
          </MakePaymentButton>
        </>
      ) : (
        <NoPaymentDueLabel>There is no current payment due</NoPaymentDueLabel>
      )}
    </PaymentDueContainer>
  )
}

PaymentDue.propTypes = {
  paymentDues: PropTypes.array.isRequired
}