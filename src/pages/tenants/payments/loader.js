import { redirect } from "react-router-dom"

import { api } from "../../../services/api"
import { createDateFromISO } from "../../../services/date"

const createPaymentsLoader = (signOut) => async () => {
  let tenantId

  try {
    const { data: loggedUser } = await api.get('/auth/local/session')

    tenantId = loggedUser.tenantId
  } catch (err) {
    signOut()
    return redirect('/')
  }

  const [paymentMethods, paymentDues, paymentHistory] = await Promise.all([
    api.get(`/tenants/${tenantId}/payment-methods`).then(response => response.data),
    api.get(`/tenants/${tenantId}/payment-dues`).then(response => response.data),
    api.get(`/tenants/${tenantId}/payment-history`).then(response => response.data),
  ])

  return {
    paymentMethods,
    paymentDues: paymentDues.map(paymentDue => ({ ...paymentDue, dueDate: createDateFromISO(paymentDue.dueDate) })),
    paymentHistory,
  }
}

export default createPaymentsLoader