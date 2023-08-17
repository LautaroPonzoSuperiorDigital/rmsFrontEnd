import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"

import { useTenantsHeader } from "../../../../layouts/tenants/context"

import { PaymentMethodForm } from "../../../../components/tenants/payment-method-form"

export default function EditPaymentMethod() {
  const paymentMethod = useLoaderData()
  const { setHeaderTitle } = useTenantsHeader()

  useEffect(() => {
    setHeaderTitle('EDIT PAYMENT METHOD')

    return () => setHeaderTitle(null)
  }, [setHeaderTitle])

  return (
    <PaymentMethodForm paymentMethod={paymentMethod} />
  )
}