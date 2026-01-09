import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, isTokenValid } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getToken();

  if (!token || !isTokenValid()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
