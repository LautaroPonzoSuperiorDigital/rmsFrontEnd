import { useLoaderData } from "react-router-dom"

import { PaymentDue } from "../../../components/tenants/payment-due"
import { PaymentHistory } from "../../../components/tenants/payment-history"
import { PaymentMethods } from "../../../components/tenants/payment-methods"

import { PaymentsContainer } from "./styles"

export default function Payments() {
  const { paymentMethods, paymentDues, paymentHistory } = useLoaderData()

  return (
    <PaymentsContainer>
      <PaymentMethods paymentMethods={paymentMethods} />

      <PaymentDue paymentDues={paymentDues} />

      <PaymentHistory paymentHistory={paymentHistory} />
    </PaymentsContainer>
  )
}