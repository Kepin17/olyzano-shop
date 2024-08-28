import React from "react";
import SidebarFragment from "../../../fragments/dashboard/SidebarFragment";
import AdminNav from "../../../fragments/dashboard/AdminNav";

const Dashboard = () => {
  return (
    <>
      <AdminNav />
      <SidebarFragment></SidebarFragment>
    </>
  );
};

export default Dashboard;
