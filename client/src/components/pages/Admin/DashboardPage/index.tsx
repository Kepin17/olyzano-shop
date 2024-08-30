import StatusCard from "../../../fragments/dashboard/StatusCard";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import { FaUserTie, FaBoxes, FaShoppingBasket } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";

const Dashboard = () => {
  return (
    <AdminDashboardLayout title="Welcome to Dashboard">
      <header className="flex gap-3">
        <StatusCard title="Today's Users" totalValue={10} icon={<FaUserTie />} />
        <StatusCard title="Today's Revenue" totalValue={10} icon={<MdOutlineDiscount />} />
        <StatusCard title="Today's Orders" totalValue={10} icon={<FaBoxes />} />
        <StatusCard title="Total Sales" totalValue={10} icon={<FaShoppingBasket />} />
      </header>
      <main>
        <section className="statistic-wrapper w-full h-[300px] flex">
          <div className="statistic w-full h-full ">
            <h3 className="text-2xl font-bold font-roboto flex items-center gap-2">
              <VscVmActive />
              Active Users
            </h3>
            <p className="text-sm font-roboto">
              <span className="text-green-500 font-bold">(+200)</span> then last week
            </p>
            <div
              className="flex rounded-lg shadow-lg mt-4"
              style={{
                background: "white",
              }}
            >
              <ul className="text-black w-[80px] h-[180px] text-start p-3 px-5  font-roboto ">
                <li>10000</li>
                <li>5000</li>
                <li>1000</li>
                <li>500</li>
                <li>100</li>
                <li>0</li>
              </ul>
              <div className="w-full flex flex-col">
                <div className="w-full h-full px-5 py-2 flex gap-[4rem]">
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                  <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
                </div>
                <div className="w-full h-10 flex gap-5 text-sm text-black font-semibold">
                  <p>Sunday</p>
                  <p>Monday</p>
                  <p>Tuesday</p>
                  <p>Wednesday</p>
                  <p>Thursday</p>
                  <p>Friday</p>
                  <p>Saturday</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="statistic w-full h-full border-2"></div>
        </section>
      </main>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
