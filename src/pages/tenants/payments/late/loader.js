import { redirect } from "react-router-dom"

import { api } from "../../../../services/api"
import { createDateFromISO } from "../../../../services/date"
import { DateTime } from "luxon"

const createLatePaymentsLoader = (signOut) => async () => {
  let tenantId

  try {
    const { data: loggedUser } = await api.get('/auth/local/session')

    tenantId = loggedUser.tenantId
  } catch (err) {
    signOut()
    return redirect('/')
  }

  const { data: paymentDues } = await api.get(`/tenants/${tenantId}/payment-dues`)

  const currentDate = DateTime.now()

  return paymentDues
    .map(paymentDue => ({
      ...paymentDue,
      dueDate: createDateFromISO(paymentDue.dueDate)
    }))
    .filter(paymentDue => paymentDue.dueDate < currentDate)
}

export default createLatePaymentsLoader