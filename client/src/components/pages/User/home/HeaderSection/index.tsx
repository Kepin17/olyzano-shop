import { useEffect, useState } from "react";
import Button from "../../../../elements/Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const HeaderSection = () => {
    const [showFirstSlide, setShowFirstSlide] = useState(true);
    const [showSecondSlide, setShowSecondSlide] = useState(false);
    const [showThirdSlide, setShowThirdSlide] = useState(false);
    const [sliderCount, setSliderCount] = useState(0);

    useEffect(() => {
        const slideOneActive = () => {
            setShowFirstSlide(true);
            setShowSecondSlide(false);
            setShowThirdSlide(false);
        };

        const slideTwoActive = () => {
            setShowFirstSlide(false);
            setShowSecondSlide(true);
            setShowThirdSlide(false);
        };

        const slideThreeActive = () => {
            setShowFirstSlide(false);
            setShowSecondSlide(false);
            setShowThirdSlide(true);
        };

        const sliderControlData = [
            slideOneActive,
            slideTwoActive,
            slideThreeActive,
        ];
        const timer = setTimeout(() => {
            sliderCount < 2
                ? setSliderCount(sliderCount + 1)
                : setSliderCount(0);
            sliderControlData[sliderCount]();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    });

    const showFirstSlideHandler = () => {
        setShowFirstSlide(true);
        setShowSecondSlide(false);
        setShowThirdSlide(false);
    };
    const showSecondSlideHandler = () => {
        setShowFirstSlide(false);
        setShowSecondSlide(true);
        setShowThirdSlide(false);
    };
    const showThirdSlideHandler = () => {
        setShowFirstSlide(false);
        setShowSecondSlide(false);
        setShowThirdSlide(true);
    };
    return (
        <header className="w-full h-screen flex bg-[#F3F7EC] relative">
            <div className="textbox w-[50%] h-full relative ">
                <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-20 ">
                    <h1
                        className={`text-[50px] font-roboto font-bold transtition-all duration-300 ease-in-out ${
                            showFirstSlide
                                ? "scale-[1.1] text-[#E88D67]"
                                : "scale-[1]"
                        }`}
                    >
                        Easy to Order
                    </h1>
                    <h1
                        className={`text-[50px] font-roboto font-bold transtition-all duration-300 ease-in-out ${
                            showSecondSlide
                                ? "scale-[1.1] text-[#E88D67]"
                                : "scale-[1]"
                        }`}
                    >
                        Fresh Grocery
                    </h1>
                    <h1
                        className={`text-[50px] font-roboto font-bold -my-1 transtition-all duration-300 ease-in-out ${
                            showThirdSlide
                                ? "scale-[1.1] text-[#E88D67]"
                                : "scale-[1]"
                        }`}
                    >
                        Fast Delivery
                    </h1>
                    <Button
                        type="button"
                        className="w-40 h-12 border-2 border-[#E88D67] text-[#E88D67] hover:text-white hover:bg-[#E88D67] 
          text-xl font-roboto font-bold rounded-md mt-4 flex items-center justify-center gap-2 
          transition duration-300 ease-in-out
          "
                    >
                        <MdOutlineShoppingCartCheckout />
                        Order Now
                    </Button>
                </div>
            </div>
            <div className="textbox w-[1100px] h-full flex flex-col items-center justify-center">
                <div className="w-[650px] h-[350px] flex justify-center items-center gap-10 overflow-hidden">
                    <div className="animation-up-down">
                        <div
                            className={`flex transtition-all duration-300 ease-in-out `}
                            id="firstSlide"
                            style={{
                                transform: showFirstSlide
                                    ? "translateY(350px)"
                                    : `translateY(${
                                          showThirdSlide ? 800 : -400
                                      }px)`,
                                opacity: showFirstSlide ? 1 : 0,
                            }}
                        >
                            <img src="img/headerImg-1.png" width={600} alt="" />
                        </div>
                        <div
                            className={`flex transtition-all duration-300 ease-in-out translate-x-10`}
                            id="secondSlide"
                            style={{
                                transform: showSecondSlide
                                    ? "translateY(80px)"
                                    : `translateY(${
                                          showThirdSlide ? -300 : 1000
                                      }px)`,
                                opacity: showSecondSlide ? 1 : 0,
                            }}
                        >
                            <img src="img/headerImg-2.png" alt="" width={550} />
                        </div>

                        <div
                            className={`flex  transtition-all duration-300 ease-in-out`}
                            id="thirdSlide"
                            style={{
                                transform: showThirdSlide
                                    ? "translateY(-400px)"
                                    : `translateY(${
                                          showFirstSlide ? "-" : ""
                                      }1000px)`,
                                opacity: showThirdSlide ? 1 : 0,
                            }}
                        >
                            <img src="img/headerImg-3.png" alt="" width={450} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="dot-control-wrapper absolute bottom-5 right-20 top-0 flex flex-col items-center justify-center gap-2">
                <div
                    className={`dot w-[8px] bg-[#E88D67] rounded-md cursor-pointer
        transition-all duration-300 ease-in-out
        `}
                    onClick={showFirstSlideHandler}
                    style={{
                        height: showFirstSlide ? "20px" : "8px",
                    }}
                ></div>
                <div
                    className={`dot w-[8px] bg-[#E88D67] rounded-md cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={showSecondSlideHandler}
                    style={{
                        height: showSecondSlide ? "20px" : "8px",
                    }}
                ></div>
                <div
                    className={`dot w-[8px] bg-[#E88D67] rounded-md cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={showThirdSlideHandler}
                    style={{
                        height: showThirdSlide ? "20px" : "8px",
                    }}
                ></div>
            </div>
        </header>
    );
};

export default HeaderSection;
