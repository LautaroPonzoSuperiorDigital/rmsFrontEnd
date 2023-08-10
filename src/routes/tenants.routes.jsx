import { Navigate, createBrowserRouter } from "react-router-dom"

import TenantChatRoom from "../components/TenantChatRoom"
import TenantsProfile from "../components/TenantsProfile"

import ContactUs from "../pages/tenants/contact-us"

import { TenantsLayout } from "../layouts/tenants"

const tenantsRoutes = [
  {
    path: 'contact-us',
    element: <ContactUs />
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
    element: <Navigate to="/contact-us" replace /> 
  }
  ],
  { basename: '/tenants' },
)

export default tenantsRouter