import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("loginToken");

  if (!token) {
    alert(
      "You are not authorized to access this page. Please log in first."
    );
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children components
  return <Outlet />;
};

export default ProtectedRoute;
