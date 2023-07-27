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
  }
]

export default tenantsRoutes