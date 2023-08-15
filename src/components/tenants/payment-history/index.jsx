import { DateTime } from "luxon"
import PropTypes from "prop-types"

import { formatDate } from "../../../services/date"
import { formatPrice } from "../../../services/price"

import { CardLabel, DateAndAmount, Footer, History, Label, LateFee, LateLabel, OnTimeLabel, Payment, PaymentHistoryContainer } from "./styles"

export function PaymentHistory({ paymentHistory }) {
  return (
    <PaymentHistoryContainer>
      <Label>Payment History</Label>

      <History>
        {paymentHistory.map(payment => {
          const totalAmount = formatPrice(payment.totalAmount)
          const madeAt = formatDate(payment.madeAt, null, DateTime.DATE_MED)
  
          const dateAndAmount = `${madeAt} | ${totalAmount}`

          return (
            <Payment key={payment.id}>
              <DateAndAmount>{dateAndAmount}</DateAndAmount>

              <Footer>
                {!!payment.paymentMethod.card && (
                  <CardLabel>**** {payment.paymentMethod.card.lastFourDigits}</CardLabel>
                )}

                {payment.status === "PAYED_LATE" && (
                  <>
                    <LateLabel>late</LateLabel>
                    <LateFee>Fine {formatPrice(payment.lateFee)}</LateFee>
                  </>
                )}

                {payment.status === "PAYED_ON_TIME" && (
                  <OnTimeLabel>on time</OnTimeLabel>
                )}
              </Footer>
            </Payment>
          )
        })}
      </History>
    </PaymentHistoryContainer>
  )
}

PaymentHistory.propTypes = {
  paymentHistory: PropTypes.array.isRequired
}