import { RouterProvider } from "react-router-dom";

import adminRouter from "./admin.routes";
import publicRouter from "./public.routes";
import tenantsRouter from "./tenants.routes";

import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  const { user } = useAuth()

  if (user?.role === 'ADMIN') {
    return (
      <RouterProvider router={adminRouter} />
    )
  }

  if (user?.role === 'TENANT') {
    return (
      <RouterProvider router={tenantsRouter} />
    )
  }

  return (
    <RouterProvider router={publicRouter} />
  )
}