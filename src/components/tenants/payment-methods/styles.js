import { Link } from "react-router-dom"
import { styled } from "styled-components"

export const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const PaymentMethodsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.span`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.65);
`

export const AddPaymentMethodLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: #197572;
`

export const PaymentMethodList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  margin-top: 0.75rem;
  padding: 0;
`

export const PaymentMethod = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);

  >span {
    text-transform: capitalize;
  }
`