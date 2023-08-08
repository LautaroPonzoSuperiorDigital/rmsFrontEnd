/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo } from 'react'

const ModalContext = createContext({})

export function ModalProvider({ close, children }) {
  const value = useMemo(() => ({ close }), [close])

  useEffect(() => {
    const keyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          close()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', keyDown)

    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [close])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  return useContext(ModalContext)
}
