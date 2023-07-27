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

export default tenantsRoutes