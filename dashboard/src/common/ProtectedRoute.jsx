// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isUserLoaded } = useSelector((state) => state.user);
  const location = useLocation();

  // Wait until user info is loaded
  if (!isUserLoaded) return <div className="p-6">Loading...</div>;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
