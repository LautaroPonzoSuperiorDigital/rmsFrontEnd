import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
const LazySendEmailPasswordReset = lazy(() =>
  import("../components/public/SendEmailPasswordReset/SendEmailPasswordReset")
);
const LazyResetPassword = lazy(() =>
  import("../components/public/Reset-Password/ResetPassword")
);
const LazyLogin = lazy(() => import("../components/login"));
const LazyPublicListings = lazy(() =>
  import("../components/public/publicListings")
);
const LazyModalPublicListings = lazy(() =>
  import("../components/public/ModalPublicListing/modalPublicListings")
);

const publicRoutes = [
  {
    path: "/recover-password",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazySendEmailPasswordReset />
      </Suspense>
    ),
  },
  {
    path: "/reset-password/:id",
    element: (
      <Suspense>
        <LazyResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense>
        <LazyPublicListings />
      </Suspense>
    ),
  },
  {
    path: "/listing/:id",
    element: (
      <Suspense>
        <LazyModalPublicListings />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/login" replace /> },
];

const publicRouter = createBrowserRouter(publicRoutes);

export const createPublicRouter = () => publicRouter;
