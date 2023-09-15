import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import PublicListings from "../components/public/publicListings";
import ResetPassword from "../components/public/Reset-Password/ResetPassword";
import { SendEmailPasswordReset } from "../components/public/SendEmailPasswordReset/SendEmailPasswordReset";

const publicRoutes = [
  { path: "/recover-password", element: <SendEmailPasswordReset /> },
  { path: "/reset-password/:id", element: <ResetPassword /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <PublicListings /> },
  { path: "*", element: <Navigate to="/login" replace /> },
];

const publicRouter = createBrowserRouter(publicRoutes);

export const createPublicRouter = () => publicRouter;
