import ListingsAdmin from "../components/listingsAdmin";
import TenantsAdmin from "../components/tenantsAdmin";
import Applicants from "../components/applicants";
import Chats from "../components/chats";
import Documents from "../components/documents";
import SubAdmins from "../components/subAdmins";
import { createBrowserRouter } from "react-router-dom";

const adminRoutes = [
  {
    path: 'listings',
    element: <ListingsAdmin />
  },
  {
    path: 'tenants',
    element: <TenantsAdmin />
  },
  {
    path: 'applicants',
    element: <Applicants />
  },
  {
    path: 'chats',
    element: <Chats />
  },
  {
    path: 'documents',
    element: <Documents />
  },
  {
    path: 'sub-admins',
    element: <SubAdmins />
  },
]

const adminRouter = createBrowserRouter([
  {
    path: '/admin',
    children: adminRoutes
  }
])

export default adminRouter