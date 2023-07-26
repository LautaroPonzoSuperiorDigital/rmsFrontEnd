/* eslint-disable react/prop-types */
import { createContext, useCallback, useMemo, useState } from "react"

export const ACCESS_TOKEN_KEY = 'certifymyrent.token'

export const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const onSignedIn = useCallback(({ loggedUser, accessToken }) => {
    setUser(loggedUser)
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }, [])

  const value = useMemo(
    () => ({
      user,
      onSignedIn,
    }),
    [user, onSignedIn]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}