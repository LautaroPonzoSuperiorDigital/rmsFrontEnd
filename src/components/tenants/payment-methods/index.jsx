import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { ChevronRight } from "../../icons/tenants"

import {
  AddPaymentMethodLink,
  Label,
  PaymentMethod,
  PaymentMethodList,
  PaymentMethodsContainer,
  PaymentMethodsHeader,
} from "./styles"

export function PaymentMethods({ paymentMethods }) {
  const navigate = useNavigate()

  const handleEditPaymentMethod = (paymentMethod) => {
    navigate(`/payment-methods/${paymentMethod.id}/edit`)
  }
  
  return (
    <PaymentMethodsContainer>
      <PaymentMethodsHeader>
        <Label>Payment Methods</Label>

        <AddPaymentMethodLink to="/payment-methods/new">+ ADD</AddPaymentMethodLink>
      </PaymentMethodsHeader>

      <PaymentMethodList>
        {paymentMethods.map(paymentMethod => (
          <PaymentMethod
            key={paymentMethod.id}
            onClick={() => handleEditPaymentMethod(paymentMethod)}
          >
            <span>{paymentMethod.card.type} **** {paymentMethod.card.lastFourDigits}</span>

            <ChevronRight filled />
          </PaymentMethod>
        ))}
      </PaymentMethodList>
    </PaymentMethodsContainer>
  )
}

PaymentMethods.propTypes = {
  paymentMethods: PropTypes.array.isRequired
}