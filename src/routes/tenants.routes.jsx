import { Navigate, createBrowserRouter } from "react-router-dom"
import TenantChatRoom from "../components/TenantChatRoom"
import TenantsProfile from "../components/TenantsProfile"
import Tenants from "../components/tenants"

const tenantsRoutes = [
  {
    path: '',
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

const tenantsRouter = createBrowserRouter([
  { path: '/tenants', children: tenantsRoutes },
  {
    path: '*',
    element: <Navigate to="/tenants" replace /> 
  }
])

export default tenantsRouter