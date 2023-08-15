import { Link } from "react-router-dom"
import { styled } from "styled-components"

export const PaymentDueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.span`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.65);
`

export const LatePaymentsLink = styled(Link)`
  font-size: 0.875rem;
  color: #FF0000;
  text-transform: uppercase;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PaymentDetails = styled.span`
  font-size: 1rem;
  color: #272727;
`

export const MakePaymentButton = styled.button`
  outline: 0;
  border: 0;

  cursor: pointer;

  background: #197572;
  color: #fff;
  font-size: 1rem;

  padding: 0.5rem;
`

export const NoPaymentDueLabel = styled.span`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.9);
`