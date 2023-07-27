/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../services/api"

export const ACCESS_TOKEN_KEY = 'certifymyrent.token'

export const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const onSignedIn = useCallback(({ loggedUser, accessToken }) => {
    setUser(loggedUser)
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }, [])

  useEffect(() => {
    async function loadUserSession() {
      try {
        const { data } = await api.get('/auth/local/session')
        setUser(data)
      } catch (err) {
        navigate('/login')
      }

      setIsLoading(false)
    }

    loadUserSession()
  }, [navigate])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      onSignedIn,
    }),
    [user, onSignedIn]
  )

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}