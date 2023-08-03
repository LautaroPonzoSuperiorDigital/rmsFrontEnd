/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

import { ModalProvider } from './context'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
`

function ModalRootWithRef({ onModalOpened, onModalClosed, children }, modalRef) {
  const [isShown, setIsShown] = useState(false)

  const open = useCallback(() => {
    setIsShown(true)
    onModalOpened?.()
  }, [onModalOpened])

  const close = useCallback(() => {
    setIsShown(false)

    onModalClosed?.()
  }, [onModalClosed])

  useImperativeHandle(modalRef, () => ({
    open,
    close,
  }))

  if (!isShown) {
    return null
  }

  return (
    <ModalProvider close={close}>
      <Overlay>{children}</Overlay>
    </ModalProvider>
  )
}

export const ModalRoot = forwardRef(ModalRootWithRef)