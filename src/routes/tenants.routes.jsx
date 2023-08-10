import { Navigate, createBrowserRouter } from "react-router-dom"

import TenantChatRoom from "../components/TenantChatRoom"
import TenantsProfile from "../components/TenantsProfile"
import Tenants from "../components/tenants"

import { TenantsLayout } from "../layouts/tenants"

const tenantsRoutes = [
  {
    path: 'contact-us',
    element: <Tenants />
  },
  {
    path: 'profile',
    element: <TenantsProfile />
  },
  {
    path: 'chat',
    element: <TenantChatRoom />
  }
]

const tenantsRouter = createBrowserRouter(
  [
  {
    element: <TenantsLayout />,
    children: tenantsRoutes
  },
  {
    path: '*',
    element: <Navigate to="/" replace /> 
  }
  ],
  { basename: '/tenants' },
)

export default tenantsRouter