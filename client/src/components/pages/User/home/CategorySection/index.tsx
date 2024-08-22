import { TiArrowSortedUp } from "react-icons/ti";
import Button from "../../../../elements/Button";
import { useState } from "react";
import { GiLargeDress } from "react-icons/gi";
import { BsFillLaptopFill } from "react-icons/bs";
import { FaBook, FaBabyCarriage } from "react-icons/fa";
import {
    MdSportsBaseball,
    MdSportsEsports,
    MdOutlinePets,
} from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { SiHappycow } from "react-icons/si";
import MarketCategory from "./MarketCategory";

const CategorySection = () => {
    const [showDropdown, setShowDropdown] = useState(true);

    const [active, setActive] = useState("Olyzano Mart");

    const showCategoryDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const CategoryNavItem = [
        {
            id: 1,
            title: "Olyzano Mart",
            icon: <i className="fa-solid fa-carrot"></i>,
        },
        {
            id: 2,
            title: "Fashion",
            icon: <GiLargeDress />,
        },
        {
            id: 3,
            title: "Electronic",
            icon: <BsFillLaptopFill />,
        },
        {
            id: 4,
            title: "Life Style",
            icon: <SiHappycow />,
        },
        {
            id: 5,
            title: "Food & Drink",
            icon: <IoFastFood />,
        },

        {
            id: 6,
            title: "Health & Beauty",
            icon: <GiHealthNormal />,
        },

        {
            id: 7,
            title: "Sports",
            icon: <MdSportsBaseball />,
        },
        {
            id: 8,
            title: "Books",
            icon: <FaBook />,
        },
        {
            id: 9,
            title: "Gaming",
            icon: <MdSportsEsports />,
        },
        {
            id: 10,
            title: "Baby Care",
            icon: <FaBabyCarriage />,
        },
        {
            id: 11,
            title: "Pet Care",
            icon: <MdOutlinePets />,
        },
    ];

    return (
        <div className="pl-10 mt-1">
            <Button
                type="button"
                className="px-5 h-[50px] bg-[#1E293B] font-bold text-xl font-roboto text-white flex items-center gap-2 cursor-pointer border-2 rounded-lg"
                onClick={showCategoryDropdown}
            >
                Product Category
                <span>
                    <TiArrowSortedUp
                        className="text-2xl"
                        style={{
                            transform: showDropdown
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                        }}
                    />
                </span>
            </Button>

            <div
                className="dropdown-menu-wrapper w-full pr-10 mt-5 rounded-lg transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                    height: showDropdown ? "500px" : "0px",
                    opacity: showDropdown ? 1 : 0,
                }}
            >
                <div className="w-full h-[150px] bg-[#F3F7EC] shadow-lg overflow-hidden rounded-lg">
                    <div className="w-full h-full flex items-center justify-center gap-5 p-5 ">
                        {CategoryNavItem.map((item) => (
                            <div
                                className=" h-[100px] w-[100px] mt-6 cursor-pointer"
                                key={item.id}
                                onClick={() => setActive(item.title)}
                            >
                                <div
                                    className="w-[50px] h-[50px] text-white m-auto flex items-center justify-center text-2xl bg-[#1E293B] p-3 rounded-full"
                                    style={{
                                        color:
                                            active === item.title
                                                ? "#E88D67"
                                                : "#ffff",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <p className="text-center font-roboto text-sm mt-2">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-[500px] bg-slate-700 border-2 mt-3 p-5 rounded-lg flex flex-wrap wrap-2 gap-8">
                    {active === "Olyzano Mart" && <MarketCategory />}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
