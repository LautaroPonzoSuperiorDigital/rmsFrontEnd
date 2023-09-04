/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ModalContext = createContext({})

export function ModalProvider({ close, children }) {
  const [footerIsShown, setFooterIsShown] = useState(true)
  const [height, setHeight] = useState(null)

  const showFooter = useCallback(() => setFooterIsShown(true), [])
  
  const hideFooter = useCallback(() => setFooterIsShown(false), [])

  const value = useMemo(
    () => ({
      close,
      footerIsShown,
      height,
      showFooter,
      hideFooter,
      setHeight,
    }),
    [close, footerIsShown, height, showFooter, hideFooter, setHeight]
  )

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
