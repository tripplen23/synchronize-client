import React from "react";
import { Outlet, Link } from "react-router-dom";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto mt-8 mb-8 ipadMini:my-20">
      <TransitionEffect />
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold ">Admin Dashboard</h1>
        <div className="flex justify-center space-x-4">
          <CustomLink to="/admin/adminprofile" isActive={false}>
            Profile
          </CustomLink>
          <CustomLink to="/admin/adminproduct" isActive={false}>
            Products
          </CustomLink>
          <CustomLink to="/admin/adminorder" isActive={false}>
            Orders
          </CustomLink>
          <CustomLink to="/admin/adminuser" isActive={false}>
            Users
          </CustomLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const CustomLink = ({
  children,
  to,
  isActive,
}: {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`
        btn px-4 py-2 my-4 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-800 transition duration-150 ease-in-out ${
          isActive
            ? "underline decoration-indigo-500 dark:decoration-indigo-800"
            : ""
        }`}
    >
      {children}
    </Link>
  );
};

export default AdminDashboard;
