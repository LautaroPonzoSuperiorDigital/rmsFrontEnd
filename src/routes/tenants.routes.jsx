import { Navigate, createBrowserRouter } from "react-router-dom"

import TenantChatRoom from "../components/TenantChatRoom"
import TenantsProfile from "../components/TenantsProfile"

import { TenantsLayout } from "../layouts/tenants"

import ContactUs from "../pages/tenants/contact-us"
import CreateRepairTicket from "../pages/tenants/create-repair-ticket"
import Documents from "../pages/tenants/documents"
import documentsLoader from "../pages/tenants/documents/loader"
import CreateComplaintTicket from "../pages/tenants/create-complaint-ticket"

const tenantsRoutes = [
  {
    path: 'contact-us',
    element: <ContactUs />
  },
  {
    path: 'create-repair-ticket',
    element: <CreateRepairTicket />,
  },
  {
    path: 'create-complaint-ticket',
    element: <CreateComplaintTicket />,
  },
  {
    path: 'documents',
    element: <Documents />,
    loader: documentsLoader,
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
    element: <Documents />
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