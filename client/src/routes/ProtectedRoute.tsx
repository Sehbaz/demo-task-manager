// react
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
