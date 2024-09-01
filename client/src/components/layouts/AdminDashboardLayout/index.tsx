import React from "react";
import AdminNav from "../../fragments/dashboard/AdminNav";
import AdminSidebar from "../../fragments/dashboard/AdminSidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = (props) => {
  const { children, title } = props;
  return (
    <>
      <AdminNav />
      <div className="w-full h-[93vh] flex overflow-hidden">
        <AdminSidebar />
        <div className="card-dashboard-wrapper p-5">
          <h1 className="text-3xl font-bold font-roboto">{title}</h1>

          {children}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
