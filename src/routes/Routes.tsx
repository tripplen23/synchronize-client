import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Cart,
  Catalog,
  Home,
  Product,
  AdminDashboard,
  AdminProduct,
  AdminProfile,
  AdminUser,
  AdminOrder,
  AdminReview,
  Login,
  Register,
  ConfirmOrder,
  OrderSuccess
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Home
      {
        path: "",
        element: <Home />,
      },

      // Login -> Admin
      {
        path: "login",
        element: <Login />,
      },

      // Register
      {
        path: "register",
        element: <Register />,
      },

      // Admin: Should be set as a private route
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "adminproduct",
            element: <AdminProduct />,
          },
          {
            path: "adminuser",
            element: <AdminUser />,
          },
          {
            path: "adminprofile",
            element: <AdminProfile />,
          },
          {
            path: "adminorder",
            element: <AdminOrder />,
          },
          {
            path: "adminreview",
            element: <AdminReview />,
          },
        ],
      },

      // Catalog
      {
        path: "catalog",
        element: <Catalog />,
        children: [
          {
            path: ":id",
            element: <Catalog />,
          },
        ],
      },

      // Product
      {
        path: "products",
        children: [
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },

      // Cart
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },

      // Order
      {
        path: "order",
        children: [
          {
            path: "confirm",
            element: <ConfirmOrder />,
          },
          {
            path: "success",
            element: <OrderSuccess />,
          },
        ],
      },
    ],
  },
]);
