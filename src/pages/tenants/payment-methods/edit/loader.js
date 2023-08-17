import { isAxiosError } from "axios"
import { api } from "../../../../services/api"
import { redirect } from "react-router-dom"

const createEditPaymentMethodLoader = (signOut) => async ({ params }) => {
  try {
    const { data: paymentMethod } = await api.get(`/payment-methods/${params.paymentMethodId}`)
  
    return paymentMethod
  } catch (err) {
    if (isAxiosError(err) && err.response.status === 401) {
      signOut()
      return redirect('/')
    }
    return {}
  }
}

export default createEditPaymentMethodLoader