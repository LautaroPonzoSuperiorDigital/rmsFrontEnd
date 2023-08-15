import { styled } from "styled-components"
import { Input } from "../../../components/input"

export const CreateComplaintTicketContainer = styled.form`
  padding: 1rem;

  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormInput = styled(Input)`
  text-align: left;
`

export const Message = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #197572;
`

export const SubmitButton = styled.button`
  background: #197572;
  color: #fff;

  margin-top: auto;

  padding: 0.5rem;
`