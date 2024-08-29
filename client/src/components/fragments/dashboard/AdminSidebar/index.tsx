import SlidebarLayout from "../../../layouts/SidebarLayout";
import Button from "../../../elements/Button";
import { dashboardItem } from "./sidebarItem";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

const AdminSidebar = () => {
  return (
    <SlidebarLayout>
      {dashboardItem.map((item) => (
        <div key={item.id} className="relative ">
          <Button
            type="button"
            className="w-full h-10 bg-white flex gap-2 items-center justify-between text-slate-800 font-roboto px-1
          hover:text-white hover:bg-slate-800 transtition duration-300
          "
            onClick={() => {
              const dropdownId = document.getElementById(`dropdown-${item.id}`);
              if (dropdownId) {
                if (dropdownId.classList.contains("block")) {
                  dropdownId.classList.remove("block");
                  dropdownId.classList.add("hidden");
                } else {
                  dropdownId.classList.remove("hidden");
                  dropdownId.classList.add("block");
                }
              }
            }}
          >
            <div className="flex gap-2 items-center">
              <item.icon /> {item.name}
            </div>
            {item.subDropdown && <IoIosArrowUp className="mx-3" />}
          </Button>
          {item.subDropdown && (
            <div className={`w-full h-auto hidden transtition-all duration-300 ease-in-out`} id={`dropdown-${item.id}`}>
              {item.subDropdown.map((subItem) => {
                return (
                  <Button
                    type="button"
                    className="w-full h-10 bg-white flex gap-2 items-center text-slate-800 font-roboto px-1
          hover:text-white hover:bg-slate-800 transtition duration-300
          "
                  >
                    <GoDotFill className="text-sm" />
                    {subItem.name}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </SlidebarLayout>
  );
};

export default AdminSidebar;
