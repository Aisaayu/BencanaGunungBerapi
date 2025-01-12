import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // Periksa apakah user sudah login
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
