/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useCallback, useContext, useMemo, useState } from "react"

export const TenantsLayoutContext = createContext(undefined)

export function TenantsLayoutProvider({ children }) {
  const [navbarIsShown, setNavbarIsShown] = useState(true)

  const hideNavbar = useCallback(() => setNavbarIsShown(false), [])

  const showNavbar = useCallback(() => setNavbarIsShown(true), [])

  const value = useMemo(
    () => ({
      navbarIsShown,
      hideNavbar,
      showNavbar,
    }),
    [navbarIsShown, hideNavbar, showNavbar]
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