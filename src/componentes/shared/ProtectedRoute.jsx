import React from "react";
//Redux
import { useSelector } from "react-redux";
//Router
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/Auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
