import { RouterProvider } from "react-router-dom";

import { createAdminRouter } from "./admin.routes";
import { createPublicRouter } from "./public.routes";
import { createTenantsRouter } from "./tenants.routes";

import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  const { user, onSignedOut } = useAuth();

  if (user?.role === "ADMIN" || user?.role === "SUB_ADMIN") {
    const adminRouter = createAdminRouter();

    return <RouterProvider router={adminRouter} />;
  }

  if (user?.role === "TENANT") {
    const tenantsRouter = createTenantsRouter(user, onSignedOut);

    return <RouterProvider router={tenantsRouter} />;
  }

  const publicRouter = createPublicRouter();

  return <RouterProvider router={publicRouter} />;
}
