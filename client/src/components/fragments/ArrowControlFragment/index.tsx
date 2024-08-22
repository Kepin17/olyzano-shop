import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface ArrowControlFragmentProps {
  children: React.ReactNode;
  isShowArrowControl: boolean;
  leftControlIsHidden?: boolean;
  rightControlIsHidden?: boolean;
  prevSlideFunc: () => void;
  nextSlideFunc: () => void;
}

const ArrowControlFragment: React.FC<ArrowControlFragmentProps> = (props) => {
  const { children, isShowArrowControl, prevSlideFunc, nextSlideFunc, leftControlIsHidden, rightControlIsHidden } = props;

  return (
    <>
      <div
        className="leftcontrol w-10 h-10 z-10 border-2 bg-white rounded-full shadow-lg absolute top-1/2 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out"
        onClick={prevSlideFunc}
        style={{
          opacity: isShowArrowControl ? 1 : 0,
          left: isShowArrowControl ? 10 : 20 + "px",
          display: leftControlIsHidden ? "none" : "flex",
        }}
      >
        <IoIosArrowBack className="font-bold text-2xl" />
      </div>
      {children}
      <div
        className="leftcontrol w-10 h-10 z-10 border-2 bg-white rounded-full shadow-lg absolute top-1/2 right-5 rotate-180 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out"
        onClick={nextSlideFunc}
        style={{
          opacity: isShowArrowControl ? 1 : 0,
          right: isShowArrowControl ? 10 : 20 + "px",
          display: rightControlIsHidden ? "none" : "flex",
        }}
      >
        <IoIosArrowBack className="font-bold text-2xl" />
      </div>
    </>
  );
};

export default ArrowControlFragment;
