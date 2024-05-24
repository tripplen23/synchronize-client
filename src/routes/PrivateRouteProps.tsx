import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../misc/enum";

interface PrivateRouteProps {
  allowedRoles: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("userRole") as UserRole | null;

  if (!allowedRoles.includes(userRole as UserRole)) {
    alert(
      "You are not authorized to access this page. Please log in with the suitable user role account."
    );
    return <Navigate to="/login" />;
  }

  // If user is authorized, render the children components
  return <Outlet />;
};

export default PrivateRoute;
