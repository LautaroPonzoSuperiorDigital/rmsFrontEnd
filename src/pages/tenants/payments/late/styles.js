import { styled } from "styled-components"

export const LatePaymentsContainer = styled.ul`
  list-style: none;

  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 1rem;
`

export const LatePayment = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 0.5rem 0;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  opacity: ${({ processing }) => processing ? 0.85 : 1};
`

export const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const DateAndAmount = styled.span`
  font-size: 1rem;
  color: #272727;
`

export const DetailsBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
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

export const PayButton = styled.button`
  outline: 0;
  border: 0;

  cursor: pointer;

  background: #197572;
  color: #fff;
  font-size: 1rem;

  padding: 0.5rem;

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`