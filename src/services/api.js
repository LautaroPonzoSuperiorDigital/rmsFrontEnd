import axios from "axios"

import { env } from "../config/env"
import { ACCESS_TOKEN_KEY } from "../context/authContext"

export const api = axios.create({
  baseURL: env.apiUrl,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})