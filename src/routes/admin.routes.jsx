import TenantsAdmin from "../components/tenantsAdmin";
import Applicants from "../pages/admin/applicants/applicants";

import Documents from "../components/documents";
import SubAdmins from "../pages/admin/sub-admins/subAdmins";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminListings from "../pages/admin/listings";
import Chats from "../pages/admin/ChatRoom/chats";

const adminRoutes = [
  {
    path: "listings",
    element: <AdminListings />,
  },
  {
    path: "tenants",
    element: <TenantsAdmin />,
  },
  {
    path: "applicants",
    element: <Applicants />,
  },
  {
    path: "chats",
    element: <Chats />,
  },
  {
    path: "documents",
    element: <Documents />,
  },
  {
    path: "sub-admins",
    element: <SubAdmins />,
  },
];

const adminRouter = createBrowserRouter([
  {
    path: "/admin",
    children: adminRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/admin/listings" replace />,
  },
]);

export const createAdminRouter = () => adminRouter;
