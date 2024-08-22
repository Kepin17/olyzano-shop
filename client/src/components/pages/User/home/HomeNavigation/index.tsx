import { useEffect, useState } from "react";
import ArrowControlFragment from "../../../../fragments/ArrowControlFragment";
import Button from "../../../../elements/Button";

// icon

import { FaWallet } from "react-icons/fa";
import { TbTransferVertical } from "react-icons/tb";
import {
    MdCastForEducation,
    MdCardTravel,
    MdOutlinePayment,
} from "react-icons/md";
import { CiStreamOn } from "react-icons/ci";
import { GiKidSlide } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import {
    RiServiceFill,
    RiMovie2Fill,
    RiDiscountPercentFill,
} from "react-icons/ri";
import { BsShieldFillCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const menuCategoryItems = [
    {
        id: 1,
        title: "Transfer, Withdraw",
        icon: <TbTransferVertical />,
        link: "",
    },
    {
        id: 2,
        title: "Top Up , E-wallet",
        icon: <FaWallet />,
        link: "",
    },

    {
        id: 3,
        title: "Education",
        icon: <MdCastForEducation />,
        link: "",
    },
    {
        id: 4,
        title: "Internet & Tv ",
        icon: <CiStreamOn />,
        link: "",
    },
    {
        id: 5,
        title: "Kids Zone",
        icon: <GiKidSlide />,
        link: "",
    },

    {
        id: 6,
        title: "Travel",
        icon: <MdCardTravel />,
        link: "",
    },

    {
        id: 7,
        title: "Food & Beverages",
        icon: <IoFastFood />,
        link: "",
    },

    {
        id: 8,
        title: "Healty Care",
        icon: <RiServiceFill />,
        link: "",
    },
    {
        id: 9,
        title: "Olyzano Finances",
        icon: <MdOutlinePayment />,
        link: "",
    },
    {
        id: 10,
        title: "Movie",
        icon: <RiMovie2Fill />,
        link: "",
    },
    {
        id: 11,
        title: "Discount & Promo",
        icon: <RiDiscountPercentFill />,
        link: "",
    },
    {
        id: 12,
        title: "Insurance",
        icon: <BsShieldFillCheck />,
        link: "",
    },
];

const HomeNavigation = () => {
    const [isControlShow, setIsControlShow] = useState(false);
    const [navPostition, setNavPosition] = useState(0);
    const [isleftControlIsHidden, setIsLeftControlIsHidden] = useState(false);
    const [isRightControlIsHidden, setIsRightControlIsHidden] = useState(false);

    useEffect(() => {
        if (navPostition === 0) {
            setIsLeftControlIsHidden(true);
        } else {
            setIsLeftControlIsHidden(false);
        }
        if (navPostition === 30) {
            setIsRightControlIsHidden(true);
        } else {
            setIsRightControlIsHidden(false);
        }
    }, [navPostition]);

    const showControlHandler = () => {
        setIsControlShow(!isControlShow);
    };

    const prevSlideHandler = () => {
        if (navPostition < 0) {
            setNavPosition(navPostition - 30);
        } else {
            setNavPosition(0);
        }
    };

    const nextSlideHandler = () => {
        if (navPostition < 30) {
            setNavPosition(navPostition + 30);
        } else {
            setNavPosition(30);
        }
    };

    return (
        <div className="w-full h-[200px] p-10">
            <div className="h-[150px] bg-slate-800 shadow-xl rounded-lg px-8 flex items-center">
                <div className="w-[200px] h-full flex items-center">
                    <div>
                        <h4 className="text-white font-bold font-roboto mb-2">
                            Total Balance
                        </h4>
                        <div className=" w-[160px] h-10 bg-white shadow-lg border-2 rounded-lg p-2">
                            <p className="flex gap-2 font-bold font-roboto">
                                <FaWallet className="text-2xl text-center text-orange-500" />
                                $ 1,000,000,00
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[1200px] h-full flex items-center relative overflow-hidden"
                    onMouseEnter={showControlHandler}
                    onMouseLeave={showControlHandler}
                >
                    <ArrowControlFragment
                        isShowArrowControl={isControlShow}
                        prevSlideFunc={prevSlideHandler}
                        nextSlideFunc={nextSlideHandler}
                        leftControlIsHidden={isleftControlIsHidden}
                        rightControlIsHidden={isRightControlIsHidden}
                    >
                        <div className="w-fuil h-full flex items-center justify-center gap-3">
                            {menuCategoryItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.link}
                                    className="transtition-all duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${navPostition}rem)`,
                                    }}
                                >
                                    <div className="w-32 h-auto mt-7">
                                        <Button
                                            type="button"
                                            className="w-14 h-14 bg-white font-roboto text-slate-700 text-3xl 
                  flex items-center justify-center rounded-md m-auto
                  "
                                        >
                                            {item.icon}
                                        </Button>
                                        <div className="p-2 text-center font-roboto text-white font-bold">
                                            <h4 className="text-[13px]">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ArrowControlFragment>
                </div>
            </div>
        </div>
    );
};
export default HomeNavigation;
