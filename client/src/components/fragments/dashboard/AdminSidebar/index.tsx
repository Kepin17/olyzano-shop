import SlidebarLayout from "../../../layouts/SidebarLayout";
import Button from "../../../elements/Button";
import { dashboardItem } from "./sidebarItem";
import { IoIosArrowUp } from "react-icons/io";
import { BiSubdirectoryRight } from "react-icons/bi";

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
              const dropdownArrow = document.getElementById(`dropdownArrow-${item.id}`);
              if (dropdownId) {
                if (dropdownId.classList.contains("block")) {
                  dropdownId.classList.remove("block");
                  dropdownId.classList.add("hidden");
                  dropdownArrow?.classList.add("rotate-90");
                  dropdownArrow?.classList.remove("rotate-180");
                } else {
                  dropdownId.classList.remove("hidden");
                  dropdownId.classList.add("block");
                  dropdownArrow?.classList.remove("rotate-90");
                  dropdownArrow?.classList.add("rotate-180");
                }
              }
            }}
          >
            <div className="flex gap-2 items-center">
              <item.icon /> {item.name}
            </div>
            {item.subDropdown && <IoIosArrowUp className="dropdownArrow transtition-all duration-300 ease-in-out mx-3 rotate-90" id={`dropdownArrow-${item.id}`} />}
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
                    <BiSubdirectoryRight className="text-sm" />
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
