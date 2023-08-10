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

const applicantsRoutes = [
  {
    path: 'documents',
    element: <h1>Documents</h1>
  },
  {
    path: 'profile',
    element: <TenantsProfile />
  },
]

export const createTenantsRouter = (user) => {
  let routes

  if (user.isApplicant) {
    routes = [
      {
        element: <TenantsLayout />,
        children: applicantsRoutes
      },
      {
        path: '*',
        element: <Navigate to="/documents" replace /> 
      }
    ]
  } else {
    routes = [
      {
        element: <TenantsLayout />,
        children: tenantsRoutes
      },
      {
        path: '*',
        element: <Navigate to="/contact-us" replace /> 
      }
    ]
  }

  return createBrowserRouter(routes, { basename: '/tenants' })
}