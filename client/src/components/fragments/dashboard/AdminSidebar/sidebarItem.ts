import { FaBox, FaLaptop, FaRegNewspaper, FaTools, FaUser } from "react-icons/fa";

export const dashboardItem = [
  {
    id: 1,
    name: "Dashboard",
    icon: FaTools,
    path: "/admin/dashboard",
  },
  {
    id: 2,
    name: "User Management",
    icon: FaUser,
    subDropdown: [
      {
        id: 1,
        name: "View Users",
        path: "/admin/dashboard/user-view",
      },
      {
        id: 2,
        name: "Add User",
        path: "/admin/dashboard/user-add",
      },
      {
        id: 3,
        name: "Edit User",
        path: "/admin/dashboard/user-edit",
      },
      {
        id: 4,
        name: "Delete User",
        path: "/admin/dashboard/user-delete",
      },
      {
        id: 5,
        name: "User Activity Logs",
        path: "/admin/dashboard/user-logs",
      },
    ],
  },
  {
    id: 3,
    name: "Admin Management",
    icon: FaLaptop,
    subDropdown: [
      {
        id: 1,
        name: "View Admins",
        path: "/admin/dashboard/admin-view",
      },
      {
        id: 2,
        name: "Add Admin",
        path: "/admin/dashboard/admin-add",
      },
      {
        id: 3,
        name: "Admin Permission",
        path: "/admin/dashboard/admin-edit",
      },
      {
        id: 4,
        name: "Admin Activity Logs",
        path: "/admin/dashboard/admin-logs",
      },
    ],
  },
  {
    id: 4,
    name: "Product Management",
    icon: FaBox,
    path: "/admin/dashboard/products-manage",
    subDropdown: [
      {
        id: 1,
        name: "View Products",
        path: "/admin/dashboard/products-view",
      },
      {
        id: 2,
        name: "Add Product",
        path: "/admin/dashboard/products-add",
      },

      {
        id: 3,
        name: "Edit Product",
        path: "/admin/dashboard/products-edit",
      },
      {
        id: 4,
        name: "Delete Product",
        path: "/admin/dashboard/products-delete",
      },
      {
        id: 5,
        name: "Product Activity Logs",
        path: "/admin/dashboard/products-logs",
      },

      {
        id: 6,
        name: "Product Reviews & Ratings",
        path: "/admin/dashboard/products-reviews",
      },
      {
        id: 7,
        name: "Product Stock",
        path: "/admin/dashboard/products-stock",
      },
    ],
  },
  {
    id: 5,
    name: "Report Management",
    icon: FaRegNewspaper,
    path: "/admin/dashboard/report-manage",
    subDropdown: [
      {
        id: 1,
        name: "Sales Report",
        path: "/admin/dashboard/report-sales",
      },
      {
        id: 2,
        name: "Products Report",
        path: "/admin/dashboard/report-products",
      },
      {
        id: 3,
        name: "report Orders",
        path: "/admin/dashboard/report-orders",
      },
      {
        id: 4,
        name: "Report bug",
        path: "/admin/dashboard/report-bug",
      },
      {
        id: 5,
        name: "Report Activity Logs",
        path: "/admin/dashboard/report-logs",
      },
      {
        id: 6,
        name: "Report Feedback",
        path: "/admin/dashboard/report-feedback",
      },
    ],
  },
  {
    id: 6,
    name: "Setting",
    icon: FaTools,
    path: "/admin/dashboard/setting",
  },
];
