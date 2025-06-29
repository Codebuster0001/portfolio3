import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
