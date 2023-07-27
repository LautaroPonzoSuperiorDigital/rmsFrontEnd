import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import PublicListings from "../components/public/publicListings";

const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/', element: <PublicListings /> },
  { path: '*', element: <Navigate to="/login" replace /> }
]

const publicRouter = createBrowserRouter(publicRoutes)

export default publicRouter