// react
import { Navigate, Outlet } from "react-router-dom";

// hooks
import { useCurrentUser } from "@/features/login/hooks/login.hooks";

export const ProtectedRoute = () => {
  // hooks
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
