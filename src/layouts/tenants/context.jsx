/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useCallback, useContext, useMemo, useState } from "react"

export const TenantsLayoutContext = createContext(undefined)

export function TenantsLayoutProvider({ children }) {
  const [navbarIsShown, setNavbarIsShown] = useState(true)
  const [headerTitle, setHeaderTitle] = useState(null)

  const hideNavbar = useCallback(() => setNavbarIsShown(false), [])

  const showNavbar = useCallback(() => setNavbarIsShown(true), [])

  const value = useMemo(
    () => ({
      navbarIsShown,
      headerTitle,
      setHeaderTitle,
      hideNavbar,
      showNavbar,
    }),
    [navbarIsShown, headerTitle, hideNavbar, showNavbar, setHeaderTitle]
  )

  return (
    <TenantsLayoutContext.Provider value={value}>
      {children}
    </TenantsLayoutContext.Provider>
  )
}

TenantsLayoutProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useTenantsLayout() {
  const context = useContext(TenantsLayoutContext)

  if (!context) {
    throw new Error('TenantsProvider was not found.')
  }

  return {
    hideNavbar: context.hideNavbar,
    showNavbar: context.showNavbar,
  }
}

export function useTenantsNavbar() {
  const context = useContext(TenantsLayoutContext)

  if (!context) {
    throw new Error('TenantsProvider was not found.')
  }

  return {
    navbarIsShown: context.navbarIsShown,
  }
}

export function useTenantsHeader() {
  const context = useContext(TenantsLayoutContext)

  if (!context) {
    throw new Error('TenantsProvider was not found.')
  }

  return {
    headerTitle: context.headerTitle,
    setHeaderTitle: context.setHeaderTitle,
  }
}