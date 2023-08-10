import { Link } from "react-router-dom"
import { styled } from "styled-components"

export const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;

  margin-top: 3.5rem;

  height: 100%;
  max-height: calc(100vh - 3.5rem - 3.125rem);
  overflow-y: auto;

  padding: 0 1rem;
`

export const ChatLink = styled(Link)`
  outline: none;

  border: 1.5px solid #197572;
  background: transparent;
  
  font-size: 1rem;
  color: #197572;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;

  padding: 0.5rem;

  transition: background 200ms ease, color 200ms ease;

  &:hover {
    background: #197572;
    color: #fff;
  }
`