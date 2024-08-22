import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowControlFragmentProps from "../../../../fragments/ArrowControlFragment";
import CardFragment from "../../../../fragments/CardFragment";

const dataItem = [
    {
        id: 1,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 4,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 2,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 3,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 4,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 5,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 6,
        img: "img/test.jpeg",
        title: "Bagian 6",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 7,
        img: "img/test.jpeg",
        title: "Bagian 6",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },

    {
        id: 8,
        img: "img/test.jpeg",
        title: "Bagian 6",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 9,
        img: "img/test.jpeg",
        title: "Bagian 6",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 10,
        img: "img/test.jpeg",
        title: "Bagian 6",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 0,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 11,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 4,
        isflashsale: true,
        storePlace: "Jakarta",
    },

    {
        id: 12,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 10,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 13,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 4,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 14,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 4,
        isflashsale: true,
        storePlace: "Jakarta",
    },
    {
        id: 15,
        img: "img/test.jpeg",
        title: "Sepatu sneakers pria dewasa sepatu sport cowok",
        price: 150000,
        discount: 10,
        rating: 4.5,
        totalRating: 100,
        stock: 10,
        currentStock: 4,
        isflashsale: true,
        storePlace: "Jakarta",
    },
];

const FlashsaleSection = () => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [showArrowControlButton, setShowArrowControlButton] = useState(false);
    const [slidePositionNumber, setSlidePositionNumber] = useState(0);

    const showArrowControlHandler = () => {
        setShowArrowControlButton(!showArrowControlButton);
    };

    const totalSlide = 80 * 2;
    const prevSlideHandler = () => {
        slidePositionNumber < 0
            ? setSlidePositionNumber(0)
            : setSlidePositionNumber(slidePositionNumber - 80);
    };
    const nextSlideHandler = () => {
        slidePositionNumber >= totalSlide
            ? setSlidePositionNumber(totalSlide)
            : setSlidePositionNumber(slidePositionNumber + 80);
    };

    useEffect(() => {
        const endTime = new Date().getTime() + 12 * 60 * 60 * 1000;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(interval);
                setHour(0);
                setMinute(0);
                setSecond(0);
            } else {
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setHour(hours);
                setMinute(minutes);
                setSecond(seconds);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="w-full h-[500px] p-10">
            <div className="flex gap-2 items-center">
                <h2 className="font-roboto font-bold text-2xl flex gap-2 items-center">
                    <img
                        src="img/icons/flashsale-icon.png"
                        alt="flashsale-icon"
                        width={40}
                        height={40}
                    />
                    Flashsale
                </h2>
                <div className="timer-box-wrapper flex gap-2 text-white font-bold">
                    <div className="timer-box w-10 h-10 bg-[#E88D67] rounded-md flex items-center justify-center font-roboto text-xl">
                        {hour}
                    </div>
                    <div className="timer-box w-10 h-10 bg-[#E88D67] rounded-md flex items-center justify-center font-roboto text-xl">
                        {minute}
                    </div>
                    <div className="timer-box w-10 h-10 bg-[#E88D67] rounded-md flex items-center justify-center font-roboto text-xl">
                        {second}
                    </div>
                </div>
                <Link
                    to=""
                    className="text-[#E88D67] font-roboto text-sm font-bold"
                >
                    View all
                </Link>
            </div>
            <div className="card-wrapper w-[90rem] h-[390px] relative overflow-hidde rounded-lg my-5 ">
                <div
                    className="w-[82.5rem] h-full absolute top-0 left-0 px-5"
                    onMouseEnter={showArrowControlHandler}
                    onMouseLeave={showArrowControlHandler}
                >
                    <ArrowControlFragmentProps
                        isShowArrowControl={showArrowControlButton}
                        prevSlideFunc={prevSlideHandler}
                        nextSlideFunc={nextSlideHandler}
                    >
                        <div className="w-full overflow-hidden ">
                            <div className="w-[250rem] relative flex flex-nowrap rounded-lg">
                                {dataItem.map(
                                    (item) =>
                                        item.isflashsale && (
                                            <CardFragment
                                                key={item.id}
                                                slidePositionNumber={
                                                    slidePositionNumber
                                                }
                                            >
                                                <CardFragment.CardHeader img="img/test.jpeg" />
                                                <CardFragment.CardBody
                                                    currentPrice={150000}
                                                    promoPrice={100000}
                                                    discount={10}
                                                >
                                                    {item.title}
                                                </CardFragment.CardBody>
                                                <CardFragment.CardFooter
                                                    rating={item.rating}
                                                    totalRating={
                                                        item.totalRating
                                                    }
                                                    stock={item.stock}
                                                    currentStock={
                                                        item.currentStock
                                                    }
                                                    isflashsale={
                                                        item.isflashsale
                                                    }
                                                    storePlace={item.storePlace}
                                                ></CardFragment.CardFooter>
                                            </CardFragment>
                                        )
                                )}
                            </div>
                        </div>
                    </ArrowControlFragmentProps>
                </div>
            </div>
        </div>
    );
};

export default FlashsaleSection;
