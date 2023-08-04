/* eslint-disable react/prop-types */
// import { FiX } from 'react-icons/fi'
import { styled } from 'styled-components'
import { useModal } from './context'
import { Close } from '../icons'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 1rem;
`

const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 0;
  outline: none;

  margin-left: auto;
`

export function ModalHeader({ children, showCloseIcon = false }) {
  const { close } = useModal()

  return (
    <Header>
      {children}

      {showCloseIcon && (
        <CloseButton
          type="button"
          onClick={close}
        >
          <Close size={16} />
        </CloseButton>
      )}
    </Header>
  )
}
