import StatusCard from "../../../fragments/dashboard/StatusCard";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import { FaUserTie, FaBoxes, FaShoppingBasket } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import StatusCardButton from "../../../fragments/dashboard/StatuscardButton";
import UserChart from "../../../fragments/dashboard/DailyChart/UserChart";
import { useState } from "react";
import RavenueChart from "../../../fragments/dashboard/DailyChart/RavenueChart";
import OrderChart from "../../../fragments/dashboard/DailyChart/OrderChart";
import UserMonthlyChart from "../../../fragments/dashboard/MonthlyChart/UserChart";
import OrderMonthlyChart from "../../../fragments/dashboard/MonthlyChart/OrderChart";
import RavenueMonthlyChart from "../../../fragments/dashboard/MonthlyChart/RevenueChart";

const Dashboard = () => {
  const [ChartPage, setChartPage] = useState("users");

  return (
    <AdminDashboardLayout title="Welcome to Dashboard">
      <header className="flex gap-3">
        <StatusCard title="Today's Users" totalValue={10} icon={<FaUserTie />} />
        <StatusCard title="Today's Revenue" totalValue={10} icon={<MdOutlineDiscount />} />
        <StatusCard title="Today's Orders" totalValue={10} icon={<FaBoxes />} />
        <StatusCard title="Total Admin" totalValue={10} icon={<FaShoppingBasket />} />
      </header>
      <main>
        <section className="statistic-wrapper w-full h-[400px] flex gap-4">
          <div className="statistic w-full h-full bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold font-roboto flex items-center gap-2">
              <VscVmActive />
              {ChartPage === "users" ? "Active Users" : ChartPage === "sales" ? "Daily Sales" : "Daily Orders"}
            </h3>
            <p className="text-sm font-roboto text-slate-500 ">
              <span className="text-green-500 font-bold">(+200)</span> then last week
            </p>
            <div
              className="flex mt-4"
              style={{
                background: "white",
              }}
            >
              {ChartPage === "users" && <UserChart />}
              {ChartPage === "sales" && <RavenueChart />}
              {ChartPage === "orders" && <OrderChart />}
            </div>
            <div className="w-full h-[100px] flex gap-5">
              <StatusCardButton title="Users" total={10} onClick={() => setChartPage("users")} />
              <StatusCardButton title="Sales" total={10} onClick={() => setChartPage("sales")} />
              <StatusCardButton title="Orders" total={10} onClick={() => setChartPage("orders")} />
            </div>
          </div>
          <div className="statistic w-full h-full bg-white rounded-lg shadow-lg p-8">
            {ChartPage === "users" && <UserMonthlyChart />}
            {ChartPage === "sales" && <RavenueMonthlyChart />}
            {ChartPage === "orders" && <OrderMonthlyChart />}
          </div>
        </section>
      </main>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
