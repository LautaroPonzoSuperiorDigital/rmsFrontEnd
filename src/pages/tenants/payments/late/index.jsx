import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

import { useTenantsHeader, useTenantsLayout } from "../../../../layouts/tenants/context"

import { formatDate } from "../../../../services/date"
import { formatPrice } from "../../../../services/price"
import { api } from "../../../../services/api"

import {
  DateAndAmount,
  DetailsBottom,
  DetailsBox,
  LateFee,
  LateLabel,
  LatePayment,
  LatePaymentsContainer,
  PayButton,
} from "./styles"
import { isAxiosError } from "axios"

export default function LatePayments() {
  const [latePayments, setLatePayments] = useState(useLoaderData)
  const [processingPayments, setProcessingPayments] = useState({})

  const { hideNavbar, showNavbar } = useTenantsLayout()
  const { setHeaderTitle } = useTenantsHeader()

  const handleMakePayment = async (paymentId) => {
    setProcessingPayments(oldState => ({ ...oldState, [paymentId]: true }))

    try {
      await api.post(`/payments/${paymentId}/process`)

      setLatePayments(oldState =>
        oldState.filter(latePayment => latePayment.id !== paymentId))
    } catch (err) {
      if (isAxiosError(err) && err.response.data.response.message) {
        alert(err.response.data.response.message)
      } else {
        alert('Error while processing payment')
      }
    }

    setProcessingPayments(oldState => ({ ...oldState, [paymentId]: false }))
  }

  useEffect(() => {
    setHeaderTitle('LATE PAYMENTS')

    return () => setHeaderTitle(null)
  }, [setHeaderTitle])

  useEffect(() => {
    hideNavbar()

    return showNavbar
  }, [hideNavbar, showNavbar])

  return (
    <LatePaymentsContainer>
      {latePayments.map(latePayment => {
        const lateFee = latePayment.totalAmount * 0.1
        const totalAmount = formatPrice(latePayment.totalAmount + lateFee)
        const dueDate = formatDate(latePayment.dueDate, null, DateTime.DATE_MED)

        const dateAndAmount = `${dueDate} | ${totalAmount}`

        const isProcessing = processingPayments[latePayment.id]

        return (
          <LatePayment key={latePayment.id} processing={isProcessing}>
            <DetailsBox>
              <DateAndAmount>{dateAndAmount}</DateAndAmount>

              <DetailsBottom>
                <LateLabel>late</LateLabel>
                <LateFee>Fine {formatPrice(lateFee)}</LateFee>
              </DetailsBottom>
            </DetailsBox>

            <PayButton
              type="button"
              onClick={() => handleMakePayment(latePayment.id)}
              disabled={isProcessing}
            >{isProcessing ? 'Processing...' : 'Make Payment'}</PayButton>
          </LatePayment>
        )
      })}
    </LatePaymentsContainer>
  )
}