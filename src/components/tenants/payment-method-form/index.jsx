import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useTenantsLayout } from "../../../layouts/tenants/context"
import { api } from "../../../services/api"

import CheckBoxLog from "../../checkBox"
import { Input } from "../../input"

import {
  ActionButton,
  CheckBoxContainer,
  Footer,
  FormFields,
  InputGroup,
  PaymentMethodFormContainer,
  RemovePaymentMethodButton,
} from "./styles"


export function PaymentMethodForm({ paymentMethod }) {
  const [requestRemove, setRequestRemove] = useState(false)

  const { hideNavbar, showNavbar } = useTenantsLayout()
  const navigate = useNavigate()

  const formRef = useRef(null)

  const handleSelectValue = (event) => {
    if (!paymentMethod) {
      return
    }

    event.target.setSelectionRange(0, event.target.value.length)
  }

  const handleNumberChange = (event) => {
    let cardNumber = event.target.value

    if (cardNumber.length > 19) {
      cardNumber = cardNumber.slice(0, 19)
    } else {
      const formatedCardNumber = String(cardNumber)
        .replace(/\D+/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')

      cardNumber = formatedCardNumber
    }

    event.target.value = cardNumber
  }

  const handleExpiryChange = (event) => {
    let cardExpiry = event.target.value

    if (cardExpiry.length > 9) {
      cardExpiry = cardExpiry.slice(0, 9)
    } else {
      const formatedCardExpiry = String(cardExpiry)
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1 / $2')

      cardExpiry = formatedCardExpiry
    }

    event.target.value = cardExpiry
  }

  const handleCVVChange = (event) => {
    let cardCVV = event.target.value

    let formatedCVV = String(cardCVV)
      .replace(/\D+/g, '')

    if (formatedCVV.length > 3) {
      formatedCVV = formatedCVV.slice(0, 3)
    }

    event.target.value = formatedCVV
  }

  const handleRemove = async () => {
    if (!requestRemove) {
      setRequestRemove(true)

      setTimeout(() => {
        setRequestRemove(false)
      }, 5000) // 5 seconds
      return
    }

    try {
      await api.delete(`/payment-methods/${paymentMethod.id}`)
      navigate(-1)
    } catch (err) {
      alert('Error to remove payment method.')
    }
  }

  const handleCancel = () => navigate(-1)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const [month, year] = event.target.expiry.value.split(' / ')

    const formData = {
      card: {
        number: event.target.number.value.replace(/\s/g, ''),
        expirationMonth: month,
        expirationYear: year,
        holderName: event.target.holderName.value
      },
      defaultMethod: event.target.defaultMethod.checked
    }

    if (paymentMethod) {
      if (formData.card.number === `************${paymentMethod.card.lastFourDigits}`) {
        delete formData.card.number 
      }

      try {
        await api.put(`/payment-methods/${paymentMethod.id}`, formData)
  
        alert('Successfully saved.')
      } catch (err) {
        console.log(err)
        alert('Error while updating payment method.')
      }
    } else {
      try {
        await api.post('/payment-methods', formData)
  
        navigate(-1)
      } catch (err) {
        alert('Error while creating new payment method.')
      }
    }

  }

  useEffect(() => {
    hideNavbar()

    return showNavbar
  }, [hideNavbar, showNavbar])

  useEffect(() => {
    if (!paymentMethod) {
      return
    }

    formRef.current.number.value = `* * * *  * * * *  * * * *  ${paymentMethod.card.lastFourDigits}`
    formRef.current.holderName.value = paymentMethod.card.holderName
    formRef.current.expiry.value = `${paymentMethod.card.expiryMonth} / ${paymentMethod.card.expiryYear}`
    formRef.current.cvv.value = `* * *`
    formRef.current.defaultMethod.checked = paymentMethod.defaultMethod
  }, [paymentMethod])

  return (
    <PaymentMethodFormContainer ref={formRef} onSubmit={handleSubmit}>
      <FormFields>
        <Input
          label="CARD NO"
          name="number"
          onChange={handleNumberChange}
          onClick={handleSelectValue}
        />

        <Input
          label="CARD HOLDER NAME"
          name="holderName"
        />

        <InputGroup>
          <Input
            label="EXP DATE"
            name="expiry"
            onChange={handleExpiryChange}
          />

          <Input
            label="CVV"
            name="cvv"
            onChange={handleCVVChange}
            onClick={handleSelectValue}
          />
        </InputGroup>

        <CheckBoxContainer>
          <CheckBoxLog name="defaultMethod" />

          <span>DEFAULT PAYMENT METHOD</span>
        </CheckBoxContainer>

        {paymentMethod && (
          <RemovePaymentMethodButton
            type="button"
            onClick={handleRemove}
            active={requestRemove}
          >
            {requestRemove ? 'Click To Confirm Remove' : 'Remove This Payment Method'}
          </RemovePaymentMethodButton>
        )}
      </FormFields>

      <Footer>
        <ActionButton type="button" onClick={handleCancel}>
          Cancel
        </ActionButton>

        <ActionButton type="submit">
          Save
        </ActionButton>
      </Footer>
    </PaymentMethodFormContainer>
  )
}

PaymentMethodForm.propTypes = {
  paymentMethod: PropTypes.object
}