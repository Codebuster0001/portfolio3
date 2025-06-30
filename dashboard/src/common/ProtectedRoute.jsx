// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isUserLoaded } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isUserLoaded) return <div className="p-6">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
