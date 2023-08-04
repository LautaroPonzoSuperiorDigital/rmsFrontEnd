import PropTypes from "prop-types"
import { styled } from "styled-components"

const Footer = styled.footer`
  margin-top: 1.5rem;
  padding: 3rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border-top: 2px solid rgba(0, 0, 0, 0.1);
`

export function ModalFooter({ children }) {
  return (
    <Footer>
      {children}
    </Footer>
  )
}

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired
}