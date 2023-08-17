import { useEffect } from "react"
import { useTenantsHeader } from "../../../../layouts/tenants/context"
import { PaymentMethodForm } from "../../../../components/tenants/payment-method-form"

export default function NewPaymentMethod() {
  const { setHeaderTitle } = useTenantsHeader()

  useEffect(() => {
    setHeaderTitle('NEW PAYMENT METHOD')

    return () => setHeaderTitle(null)
  }, [setHeaderTitle])

  return (
    <PaymentMethodForm />
  )
}