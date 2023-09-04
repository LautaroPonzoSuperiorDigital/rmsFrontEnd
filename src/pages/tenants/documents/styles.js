import { Link } from "react-router-dom"
import { styled } from "styled-components"

export const DocumentsContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  padding: 1rem;
`

export const Document = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border: 1px solid rgba(0, 0, 0, 0.15);

  padding: 0.75rem;
`

export const DocumentHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const DocumentTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #131313;
`

export const SignDocument = styled(Link)`
  color: #197572;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`

export const DocumentFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const DocumentDate = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.65);
`

export const DocumentSigned = styled.span`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.65);
`