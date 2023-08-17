import { styled } from "styled-components"

export const PaymentMethodFormContainer = styled.form`
  height: 100%;

  display: flex;
  flex-direction: column;
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem;
`

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  >input {
    margin: 0;
  }
`

export const RemovePaymentMethodButton = styled.button`
  color: ${({ active }) => active ? '#FFF' : '#FF0000'};
  border: ${({ active }) => active ? 'none' : '1px solid rgba(255, 0, 0, 0.35)'};
  background: ${({ active }) => active ? '#FF0000' : 'transparent'};

  padding: 0.5rem 0;

  transition: color 200ms ease, background 200ms ease;
`

export const Footer = styled.footer`
  display: flex;

  margin-top: auto;
  padding: 1rem;

  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`

export const ActionButton = styled.button`
  flex: 1;

  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  
  & + button {
    color: #197572;
  }
`