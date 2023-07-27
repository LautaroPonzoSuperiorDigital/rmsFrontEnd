import { useContext } from "react"

import { AuthContext } from "../context/authContext"

export function useAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('AuthProvider not found.')
  }

  return context
}