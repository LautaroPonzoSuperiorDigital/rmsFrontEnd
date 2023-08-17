import { styled } from "styled-components"

export const PaymentHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.span`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.65);
`

export const History = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
`

export const Payment = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.5rem 0;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`

export const DateAndAmount = styled.span`
  font-size: 1rem;
  color: #272727;
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const CardLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #272727;
`

export const LateLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FF0000;
`

export const LateFee = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #272727;
`

export const OnTimeLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #197572;
`